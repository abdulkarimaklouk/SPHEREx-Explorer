/**
 * Observation Domain Service for SPHEREx Explorer
 *
 * Implements business logic:
 * - Target resolution & preset access
 * - Spherical coordinate matching against challenge targets
 * - Chronological observation sorting verification
 *
 * COORDINATE COVERAGE POLICY (TASK-304.1):
 * - A valid mock field match strictly requires an explicitly configured coverage boundary.
 * - If coverage is unconfigured (null), field matching remains unavailable (matched: false).
 * - No universal or arbitrary fallback radius is permitted.
 * - Closest target is returned solely as a suggestion (nearestTarget).
 */

import { MockDataProvider } from './providers/MockDataProvider.js';
import {
  validateCoordinates,
  calculateAngularSeparation,
} from '../utils/coordinates.js';

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
   * Evaluates requested celestial coordinates against challenge targets.
   * Enforces strict coverage policy: matches only when an explicit coverage
   * boundary is configured on the target.
   *
   * @param {number|string} raInput - RA in decimal degrees
   * @param {number|string} decInput - Dec in decimal degrees
   * @returns {{
   *   matched: boolean,
   *   target: object|null,
   *   nearestTarget: object|null,
   *   requestedCoords: { ra: number, dec: number }|null,
   *   angularOffsetDegrees: number|null,
   *   coverageConfigured: boolean,
   *   validation: { isValid: boolean, raError: string|null, decError: string|null }
   * }}
   */
  static findTargetByCoordinates(raInput, decInput) {
    const validation = validateCoordinates(raInput, decInput);

    if (!validation.isValid) {
      return {
        matched: false,
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

    const coverage = closestTarget ? closestTarget.fieldCoverageDegrees : null;
    const coverageConfigured =
      coverage !== null && coverage !== undefined && typeof coverage === 'number';

    // Strict coverage matching:
    // Only match if coverage is explicitly configured AND angular separation is within that coverage.
    // Unconfigured coverage remains unavailable (matched = false).
    const isWithinCoverage = coverageConfigured && minSeparation <= coverage;

    return {
      matched: isWithinCoverage,
      target: isWithinCoverage ? closestTarget : null,
      nearestTarget: closestTarget, // Returned only as a suggestion
      requestedCoords: { ra, dec },
      angularOffsetDegrees: minSeparation,
      coverageConfigured,
      validation,
    };
  }
}
