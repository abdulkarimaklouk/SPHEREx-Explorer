/**
 * Observation Domain Service for SPHEREx Explorer
 *
 * Implements business logic:
 * - Target resolution & preset access
 * - Exact catalog-center coordinate matching
 * - Explicit field coverage boundary matching
 * - Chronological observation sorting verification
 */

import { MockDataProvider } from './providers/MockDataProvider.js';
import {
  validateCoordinates,
  calculateAngularSeparation,
} from '../utils/coordinates.js';

/**
 * Numerical floating-point epsilon for exact catalog-center matching.
 * Value: 0.0001 degrees (~0.36 arcseconds).
 *
 * POLICY (TASK-501.1):
 * This epsilon accounts strictly for IEEE 754 floating-point rounding in
 * spherical trigonometric functions (Math.sin, Math.cos, Math.acos) and
 * parsed string-to-float conversions. It is NOT an astronomical field coverage
 * radius or search tolerance.
 */
export const EXACT_CENTER_EPSILON_DEG = 0.0001;

export class ObservationService {
  /**
   * Retrieves all verified preset challenge targets with chronologically sorted observations.
   * Normalizes observation fields to support both observationId and id, timestampUtc and timestamp.
   * @returns {Array<object>}
   */
  static getPresetTargets() {
    const targets = MockDataProvider.loadTargets();
    return targets.map((target) => ({
      ...target,
      observations: [...(target.observations || [])]
        .map((obs) => ({
          ...obs,
          id: obs.id || obs.observationId,
          observationId: obs.observationId || obs.id,
          timestamp: obs.timestamp || obs.timestampUtc,
          timestampUtc: obs.timestampUtc || obs.timestamp,
          imageUrl: obs.imageUrl || obs.imagePath,
          imagePath: obs.imagePath || obs.imageUrl,
        }))
        .sort(
          (a, b) => new Date(a.timestampUtc) - new Date(b.timestampUtc),
        ),
    }));
  }

  /**
   * Looks up a target by its unique identifier.
   * @param {string} targetId
   * @returns {object|null}
   */
  static getTargetById(targetId) {
    const targets = this.getPresetTargets();
    return targets.find((t) => t.id === targetId) || null;
  }

  /**
   * Evaluates requested celestial coordinates against challenge targets using the
   * following strict resolution order (TASK-501.1):
   *
   * 1. Validate RA and Dec boundaries.
   * 2. Calculate angular separation against available catalog targets.
   * 3. Check whether requested coordinates exactly match a target's catalog center.
   * 4. If an exact center match exists, return a successful exact-coordinate match (offset = 0).
   * 5. If no exact match exists, evaluate explicitly configured field coverage.
   * 6. If coverage is null or unavailable, do not claim a valid field match (matched = false).
   * 7. Return the nearest target only as a suggestion.
   *
   * @param {number|string} raInput - RA in decimal degrees
   * @param {number|string} decInput - Dec in decimal degrees
   * @returns {{
   *   matched: boolean,
   *   matchType: 'exact_center' | 'field_coverage' | null,
   *   target: object|null,
   *   nearestTarget: object|null,
   *   requestedCoords: { ra: number, dec: number }|null,
   *   angularOffsetDegrees: number|null,
   *   coverageConfigured: boolean,
   *   validation: { isValid: boolean, raError: string|null, decError: string|null }
   * }}
   */
  static findTargetByCoordinates(raInput, decInput) {
    // 1. Validate RA and Dec
    const validation = validateCoordinates(raInput, decInput);

    if (!validation.isValid) {
      return {
        matched: false,
        matchType: null,
        target: null,
        nearestTarget: null,
        requestedCoords: null,
        angularOffsetDegrees: null,
        coverageConfigured: false,
        validation,
      };
    }

    const { ra, dec } = validation;
    const targets = this.getPresetTargets();

    // 2. Calculate angular separation against available catalog targets
    let closestTarget = null;
    let minSeparation = Infinity;

    for (const target of targets) {
      const separation = calculateAngularSeparation(
        ra,
        dec,
        target.ra,
        target.dec,
      );

      if (separation < minSeparation) {
        minSeparation = separation;
        closestTarget = target;
      }
    }

    if (!closestTarget) {
      return {
        matched: false,
        matchType: null,
        target: null,
        nearestTarget: null,
        requestedCoords: { ra, dec },
        angularOffsetDegrees: null,
        coverageConfigured: false,
        validation,
      };
    }

    // 3. Check whether the requested coordinates exactly match a target's catalog center
    const raDiff = Math.abs(ra - closestTarget.ra);
    const normalizedRaDiff = Math.min(raDiff, 360 - raDiff);
    const decDiff = Math.abs(dec - closestTarget.dec);

    const isExactCenterMatch =
      minSeparation <= EXACT_CENTER_EPSILON_DEG ||
      (normalizedRaDiff <= EXACT_CENTER_EPSILON_DEG && decDiff <= EXACT_CENTER_EPSILON_DEG);

    // 4. If an exact center match exists, return a successful exact-coordinate match
    if (isExactCenterMatch) {
      const coverage = closestTarget.fieldCoverageDegrees;
      const coverageConfigured =
        coverage !== null && coverage !== undefined && typeof coverage === 'number';

      return {
        matched: true,
        matchType: 'exact_center',
        target: closestTarget,
        nearestTarget: closestTarget,
        requestedCoords: { ra, dec },
        angularOffsetDegrees: 0, // Formatted as exactly zero for catalog center match
        coverageConfigured,
        validation,
      };
    }

    // 5. If no exact match exists, evaluate explicitly configured field coverage
    const coverage = closestTarget.fieldCoverageDegrees;
    const coverageConfigured =
      coverage !== null && coverage !== undefined && typeof coverage === 'number';

    const isWithinCoverage = coverageConfigured && minSeparation <= coverage;

    if (isWithinCoverage) {
      return {
        matched: true,
        matchType: 'field_coverage',
        target: closestTarget,
        nearestTarget: closestTarget,
        requestedCoords: { ra, dec },
        angularOffsetDegrees: minSeparation,
        coverageConfigured: true,
        validation,
      };
    }

    // 6. If coverage is null or unavailable, do not claim a valid field match
    // 7. Return the nearest target only as a suggestion
    return {
      matched: false,
      matchType: null,
      target: null,
      nearestTarget: closestTarget, // Suggestion only
      requestedCoords: { ra, dec },
      angularOffsetDegrees: minSeparation,
      coverageConfigured,
      validation,
    };
  }
}
