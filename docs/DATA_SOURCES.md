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

## 2. Official SPHEREx Mission References & Scientific Source Registry

For complete technical specifications, access protocols, and tutorial references, consult the canonical **[SPHEREx Source Registry](file:///c:/Users/Star/Desktop/nasa/docs/research/SOURCE_REGISTRY.md)**.

Key primary official archives:
1. **NASA/IPAC Infrared Science Archive (IRSA) — SPHEREx Home**:
   [https://irsa.ipac.caltech.edu/Missions/spherex.html](https://irsa.ipac.caltech.edu/Missions/spherex.html)
   Official archive center serving public SPHEREx data releases (DR1, QR3), spectral images, and all-sky cubes.

2. **SPHEREx Data Explorer Interactive Application**:
   [https://irsa.ipac.caltech.edu/applications/spherex](https://irsa.ipac.caltech.edu/applications/spherex)
   Web-based interactive tool for searching, viewing, and extracting cutouts from SPHEREx Spectral Images.

3. **SPHEREx Tutorial Notebook Suite (Caltech-IPAC)**:
   [https://caltech-ipac.github.io/irsa-tutorials/](https://caltech-ipac.github.io/irsa-tutorials/)
   Official interactive tutorials including `spherex-intro`, `spherex-cutouts`, `spherex-psf`, `spherex-source-discovery-tool-demo`, `spherex-mosaic`, and `spherex-hipscube`.

4. **Comparative & Astrometric References**:
   - **Gaia DR3** ([https://archive.stsci.edu/missions-and-data/gaia](https://archive.stsci.edu/missions-and-data/gaia)): Astrometric coordinates, parallaxes, and proper motions (Epoch J2016.0).
   - **WiseView** ([http://byw.tools/wiseview](http://byw.tools/wiseview)): Interaction design inspiration for multi-epoch blinking and motion comparison (*WiseView does NOT host SPHEREx data*).
   - **CSA NEOSSat / CADC** ([https://www.asc-csa.gc.ca/eng/satellites/neossat/](https://www.asc-csa.gc.ca/eng/satellites/neossat/)): Comparative partner reference for orbital time-series FITS archives (*does not host SPHEREx data*).

---

## 3. Mock Data Policy & Attribution Guidelines

1. **Transparent Labeling**: Every synthetic image and observation sequence must carry prominent `MOCK DATA` indicators in code (`"isMock": true`) and in the user interface.
2. **No False Attribution**: Under no circumstances shall mock demonstration graphics be presented as authentic SPHEREx observatory observations.
3. **No Fabricated Telemetry**: In the MVP, the application does not simulate detector temperatures, instrument telemetry, or exposure times.
4. **Coordinate Transparency**: When matching user coordinates against a mock field, the interface must explicitly display both the user's requested coordinates and the catalog center coordinates.
