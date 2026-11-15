/**
 * Pure JavaScript FITS Parser and Astronomical Image Processor
 *
 * Implements:
 * - Parsing 2,880-byte FITS header blocks for Primary HDU and MEF extensions
 * - Decoding Big-Endian IEEE 754 Float32 (BITPIX = -32) arrays
 * - Decoding Big-Endian Int32 (BITPIX = 32) FLAGS bitmasks
 * - Preserving raw physical flux values in Megajanskys per steradian (MJy / sr)
 * - Computing real-time Asinh (arcsinh) and Linear stretch algorithms
 * - Inverting colormaps (dark stars on white sky / bright stars on dark sky)
 * - Generating standard HTML5 Canvas ImageData with astronomical North-Up orientation
 */

const FITS_BLOCK_SIZE = 2880;
const FITS_CARD_SIZE = 80;
const CARDS_PER_BLOCK = 36; // 2880 / 80

/**
 * Parses header cards from a FITS HDU starting at the given byte offset.
 *
 * @param {ArrayBuffer} buffer
 * @param {number} startOffset
 * @returns {{ cards: Record<string, string>, rawCards: Array<{ key: string, value: string, comment: string }>, endOffset: number }}
 */
export function parseHduHeader(buffer, startOffset) {
  const cards = {};
  const rawCards = [];
  let offset = startOffset;
  let endFound = false;
  const decoder = new TextDecoder('ascii');

  while (offset < buffer.byteLength && !endFound) {
    const blockBytes = new Uint8Array(buffer, offset, Math.min(FITS_BLOCK_SIZE, buffer.byteLength - offset));
    for (let i = 0; i < CARDS_PER_BLOCK; i++) {
      const cardStr = decoder.decode(blockBytes.subarray(i * FITS_CARD_SIZE, (i + 1) * FITS_CARD_SIZE));
      const key = cardStr.slice(0, 8).trim();

      if (!key) continue;

      let value = '';
      let comment = '';

      if (cardStr.charAt(8) === '=') {
        const rest = cardStr.slice(10);
        let valueStr = '';
        let commentStr = '';

        const trimmedRest = rest.trimStart();
        if (trimmedRest.startsWith("'")) {
          // String literal in FITS: starts with ' and ends with '
          // Look for closing quote not followed by another quote
          let inQuote = false;
          let closeQuoteIdx = -1;
          for (let c = 0; c < rest.length; c++) {
            if (rest.charAt(c) === "'") {
              if (!inQuote) {
                inQuote = true;
              } else if (c + 1 < rest.length && rest.charAt(c + 1) === "'") {
                c++; // Escaped quote ''
              } else {
                inQuote = false;
                closeQuoteIdx = c;
                break;
              }
            }
          }

          if (closeQuoteIdx >= 0) {
            valueStr = rest.slice(0, closeQuoteIdx + 1).trim();
            const afterQuote = rest.slice(closeQuoteIdx + 1);
            const slashIdx = afterQuote.indexOf('/');
            if (slashIdx >= 0) {
              commentStr = afterQuote.slice(slashIdx + 1).trim();
            }
          } else {
            valueStr = rest.trim();
          }
        } else {
          // Numeric or logical value
          const slashIdx = rest.indexOf('/');
          if (slashIdx >= 0) {
            valueStr = rest.slice(0, slashIdx).trim();
            commentStr = rest.slice(slashIdx + 1).trim();
          } else {
            valueStr = rest.trim();
          }
        }

        value = valueStr;
        comment = commentStr;
      } else {
        value = cardStr.slice(8).trim();
      }

      rawCards.push({ key, value, comment });
      if (!cards[key]) {
        cards[key] = value.replace(/^'|'$/g, '').trim();
      }

      if (key === 'END') {
        endFound = true;
        break;
      }
    }
    offset += FITS_BLOCK_SIZE;
  }

  return { cards, rawCards, endOffset: offset };
}

/**
 * Parses all HDUs in a SPHEREx Level 2 MEF FITS file from an ArrayBuffer.
 *
 * @param {ArrayBuffer} buffer
 * @returns {{
 *   hdus: Array<object>,
 *   primaryHeader: Record<string, string>,
 *   imageHeader: Record<string, string>,
 *   dimensions: [number, number],
 *   pixelData: Float32Array,
 *   pixelStats: { min: number, max: number, mean: number, validCount: number },
 *   flagsData: Int32Array | null,
 *   flagsSummary: { totalFlagged: number, flagFraction: number } | null,
 *   varianceData: Float32Array | null,
 *   bunit: string,
 *   dateObs: string,
 *   obsId: string,
 *   wcs: object
 * }}
 */
