/**
 * Verified Astronomical Targets Data for SPHEREx Explorer
 * 2026 NASA Space Apps Challenge
 *
 * IMPORTANT DATA INTEGRITY POLICY:
 * Target identities, catalog designations, physical types, and coordinates
 * originate from peer-reviewed astronomical databases (SIMBAD, Gaia DR3, NASA/IPAC WISE, AAVSO).
 * They are factual catalog records and are NOT synthetic.
 */

export const CHALLENGE_TARGETS = [
  {
    id: 'barnards-star',
    name: "Barnard's Star",
    designation: 'GJ 699, HIP 87937, BD+04 3561a',
    constellation: 'Ophiuchus',
    objectType: 'Red Dwarf (M4.0V) / High Proper Motion Star',
    ra: 269.452,
    dec: 4.693,
    coordinateSource: 'SIMBAD / Gaia DR3 (ICRS, Epoch J2016.0)',
    description:
      'Second-closest known star system to the Sun. Famous for having the highest known proper motion of any star (~10.3 arcsec/year across the celestial sphere).',
    isCatalogVerified: true,
  },
  {
    id: 'epsilon-indi-b',
    name: 'Epsilon Indi B',
    designation: 'eps Ind B, GJ 845 B',
    constellation: 'Indus',
    objectType: 'Cold Brown Dwarf Binary System (T1 + T6)',
    ra: 330.84,
    dec: -56.79,
    coordinateSource: 'SIMBAD / IPAC (ICRS)',
    description:
      'One of the closest known brown dwarf systems to Earth, exhibiting pronounced atmospheric water vapor and methane absorption bands.',
    isCatalogVerified: true,
  },
  {
    id: 'wise-0855',
    name: 'WISE 0855',
    designation: 'WISE J085510.83-071442.5',
    constellation: 'Hydra',
    objectType: 'Sub-stellar Ultra-Cool Brown Dwarf (Y-type)',
    // Challenge reference coordinates: RA: 08h 55m 10.831s, Dec: -07d 14m 42.53s
    sexagesimalReference: '08h 55m 10.831s, -07° 14\' 42.53"',
    ra: 133.7951,
    dec: -7.2451,
    coordinateSource: 'NASA/IPAC WISE / Luhman (2014)',
    description:
      'The fourth closest system to the Sun and the coldest known sub-stellar brown dwarf outside the Solar System, with temperatures near the freezing point of water.',
    isCatalogVerified: true,
  },
  {
    id: 'rw-aurigae',
    name: 'RW Aurigae',
    designation: 'RW Aur, HD 283572',
    constellation: 'Auriga',
    objectType: 'Young Binary T Tauri Variable Star',
    ra: 77.46,
    dec: 30.4,
    coordinateSource: 'SIMBAD / Gaia DR3 (ICRS)',
    description:
      'Young pre-main-sequence binary star system exhibiting dramatic, multi-year dimming events caused by circumstellar dust occultations and tidal disruption.',
    isCatalogVerified: true,
  },
  {
    id: 'r-draconis',
    name: 'R Draconis',
    designation: 'R Dra, HD 149214',
    constellation: 'Draco',
    objectType: 'Mira-type Long-Period Pulsating Variable Star',
    ra: 248.33,
    dec: 66.75,
    coordinateSource: 'AAVSO / SIMBAD (ICRS)',
    description:
      'Classic oxygen-rich asymptotic giant branch Mira variable pulsating star undergoing extensive periodic visual brightness fluctuations over ~245 days.',
    isCatalogVerified: true,
  },
];

/**
 * Returns target by unique identifier
 * @param {string} id
 */
export function getTargetById(id) {
  return CHALLENGE_TARGETS.find((target) => target.id === id) || null;
}
