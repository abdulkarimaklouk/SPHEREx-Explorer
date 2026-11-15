import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { MockDataProvider } from '../src/services/providers/MockDataProvider.js';
import { ObservationService } from '../src/services/observationService.js';
import {
  validateCoordinates,
  calculateAngularSeparation,
  formatSexagesimal,
} from '../src/utils/coordinates.js';

describe('Integration Contracts & Core Application Logic', () => {
  describe('1. Dataset Contract & Provenance Integrity', () => {
    it('loads raw targets from canonical mockTargets.json', () => {
      const rawTargets = MockDataProvider.loadTargets();
      assert.ok(Array.isArray(rawTargets), 'loadTargets must return an array');
      assert.equal(rawTargets.length, 5, 'Must contain exactly 5 challenge objects');
    });

    it('verifies that target records maintain factual catalog provenance without blanket isMock flag', () => {
      const rawTargets = MockDataProvider.loadTargets();
      for (const target of rawTargets) {
        assert.notEqual(target.isMock, true, `Target record ${target.id} must not have blanket isMock: true`);
        assert.ok(target.coordinateSource, `Target ${target.id} must document coordinateSource`);
        assert.equal(typeof target.ra, 'number', `Target ${target.id} RA must be numeric`);
        assert.equal(typeof target.dec, 'number', `Target ${target.id} Dec must be numeric`);
        assert.ok(target.ra >= 0 && target.ra < 360, `Target ${target.id} RA out of range: ${target.ra}`);
        assert.ok(target.dec >= -90 && target.dec <= 90, `Target ${target.id} Dec out of range: ${target.dec}`);
      }
    });

    it('verifies that all synthetic observation records are explicitly labeled isMock: true', () => {
      const rawTargets = MockDataProvider.loadTargets();
      for (const target of rawTargets) {
        assert.ok(Array.isArray(target.observations), `Target ${target.id} must have observations array`);
        assert.equal(target.observations.length, 4, `Target ${target.id} must have 4 observations`);

        for (let i = 0; i < target.observations.length; i++) {
          const obs = target.observations[i];
          assert.equal(obs.isMock, true, `Observation ${obs.id} must be labeled isMock: true`);
          assert.equal(obs.sequence, i + 1, `Observation sequence must be consecutive 1-indexed: got ${obs.sequence}, expected ${i + 1}`);
          assert.ok(obs.timestampUtc, `Observation ${obs.id} must have timestampUtc`);
          assert.ok(obs.imagePath || obs.imageUrl, `Observation ${obs.id} must declare imagePath or imageUrl`);
        }
      }
    });

    it('ObservationService normalizes observation properties (id, observationId, timestamp, imageUrl)', () => {
      const targets = ObservationService.getPresetTargets();
      for (const target of targets) {
        for (const obs of target.observations) {
          assert.ok(obs.id, 'obs.id must be defined');
          assert.ok(obs.observationId, 'obs.observationId must be defined');
          assert.equal(obs.id, obs.observationId, 'obs.id and obs.observationId must match');
          assert.ok(obs.timestamp, 'obs.timestamp must be defined');
          assert.ok(obs.timestampUtc, 'obs.timestampUtc must be defined');
          assert.equal(obs.timestamp, obs.timestampUtc, 'obs.timestamp and obs.timestampUtc must match');
          assert.ok(obs.imageUrl, 'obs.imageUrl must be defined');
          assert.ok(obs.imagePath, 'obs.imagePath must be defined');
          assert.equal(obs.imageUrl, obs.imagePath, 'obs.imageUrl and obs.imagePath must match');
        }
      }
    });
  });

  describe('2. Coordinate Utilities & Formatting Contracts', () => {
    it('validates RA boundary conditions (0.0 <= RA < 360.0)', () => {
      assert.equal(validateCoordinates(0.0, 0.0).isValid, true);
      assert.equal(validateCoordinates(359.9999, 0.0).isValid, true);
      assert.equal(validateCoordinates(360.0, 0.0).isValid, false);
      assert.equal(validateCoordinates(-0.0001, 0.0).isValid, false);
    });

    it('validates Dec boundary conditions (-90.0 <= Dec <= +90.0)', () => {
      assert.equal(validateCoordinates(180.0, -90.0).isValid, true);
      assert.equal(validateCoordinates(180.0, 90.0).isValid, true);
      assert.equal(validateCoordinates(180.0, -90.001).isValid, false);
      assert.equal(validateCoordinates(180.0, 90.001).isValid, false);
    });

    it('calculates angular separation with identity and antipodal accuracy', () => {
      // Identity: distance from point to itself is 0
      const dZero = calculateAngularSeparation(100.0, 25.0, 100.0, 25.0);
      assert.ok(dZero < 1e-5, `Self-distance must be zero: got ${dZero}`);

      // Antipodal points: (0, 0) and (180, 0) -> separation 180 degrees
      const dAntipodal = calculateAngularSeparation(0.0, 0.0, 180.0, 0.0);
      assert.ok(Math.abs(dAntipodal - 180.0) < 1e-4, `Antipodal separation must be 180: got ${dAntipodal}`);
    });

    it('formats sexagesimal coordinates accurately', () => {
      const { raHms, decDms } = formatSexagesimal(269.452, 4.693);
      // 269.452 deg / 15 = 17.96346667 hours -> 17h 57m 48.480s
      assert.ok(raHms.startsWith('17h 57m'), `Expected 17h 57m, got ${raHms}`);
      // +4.693 deg -> +04° 41' 34.80"
      assert.ok(decDms.startsWith('+04° 41\''), `Expected +04° 41', got ${decDms}`);
    });
  });

  describe('3. Timeline Mathematical & State Logic Contracts', () => {
    const totalFrames = 4;

    it('simulates Step Next boundary: clamps at totalFrames - 1', () => {
      const stepNextFn = (prev, total) => (prev < total - 1 ? prev + 1 : prev);

      assert.equal(stepNextFn(0, totalFrames), 1);
      assert.equal(stepNextFn(1, totalFrames), 2);
      assert.equal(stepNextFn(2, totalFrames), 3);
      assert.equal(stepNextFn(3, totalFrames), 3, 'Must clamp at final frame');
    });

    it('simulates Step Prev boundary: clamps at 0', () => {
      const stepPrevFn = (prev) => (prev > 0 ? prev - 1 : prev);

      assert.equal(stepPrevFn(3), 2);
      assert.equal(stepPrevFn(2), 1);
      assert.equal(stepPrevFn(1), 0);
      assert.equal(stepPrevFn(0), 0, 'Must clamp at index 0');
    });

    it('simulates Replay transition: if at final frame, restarts from index 0', () => {
      const replayTransition = (currIndex, total) => {
        if (currIndex >= total - 1) {
          return 0; // reset to start
        }
        return currIndex;
      };

      assert.equal(replayTransition(3, totalFrames), 0, 'At frame 3, replay starts at 0');
      assert.equal(replayTransition(1, totalFrames), 1, 'At frame 1, retains frame 1');
    });

    it('calculates progress percentage correctly across all 4 frames', () => {
      const getProgress = (index, total) => (total > 1 ? (index / (total - 1)) * 100 : 0);

      assert.equal(getProgress(0, totalFrames), 0);
      assert.ok(Math.abs(getProgress(1, totalFrames) - 33.333) < 0.01);
      assert.ok(Math.abs(getProgress(2, totalFrames) - 66.666) < 0.01);
      assert.equal(getProgress(3, totalFrames), 100);
    });
  });
});
