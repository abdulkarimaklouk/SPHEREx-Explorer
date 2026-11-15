/**
 * Observation Domain Service for SPHEREx Explorer
 *
 * Implements business logic:
 * - Target resolution & preset access
 * - Spherical coordinate matching against challenge targets
 * - Chronological observation sorting verification
 */

import { MockDataProvider } from './providers/MockDataProvider.js';
import {
  validateCoordinates,
  calculateAngularSeparation,
} from '../utils/coordinates.js';

export class ObservationService {
  /**
   * Retrieves all verified preset challenge targets with chronologically sorted observations.
   * @returns {Array<object>}
   */
  static getPresetTargets() {
    const targets = MockDataProvider.loadTargets();
    return targets.map((target) => ({
      ...target,
      observations: [...(target.observations || [])].sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
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
   * Finds the closest target field matching the requested coordinates.
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
    const coverageConfigured = coverage !== null && coverage !== undefined;
    // When coverage is not configured in demonstration mock data, matches within catalog field proximity (0.5°)
    const maxMatchRadius = coverageConfigured ? coverage : 0.5;
    const isWithinCoverage = minSeparation <= maxMatchRadius;

    return {
      matched: isWithinCoverage,
      target: isWithinCoverage ? closestTarget : null,
      nearestTarget: closestTarget,
      requestedCoords: { ra, dec },
      angularOffsetDegrees: minSeparation,
      coverageConfigured,
      validation,
    };
  }
}
