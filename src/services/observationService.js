/**
 * Observation Domain Service for SPHEREx Explorer
 *
 * Implements business logic:
 * - Target resolution & preset access
 * - Spherical coordinate matching within explicit field coverage boundaries
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
   * Finds the closest target field matching the requested coordinates within field coverage boundaries.
   *
   * @param {number|string} raInput - RA in decimal degrees
   * @param {number|string} decInput - Dec in decimal degrees
   * @returns {{
   *   matched: boolean,
   *   target: object|null,
   *   requestedCoords: { ra: number, dec: number }|null,
   *   angularOffsetDegrees: number|null,
   *   validation: { isValid: boolean, raError: string|null, decError: string|null }
   * }}
   */
  static findTargetByCoordinates(raInput, decInput) {
    const validation = validateCoordinates(raInput, decInput);

    if (!validation.isValid) {
      return {
        matched: false,
        target: null,
        requestedCoords: null,
        angularOffsetDegrees: null,
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

    const coverage = closestTarget ? closestTarget.fieldCoverageDegrees || 1.0 : 1.0;
    const isWithinCoverage = minSeparation <= coverage;

    return {
      matched: isWithinCoverage,
      target: isWithinCoverage ? closestTarget : null,
      nearestTarget: closestTarget,
      requestedCoords: { ra, dec },
      angularOffsetDegrees: minSeparation,
      validation,
    };
  }
}
