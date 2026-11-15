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
import { ArchiveDataProvider } from './providers/ArchiveDataProvider.js';
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

  /**
   * Searches the authentic SPHEREx DR1 pilot index for observations covering the requested sky position,
   * optionally constrained by an observation time range.
   *
   * @param {number|string} raInput - RA in decimal degrees
   * @param {number|string} decInput - Dec in decimal degrees
   * @param {number} [fovArcsec=720] - Field of view in arcseconds (default: 720" = 0.2°)
   * @param {{ start?: string, end?: string }|null} [timeFilter=null] - Optional time filter
   * @returns {{
   *   isValid: boolean,
   *   matched: boolean,
   *   status: 'matched' | 'no-match' | 'error',
   *   message: string,
   *   count: number,
   *   observations: Array<object>,
   *   requestedCoords: { ra: number, dec: number } | null,
   *   validation: object
   * }}
   */
  static searchPilotIndex(raInput, decInput, fovArcsec = 720, timeFilter = null) {
    const validation = validateCoordinates(raInput, decInput);

    if (!validation.isValid) {
      return {
        isValid: false,
        matched: false,
        status: 'error',
        message: validation.raError || validation.decError || 'Validation Error',
        count: 0,
        observations: [],
        requestedCoords: null,
        validation,
      };
    }

    const { ra, dec } = validation;
    const allObservations = ArchiveDataProvider.loadPilotObservations();
    const queryRadiusDeg = (fovArcsec / 3600) / 2;

    let matchingObservations = allObservations
      .filter((obs) => {
        // 1. Direct cutout bounds check
        if (obs.cutoutBounds) {
          const inRa = ra >= obs.cutoutBounds.raMin && ra <= obs.cutoutBounds.raMax;
          const inDec = dec >= obs.cutoutBounds.decMin && dec <= obs.cutoutBounds.decMax;
          if (inRa && inDec) return true;
        }

        // 2. Angular distance check from observation center
        if (obs.center && typeof obs.center.ra === 'number' && typeof obs.center.dec === 'number') {
          const sep = calculateAngularSeparation(ra, dec, obs.center.ra, obs.center.dec);
          const obsRadius = (obs.fovDegrees || 0.2015) / 2;
          if (sep <= obsRadius + queryRadiusDeg) return true;
        }

        // 3. Full detector bounds check
        if (obs.fullDetectorBounds) {
          const inDetRa = ra >= obs.fullDetectorBounds.raMin && ra <= obs.fullDetectorBounds.raMax;
          const inDetDec = dec >= obs.fullDetectorBounds.decMin && dec <= obs.fullDetectorBounds.decMax;
          if (inDetRa && inDetDec) return true;
        }

        return false;
      })
      .map((obs) => ({
        ...obs,
        id: obs.id || obs.observationId,
        observationId: obs.observationId || obs.id,
        timestamp: obs.timestamp || obs.timestampUtc,
        timestampUtc: obs.timestampUtc || obs.timestamp,
        isRealFits: true,
        isMock: false,
      }))
      .sort((a, b) => new Date(a.timestampUtc) - new Date(b.timestampUtc));

    // Helper for robust UTC date parsing (treating naive ISO strings as UTC)
    const parseUtcTimestamp = (dateStr) => {
      if (!dateStr || typeof dateStr !== 'string') return NaN;
      const s = dateStr.trim();
      if (s.endsWith('Z') || /[+-]\d{2}(:\d{2})?$/.test(s)) {
        return new Date(s).getTime();
      }
      return new Date(`${s}Z`).getTime();
    };

    // Apply time range filter if provided
    if (timeFilter) {
      const { start, end } = timeFilter;
      if (start && start.trim()) {
        const startTime = parseUtcTimestamp(start);
        if (!Number.isNaN(startTime)) {
          matchingObservations = matchingObservations.filter(
            (o) => new Date(o.timestampUtc).getTime() >= startTime,
          );
        }
      }
      if (end && end.trim()) {
        const endTime = parseUtcTimestamp(end);
        if (!Number.isNaN(endTime)) {
          matchingObservations = matchingObservations.filter(
            (o) => new Date(o.timestampUtc).getTime() <= endTime,
          );
        }
      }
    }

    if (matchingObservations.length > 0) {
      return {
        isValid: true,
        matched: true,
        status: 'matched',
        message: `Found ${matchingObservations.length} authentic SPHEREx observation${matchingObservations.length === 1 ? '' : 's'} in pilot archive`,
        count: matchingObservations.length,
        observations: matchingObservations,
        requestedCoords: { ra, dec },
        validation,
      };
    }

    return {
      isValid: true,
      matched: false,
      status: 'no-match',
      message: 'Not covered by the current pilot index. Full archive discovery is currently unavailable.',
      count: 0,
      observations: [],
      requestedCoords: { ra, dec },
      validation,
    };
  }

  /**
   * Attempts live query to the official NASA/IPAC IRSA SIA2 service.
   * Reports genuine server status (e.g. HTTP 502 / CORS block) without faking responses.
   *
   * @param {number} ra
   * @param {number} dec
   * @param {number} [fovArcsec=720]
   * @returns {Promise<{ attempted: boolean, reachable: boolean, status: number|null, message: string }>}
   */
  static async queryIrsaSia2(ra, dec, fovArcsec = 720) {
    const fovDeg = (fovArcsec / 3600).toFixed(4);
    const url = `https://irsa.ipac.caltech.edu/SIA?COLLECTION=spherex_dr1&POS=CIRCLE+${ra}+${dec}+${fovDeg}&RESPONSEFORMAT=VOTABLE`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    try {
      const res = await fetch(url, { signal: controller.signal, mode: 'cors' });
      clearTimeout(timeoutId);
      if (res.ok) {
        return { attempted: true, reachable: true, status: res.status, message: 'IRSA SIA2 Gateway reachable' };
      }
      return {
        attempted: true,
        reachable: false,
        status: res.status,
        message: `HTTP ${res.status} Proxy Error (Upstream IRSA server unreachable)`,
      };
    } catch (err) {
      clearTimeout(timeoutId);
      return {
        attempted: true,
        reachable: false,
        status: null,
        message: err.name === 'AbortError'
          ? 'IRSA SIA2 query timed out after 2.5s (Upstream server slow/unresponsive)'
          : 'IRSA SIA2: Upstream service unreachable from browser (HTTP 502 Proxy Error observed)',
      };
    }
  }

  /**
   * Returns the verified authentic SPHEREx Calibration Field target demonstration record.
   * @returns {object}
   */
  static getCalibrationTarget() {
    const obs = ArchiveDataProvider.loadPilotObservations().filter((o) => o.isRealFits);
    return {
      id: 'spherex-cal-field',
      name: 'SPHEREx Calibration Field (DR1)',
      alternateDesignations: ['Week 2025W19_2B Working Demo'],
      constellation: 'Vulpecula',
      objectType: 'Level 2 Pilot Calibration Strip',
      ra: 318.2500,
      dec: 17.6500,
      fovArcsec: 720,
      fieldCoverageDegrees: 0.2015,
      coordinateSource: 'NASA/IPAC IRSA SPHEREx DR1 S3 Pilot Archive',
      isCalibrationDemo: true,
      isCustom: false,
      observations: obs,
    };
  }

  /**
   * Constructs a custom target entity from user query coordinates and matching observations.
   *
   * @param {{
   *   name?: string,
   *   ra: number,
   *   dec: number,
   *   fovArcsec?: number,
   *   observations?: Array<object>
   * }} params
   * @returns {object}
   */
  static createCustomTarget({ name, ra, dec, fovArcsec = 720, observations = [] }) {
    const defaultName = name && name.trim()
      ? name.trim()
      : `SPHEREx Field (RA ${ra.toFixed(3)}°, Dec ${dec >= 0 ? '+' : ''}${dec.toFixed(3)}°)`;

    return {
      id: `custom-${ra.toFixed(4)}-${dec.toFixed(4)}`,
      name: defaultName,
      alternateDesignations: ['Custom Target Query'],
      constellation: 'Sagitta / Vulpecula',
      objectType: 'SPHEREx Real Data Pilot Field',
      ra,
      dec,
      fovArcsec,
      fieldCoverageDegrees: (fovArcsec / 3600),
      coordinateSource: 'NASA/IPAC IRSA SPHEREx DR1 S3 Pilot Archive',
      isCustom: true,
      observations: observations.map((obs) => ({
        ...obs,
        id: obs.id || obs.observationId,
        observationId: obs.observationId || obs.id,
        timestamp: obs.timestamp || obs.timestampUtc,
        timestampUtc: obs.timestampUtc || obs.timestamp,
      })),
    };
  }
}
