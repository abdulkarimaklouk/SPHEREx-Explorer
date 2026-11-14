# Data Sources & Target Provenance — SPHEREx Explorer

**Project**: SPHEREx Explorer
**Challenge**: 2026 NASA Space Apps Challenge
**Status**: Provenance Baseline (Phase 2 Finalized)
**Last Updated**: 2026-11-14

---

## 1. Verified Astronomical Provenance for the Five Challenge Objects

To protect scientific integrity, astronomical target identities and sky coordinates must **never be fabricated**. Factual coordinates and classifications are sourced from peer-reviewed astronomical catalogs:

| Challenge Object | Catalog Designation | Constellation | Object Type | Catalog Reference Source |
| :--- | :--- | :--- | :--- | :--- |
| **Barnard's Star** | GJ 699, HIP 87937, BD+04 3561a | Ophiuchus | Red Dwarf (M4.0V) / High Proper Motion | [SIMBAD / Gaia DR3](http://simbad.u-strasbg.fr/simbad/sim-id?Ident=Barnard%27s+star) |
| **Epsilon Indi B** | eps Ind B, GJ 845 B | Indus | Cold Brown Dwarf Binary (T1 + T6) | [SIMBAD / IPAC](http://simbad.u-strasbg.fr/simbad/sim-id?Ident=eps+Ind+B) |
| **WISE 0855** | WISE J085510.83−071442.5 | Hydra | Ultra-Cool Sub-stellar Brown Dwarf (Y-type) | [NASA/IPAC WISE / Luhman (2014)](https://irsa.ipac.caltech.edu/) |
| **RW Aurigae** | RW Aur, HD 283572 | Auriga | Young Binary T Tauri Variable Star | [SIMBAD / Gaia DR3](http://simbad.u-strasbg.fr/simbad/sim-id?Ident=RW+Aur) |
| **R Draconis** | R Dra, HD 149214 | Draco | Mira-type Long-Period Pulsating Variable | [AAVSO / SIMBAD](http://simbad.u-strasbg.fr/simbad/sim-id?Ident=R+Dra) |

> [!IMPORTANT]
> **Data Integrity Boundary**:
> - **Verified Catalog Data**: Object names, physical classifications, and catalog coordinates (RA and Dec) are factual astronomical data sourced from the references above. They are **not** marked as synthetic.
> - **Synthetic Observation Data**: The demonstration sky images, observation timestamps, sequence numbers, and mock field coverage are synthetic demonstration assets and **must always be explicitly labeled as MOCK**.

---

## 2. Official SPHEREx Mission References

1. **NASA SPHEREx Mission Overview**:
   [https://www.nasa.gov/mission/spherex/](https://www.nasa.gov/mission/spherex/)
   Primary mission objectives: mapping the large-scale structure of the universe, measuring cosmic light, and surveying biogenic ices.

2. **Caltech / JPL SPHEREx Instrument Site**:
   [https://spherex.caltech.edu/](https://spherex.caltech.edu/)
   Instrument architecture, telescope design, and scientific working groups.

3. **NASA/IPAC Infrared Science Archive (IRSA)**:
   [https://irsa.ipac.caltech.edu/](https://irsa.ipac.caltech.edu/)
   Official archival center for future SPHEREx public science data releases.

---

## 3. Mock Data Policy & Attribution Guidelines

1. **Transparent Labeling**: Every synthetic image and observation sequence must carry prominent `MOCK DATA` indicators in code (`"isMock": true`) and in the user interface.
2. **No False Attribution**: Under no circumstances shall mock demonstration graphics be presented as authentic SPHEREx observatory observations.
3. **No Fabricated Telemetry**: In the MVP, the application does not simulate detector temperatures, instrument telemetry, or exposure times.
4. **Coordinate Transparency**: When matching user coordinates against a mock field, the interface must explicitly display both the user's requested coordinates and the catalog center coordinates.