export function parseFitsBuffer(buffer) {
  if (!buffer || buffer.byteLength < FITS_BLOCK_SIZE) {
    throw new Error('Invalid FITS file: buffer is empty or smaller than 2,880 bytes');
  }

  const hdus = [];
  let offset = 0;

  while (offset < buffer.byteLength) {
    const hduStart = offset;
    const { cards, rawCards, endOffset } = parseHduHeader(buffer, offset);
    offset = endOffset;

    const naxis = parseInt(cards['NAXIS'] || '0', 10);
    const bitpix = parseInt(cards['BITPIX'] || '8', 10);
    let dataBytes = 0;

    if (naxis > 0) {
      let nElements = 1;
      for (let d = 1; d <= naxis; d++) {
        nElements *= parseInt(cards[`NAXIS${d}`] || '1', 10);
      }
      const bytesPerEl = Math.abs(bitpix) / 8;
      dataBytes = nElements * bytesPerEl;
      const pcount = parseInt(cards['PCOUNT'] || '0', 10);
      dataBytes += pcount;
    }

    const paddedBytes = Math.ceil(dataBytes / FITS_BLOCK_SIZE) * FITS_BLOCK_SIZE;
    const dataOffset = offset;

    hdus.push({
      extname: (cards['EXTNAME'] || (hdus.length === 0 ? 'PRIMARY' : `EXT_${hdus.length}`)).replace(/'/g, '').trim(),
      hduIndex: hdus.length,
      startOffset: hduStart,
      headerEndOffset: offset,
      bitpix,
      naxis,
      naxis1: parseInt(cards['NAXIS1'] || '0', 10),
      naxis2: parseInt(cards['NAXIS2'] || '0', 10),
      cards,
      rawCards,
      dataOffset,
      dataBytes,
      paddedBytes,
    });

    offset += paddedBytes;
  }

  const primaryHdu = hdus[0] || null;
  const imageHdu = hdus.find((h) => h.extname === 'IMAGE') || (hdus.length > 1 ? hdus[1] : null);
  const flagsHdu = hdus.find((h) => h.extname === 'FLAGS');
  const varianceHdu = hdus.find((h) => h.extname === 'VARIANCE');

  const width = imageHdu?.naxis1 || 0;
  const height = imageHdu?.naxis2 || 0;
  const pixelCount = width * height;

  let pixelData = new Float32Array(0);
  let pixelStats = { min: 0, max: 0, mean: 0, validCount: 0 };

  if (imageHdu && pixelCount > 0 && buffer.byteLength >= imageHdu.dataOffset + pixelCount * 4) {
    pixelData = new Float32Array(pixelCount);
    const dv = new DataView(buffer, imageHdu.dataOffset, pixelCount * 4);

    let min = Infinity;
    let max = -Infinity;
    let sum = 0;
    let validCount = 0;

    for (let i = 0; i < pixelCount; i++) {
      const val = dv.getFloat32(i * 4, false); // Big-Endian
      pixelData[i] = val;
      if (!Number.isNaN(val) && Number.isFinite(val)) {
        if (val < min) min = val;
        if (val > max) max = val;
        sum += val;
        validCount++;
      }
    }

    pixelStats = {
      min: validCount > 0 ? min : 0,
      max: validCount > 0 ? max : 0,
      mean: validCount > 0 ? sum / validCount : 0,
      validCount,
    };
  }

  // Parse FLAGS extension bitmask if available
  let flagsData = null;
  let flagsSummary = null;
  if (flagsHdu && pixelCount > 0 && buffer.byteLength >= flagsHdu.dataOffset + pixelCount * 4) {
    flagsData = new Int32Array(pixelCount);
    const flagsDv = new DataView(buffer, flagsHdu.dataOffset, pixelCount * 4);
    let totalFlagged = 0;
    for (let i = 0; i < pixelCount; i++) {
      const flagVal = flagsDv.getInt32(i * 4, false); // Big-Endian
      flagsData[i] = flagVal;
      if (flagVal !== 0) totalFlagged++;
    }
    flagsSummary = {
      totalFlagged,
      flagFraction: totalFlagged / pixelCount,
    };
  }

  // Parse VARIANCE extension if available
  let varianceData = null;
  if (varianceHdu && pixelCount > 0 && buffer.byteLength >= varianceHdu.dataOffset + pixelCount * 4) {
    varianceData = new Float32Array(pixelCount);
    const varDv = new DataView(buffer, varianceHdu.dataOffset, pixelCount * 4);
    for (let i = 0; i < pixelCount; i++) {
      varianceData[i] = varDv.getFloat32(i * 4, false);
    }
  }

  const primaryCards = primaryHdu ? primaryHdu.cards : {};
  const imageCards = imageHdu ? imageHdu.cards : {};

  const dateObs = imageCards['DATE-OBS'] || primaryCards['DATE-OBS'] || 'Unknown';
  const obsId = imageCards['OBSID'] || primaryCards['OBSID'] || primaryCards['POINTING'] || 'SPHEREx-Obs';
  const bunit = imageCards['BUNIT'] || 'MJy / sr';

  const wcs = {
    crval1: parseFloat(imageCards['CRVAL1'] || '0'),
    crval2: parseFloat(imageCards['CRVAL2'] || '0'),
    crpix1: parseFloat(imageCards['CRPIX1'] || '0'),
    crpix2: parseFloat(imageCards['CRPIX2'] || '0'),
    cdelt1: parseFloat(imageCards['CDELT1'] || '1.0'),
    cdelt2: parseFloat(imageCards['CDELT2'] || '1.0'),
    pc: [
      [parseFloat(imageCards['PC1_1'] || '1.0'), parseFloat(imageCards['PC1_2'] || '0.0')],
      [parseFloat(imageCards['PC2_1'] || '0.0'), parseFloat(imageCards['PC2_2'] || '1.0')],
    ],
    ctype1: imageCards['CTYPE1'] || 'RA---TAN',
    ctype2: imageCards['CTYPE2'] || 'DEC--TAN',
  };

  return {
    hdus,
    primaryHeader: primaryCards,
    imageHeader: imageCards,
    dimensions: [width, height],
    pixelData,
    pixelStats,
    flagsData,
    flagsSummary,
    varianceData,
    bunit,
    dateObs,
    obsId,
    wcs,
  };
}

/**
 * Normalizes a raw pixel flux using Asinh or Linear stretch, applying optional inversion.
 *
 * @param {number} val - Pixel flux (e.g., in MJy/sr)
 * @param {number} minVal - Lower cutoff value
 * @param {number} maxVal - Upper cutoff value
 * @param {'asinh'|'linear'} stretch - Stretch algorithm
 * @param {boolean} invert - Invert colormap (true: dark stars on light background)
 * @param {number} beta - Softening factor for Asinh
 * @returns {number} Normalized intensity in [0, 255]
 */
export function normalizePixel(val, minVal, maxVal, stretch = 'asinh', invert = false, beta = 0.5) {
  if (Number.isNaN(val) || !Number.isFinite(val)) {
    return invert ? 255 : 0;
  }

  let norm = 0;
  const clampedVal = Math.max(minVal, Math.min(maxVal, val));

  if (stretch === 'asinh') {
    const safeBeta = beta > 0 ? beta : 0.1;
    const numerator = Math.asinh((clampedVal - minVal) / safeBeta);
    const denominator = Math.asinh((maxVal - minVal) / safeBeta);
    norm = denominator > 0 ? numerator / denominator : 0;
  } else {
    // Linear
    const range = maxVal - minVal;
    norm = range > 0 ? (clampedVal - minVal) / range : 0;
  }

  norm = Math.max(0, Math.min(1, norm));

  if (invert) {
    norm = 1 - norm;
  }

  return Math.round(norm * 255);
}

/**
 * Generates an ImageData object for rendering a FITS Float32 2D array on an HTML5 canvas.
 * Correctly accounts for FITS row-order (row 0 is bottom in FITS, top in canvas).
 *
 * @param {Float32Array} pixelData
 * @param {number} width
 * @param {number} height
 * @param {object} options - { min, max, stretch, invert, beta }
 * @returns {ImageData}
 */
export function renderFitsToImageData(pixelData, width, height, options = {}) {
  const {
    min = -1.0,
    max = 20.0,
    stretch = 'asinh',
    invert = false,
    beta = 0.5,
  } = options;

  const imgData = new ImageData(width, height);
  const data = imgData.data;

  // FITS coordinates: Y=0 is bottom row. Canvas coordinates: Y=0 is top row.
  for (let canvasY = 0; canvasY < height; canvasY++) {
    const fitsY = height - 1 - canvasY; // Vertical flip for astronomical North-Up
    for (let x = 0; x < width; x++) {
      const fitsIndex = fitsY * width + x;
      const canvasIndex = (canvasY * width + x) * 4;

      const rawVal = pixelData[fitsIndex];
      const byteVal = normalizePixel(rawVal, min, max, stretch, invert, beta);

      data[canvasIndex] = byteVal;     // Red
      data[canvasIndex + 1] = byteVal; // Green
      data[canvasIndex + 2] = byteVal; // Blue
      data[canvasIndex + 3] = 255;     // Alpha (fully opaque)
    }
  }

  return imgData;
}

/**
 * Convenience method to render FITS pixel data directly to a target HTML5 <canvas> element.
 *
 * @param {Float32Array} pixelData
 * @param {number} width
 * @param {number} height
 * @param {HTMLCanvasElement} canvas
 * @param {object} options
 */
export function renderFitsToCanvas(pixelData, width, height, canvas, options = {}) {
  if (!canvas || !pixelData || width <= 0 || height <= 0) return;

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const imgData = renderFitsToImageData(pixelData, width, height, options);
  ctx.putImageData(imgData, 0, 0);
}
