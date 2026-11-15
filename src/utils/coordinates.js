/**
 * Astronomical coordinate utilities for SPHEREx Explorer
 * Equatorial Coordinate System (ICRS / J2000)
 */

/**
 * Validates Right Ascension (RA) and Declination (Dec) in decimal degrees.
 * Scientific bounds:
 *   0.0 <= RA < 360.0
 * -90.0 <= Dec <= +90.0
 *
 * @param {string|number} ra
 * @param {string|number} dec
 * @returns {{ isValid: boolean, raError: string|null, decError: string|null }}
 */
export function validateCoordinates(ra, dec) {
  let raError = null;
  let decError = null;

  const raNum = parseFloat(ra);
  const decNum = parseFloat(dec);

  if (ra === '' || ra === null || ra === undefined || isNaN(raNum)) {
    raError = 'Right Ascension is required and must be a number.';
  } else if (raNum < 0 || raNum >= 360) {
    raError = 'Right Ascension must be between 0.0° and 359.9999°.';
  }

  if (dec === '' || dec === null || dec === undefined || isNaN(decNum)) {
    decError = 'Declination is required and must be a number.';
  } else if (decNum < -90 || decNum > 90) {
    decError = 'Declination must be between -90.0° and +90.0°.';
  }

  return {
    isValid: raError === null && decError === null,
    raError,
    decError,
    ra: isNaN(raNum) ? null : raNum,
    dec: isNaN(decNum) ? null : decNum,
  };
}

/**
 * Calculates great-circle angular separation in degrees between two celestial points
 * using the spherical law of cosines.
 *
 * @param {number} ra1 - Point 1 RA in decimal degrees
 * @param {number} dec1 - Point 1 Dec in decimal degrees
 * @param {number} ra2 - Point 2 RA in decimal degrees
 * @param {number} dec2 - Point 2 Dec in decimal degrees
 * @returns {number} Angular separation in decimal degrees
 */
export function calculateAngularSeparation(ra1, dec1, ra2, dec2) {
  const toRad = Math.PI / 180;
  const toDeg = 180 / Math.PI;

  const phi1 = dec1 * toRad;
  const phi2 = dec2 * toRad;
  const deltaLambda = (ra1 - ra2) * toRad;

  const cosD =
    Math.sin(phi1) * Math.sin(phi2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);

  // Clamp to avoid numerical floating-point inaccuracies outside [-1, 1]
  const clampedCosD = Math.max(-1, Math.min(1, cosD));
  return Math.acos(clampedCosD) * toDeg;
}

/**
 * Converts decimal degrees to formatted sexagesimal strings.
 *
 * @param {number} raDeg
 * @param {number} decDeg
 * @returns {{ raHms: string, decDms: string }}
 */
export function formatSexagesimal(raDeg, decDeg) {
  // RA: degrees to hours (1h = 15 deg)
  const totalHours = raDeg / 15;
  const h = Math.floor(totalHours);
  const m = Math.floor((totalHours - h) * 60);
  const s = ((totalHours - h) * 60 - m) * 60;
  const raHms = `${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${s.toFixed(3)}s`;

  // Dec: degrees, arcminutes, arcseconds
  const sign = decDeg < 0 ? '-' : '+';
  const absDec = Math.abs(decDeg);
  const d = Math.floor(absDec);
  const arcmin = Math.floor((absDec - d) * 60);
  const arcsec = ((absDec - d) * 60 - arcmin) * 60;
  const decDms = `${sign}${String(d).padStart(2, '0')}° ${String(arcmin).padStart(2, '0')}' ${arcsec.toFixed(2)}"`;

  return { raHms, decDms };
}
