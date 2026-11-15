# SPHEREx Explorer — Permanent Scientific Source Registry

**Project**: SPHEREx Explorer  
**Event**: 2026 NASA Space Apps Challenge  
**Document Version**: 1.0.0  
**Last Verified**: 2026-11-15  
**Maintainer**: SPHEREx Explorer Science & Architecture Team  

---

## 1. Overview and Registry Governance

This document establishes the canonical registry of official mission documents, technical tutorials, astronomical catalogs, and comparative software references supporting the development of **SPHEREx Explorer**. 

### Governance Rules:
1. **Source Provenance**: Every scientific claim, data structure definition, coordinate transformation, and archive query pattern used in SPHEREx Explorer must trace directly to a verified entry in this registry.
2. **Category Separation**: Official mission documentation and archive data providers must never be conflated with third-party visualization tools or external satellite archives.
3. **Tutorial Distinction**: Tutorial example values (e.g. temporary filenames, test coordinates, demonstration cutouts) must not be treated as universal mission product specifications.
4. **Time Sensitivity**: Release identifiers, table schemas, and API URLs must record their verification date and be re-verified against official NASA/IPAC IRSA releases.

---

## 2. Official NASA / IPAC IRSA Mission & Archive Documentation

| Attribute | Specification |
| :--- | :--- |
| **Source Name** | **NASA/IPAC Infrared Science Archive — SPHEREx Mission Home** |
| **Official URL** | [https://irsa.ipac.caltech.edu/Missions/spherex.html](https://irsa.ipac.caltech.edu/Missions/spherex.html) |
| **Responsible Organization** | NASA / Caltech-IPAC / Jet Propulsion Laboratory (JPL) |
| **Category** | Official Mission Archive |
| **Scientific Purpose** | Central mission gateway describing SPHEREx all-sky spectral survey parameters, survey strategy, cadence, and data release schedules. |
| **Reliability Level** | Level 1 — Authoritative Primary Source |
| **Relevant Document Section** | Mission Overview, Survey Cadence, Instrument Specifications. |
| **Planned Project Usage** | Establishes top-level mission context, 6-month all-sky survey cadence, wavelength coverage (0.75–5.00 µm), and 20 cm telescope parameters. |
| **Last Verified** | 2026-11-15 |
| **Acknowledgement Requirements** | Standard NASA/IPAC IRSA acknowledgement: *"This research has made use of the NASA/IPAC Infrared Science Archive, which is funded by the National Aeronautics and Space Administration and operated by the California Institute of Technology."* |

---

| Attribute | Specification |
| :--- | :--- |
| **Source Name** | **SPHEREx Data Explorer Web Application** |
| **Official URL** | [https://irsa.ipac.caltech.edu/applications/spherex](https://irsa.ipac.caltech.edu/applications/spherex) |
| **Responsible Organization** | Caltech-IPAC (Infrared Processing and Analysis Center) |
| **Category** | Official Interactive Archive Interface |
| **Scientific Purpose** | Interactive Firefly-powered web tool for searching, viewing, filtering, and extracting cutouts from SPHEREx Spectral Images and Catalogs. |
| **Reliability Level** | Level 1 — Authoritative Primary Source |
| **Relevant Document Section** | Spectral Image Search tab, Cutout extraction tool, interactive spectral visualization. |
| **Planned Project Usage** | Reference standard for UI search behavior, cutout framing, coordinate input validation, and interactive image presentation. |
| **Last Verified** | 2026-11-15 |
| **Acknowledgement Requirements** | Reference IPAC Firefly framework and SPHEREx Data Explorer service. |

---

| Attribute | Specification |
| :--- | :--- |
| **Source Name** | **SPHEREx Data Release 1 (DR1) Documentation** |
| **Official URL** | [https://irsa.ipac.caltech.edu/data/SPHEREx/docs/overview_dr1.html](https://irsa.ipac.caltech.edu/data/SPHEREx/docs/overview_dr1.html) |
| **Responsible Organization** | Caltech-IPAC / SPHEREx Science Data Center (SSDC) |
| **Category** | Official Data Release Overview |
| **Scientific Purpose** | Documents the uniformly processed Level 2 spectral images, full-sky spectral cube (102 nominal channels), calibration version, and data access policies for DR1. |
| **Reliability Level** | Level 1 — Authoritative Primary Source |
| **Relevant Document Section** | Product Descriptions, Calibration Improvements, Pipeline Release Identifier, Table Schemas. |
| **Planned Project Usage** | Canonical reference for DR1 collection naming, product types (`plane`, `artifact`), and uniform all-sky cube properties. |
| **Last Verified** | 2026-11-15 |
| **Acknowledgement Requirements** | Cite SPHEREx DR1 Data Release documentation and SSDC pipeline version. |

---

| Attribute | Specification |
| :--- | :--- |
| **Source Name** | **SPHEREx Quick Release (QR) Documentation** |
| **Official URL** | [https://irsa.ipac.caltech.edu/data/SPHEREx/docs/overview_qr.html](https://irsa.ipac.caltech.edu/data/SPHEREx/docs/overview_qr.html) |
| **Responsible Organization** | Caltech-IPAC / SSDC |
| **Category** | Official Data Release Overview |
| **Scientific Purpose** | Documents periodic and weekly quick-release data products (QR2, QR3), early photometric calibrations, and pipeline updates. |
| **Reliability Level** | Level 1 — Authoritative Primary Source |
| **Relevant Document Section** | Quick-Release Schedule, Calibration Differences vs. DR1, Known Caveats. |
| **Planned Project Usage** | Establishes fallback archive collections for early observations and documents intermediate data products. |
| **Last Verified** | 2026-11-15 |
| **Acknowledgement Requirements** | Cite SPHEREx Quick Release documentation and caveats. |

---

| Attribute | Specification |
| :--- | :--- |
| **Source Name** | **SPHEREx Archive Documentation & Architecture Guide** |
| **Official URL** | [https://irsa.ipac.caltech.edu/spherex-archive-documentation/](https://irsa.ipac.caltech.edu/spherex-archive-documentation/) |
| **Responsible Organization** | Caltech-IPAC |
| **Category** | Official Archive Architecture Reference |
| **Scientific Purpose** | High-level overview of archive layout, data models, table hierarchies, and cross-mission access paradigms. |
| **Reliability Level** | Level 1 — Authoritative Primary Source |
| **Relevant Document Section** | Architecture Overview, Data Models, Database Schemas. |
| **Planned Project Usage** | Guides database table mapping (`spherex.artifact`, `spherex.plane`) and multi-extension file structure. |
| **Last Verified** | 2026-11-15 |
| **Acknowledgement Requirements** | Standard IPAC IRSA archive citation. |

---

| Attribute | Specification |
| :--- | :--- |
| **Source Name** | **SPHEREx Data Access Protocols & API Documentation** |
| **Official URL** | [https://irsa.ipac.caltech.edu/spherex-archive-documentation/spherex-data-access/](https://irsa.ipac.caltech.edu/spherex-archive-documentation/spherex-data-access/) |
| **Responsible Organization** | Caltech-IPAC |
| **Category** | Official API Reference |
| **Scientific Purpose** | Details programmatic data access via Table Access Protocol (TAP), Simple Image Access v2 (SIA2), Image-Based Extraction (IBE), and AWS S3 direct cloud access. |
| **Reliability Level** | Level 1 — Authoritative Primary Source |
| **Relevant Document Section** | SIA2 Queries, TAP ADQL Syntax, IBE URL Structure, Cloud S3 Direct Read. |
| **Planned Project Usage** | Primary technical specification for automated discovery and retrieval of SPHEREx observation files. |
| **Last Verified** | 2026-11-15 |
| **Acknowledgement Requirements** | Cite IRSA VO Services and SPHEREx Data Access Guide. |

---

| Attribute | Specification |
| :--- | :--- |
| **Source Name** | **IRSA Virtual Observatory (VO) API Guide** |
| **Official URL** | [https://irsa.ipac.caltech.edu/voapi.html](https://irsa.ipac.caltech.edu/voapi.html) |
| **Responsible Organization** | Caltech-IPAC |
| **Category** | Official Standards & VO Guide |
| **Scientific Purpose** | Comprehensive reference for IVOA standards implemented at IRSA, including TAP, SIA, SSA, and ADQL spatial extensions (`CONTAINS`, `INTERSECTS`, `POINT`, `CIRCLE`, `POLYGON`). |
| **Reliability Level** | Level 1 — Authoritative Primary Source |
| **Relevant Document Section** | TAP/ADQL Geometry Functions, SIA2 Parameter Specifications, Response Formats (VOTable, CSV, JSON). |
| **Planned Project Usage** | Used to construct valid ADQL spatial queries against SPHEREx metadata tables. |
| **Last Verified** | 2026-11-15 |
| **Acknowledgement Requirements** | Reference IVOA compliance and IRSA VO API. |

---

| Attribute | Specification |
| :--- | :--- |
| **Source Name** | **SPHEREx Cutout Service Documentation** |
| **Official URL** | [https://irsa.ipac.caltech.edu/data/SPHEREx/docs/cutout_tool.html](https://irsa.ipac.caltech.edu/data/SPHEREx/docs/cutout_tool.html) |
| **Responsible Organization** | Caltech-IPAC |
| **Category** | Official Tool Documentation |
| **Scientific Purpose** | Describes the server-side cutout engine for SPHEREx Multi-Extension FITS files, detailing preserving spatial/spectral WCS and HDUs. |
| **Reliability Level** | Level 1 — Authoritative Primary Source |
| **Relevant Document Section** | REST Query Parameters (`center`, `size`), Output Format, HDU Preservation. |
| **Planned Project Usage** | Blueprint for obtaining lightweight targeted image subsets for the five challenge targets without downloading multi-gigabyte full detector arrays. |
| **Last Verified** | 2026-11-15 |
| **Acknowledgement Requirements** | Cite IRSA SPHEREx Cutout Service. |

---

| Attribute | Specification |
| :--- | :--- |
| **Source Name** | **SPHEREx Explanatory Supplement** |
| **Official URL** | [https://irsa.ipac.caltech.edu/data/SPHEREx/docs/SPHEREx_Expsupp.pdf](https://irsa.ipac.caltech.edu/data/SPHEREx/docs/SPHEREx_Expsupp.pdf) |
| **Responsible Organization** | SPHEREx Science Team / Caltech / JPL |
| **Category** | Authoritative Scientific Manual |
| **Scientific Purpose** | In-depth scientific manual detailing optical layout, Linear Variable Filters (LVF), detector physics (H2RG), noise characteristics, zodiacal foreground estimation, and pipeline reductions. |
| **Reliability Level** | Level 1 — Authoritative Primary Source |
| **Relevant Document Section** | Optical Layout, LVF Dispersion Formulas, Point Spread Function Variation, Units and Photometric Calibration. |
| **Planned Project Usage** | Source of truth for physical units ($\text{MJy/sr}$), variance interpretation ($(\text{MJy/sr})^2$), bitmask flags, and optical geometry. |
| **Last Verified** | 2026-11-15 |
| **Acknowledgement Requirements** | Cite SPHEREx Explanatory Supplement (NASA/JPL/Caltech). |

---

| Attribute | Specification |
| :--- | :--- |
| **Source Name** | **SPHEREx Spectral Calibrations Guide** |
| **Official URL** | [https://irsa.ipac.caltech.edu/data/SPHEREx/docs/spherex_spectral_calibrations.html](https://irsa.ipac.caltech.edu/data/SPHEREx/docs/spherex_spectral_calibrations.html) |
| **Responsible Organization** | Caltech-IPAC / SSDC |
| **Category** | Official Calibration Documentation |
| **Scientific Purpose** | Documents central wavelength (`CWAVE`) and bandwidth (`CBAND`) derivations, detector band edges, spectral resolution ($R \sim 41$ and $R \sim 135$), and the `WCS-WAVE` binary lookup table. |
| **Reliability Level** | Level 1 — Authoritative Primary Source |
| **Relevant Document Section** | LVF Calibration Files, `CWAVE` vs. `WCS-WAVE`, Bandwidth Mapping, Wavelength Ranges. |
| **Planned Project Usage** | Crucial reference defining how detector pixel coordinates map to physical wavelengths and bandwidths in microns. |
| **Last Verified** | 2026-11-15 |
| **Acknowledgement Requirements** | Cite SPHEREx Spectral Calibration documentation. |

---

## 3. Official SPHEREx Tutorials & Notebook Resources

| Attribute | Specification |
| :--- | :--- |
| **Source Name** | **IRSA Tutorial Notebooks Gateway** |
| **Official URL** | [https://caltech-ipac.github.io/irsa-tutorials/](https://caltech-ipac.github.io/irsa-tutorials/) |
| **Responsible Organization** | Caltech-IPAC |
| **Category** | Official Technical Tutorial Suite |
| **Scientific Purpose** | Public GitHub repository of executable Jupyter notebooks demonstrating practical Python workflows for IRSA-hosted mission datasets. |
| **Reliability Level** | Level 2 — Official Implementation Reference |
| **Relevant Document Section** | SPHEREx Module Index. |
| **Planned Project Usage** | Top-level index for SPHEREx programmatic data retrieval and processing recipes. |
| **Last Verified** | 2026-11-15 |
| **Acknowledgement Requirements** | Caltech-IPAC IRSA Tutorials repository acknowledgement. |

---

| Attribute | Specification |
| :--- | :--- |
| **Source Name** | **Introduction to SPHEREx Spectral Images (`spherex-intro`)** |
| **Official URL** | [https://caltech-ipac.github.io/irsa-tutorials/spherex-intro/](https://caltech-ipac.github.io/irsa-tutorials/spherex-intro/) |
| **Responsible Organization** | Caltech-IPAC |
| **Category** | Official Technical Tutorial |
| **Scientific Purpose** | Step-by-step guide to opening, inspecting, and displaying SPHEREx Multi-Extension FITS (MEF) spectral images using Astropy and Firefly. |
| **Reliability Level** | Level 2 — Official Implementation Reference |
| **Relevant Document Section** | MEF Extension Breakdown (`PRIMARY`, `IMAGE`, `FLAGS`, `VARIANCE`, `ZODI`, `EPSF`, `WCS-WAVE`), WCS Spatial Alignment, Quick-Look Spectral Lookup. |
| **Planned Project Usage** | Architectural basis for `SPHEREX_FITS_GUIDE.md` and frontend viewer integration readiness. |
| **Last Verified** | 2026-11-15 |
| **Acknowledgement Requirements** | Cite `spherex-intro` tutorial (Caltech-IPAC). |

---

| Attribute | Specification |
| :--- | :--- |
| **Source Name** | **SPHEREx Cutouts Tutorial (`spherex-cutouts`)** |
| **Official URL** | [https://caltech-ipac.github.io/irsa-tutorials/spherex-cutouts/](https://caltech-ipac.github.io/irsa-tutorials/spherex-cutouts/) |
| **Responsible Organization** | Caltech-IPAC |
| **Category** | Official Technical Tutorial |
| **Scientific Purpose** | Demonstrates requesting, downloading, and validating spatial sub-arrays from SPHEREx Level 2 data products via URL REST parameters and TAP queries. |
| **Reliability Level** | Level 2 — Official Implementation Reference |
| **Relevant Document Section** | Cutout URL Construction, Boundary Handling, Multi-Extension Header Updates. |
| **Planned Project Usage** | Technical pipeline for extracting lightweight challenge target image subsets for the frontend viewer. |
| **Last Verified** | 2026-11-15 |
| **Acknowledgement Requirements** | Cite `spherex-cutouts` tutorial (Caltech-IPAC). |

---

| Attribute | Specification |
| :--- | :--- |
| **Source Name** | **SPHEREx Point Spread Function Tutorial (`spherex-psf`)** |
| **Official URL** | [https://caltech-ipac.github.io/irsa-tutorials/spherex-psf/](https://caltech-ipac.github.io/irsa-tutorials/spherex-psf/) |
| **Responsible Organization** | Caltech-IPAC |
| **Category** | Official Technical Tutorial |
| **Scientific Purpose** | Explains the `EPSF` extension (over-sampled empirical PSF grid) across focal plane positions and wavelengths. |
| **Reliability Level** | Level 2 — Official Implementation Reference |
| **Relevant Document Section** | `EPSF` Grid Indexing ($21 \times 21$ and $11 \times 41$), Interpolation across detector pixels. |
| **Planned Project Usage** | Documents PSF structure for advanced photometric extraction and future synthetic image validation. |
| **Last Verified** | 2026-11-15 |
| **Acknowledgement Requirements** | Cite `spherex-psf` tutorial (Caltech-IPAC). |

---

| Attribute | Specification |
| :--- | :--- |
| **Source Name** | **SPHEREx Source Discovery Tool Demo (`spherex-source-discovery-tool-demo`)** |
| **Official URL** | [https://caltech-ipac.github.io/irsa-tutorials/spherex-source-discovery-tool-demo/](https://caltech-ipac.github.io/irsa-tutorials/spherex-source-discovery-tool-demo/) |
| **Responsible Organization** | Caltech-IPAC |
| **Category** | Official Technical Demonstration |
| **Scientific Purpose** | Demonstrates searching, downloading, performing image subtraction (detecting high proper motion or variable red sources), catalog inspection, and extracting 1D spectra. |
| **Reliability Level** | Level 2 — Official Implementation Reference |
| **Relevant Document Section** | Image Differencing, Color-Color Selection, Spectrum Extraction Workflows. |
| **Planned Project Usage** | Guides scientific processing boundaries: clearly separates single-epoch source discovery from multi-epoch cross-matching. |
| **Last Verified** | 2026-11-15 |
| **Acknowledgement Requirements** | Cite SPHEREx Source Discovery Tool demonstration (Caltech-IPAC). |

---

| Attribute | Specification |
| :--- | :--- |
| **Source Name** | **SPHEREx Mosaic Tutorial (`spherex-mosaic`)** |
| **Official URL** | [https://caltech-ipac.github.io/irsa-tutorials/spherex-mosaic/](https://caltech-ipac.github.io/irsa-tutorials/spherex-mosaic/) |
| **Responsible Organization** | Caltech-IPAC |
| **Category** | Official Technical Tutorial |
| **Scientific Purpose** | Demonstrates coaddition, reprojection (Montage/reproject), and spatial mosaicking of overlapping SPHEREx spectral images. |
| **Reliability Level** | Level 2 — Official Implementation Reference |
| **Relevant Document Section** | WCS Reprojection, Background Matching, Flux Conservation. |
| **Planned Project Usage** | Reference for understanding how multi-pointing observations are combined into continuous sky maps. |
| **Last Verified** | 2026-11-15 |
| **Acknowledgement Requirements** | Cite `spherex-mosaic` tutorial (Caltech-IPAC). |

---

| Attribute | Specification |
| :--- | :--- |
| **Source Name** | **SPHEREx HiPS Cube Tutorial (`spherex-hipscube`)** |
| **Official URL** | [https://caltech-ipac.github.io/irsa-tutorials/spherex-hipscube/](https://caltech-ipac.github.io/irsa-tutorials/spherex-hipscube/) |
| **Responsible Organization** | Caltech-IPAC |
| **Category** | Official Technical Tutorial |
| **Scientific Purpose** | Details the Hierarchical Progressive Survey (HiPS) spectral cube format covering 102 channels for multi-resolution all-sky browsing. |
| **Reliability Level** | Level 2 — Official Implementation Reference |
| **Relevant Document Section** | HiPS Tile Indexing, HEALPix Projection, Multi-Channel Navigation. |
| **Planned Project Usage** | Architectural guidance for multi-resolution deep survey visualization. |
| **Last Verified** | 2026-11-15 |
| **Acknowledgement Requirements** | Cite `spherex-hipscube` tutorial (Caltech-IPAC). |

---

## 4. Third-Party Scientific Tools & Interaction Inspirations

| Attribute | Specification |
| :--- | :--- |
| **Source Name** | **WiseView** |
| **Official URL** | [http://byw.tools/wiseview](http://byw.tools/wiseview) |
| **Responsible Organization** | Dan Caselden / Backyard Worlds: Planet 9 Collaboration |
| **Category** | Third-Party Interaction Inspiration (NOT a SPHEREx Data Provider) |
| **Scientific Purpose** | Web-based astronomical blinking and motion-visualization tool designed for exploring multi-epoch WISE/NEOWISE unWISE coadds to discover brown dwarfs and high proper motion stars. |
| **Reliability Level** | Level 3 — UI/UX & Interaction Design Reference Only |
| **Relevant Document Section** | Epoch Scrubber, Blink Comparator, Difference Image Controls, Dynamic Stretch (Min/Max/Invert). |
| **Planned Project Usage** | **Interaction pattern inspiration ONLY**: Inspires SPHEREx Explorer's timeline transport, blinking controls, and multi-epoch motion comparison. |
| **Explicit Distinction** | **WiseView is NOT a SPHEREx data provider and does NOT host SPHEREx data.** It operates exclusively on unWISE imaging. |
| **Last Verified** | 2026-11-15 |
| **Acknowledgement Requirements** | Attribute design concept to Dan Caselden and the Backyard Worlds: Planet 9 project. |

---

| Attribute | Specification |
| :--- | :--- |
| **Source Name** | **Gaia Data Release 3 (Gaia DR3)** |
| **Official URL** | [https://archive.stsci.edu/missions-and-data/gaia](https://archive.stsci.edu/missions-and-data/gaia) / [https://www.cosmos.esa.int/web/gaia/dr3](https://www.cosmos.esa.int/web/gaia/dr3) |
| **Responsible Organization** | European Space Agency (ESA) / Gaia DPAC / STScI |
| **Category** | Astrometric Catalog Reference |
| **Scientific Purpose** | High-precision astrometric reference catalog providing celestial positions, parallaxes, and proper motions at epoch J2016.0 for over 1.8 billion sources. |
| **Reliability Level** | Level 1 — Authoritative Primary Source |
| **Relevant Document Section** | Astrometric Parameters, Proper Motion Vectors ($\mu_\alpha^*, \mu_\delta$), Epoch Transformation Formulas. |
| **Planned Project Usage** | Benchmark for factual catalog coordinates and proper motion verification (specifically Barnard's Star and nearby stellar references). |
| **Last Verified** | 2026-11-15 |
| **Acknowledgement Requirements** | Standard ESA Gaia mission acknowledgement: *"This work has made use of data from the European Space Agency (ESA) mission Gaia..."* |

---

| Attribute | Specification |
| :--- | :--- |
| **Source Name** | **CSA NEOSSat (Near-Earth Object Surveillance Satellite)** |
| **Official URL** | [https://www.asc-csa.gc.ca/eng/satellites/neossat/](https://www.asc-csa.gc.ca/eng/satellites/neossat/) |
| **Responsible Organization** | Canadian Space Agency (CSA) / Defence Research and Development Canada (DRDC) |
| **Category** | Partner & Comparative Technical Reference (NOT a SPHEREx Data Provider) |
| **Scientific Purpose** | Space-based microsatellite telescope dedicated to tracking near-Earth asteroids, space debris, and exoplanet transits. |
| **Reliability Level** | Level 2 — Comparative Architecture Reference |
| **Relevant Document Section** | Open Data Distribution Model, Time-Series Cadence, Satellite Telemetry Tracking. |
| **Planned Project Usage** | Serves as a comparative architectural model for handling multi-epoch orbital observatory data pipelines and open data access. |
| **Explicit Distinction** | **NEOSSat is NOT a SPHEREx data source.** It is a separate Canadian Space Agency mission operating in optical wavelengths. |
| **Last Verified** | 2026-11-15 |
| **Acknowledgement Requirements** | Standard Canadian Space Agency open data acknowledgement. |

---

| Attribute | Specification |
| :--- | :--- |
| **Source Name** | **Canadian Astronomy Data Centre (CADC)** |
| **Official URL** | [https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/en/](https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/en/) |
| **Responsible Organization** | National Research Council Canada (NRC-CNRC) |
| **Category** | Comparative Archive Interface Reference |
| **Scientific Purpose** | Major astronomical data archive hosting NEOSSat, CFHT, Gemini, and other observatory datasets with CAOM (Common Archive Observation Model) and IVOA interfaces. |
| **Reliability Level** | Level 2 — Comparative Architecture Reference |
| **Relevant Document Section** | Advanced Search GUI, Table Access Protocol (TAP), CAOM Data Model. |
| **Planned Project Usage** | Benchmarking archive search UX, table filtering patterns, and standard VO integration workflows. |
| **Explicit Distinction** | **CADC does not host SPHEREx data.** Used purely for comparative architecture analysis. |
| **Last Verified** | 2026-11-15 |
| **Acknowledgement Requirements** | Standard NRC CADC acknowledgement. |

---

| Attribute | Specification |
| :--- | :--- |
| **Source Name** | **CSA NEOSSat Tutorial & Open Dataset** |
| **Official URL** | [https://github.com/asc-csa/NEOSSAT_Tutorial](https://github.com/asc-csa/NEOSSAT_Tutorial) / [https://data.asc-csa.gc.ca/dataset/neossat/](https://data.asc-csa.gc.ca/dataset/neossat/) |
| **Responsible Organization** | Canadian Space Agency (CSA) |
| **Category** | Comparative Technical Tutorial & Dataset |
| **Scientific Purpose** | Open Jupyter tutorials teaching FITS processing, astrometric plate solving, and asteroid detection from space-based FITS imagery. |
| **Reliability Level** | Level 2 — Comparative Technical Tutorial |
| **Relevant Document Section** | Time-series image handling, FITS header extraction, bad-pixel masking. |
| **Planned Project Usage** | Methodological cross-check for time-series FITS header inspection and image processing pipelines. |
| **Last Verified** | 2026-11-15 |
| **Acknowledgement Requirements** | Cite CSA NEOSSat Open Data Initiative. |

---

## 5. Provenance Traceability Matrix for the Five Challenge Objects

To guarantee absolute scientific integrity, every challenge object displayed in SPHEREx Explorer is anchored to its primary catalog source:

| Target ID | Object Name | Primary Coordinate Source | Catalog Identifier | Verified Coordinates (ICRS) |
| :--- | :--- | :--- | :--- | :--- |
| `barnards-star` | Barnard's Star | SIMBAD / Gaia DR3 | Gaia DR3 4472832130942585856 | RA: 269.4520°, Dec: +4.6930° |
| `epsilon-indi-b` | Epsilon Indi B | SIMBAD / IPAC | eps Ind B / WDS J22033-5647B | RA: 330.8400°, Dec: -56.7900° |
| `wise-0855` | WISE 0855-0714 | NASA/IPAC WISE / Luhman (2014) | WISE J085510.83-071442.5 | RA: 133.7951°, Dec: -7.2451° |
| `rw-aurigae` | RW Aurigae | SIMBAD / Gaia DR3 | Gaia DR3 158334466547644928 | RA: 77.4600°, Dec: +30.4000° |
| `r-draconis` | R Draconis | AAVSO / SIMBAD | HD 149214 / HIP 80582 | RA: 248.3300°, Dec: +66.7500° |
