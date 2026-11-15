# Ordered Implementation Tasks — SPHEREx Explorer

**Project**: SPHEREx Explorer
**Challenge**: 2026 NASA Space Apps Challenge
**Status**: Roadmap & Task Breakdown (Phase 2 Finalized & Hardened)
**Last Updated**: 2026-11-14

---

## Phase 1 — Project Foundation (Completed)

- [x] **TASK-101**: Initialize Vite React application with JavaScript template.
- [x] **TASK-102**: Configure project directory structure according to approved layout.
- [x] **TASK-103**: Define project governance and agent constraints in `AGENTS.md`.
- [x] **TASK-104**: Author initial documentation suite under `docs/`.
- [x] **TASK-105**: Configure root `index.html`, `package.json`, and base styling reset.
- [x] **TASK-106**: Verify clean production build (`npm run build`) and repository structure.
- [x] **TASK-107**: Initialize Git repository on `main` branch.

---

## Phase 2 — Requirements, Architecture & Governance (Current Phase)

- [x] **TASK-201**: Review challenge objectives and resolve all technical decisions (decimal degrees, pause-at-end, 1200ms default).
- [x] **TASK-202**: Mandate the five NASA challenge objects in specifications (Barnard's Star, Epsilon Indi B, WISE 0855, RW Aurigae, R Draconis).
- [x] **TASK-203**: Establish data schema separating verified target facts from synthetic observation sequences without blanket mock flags on targets.
- [x] **TASK-204**: Formalize domain service (`observationService.js`), data-access adapter (`MockDataProvider.js`), custom hook (`useObservationExplorer.js`), and coordinate math (`coordinates.js`).
- [x] **TASK-205**: Author Architecture Decision Records (ADRs 001 - 012) in `docs/DECISIONS.md`.
- [x] **TASK-206**: Deploy Antigravity project rules in `.agents/rules/` and skills in `.agents/skills/`.
- [x] **TASK-207**: Synchronize and verify all documentation files across `docs/`, `AGENTS.md`, and `README.md`.

---

## Phase 3 — Dedicated UI/UX Design

> [!IMPORTANT]
> **No application UI implementation is allowed during this phase.**
> UI/UX design must be completed and formally approved before frontend implementation begins.

- [ ] **TASK-301**: **UX Research & User Personas**: Document user goals, mental models for celestial navigation, and Space Apps evaluator priorities.
- [ ] **TASK-302**: **User Flows & Journeys**: Map end-to-end flows for coordinate searching, preset challenge selection, and timeline playback.
- [ ] **TASK-303**: **Information Architecture**: Define visual hierarchy for header, coordinate inputs, sky image viewer, metadata panel, and timeline controls.
- [ ] **TASK-304**: **Wireframes (Low/Mid-Fidelity)**: Create structural wireframes covering desktop, tablet, and mobile breakpoints.
- [ ] **TASK-305**: **Visual Identity & Theme**: Establish dark-space palette, accessible contrast ratios, NASA-aligned typography, and iconography standards.
- [ ] **TASK-306**: **Design System & Components**: Define button states, input validation styling, scrubber interactions, and the persistent `MOCK DATA` banner.
- [ ] **TASK-307**: **High-Fidelity Interface Design**: Create detailed visual mockups across all states (initial/empty, target matched, outside coverage).
- [ ] **TASK-308**: **Interaction Design**: Specify motion rules for playback stepping, timeline scrubber drag behavior, and coordinate validation transitions.
- [ ] **TASK-309**: **Responsive Design Specifications**: Formalize layout collapse, touch target sizes ($\ge 44\times 44\text{px}$), and viewport stacking rules.
- [ ] **TASK-310**: **Design Review & Approval Gate**: Present complete design artifacts for formal sign-off before proceeding to development.

---

## Phase 4 — Mock Data Preparation

- [ ] **TASK-401**: **Verify Five Challenge Targets**: Extract and document catalog coordinates, constellations, and reference citations for Barnard's Star, Epsilon Indi B, WISE 0855, RW Aurigae, and R Draconis.
- [ ] **TASK-402**: **Define Mock Field Coverage**: Formulate justified angular coverage boundaries (`fieldCoverageDegrees`) for each target based on Phase 3 framing.
- [ ] **TASK-403**: **Generate Synthetic Demonstration Images**: Create 4 distinct observation frames per target (20 images total) under `public/images/demo/` with explicit mock labels.
- [ ] **TASK-404**: **Assemble `src/data/mockTargets.json`**: Construct canonical dataset adhering strictly to `docs/DATA_SCHEMA.md` with `"isMock": true` on all observations and factual metadata on targets.
- [ ] **TASK-405**: **Dataset Validation**: Validate JSON syntax, chronological timestamp ordering, coordinate boundaries, and image path resolutions.

---

## Phase 5 — Frontend Development (Completed & Verified)

- [x] **TASK-501**: Implement `src/utils/coordinates.js`, `MockDataProvider.js`, and `observationService.js`.
- [x] **TASK-501.1**: Fix exact catalog center matching and refactor coordinate input UI.
- [x] **TASK-502**: Core frontend finalization, integration readiness, dynamic timeline playback (auto-stop & replay), and 28 automated integration tests.

---

## Phase 6 — Scientific Research Context & Real Data Integration

- [x] **TASK-601**: **SPHEREx Scientific Research Context Integration**:
  - Author `docs/research/SOURCE_REGISTRY.md` compiling official NASA/IPAC IRSA documents, tutorials, and comparative references.
  - Author `docs/research/SPHEREX_FITS_GUIDE.md` detailing Multi-Extension FITS (7 HDUs total), WCS spatial/spectral transformations, and 102 channels vs epochs.
  - Author `docs/research/IRSA_ARCHIVE_ACCESS.md` detailing SIA2, TAP/ADQL, IBE, Cutout Tool, and S3 access protocols.
  - Author `docs/research/DATA_INGESTION_ARCHITECTURE.md` comparing Options A, B, and C, defining the 12-step user workflow, and establishing scientific processing boundaries.
  - Author `docs/research/WISEVIEW_INTERACTION_ANALYSIS.md` analyzing interaction inspirations from Backyard Worlds: Planet 9.
  - Author `docs/research/REAL_DATA_IMPLEMENTATION_ROADMAP.md` organizing future work from Phase A through Phase I.
  - Author ADR-013 (Data Ingestion Architecture) and ADR-014 (102 Spectral Channels vs Multi-Epoch Time Series) in `docs/DECISIONS.md`.
- [x] **TASK-601.1**: **Architecture Alignment Before FITS Implementation**:
  - Reassess ADR-013 to establish in-browser Web Worker FITS upload & inspection as a mandatory core product requirement (Option A).
  - Reposition Python/Astropy pipeline (Option C) as an offline reference validation oracle and baseline asset generator.
  - Correct MEF structure across all research documents: 7 HDUs in total (Primary Header HDU 0 + 6 Extensions HDU 1 to 6).
  - Detail physical roles, interpretations, and scientific limits of all 8 SPHEREx data products (PRIMARY, IMAGE, FLAGS, VARIANCE, ZODI, EPSF, WCS-WAVE, CWAVE/CBAND).
  - Clarify strict distinction between single-pixel nominal LVF wavelength lookup (`WCS-WAVE`) vs. true multi-pointing source spectrophotometry.
  - Correct observation epoch claims: coverage varies with ecliptic latitude (from ~4 at equator to hundreds near ecliptic poles) rather than a uniform 4 passes.
  - Update `docs/research/REAL_DATA_IMPLEMENTATION_ROADMAP.md`, `docs/TASKS.md`, `docs/ACCEPTANCE_CRITERIA.md`, and `docs/ARCHITECTURE.md`.
- [ ] **TASK-602**: **In-Browser Web Worker FITS Upload & Parsing Technical Spike (with Astropy Reference Validation)**:
  - Implement a dedicated prototype Web Worker to ingest and parse authentic SPHEREx Level 2 MEF FITS files directly in the browser via `File` / `FileReader` / `ArrayBuffer`.
  - Validate reading of all 7 HDUs (Primary + 6 extensions), extracting `IMAGE` Float32 array, `FLAGS` bitmask, `VARIANCE` uncertainties, and `WCS-WAVE` binary table metadata.
  - Measure memory consumption (< 250 MB peak heap) and processing latency (< 1.5s) on standard hardware.
  - Author an offline Python/Astropy reference validation script (`scripts/validate_fits_reference.py`) to extract pixel statistics, WCS bounds, and header keywords for exact numerical comparison.
- [ ] **TASK-603**: **Data Ingestion Architecture & Spike Sign-Off Gate**: Review spike performance, memory limits, and numerical parity with Python oracle; obtain human sign-off before dashboard UI integration.
- [ ] **TASK-604**: **Client-Side FITS Processing & Sky Viewer Integration**: Integrate Web Worker FITS parser into application data layer, connect image buffer with Asinh/ZScale canvas rendering, and provide multi-HDU layer toggling (IMAGE, FLAGS, VARIANCE, ZODI).
- [ ] **TASK-605**: **In-App FITS Upload UI & Pre-Packaged Scientific Baselines**: Build drag-and-drop FITS upload interface with validation feedback, coupled with pre-packaged authentic SPHEREx demonstration datasets for the 5 challenge targets.
- [ ] **TASK-606**: **Multi-Epoch Dynamic Timeline & Observation Comparison**: Connect multi-epoch observation metadata to timeline, enable dynamic cadence navigation across variable ecliptic epochs, and support epoch difference visualization.
- [ ] **TASK-607**: **Spectral Metadata & Nominal Wavelength Inspector**: Implement interactive 102-channel LVF bandpass inspector, cursor-driven `WCS-WAVE` nominal wavelength readout, and spectral point visualization with explicit scientific disclosures.
- [ ] **TASK-608**: **Source Astrometry & Multi-Catalog Alignment**: Overlay Gaia DR3 proper motion vectors, catalog center reticles, and sub-pixel coordinate alignment on authentic FITS image data.
- [ ] **TASK-609**: **End-to-End QA & Scientific Integrity Sign-Off**: Comprehensive acceptance audit, zero console errors, clean static production build, and verification of scientific disclosures across all modes.
