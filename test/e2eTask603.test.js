import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import { ObservationService } from '../src/services/observationService.js';
import {
  parseFitsBuffer,
  normalizePixel,
} from '../src/utils/fitsParser.js';

describe('TASK-603 End-to-End Workflow Verification', () => {
  it('Phase 1: Custom Target Search in Pilot Spatial Index', () => {
    // 1. Positive search
    const query = ObservationService.searchPilotIndex(318.25, 17.65, 720);
    assert.strictEqual(query.isValid, true);
    assert.strictEqual(query.matched, true);
    assert.strictEqual(query.status, 'matched');
    assert(query.count >= 2, 'Must match at least 2 observations in calibration strip');

    const [obs1, obs2] = query.observations;
    assert.strictEqual(obs1.id, '2025W19_2B_0007_1');
    assert.strictEqual(obs2.id, '2025W19_2B_0007_2');
    assert.strictEqual(obs1.band, 1);
    assert.strictEqual(obs1.isRealFits, true);
    assert.strictEqual(obs1.isMock, false);

    // 2. Negative search (outside pilot index)
    const negQuery = ObservationService.searchPilotIndex(10.0, 10.0, 720);
    assert.strictEqual(negQuery.isValid, true);
    assert.strictEqual(negQuery.matched, false);
    assert.strictEqual(negQuery.status, 'no-match');
    assert.strictEqual(negQuery.count, 0);
    assert.strictEqual(negQuery.observations.length, 0);

    // 3. Validation error
    const errQuery = ObservationService.searchPilotIndex(450.0, 20.0);
    assert.strictEqual(errQuery.isValid, false);
    assert.strictEqual(errQuery.status, 'error');
    assert(errQuery.message.includes('Right Ascension'));

    // 4. Custom target creation
    const customTarget = ObservationService.createCustomTarget({
      name: 'Vulpecula Test Region',
      ra: 318.25,
      dec: 17.65,
      fovArcsec: 720,
      observations: query.observations,
    });
    assert.strictEqual(customTarget.name, 'Vulpecula Test Region');
    assert.strictEqual(customTarget.isCustom, true);
    assert(customTarget.observations.length >= 2, 'Custom target should have at least 2 observations');
  });

  it('Phase 2: Authentic FITS MEF Ingestion and 7-HDU Parsing', () => {
    const f1Buf = fs.readFileSync('public/fits/spherex/spherex_l2_dr1_useful_cutout.fits');
    const f2Buf = fs.readFileSync('public/fits/spherex/spherex_l2_dr1_useful_cutout_t2.fits');

    const p1 = parseFitsBuffer(f1Buf.buffer.slice(f1Buf.byteOffset, f1Buf.byteOffset + f1Buf.byteLength));
    const p2 = parseFitsBuffer(f2Buf.buffer.slice(f2Buf.byteOffset, f2Buf.byteOffset + f2Buf.byteLength));

    // HDU structure verification
    assert.strictEqual(p1.hdus.length, 7);
    assert.strictEqual(p2.hdus.length, 7);

    const expectedExts = ['PRIMARY', 'IMAGE', 'FLAGS', 'VARIANCE', 'ZODI', 'EPSF', 'WCS-WAVE'];
    assert.deepStrictEqual(p1.hdus.map((h) => h.extname), expectedExts);
    assert.deepStrictEqual(p2.hdus.map((h) => h.extname), expectedExts);

    // Dimensions & pixel array
    assert.deepStrictEqual(p1.dimensions, [117, 117]);
    assert.deepStrictEqual(p2.dimensions, [117, 117]);
    assert.strictEqual(p1.pixelData.length, 13689);
    assert.strictEqual(p2.pixelData.length, 13689);

    // Flux stats
    assert(p1.pixelStats.min < 0);
    assert(p1.pixelStats.max > 100);
    assert(p2.pixelStats.min < 0);
    assert(p2.pixelStats.max > 50);
  });

  it('Phase 3: WiseView Image Controls (Stretch & Colormap Inversion)', () => {
    // Asinh stretch test
    const faintFlux = 0.5; // MJy/sr
    const brightFlux = 50.0; // MJy/sr
    const normFaint = normalizePixel(faintFlux, -1.0, 25.0, 'asinh', false, 0.5);
    const normBright = normalizePixel(brightFlux, -1.0, 25.0, 'asinh', false, 0.5);

    assert(normFaint > 0, 'Faint flux is visible in Asinh');
    assert.strictEqual(normBright, 255, 'Bright flux reaches top of scale');

    // Colormap Inversion test
    const normFaintInverted = normalizePixel(faintFlux, -1.0, 25.0, 'asinh', true, 0.5);
    assert.strictEqual(normFaint + normFaintInverted, 255, 'Standard and Inverted sum to 255');
  });

  it('Phase 4: Chronological Timeline and 2m 09s Elapsed Time Delta', () => {
    const f1Buf = fs.readFileSync('public/fits/spherex/spherex_l2_dr1_useful_cutout.fits');
    const f2Buf = fs.readFileSync('public/fits/spherex/spherex_l2_dr1_useful_cutout_t2.fits');

    const p1 = parseFitsBuffer(f1Buf.buffer.slice(f1Buf.byteOffset, f1Buf.byteOffset + f1Buf.byteLength));
    const p2 = parseFitsBuffer(f2Buf.buffer.slice(f2Buf.byteOffset, f2Buf.byteOffset + f2Buf.byteLength));

    const t1 = new Date(p1.dateObs + 'Z').getTime();
    const t2 = new Date(p2.dateObs + 'Z').getTime();

    assert(t2 > t1, 'Chronological ordering verified: Frame 2 is after Frame 1');

    const deltaSec = (t2 - t1) / 1000;
    const mins = Math.floor(deltaSec / 60);
    const secs = Math.round(deltaSec % 60);

    assert.strictEqual(mins, 2, 'Elapsed minutes must be 2');
    assert.strictEqual(secs, 9, 'Elapsed seconds must be 9');
    assert.strictEqual(`${mins}m ${secs < 10 ? '0' : ''}${secs}s`, '2m 09s');
  });

  it('Phase 5: Astrometric Registration and Scientific Integrity Disclosures', () => {
    const f1Buf = fs.readFileSync('public/fits/spherex/spherex_l2_dr1_useful_cutout.fits');
    const f2Buf = fs.readFileSync('public/fits/spherex/spherex_l2_dr1_useful_cutout_t2.fits');

    const p1 = parseFitsBuffer(f1Buf.buffer.slice(f1Buf.byteOffset, f1Buf.byteOffset + f1Buf.byteLength));
    const p2 = parseFitsBuffer(f2Buf.buffer.slice(f2Buf.byteOffset, f2Buf.byteOffset + f2Buf.byteLength));

    // WCS center difference check
    const dra = Math.abs(p1.wcs.crval1 - p2.wcs.crval1);
    const ddec = Math.abs(p1.wcs.crval2 - p2.wcs.crval2);

    assert(dra < 0.1, 'RA drift between consecutive frames is small (< 0.1 deg)');
    assert(ddec < 0.25, 'Dec drift corresponds to scan pitch (~0.19 deg)');

    // Ensure physical units are authentic MJy / sr
    assert.strictEqual(p1.bunit, 'MJy / sr');
    assert.strictEqual(p2.bunit, 'MJy / sr');
  });
});
