# Ordered Implementation Tasks — SPHEREx Explorer

**Project**: SPHEREx Explorer  
**Challenge**: 2026 NASA Space Apps Challenge  
**Status**: Roadmap & Task Breakdown  
**Last Updated**: 2026-11-14  

---

## Phase 1: Project Setup & Initialization (Current Phase)

- [x] **TASK-101**: Initialize Vite React application with JavaScript template.
- [x] **TASK-102**: Configure project directory structure according to approved layout.
- [x] **TASK-103**: Define project governance and agent constraints in `AGENTS.md`.
- [x] **TASK-104**: Author initial documentation suite under `docs/` (PRD, SRS, Architecture, etc.).
- [x] **TASK-105**: Configure root `index.html`, `package.json`, and base styling reset.
- [x] **TASK-106**: Verify clean production build (`npm run build`) and repository structure.

---

## Phase 2: Mock Datasets & Data Providers

- [ ] **TASK-201**: Construct initial mock celestial targets JSON dataset (`src/data/mockTargets.json`) adhering to `docs/DATA_SCHEMA.md`.
- [ ] **TASK-202**: Populate static demo sky observation images under `public/images/demo/` with clear mock watermarks/labels.
- [ ] **TASK-203**: Implement `MockDataProvider` in `src/services/providers/MockDataProvider.js` to load, query, and filter observation sequences.
- [ ] **TASK-204**: Create coordinate math and validation utility helpers (`src/utils/coordinates.js`).
- [ ] **TASK-205**: Unit test coordinate matching and boundary conditions ($0 \le \text{RA} < 360$, $-90 \le \text{Dec} \le 90$).

---

## Phase 3: Presentation UI Components

- [ ] **TASK-301**: Implement `Header` component with Space Apps Challenge branding and persistent `MOCK DATA ONLY` banner.
- [ ] **TASK-302**: Implement `SearchPanel` component with RA and Dec inputs, validation messaging, and preset demo target pills.
- [ ] **TASK-303**: Implement `SkyViewer` component with responsive image container, loading state, error boundary, and epoch tag overlay.
- [ ] **TASK-304**: Implement `TimelineControls` component with Step (Prev/Next), Play/Pause, and scrubber slider.
- [ ] **TASK-305**: Implement `ObservationInfo` component with structured tabular readout of metadata.

---

## Phase 4: State Management & Timeline Logic

- [ ] **TASK-401**: Implement `useCoordinates` custom hook in `src/hooks/useCoordinates.js` to manage coordinate inputs, active target state, and validation.
- [ ] **TASK-402**: Implement `useTimeline` custom hook in `src/hooks/useTimeline.js` to manage epoch index, boundary checks, and automated playback timers.
- [ ] **TASK-403**: Integrate `useTimeline` with `SkyViewer`, `TimelineControls`, and `ObservationInfo`.
- [ ] **TASK-404**: Implement keyboard shortcuts for timeline navigation (ArrowLeft for previous, ArrowRight for next, Space for play/pause).

---

## Phase 5: Integration, Styling & Error Handling

- [ ] **TASK-501**: Assemble components inside `App.jsx` with responsive grid/flex layout.
- [ ] **TASK-502**: Apply cohesive space-themed CSS styling tokens in `src/styles/`.
- [ ] **TASK-503**: Implement empty states (initial load before search) and not-found states (coordinates without mock data).
- [ ] **TASK-504**: Verify responsive layout behavior across desktop ($>1024\text{px}$) and mobile ($<768\text{px}$) viewports.

---

## Phase 6: Final Verification & Review

- [ ] **TASK-601**: Complete accessibility review (ARIA labels, keyboard focus rings, WCAG 2.1 AA contrast).
- [ ] **TASK-602**: Execute production build verification (`npm run build`) and test output preview (`npm run preview`).
- [ ] **TASK-603**: Confirm all displayed data and imagery are explicitly identified as MOCK.
- [ ] **TASK-604**: Update documentation with final operational notes and submission materials.

---

## Tasks Requiring Confirmation

> [!NOTE]
> 1. Confirmation of exact demo target coordinates for TASK-201 [Requires Confirmation].
> 2. Confirmation of whether automated playback loops or pauses at final epoch for TASK-402 [Requires Confirmation].
