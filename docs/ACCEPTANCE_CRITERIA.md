# Acceptance Criteria — SPHEREx Explorer

**Project**: SPHEREx Explorer
**Challenge**: 2026 NASA Space Apps Challenge
**Status**: Quality Gates Baseline (Phase 2 Finalized & Hardened)
**Last Updated**: 2026-11-14

---

## 1. Quality Gates & Definition of Done

A phase is considered **Done and Accepted** only when all quality criteria for that phase are completely met:

1. **Strict Scope Control**: No unrequested features, no backend, no databases, no external live APIs, and no third-party UI framework dependencies.
2. **Scientific & Data Integrity**: Verified astronomical target coordinates have documented factual catalog sources. Synthetic observation images and timestamps are explicitly labeled as MOCK.
3. **Phased Governance**: No code or mock assets may be created prior to the completion and approval of the preceding phase. **UI/UX Design (Phase 3) must be approved before Frontend Development (Phase 5) commences.**
4. **Build Cleanliness & Automated Verification**: `npm run build` succeeds with zero errors and zero warnings; pure JS logic is verified via the Node.js built-in test runner.

---

## 2. Phase-by-Phase Acceptance Criteria

### Phase 1: Project Foundation (Accepted)
- [x] Vite React project initialized with clean JavaScript template.
- [x] Approved directory structure established.
- [x] `AGENTS.md` active with non-negotiable operating rules.
- [x] Documentation suite initialized in `docs/`.
- [x] Application builds cleanly (`npm run build`).
- [x] Git repository initialized on `main` branch.

### Phase 2: Requirements, Architecture & Governance (Accepted)
- [x] Decimal degree input and validation confirmed ($0.0 \le \text{RA} < 360.0$, $-90.0 \le \text{Dec} \le +90.0$).
- [x] All five NASA challenge objects mandated: Barnard's Star, Epsilon Indi B, WISE 0855, RW Aurigae, R Draconis.
- [x] Planning target of four demonstration observations per target (20 images total) established as an internal planning target.
- [x] Layered data integrity enforced: verified catalog data on targets, `"isMock": true` on synthetic observations.
- [x] Partitioned architecture established: `MockDataProvider.js` (adapter), `observationService.js` (domain service), `useObservationExplorer.js` (custom hook), `coordinates.js` (math utility).
- [x] Universal 2.0° threshold rejected in favor of justified per-target field coverage boundaries.
- [x] Timeline end-of-sequence rule: Playback stops automatically on the final observation (no infinite looping).
- [x] Dedicated UI/UX Design Phase mandated as Phase 3 before frontend implementation.
- [x] Architecture Decision Records (ADRs 001 - 012) authored in `docs/DECISIONS.md`.
- [x] Antigravity rules deployed in `.agents/rules/` and skills deployed in `.agents/skills/`.

### Phase 3: Dedicated UI/UX Design (Accepted)
- [x] Observatory Field Desk visual identity and Asymmetric Workbench layout designed and approved.
- [x] Low-, mid-, and high-fidelity wireframes produced covering mobile, tablet, and desktop viewports.
- [x] Design system completed: accessible color tokens (WCAG AA), tabular numbers, persistent `MOCK DATA` banner.
- [x] Coordinate transparency established: Requested vs. Target Center coordinates.

### Phase 4: Mock Data Preparation (Accepted)
- [x] Factual target metadata verified against SIMBAD, Gaia DR3, and NASA/IPAC WISE catalogs.
- [x] `src/data/mockTargets.json` assembled strictly adhering to layered data integrity (no blanket mock flag on targets; `"isMock": true` on observations).
- [x] Timestamps sorted in ascending chronological order.

### Phase 5: Frontend Development (Accepted)
- [x] `src/utils/coordinates.js` implements domain validation, spherical distance, and sexagesimal conversion.
- [x] `src/services/providers/MockDataProvider.js` and `src/services/observationService.js` implemented with clean domain/data partitioning.
- [x] 28 pure JavaScript unit and integration contract tests passing via Node.js built-in test runner (`node --test`).
- [x] `src/hooks/useObservationExplorer.js` coordinates state, 1200ms playback, auto-stop on final frame, and replay restart.
- [x] Presentation components (`Header`, `SearchPanel`, `SkyViewer`, `TimelineControls`, `ObservationInfo`) implemented with full responsiveness.

