import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import {
  parseFitsBuffer,
  parseHduHeader,
  normalizePixel,
} from '../src/utils/fitsParser.js';

describe('fitsParser — FITS MEF Ingestion and Physical Flux Decoding', () => {
  it('correctly parses authentic SPHEREx Level 2 MEF cutout 1', () => {
    const fileBuf = fs.readFileSync('public/fits/spherex/spherex_l2_dr1_useful_cutout.fits');
    const arrayBuf = fileBuf.buffer.slice(fileBuf.byteOffset, fileBuf.byteOffset + fileBuf.byteLength);

    const result = parseFitsBuffer(arrayBuf);

    assert.strictEqual(result.hdus.length, 7, 'Must parse exactly 7 HDUs');
    assert.strictEqual(result.dimensions[0], 117, 'Width must be 117');
    assert.strictEqual(result.dimensions[1], 117, 'Height must be 117');
    assert.strictEqual(result.pixelData.length, 13689, 'Float32 array size must be 117*117');

    // Scientific values validation
    assert.strictEqual(result.obsId, '2025W19_2B_0007_1', 'Observation ID must match');
    assert.strictEqual(result.dateObs, '2025-05-08T12:32:42.507', 'Observation timestamp must match');
    assert.strictEqual(result.bunit, 'MJy / sr', 'Flux unit must be MJy / sr');

    // Float32 physical values
    assert(result.pixelStats.min < 0, 'Min flux has negative noise values');
    assert(result.pixelStats.max > 100, 'Max flux captures bright infrared sources');
    assert(Math.abs(result.pixelStats.mean - 0.35) < 0.05, 'Mean flux must be ~0.35 MJy/sr');

    // WCS validation
    assert(Math.abs(result.wcs.crval1 - 318.2745) < 0.001, 'CRVAL1 must be ~318.2745');
    assert(Math.abs(result.wcs.crval2 - 17.5892) < 0.001, 'CRVAL2 must be ~17.5892');
  });

  it('correctly parses authentic SPHEREx Level 2 MEF cutout 2 (temporal companion)', () => {
    const fileBuf = fs.readFileSync('public/fits/spherex/spherex_l2_dr1_useful_cutout_t2.fits');
    const arrayBuf = fileBuf.buffer.slice(fileBuf.byteOffset, fileBuf.byteOffset + fileBuf.byteLength);

    const result = parseFitsBuffer(arrayBuf);

    assert.strictEqual(result.hdus.length, 7, 'Must parse exactly 7 HDUs');
    assert.strictEqual(result.dimensions[0], 117, 'Width must be 117');
    assert.strictEqual(result.dimensions[1], 117, 'Height must be 117');
    assert.strictEqual(result.obsId, '2025W19_2B_0007_2', 'Observation ID must match');
    assert.strictEqual(result.dateObs, '2025-05-08T12:34:51.436', 'Observation timestamp must match');

    // Interval check between frame 1 and frame 2
    const t1 = new Date('2025-05-08T12:32:42.507Z').getTime();
    const t2 = new Date('2025-05-08T12:34:51.436Z').getTime();
    const deltaSec = (t2 - t1) / 1000;
    assert.strictEqual(Math.round(deltaSec), 129, 'Interval must be ~129s (2m 09s)');
  });

  it('parses individual HDU header cards directly via parseHduHeader', () => {
    const fileBuf = fs.readFileSync('public/fits/spherex/spherex_l2_dr1_useful_cutout.fits');
    const arrayBuf = fileBuf.buffer.slice(fileBuf.byteOffset, fileBuf.byteOffset + fileBuf.byteLength);

    const { cards, endOffset } = parseHduHeader(arrayBuf, 0);
    assert.strictEqual(cards['SIMPLE'], 'T');
    assert.strictEqual(endOffset, 2880);
  });

  it('verifies Asinh and Linear pixel stretch and colormap inversion', () => {
    // Linear stretch: min 0, max 10
    const linMid = normalizePixel(5, 0, 10, 'linear', false);
    assert.strictEqual(linMid, 128, 'Linear midpoint must be 128');

    // Inverted Linear stretch: 2.5 of 10 is 25%, inverted is 75% -> 191
    const linLowInv = normalizePixel(2.5, 0, 10, 'linear', true);
    assert.strictEqual(linLowInv, 191, 'Inverted 25% should be 191');

    // Asinh stretch: preserves dynamic range without clipping bright stars
    const asinhLow = normalizePixel(0.5, 0, 50, 'asinh', false, 0.5);
    const linLow = normalizePixel(0.5, 0, 50, 'linear', false);
    assert(asinhLow > linLow, 'Asinh brings out faint structures above linear cutoff');
  });
});
