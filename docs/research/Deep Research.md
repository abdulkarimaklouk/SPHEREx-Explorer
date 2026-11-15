# SPHEREx Deep Scientific Research Synthesis Report

**Project**: SPHEREx Explorer  
**Event**: 2026 NASA Space Apps Challenge  
**Document Version**: 1.0.0  
**Last Verified**: 2026-11-15  
**Research Lead**: Senior Scientific Software Architect & Astronomy Data Lead  

---

## 1. Executive Summary

This synthesis report integrates deep research findings, official NASA/IPAC IRSA documentation, scientific tutorials, and comparative astronomical tools into the permanent architecture of **SPHEREx Explorer**.

The research transitions the project from a synthetic demonstration prototype toward an authentic scientific explorer capable of ingesting and visualizing real SPHEREx Level 2 Multi-Extension FITS (MEF) spectral images.

### Canonical Research Suite:
- **[Permanent Source Registry](file:///c:/Users/Star/Desktop/nasa/docs/research/SOURCE_REGISTRY.md)**: Catalog of 17+ official NASA/IPAC, ESA Gaia, and Canadian Space Agency resources with usage rules.
- **[SPHEREx FITS Technical Guide](file:///c:/Users/Star/Desktop/nasa/docs/research/SPHEREX_FITS_GUIDE.md)**: Multi-Extension FITS architecture (6 HDUs), WCS spatial/spectral coordinate transformations, physical units ($\text{MJy/sr}$), and data flags.
- **[IRSA Archive Access Guide](file:///c:/Users/Star/Desktop/nasa/docs/research/IRSA_ARCHIVE_ACCESS.md)**: Protocols for SIA2, TAP/ADQL, IBE, Cutout Tool, and AWS S3 direct cloud streaming.
- **[Data Ingestion Architecture Analysis](file:///c:/Users/Star/Desktop/nasa/docs/research/DATA_INGESTION_ARCHITECTURE.md)**: Comparative evaluation of Options A (Browser Upload), B (Direct IRSA API), and C (Python Preprocessing Pipeline), defining the 12-step real-data workflow and scientific boundaries.
- **[WiseView Interaction Analysis](file:///c:/Users/Star/Desktop/nasa/docs/research/WISEVIEW_INTERACTION_ANALYSIS.md)**: UX analysis of multi-epoch blinking, motion dipoles, and difference imaging from Backyard Worlds: Planet 9.
- **[Real Data Implementation Roadmap](file:///c:/Users/Star/Desktop/nasa/docs/research/REAL_DATA_IMPLEMENTATION_ROADMAP.md)**: Phased execution plan (Phase A through Phase I) prioritizing a single authentic FITS observation spike (TASK-602) before multi-target expansion.

---

## 2. Key Scientific Findings & Architectural Guardrails

### 2.1 The Fundamental Distinction: Spectral Channels vs. Observation Epochs
> [!CAUTION]
> **The 102 spectral channels must NEVER be confused with 102 observation epochs!**
> - **Spatial Coordinates ($\alpha, \delta$)**: Celestial sky coordinates (ICRS J2000).
> - **Spectral Wavelength Coordinates ($\lambda, \Delta\lambda$)**: Near-infrared wavelength (0.75 µm to 5.00 µm) determined by the Linear Variable Filter (LVF) position at each detector pixel across 6 bands.
> - **Observation Time ($t$)**: Physical UTC exposure timestamp. SPHEREx completes an all-sky pass every 6 months (~4 epochs over a 2-year nominal mission).

### 2.2 Multi-Extension FITS (MEF) Structure
Each SPHEREx Level 2 Spectral Image comprises 6 HDUs:
1. `PRIMARY` (HDU 0): Observation metadata, pointing, exposure time (`NAXIS = 0`).
2. `IMAGE` (HDU 1): Calibrated surface brightness in **$\text{MJy/sr}$** ($2040 \times 2040$).
3. `FLAGS` (HDU 2): Data quality bitmask (dead pixels, saturation, cosmic ray snowballs).
4. `VARIANCE` (HDU 3): Per-pixel variance in **$(\text{MJy/sr})^2$**.
5. `ZODI` (HDU 4): Zodiacal light model foreground in **$\text{MJy/sr}$**.
6. `EPSF` (HDU 5): Oversampled empirical Point Spread Function grid cube ($21 \times 21$ or $11 \times 41$).
7. `WCS-WAVE` (HDU 6): Binary lookup table mapping pixels to nominal central wavelength and bandwidth via FITS `WAVE-TAB`.

### 2.3 Pixel-Level Spectral Lookup vs. Source Spectrophotometry
- `WCS-WAVE` gives the nominal wavelength passing through the LVF at that specific detector pixel. It is intended for **quick-look interactive visualization**, not publication-grade spectrophotometry.
- A single exposure yields only one photometric measurement for a celestial object.
- Measuring a full 102-point spectrum requires combining multiple exposures where the target lands on different filter positions across all six detector arrays.

### 2.4 Ingestion Architecture Recommendation
- **Primary Operational Baseline (Option C)**: An automated Python preprocessing pipeline using `astropy` and `astroquery` fetches authentic FITS cutouts, extracts WCS/spectral metadata into a structured manifest, and generates optimized WebP/PNG display graphics while preserving raw FITS cutouts in `public/fits/`.
- **Why**: Eliminates browser CORS failures, guarantees sub-50ms dashboard loading, functions 100% offline, and maintains gold-standard Astropy scientific accuracy without adding backend server infrastructure.

---

## 3. Governance Decisions Recorded

- **ADR-013**: SPHEREx Real Data Ingestion & Preprocessing Architecture (Hybrid Option C core + Option A future dropzone; Option B deferred).
- **ADR-014**: Strict Distinction Between 102 Spectral Channels and Multi-Epoch Observation Time Series.
