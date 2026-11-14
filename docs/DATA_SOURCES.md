# Data Sources & Provenance — SPHEREx Explorer

**Project**: SPHEREx Explorer  
**Challenge**: 2026 NASA Space Apps Challenge  
**Status**: Provenance & Reference Standards  
**Last Updated**: 2026-11-14  

---

## 1. Official Mission References

The SPHEREx Explorer project is inspired by and aligned with NASA's SPHEREx mission. Official public resources include:

1. **NASA Mission Page**:  
   [https://www.nasa.gov/mission/spherex/](https://www.nasa.gov/mission/spherex/)  
   Overview of mission goals, launch timeline, instrument architecture, and science themes.

2. **Caltech / JPL SPHEREx Project Site**:  
   [https://spherex.caltech.edu/](https://spherex.caltech.edu/)  
   Detailed instrument parameters, survey strategy, and science working groups.

3. **NASA/IPAC Infrared Science Archive (IRSA)**:  
   [https://irsa.ipac.caltech.edu/](https://irsa.ipac.caltech.edu/)  
   The designated repository and distribution center for future SPHEREx public science data releases.

---

## 2. Current Data Provenance & Mock Data Policy

### Current Phase (Phase 1 / Inception)
- **All observation datasets, celestial coordinates, timestamps, and sky images used in this project are 100% synthetic MOCK DATA**.
- Mock imagery is generated or sourced solely for client interface demonstration and must never be depicted as genuine mission science products.
- Mock datasets are stored locally under `src/data/` in JSON format.
- Demonstration image assets are stored locally under `public/images/demo/`.

### Provenance Rules
1. **Explicit Tagging**: All mock data records in code and JSON must contain `"isMock": true`.
2. **Clear Attribution**: Demonstrations, screenshots, and visual outputs must feature a visible `MOCK DATA ONLY` banner.
3. **No Fabrication of Scientific Findings**: The application will not claim detections of cosmic water ice, galaxy redshifts, or primordial non-Gaussianity based on mock data.

---

## 3. Future Real Data Integration Considerations

Should future milestones expand SPHEREx Explorer to connect to live or archived mission data:
- Data must be accessed through authenticated or public NASA/IPAC endpoints (e.g., IRSA TAP/VO services).
- FITS format handling or client-side HiPS (Hierarchical Progressive Surveys) rendering libraries must be evaluated.
- Provenance metadata (Data Release version, processing pipeline level, observation DOI) must be preserved and rendered in the observation metadata panel.

---

## 4. Items Requiring Confirmation

> [!NOTE]
> 1. Confirmation of potential IRSA public API or mock API endpoint availability during later challenge phases [Requires Confirmation].
> 2. Specific licensing attribution for third-party astronomical illustration assets utilized as demo mock images [Requires Confirmation].