### Phase 6: Scientific Research Context & Real Data Integration (In Progress)
- [x] **TASK-601 Quality Gate**:
  - [x] Permanent Scientific Source Registry (`docs/research/SOURCE_REGISTRY.md`) created with verified URLs, organizations, and citation guidelines.
  - [x] SPHEREx Multi-Extension FITS Technical Guide (`docs/research/SPHEREX_FITS_GUIDE.md`) authored detailing WCS spatial/spectral mappings, physical units ($\text{MJy/sr}$), and data flags.
  - [x] Strict scientific separation established: 102 spectral channels (wavelengths) vs. observation epochs (time points).
  - [x] IRSA Archive Access Guide (`docs/research/IRSA_ARCHIVE_ACCESS.md`) authored covering SIA2, TAP/ADQL, IBE, Cutout Tool, and S3 protocols.
  - [x] Data Ingestion Architecture Analysis (`docs/research/DATA_INGESTION_ARCHITECTURE.md`) authored evaluating Options A, B, and C with 12-step user journey.
  - [x] WiseView Interaction Analysis (`docs/research/WISEVIEW_INTERACTION_ANALYSIS.md`) authored defining blinking and difference viewing adaptations.
  - [x] Real Data Implementation Roadmap (`docs/research/REAL_DATA_IMPLEMENTATION_ROADMAP.md`) authored organizing Phases A through I.
  - [x] ADR-013 and ADR-014 recorded in `docs/DECISIONS.md`.
  - [x] Zero modification to React components or application source files; production build and tests pass.
- [x] **TASK-601.1 Quality Gate (Architecture Alignment Before FITS Implementation)**:
  - [x] ADR-013 revised in `docs/DECISIONS.md`: In-browser Web Worker FITS upload & inspection established as mandatory core product requirement; Python/Astropy repositioned as offline reference validation oracle and baseline asset generator.
  - [x] MEF structure corrected across all research documents: 7 HDUs in total (Primary Header HDU 0 + 6 Extensions HDU 1 to 6).
  - [x] Physical roles and limitations documented for all 8 data products (`PRIMARY`, `IMAGE`, `FLAGS`, `VARIANCE`, `ZODI`, `EPSF`, `WCS-WAVE`, `CWAVE`/`CBAND`).
  - [x] Scientific limitation documented: Single-pixel nominal LVF wavelength lookup (`WCS-WAVE`) strictly distinguished from authentic multi-pointing spectrophotometry.
  - [x] Variable observation epoch cadence by ecliptic latitude (from ~4 at equator to hundreds near poles) documented, replacing uniform 4-epoch assumption.
  - [x] Zero network transfer advantage and CORS risks analyzed for in-browser file upload vs. direct archive API access.
  - [x] All Phase 6 research documents, roadmaps, task lists, and `docs/ARCHITECTURE.md` updated and synchronized.
  - [x] Zero modification to React components or application source code; production build and tests pass.
- [ ] **TASK-602 Quality Gate**: In-Browser Web Worker FITS Upload & Parsing Technical Spike with Astropy Reference Validation.
- [ ] **TASK-603 Quality Gate**: Data Ingestion Architecture & Spike Sign-Off Gate (Human approval on ADR-013 and spike benchmarks).
- [ ] **TASK-604 Quality Gate**: Client-Side FITS Processing & Sky Viewer Integration (Asinh/ZScale canvas rendering, multi-HDU layer inspector).
- [ ] **TASK-605 Quality Gate**: In-App FITS Upload UI & Pre-Packaged Scientific Baselines (Drag-and-drop file ingestion and curated target cutouts).
- [ ] **TASK-606 Quality Gate**: Multi-Epoch Dynamic Timeline & Observation Comparison (Dynamic timeline navigation and epoch difference mode).
- [ ] **TASK-607 Quality Gate**: Spectral Metadata & Nominal Wavelength Inspector (102-channel LVF indicator and nominal wavelength inspector with scientific disclosures).
- [ ] **TASK-608 Quality Gate**: Source Astrometry & Multi-Catalog Alignment (Gaia DR3 proper motion vectors and sub-pixel astrometric reticle).
- [ ] **TASK-609 Quality Gate**: Final QA & Scientific Integrity Sign-Off.
