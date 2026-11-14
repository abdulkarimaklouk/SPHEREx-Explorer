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

## Phase 5 — Frontend Development

- [ ] **TASK-501**: **Coordinate Math Utility**: Implement `src/utils/coordinates.js` (`validateCoordinates`, `angularSeparationDegrees`).
- [ ] **TASK-502**: **Data Access Adapter**: Implement `src/services/providers/MockDataProvider.js` (`loadTargets`).
- [ ] **TASK-503**: **Domain Service**: Implement `src/services/observationService.js` (`getPresetTargets`, `getTargetById`, `findTargetByCoordinates`).
- [ ] **TASK-504**: **Pure JS Automated Unit Tests**: Create unit test suite using Node.js built-in test runner (`node --test`) covering boundary validation, RA wraparound, great-circle separation, and target matching.
- [ ] **TASK-505**: **Application State Hook**: Implement `src/hooks/useObservationExplorer.js` (coordinates, target matching, 1200ms playback, auto-stop).
- [ ] **TASK-506**: **Header Component**: Implement `src/components/Header/` with Space Apps branding and prominent `MOCK DATA` banner.
- [ ] **TASK-507**: **SearchPanel Component**: Implement `src/components/SearchPanel/` with decimal inputs, validation, and 5 challenge object quick-select pills.
- [ ] **TASK-508**: **SkyViewer Component**: Implement `src/components/SkyViewer/` with responsive viewport, sequence overlay, and error fallback.
- [ ] **TASK-509**: **TimelineControls Component**: Implement `src/components/TimelineControls/` with Step (Prev/Next), Scrubber slider, and Play/Pause toggle.
- [ ] **TASK-510**: **ObservationInfo Component**: Implement `src/components/ObservationInfo/` displaying verified target info vs synthetic observation metadata.
- [ ] **TASK-511**: **Application Shell Assembly**: Connect components in `src/App.jsx` using the Phase 3 design system and `src/styles/index.css`.

---

## Phase 6 — Integration & QA

- [ ] **TASK-601**: **End-to-End Functional Verification**: Verify search matching, preset loading, timeline stepping, auto-playback stop at final observation, and scrubber accuracy.
- [ ] **TASK-602**: **Coordinate Transparency Audit**: Ensure user requested coordinates are clearly distinguished from target center coordinates.
- [ ] **TASK-603**: **Scientific Integrity & Mock Data Audit**: Verify that all 20 demonstration images and timestamps are explicitly labeled as MOCK.
- [ ] **TASK-604**: **Cross-Device & Accessibility Testing**: Verify mobile responsiveness, keyboard operability (`Tab`, `Space`, `Enter`, Arrows), and WCAG 2.1 AA contrast.
- [ ] **TASK-605**: **Production Build & Test Verification**: Execute `npm run build` and run Node unit tests to confirm clean static delivery.
