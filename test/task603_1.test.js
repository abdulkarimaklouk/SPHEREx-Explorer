import { describe, it } from 'node:test';
import assert from 'node:assert';
import { ObservationService } from '../src/services/observationService.js';

describe('TASK-603.1 Unified Five-Target Exploration & Time Filter', () => {
  it('Priority 1: All 5 challenge presets use the archive search workflow and report pilot index limitation', () => {
    const presets = ObservationService.getPresetTargets();
    assert.strictEqual(presets.length, 5, 'Should have exactly 5 challenge presets');

    for (const preset of presets) {
      assert(typeof preset.ra === 'number', `Preset ${preset.id} must have numeric RA`);
      assert(typeof preset.dec === 'number', `Preset ${preset.id} must have numeric Dec`);

      const res = ObservationService.searchPilotIndex(preset.ra, preset.dec, 720);
      assert.strictEqual(res.isValid, true);
      assert.strictEqual(res.matched, false, `${preset.name} is outside pilot strip 2025W19_2B`);
      assert.strictEqual(res.count, 0);
      assert.strictEqual(res.observations.length, 0);
      assert.strictEqual(
        res.message,
        'Not covered by the current pilot index. Full archive discovery is currently unavailable.',
        'Must display exact required transparency message',
      );
    }
  });

  it('Priority 2: Observation Time Filter filters returned observations by timestamp', () => {
    // Both frames in pilot strip are on 2025-05-08T12:32:42 and 2025-05-08T12:34:51
    const ra = 318.25;
    const dec = 17.65;

    // Filter matching both
    const resBoth = ObservationService.searchPilotIndex(ra, dec, 720, {
      start: '2025-05-08T12:00:00',
      end: '2025-05-08T13:00:00',
    });
    assert(resBoth.count >= 2, 'Should match both frames within full hour');

    // Filter matching only Frame 1
    const resFirstOnly = ObservationService.searchPilotIndex(ra, dec, 720, {
      start: '2025-05-08T12:30:00',
      end: '2025-05-08T12:33:00',
    });
    assert.strictEqual(resFirstOnly.count, 1, 'Should match only Frame 1');
    assert.strictEqual(resFirstOnly.observations[0].id, '2025W19_2B_0007_1');

    // Filter matching neither (future date)
    const resNone = ObservationService.searchPilotIndex(ra, dec, 720, {
      start: '2026-01-01T00:00:00',
      end: '2026-01-02T00:00:00',
    });
    assert.strictEqual(resNone.count, 0, 'Should match 0 frames for future time window');
    assert.strictEqual(resNone.matched, false);
  });

  it('Priority 3: SPHEREx Calibration Field target provides working dual-frame demonstration', () => {
    const demo = ObservationService.getCalibrationTarget();
    assert.strictEqual(demo.id, 'spherex-cal-field');
    assert.strictEqual(demo.isCalibrationDemo, true);
    assert(demo.observations.length >= 2, 'Demo must have at least 2 real FITS frames');
    assert.strictEqual(demo.observations[0].isRealFits, true);
    assert.strictEqual(demo.observations[1].isRealFits, true);
  });

  it('Priority 4: Live IRSA SIA2 service query safely reports upstream reachability', async () => {
    const siaRes = await ObservationService.queryIrsaSia2(318.25, 17.65, 720);
    assert(typeof siaRes === 'object');
    assert.strictEqual(siaRes.attempted, true);
    assert(typeof siaRes.reachable === 'boolean');
    assert(typeof siaRes.message === 'string');
    assert(siaRes.message.length > 0);
  });
});
