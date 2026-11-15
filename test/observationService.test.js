import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { ObservationService, EXACT_CENTER_EPSILON_DEG } from '../src/services/observationService.js';

describe('ObservationService — Coordinate Resolution & Exact Matching', () => {
  const CHALLENGE_TARGETS = [
    { id: 'barnards-star', name: "Barnard's Star", ra: 269.452, dec: 4.693 },
    { id: 'epsilon-indi-b', name: 'Epsilon Indi B', ra: 330.84, dec: -56.79 },
    { id: 'wise-0855', name: 'WISE 0855', ra: 133.7951, dec: -7.2451 },
    { id: 'rw-aurigae', name: 'RW Aurigae', ra: 77.46, dec: 30.4 },
    { id: 'r-draconis', name: 'R Draconis', ra: 248.33, dec: 66.75 },
  ];

  describe('1. Exact Catalog Center Matching (Numeric Inputs)', () => {
    for (const target of CHALLENGE_TARGETS) {
      it(`matches exact catalog center for ${target.name} (${target.id})`, () => {
        const result = ObservationService.findTargetByCoordinates(target.ra, target.dec);

        assert.equal(result.validation.isValid, true, 'Coordinates should be valid');
        assert.equal(result.matched, true, 'Exact catalog center must match');
        assert.equal(result.matchType, 'exact_center', 'Match type must be exact_center');
        assert.notEqual(result.target, null, 'Target must not be null');
        assert.equal(result.target.id, target.id, `Target ID must match ${target.id}`);
        assert.equal(result.angularOffsetDegrees, 0, 'Angular offset must be 0 for exact center');
        assert.equal(result.coverageConfigured, false, 'Field coverage should remain unconfigured/null');
      });
    }
  });

  describe('2. Exact Catalog Center Matching (String Inputs with Trailing Zeros)', () => {
    it('matches Epsilon Indi B with string coordinates and trailing zeros ("330.8400", "-56.7900")', () => {
      const result = ObservationService.findTargetByCoordinates('330.8400', '-56.7900');

      assert.equal(result.validation.isValid, true);
      assert.equal(result.matched, true);
      assert.equal(result.matchType, 'exact_center');
      assert.notEqual(result.target, null);
      assert.equal(result.target.id, 'epsilon-indi-b');
      assert.equal(result.angularOffsetDegrees, 0);
      assert.equal(result.coverageConfigured, false);
    });

    it('matches Barnard\'s Star with explicit plus sign ("+4.6930")', () => {
      const result = ObservationService.findTargetByCoordinates('269.4520', '+4.6930');

      assert.equal(result.validation.isValid, true);
      assert.equal(result.matched, true);
      assert.equal(result.matchType, 'exact_center');
      assert.notEqual(result.target, null);
      assert.equal(result.target.id, 'barnards-star');
      assert.equal(result.angularOffsetDegrees, 0);
    });
  });

  describe('3. Non-Exact Coordinates With Unconfigured Coverage (fieldCoverageDegrees: null)', () => {
    it('returns matched: false when coordinates are slightly offset from Epsilon Indi B (offset ~0.0056°)', () => {
      // 330.8500 is 0.01° in RA (~0.0056° angular separation at Dec -56.79°)
      const result = ObservationService.findTargetByCoordinates('330.8500', '-56.7900');

      assert.equal(result.validation.isValid, true);
      assert.equal(result.matched, false, 'Must not claim a match when coverage is null');
      assert.equal(result.matchType, null);
      assert.equal(result.target, null, 'Target must be null when outside match criteria');
      assert.notEqual(result.nearestTarget, null, 'Nearest target should be suggested');
      assert.equal(result.nearestTarget.id, 'epsilon-indi-b');
      assert.ok(result.angularOffsetDegrees > 0, 'Angular offset should be greater than 0');
      assert.ok(result.angularOffsetDegrees > EXACT_CENTER_EPSILON_DEG);
      assert.equal(result.coverageConfigured, false);
    });

    it('returns matched: false for coordinates far from any target (RA 10.0, Dec 10.0)', () => {
      const result = ObservationService.findTargetByCoordinates(10.0, 10.0);

      assert.equal(result.validation.isValid, true);
      assert.equal(result.matched, false);
      assert.equal(result.target, null);
      assert.notEqual(result.nearestTarget, null, 'A nearest suggestion must still be provided');
      assert.ok(result.angularOffsetDegrees > 1.0);
    });
  });

  describe('4. Input Validation & Error Handling', () => {
    it('fails validation for RA out of bounds (RA >= 360)', () => {
      const result = ObservationService.findTargetByCoordinates(365.0, 0.0);

      assert.equal(result.validation.isValid, false);
      assert.equal(result.matched, false);
      assert.equal(result.target, null);
      assert.notEqual(result.validation.raError, null);
    });

    it('fails validation for RA < 0', () => {
      const result = ObservationService.findTargetByCoordinates(-5.0, 0.0);

      assert.equal(result.validation.isValid, false);
      assert.equal(result.matched, false);
      assert.notEqual(result.validation.raError, null);
    });

    it('fails validation for Dec < -90', () => {
      const result = ObservationService.findTargetByCoordinates(180.0, -95.0);

      assert.equal(result.validation.isValid, false);
      assert.equal(result.matched, false);
      assert.notEqual(result.validation.decError, null);
    });

    it('fails validation for Dec > +90', () => {
      const result = ObservationService.findTargetByCoordinates(180.0, 95.0);

      assert.equal(result.validation.isValid, false);
      assert.equal(result.matched, false);
      assert.notEqual(result.validation.decError, null);
    });

    it('fails validation for non-numeric strings', () => {
      const result = ObservationService.findTargetByCoordinates('abc', 'xyz');

      assert.equal(result.validation.isValid, false);
      assert.equal(result.matched, false);
    });
  });

  describe('5. Target Preset Access and Observation Ordering', () => {
    it('retrieves all 5 challenge targets', () => {
      const targets = ObservationService.getPresetTargets();
      assert.equal(targets.length, 5);
      const ids = targets.map((t) => t.id);
      assert.deepEqual(ids, [
        'barnards-star',
        'epsilon-indi-b',
        'wise-0855',
        'rw-aurigae',
        'r-draconis',
      ]);
    });

    it('ensures observations are sorted chronologically', () => {
      const target = ObservationService.getTargetById('barnards-star');
      assert.notEqual(target, null);
      assert.equal(target.observations.length, 4);

      for (let i = 0; i < target.observations.length - 1; i++) {
        const t1 = new Date(target.observations[i].timestampUtc).getTime();
        const t2 = new Date(target.observations[i + 1].timestampUtc).getTime();
        assert.ok(t1 <= t2, `Observation sequence must be ascending in time: ${t1} <= ${t2}`);
      }
    });
  });
});
