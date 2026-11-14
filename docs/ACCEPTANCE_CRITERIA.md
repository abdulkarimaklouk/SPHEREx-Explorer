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

### Phase 3: Dedicated UI/UX Design (Approval Gate)
- [ ] User personas, journey maps, and information architecture documented.
- [ ] Low- and mid-fidelity wireframes produced covering mobile, tablet, and desktop viewports.
- [ ] Visual identity defined: dark space aesthetic, accessible color tokens, typography hierarchy.
- [ ] Design system completed: button states, input validation, scrubber styling, persistent `MOCK DATA` banner.
- [ ] High-fidelity interface designs completed for all states: Initial/Empty, Target Matched, and Outside Coverage.
- [ ] Coordinate transparency clearly established: UI visibly distinguishes Requested Coordinates from Target Center Coordinates.
- [ ] **Gate**: Formal sign-off and approval on design artifacts before any frontend development begins.

### Phase 4: Mock Data Preparation
- [ ] Factual target metadata (names, constellations, catalog coordinates) verified against official references (SIMBAD, Gaia, WISE).
- [ ] Mock field coverage boundaries (`fieldCoverageDegrees`) documented with clear justification based on Phase 3 framing.
- [ ] 20 synthetic observation images (4 per target) created in `public/images/demo/` with visible mock identification.
- [ ] `src/data/mockTargets.json` assembled strictly adhering to `docs/DATA_SCHEMA.md` with `"isMock": true` on all observations and factual metadata on targets.
- [ ] Timestamps sorted in strictly ascending chronological order.

### Phase 5: Frontend Development
- [ ] `src/utils/coordinates.js` implements domain validation and great-circle angular distance math (`angularSeparationDegrees`).
- [ ] `src/services/providers/MockDataProvider.js` implements `loadTargets()`.
- [ ] `src/services/observationService.js` implements `getPresetTargets()`, `getTargetById()`, and `findTargetByCoordinates()`.
- [ ] Pure JavaScript unit tests executed and passing via Node.js built-in test runner (`node --test`) without external dependencies.
- [ ] `src/hooks/useObservationExplorer.js` coordinates state, target resolution, and 1200ms playback with automatic stop at the final frame.
- [ ] Presentation components (`Header`, `SearchPanel`, `SkyViewer`, `TimelineControls`, `ObservationInfo`) built strictly according to Phase 3 designs.
- [ ] Zero direct coupling between presentation components and `MockDataProvider`.

### Phase 6: Integration & QA
- [ ] Clicking any of the 5 challenge object buttons instantly loads the target and its 4 demonstration observations.
- [ ] Manual RA/Dec search within a target's coverage loads the target while displaying both requested and center coordinates.
- [ ] Timeline navigation allows manual stepping (Prev/Next), automated playback (1200ms, stops at observation 4), and direct scrubber jumping.
- [ ] All interactive elements accessible via keyboard (`Tab`, `Space`, `Enter`, Arrow keys).
- [ ] Text meets WCAG AA contrast standards.
- [ ] Production build (`npm run build`) generates clean static assets.
