# Architecture Decision Records (ADRs) — SPHEREx Explorer

**Project**: SPHEREx Explorer
**Challenge**: 2026 NASA Space Apps Challenge
**Status**: Active Architecture Baseline
**Last Updated**: 2026-11-14

This document logs all fundamental technical, architectural, and governance decisions established for the SPHEREx Explorer project.

---

## Index of Decisions

- [ADR-001: Coordinate Input Representation](#adr-001-coordinate-input-representation)
- [ADR-002: Coordinate Validation Rules](#adr-002-coordinate-validation-rules)
- [ADR-003: Coordinate Matching Policy & Field Resolution](#adr-003-coordinate-matching-policy--field-resolution)
- [ADR-004: Mock Field Coverage Representation](#adr-004-mock-field-coverage-representation)
- [ADR-005: Separation of Domain Service and Data Provider](#adr-005-separation-of-domain-service-and-data-provider)
- [ADR-006: Application State Ownership via Custom Hook](#adr-006-application-state-ownership-via-custom-hook)
- [ADR-007: Observation Chronological Ordering](#adr-007-observation-chronological-ordering)
- [ADR-008: Timeline Playback End-of-Sequence Behavior](#adr-008-timeline-playback-end-of-sequence-behavior)
- [ADR-009: Scientific Data Integrity and Mock Provenance](#adr-009-scientific-data-integrity-and-mock-provenance)
- [ADR-010: Automated Testing Policy Without External Dependencies](#adr-010-automated-testing-policy-without-external-dependencies)
- [ADR-011: Dedicated UI/UX Phase Separation](#adr-011-dedicated-uiux-phase-separation)
- [ADR-012: Git Safety and Antigravity Agent Governance](#adr-012-git-safety-and-antigravity-agent-governance)

---

### ADR-001: Coordinate Input Representation

- **Status**: **Accepted**
- **Context**: The application requires users to enter celestial coordinates (Right Ascension and Declination). Astronomical coordinates can be represented in decimal degrees or sexagesimal notation (`HH:MM:SS.ss`, `DD:MM:SS.s`).
- **Decision**: Use standard **decimal degrees** exclusively for user input and internal representations in the MVP ($0.0 \le \text{RA} < 360.0$, $-90.0 \le \text{Dec} \le +90.0$). Sexagesimal parsing is **Deferred** to post-MVP enhancements.
- **Rationale**: Decimal degrees are mathematically unambiguous, directly map to numeric input fields, eliminate complex multi-field formatting, and prevent input parsing errors during evaluation.
- **Consequences**: Input validation is streamlined. Users entering sexagesimal strings will receive clear guidance to enter decimal degrees.
- **Related Documentation**: `docs/PRD.md`, `docs/SRS.md`, `docs/UI_SPECIFICATION.md`.

---

### ADR-002: Coordinate Validation Rules

- **Status**: **Accepted**
- **Context**: Users may enter arbitrary or malformed input into coordinate fields.
- **Decision**: Validate inputs immediately on change and blur:
  - RA: Numerical float strictly satisfying $0.0 \le \text{RA} < 360.0$.
  - Dec: Numerical float strictly satisfying $-90.0 \le \text{Dec} \le +90.0$.
  - Provide non-blocking visual error messages and disable the search trigger when inputs are invalid.
- **Rationale**: Prevents nonsensical spherical coordinate queries and avoids runtime arithmetic exceptions in trigonometric formulas.
- **Consequences**: Search actions cannot execute with invalid coordinates.
- **Related Documentation**: `docs/SRS.md`, `src/utils/coordinates.js`.

---

### ADR-003: Coordinate Matching Policy & Field Resolution

- **Status**: **Accepted**
- **Context**: In an MVP with five discrete mock targets, user-entered coordinates will rarely match exact catalog centers. An earlier proposal suggested an arbitrary universal 2.0° radius, which lacked scientific or design justification.
- **Decision**:
  1. Calculate great-circle angular separation $\Delta\theta$ between requested coordinates and target catalog centers using a numerically stable spherical formula.
  2. Match a target only when $\Delta\theta \le \text{target.fieldCoverageDegrees}$.
  3. Reject an arbitrary universal tolerance; coverage must be explicitly configured per-target based on demonstration framing.
  4. If multiple fields overlap, select the target with the minimum angular separation.
  5. If coordinates fall outside all configured fields, return a clean "No mock observation in this field" state with quick-links to available challenge targets.
  6. **Coordinate Transparency**: The interface must visibly display both the *Requested Coordinates* and the *Target Center Coordinates*, never implying the image is centered exactly on the user's input unless true.
- **Rationale**: Maintains scientific transparency and reflects real astronomical observatory field-of-view concepts without inventing unverified instrument telemetry.
- **Consequences**: The matching engine requires each target to have an explicit coverage configuration in `mockTargets.json`.
- **Related Documentation**: `docs/SRS.md`, `docs/ARCHITECTURE.md`, `docs/UI_SPECIFICATION.md`.

---

### ADR-004: Mock Field Coverage Representation

- **Status**: **Proposed** (Numerical values **Deferred** to Phases 3 and 4)
- **Context**: Mock observation images represent finite celestial fields. To support coordinate matching, the dataset requires field coverage boundaries.
- **Decision**: Represent coverage in `mockTargets.json` as `fieldCoverageDegrees` on each target record. Clearly document that this is synthetic demonstration framing configuration, not official SPHEREx instrument field-of-view telemetry. Numerical coverage values will be defined during Phase 4 Mock Data Preparation based on Phase 3 UI/UX framing.
- **Rationale**: Prevents inventing arbitrary optical parameters while enabling robust spatial matching.
- **Consequences**: Coordinate matching code relies on `target.fieldCoverageDegrees`, which will be populated in Phase 4.
- **Related Documentation**: `docs/DATA_SCHEMA.md`, `docs/TASKS.md`.

---

### ADR-005: Separation of Domain Service and Data Provider

- **Status**: **Accepted**
- **Context**: Architecture previously blurred the boundary between `MockDataProvider` and `observationService`.
- **Decision**:
  - `MockDataProvider.js`: Acts solely as the data-access adapter. Its single responsibility is accessing `mockTargets.json` and returning raw target records (`loadTargets()`). It contains no business logic, no math, and no React state.
  - `observationService.js`: Acts as the application/domain service. It consumes the provider and owns target lookup, coordinate matching algorithms, and chronological sorting. It exposes public domain functions: `getPresetTargets()`, `getTargetById(targetId)`, and `findTargetByCoordinates(raDeg, decDeg)`.
- **Rationale**: Adheres strictly to the Single Responsibility Principle, isolates data-storage mechanics from domain rules, and eases future transition to external data archives.
- **Consequences**: Clean, testable domain service independent of both React components and storage files.
- **Related Documentation**: `docs/ARCHITECTURE.md`, `docs/PROJECT_STRUCTURE.md`.

---

### ADR-006: Application State Ownership via Custom Hook

- **Status**: **Accepted**
- **Context**: Deciding how application state (selected target, active observation index, playback timer, search status) is managed.
- **Decision**: Centralize state in a custom coordinator hook: `src/hooks/useObservationExplorer.js`. Avoid global React Context or external state libraries (Redux, Zustand) for the initial MVP.
- **Rationale**: SPHEREx Explorer is a single-screen dashboard. Prop-drilling across only one level of child components is straightforward, performant, and avoids Context boilerplate.
- **Consequences**: All state transitions and interval timers are encapsulated in one testable hook.
- **Related Documentation**: `docs/ARCHITECTURE.md`, `src/hooks/useObservationExplorer.js`.

---

### ADR-007: Observation Chronological Ordering

- **Status**: **Accepted**
- **Context**: Time-series observations must maintain a predictable sequence across epochs.
- **Decision**: All observation sequences must be ordered strictly in ascending chronological order based on ISO 8601 UTC timestamps. The service layer verifies this ordering before returning observations to application state.
- **Rationale**: Prevents sequence disorientation and guarantees time-forward progression during timeline navigation.
- **Consequences**: Scrubber positions $1, 2, 3, 4$ map monotonically to chronological observation timestamps.
- **Related Documentation**: `docs/DATA_SCHEMA.md`, `docs/SRS.md`.

---

### ADR-008: Timeline Playback End-of-Sequence Behavior

- **Status**: **Accepted**
- **Context**: Determining what happens when automated playback reaches the final observation frame.
- **Decision**: Automated playback steps at a **1200ms** configurable default interval. When playback increments to the final observation (`sequence === 4`), the timer **stops automatically** and returns the playback toggle to "Play". Infinite looping is prohibited.
- **Rationale**: An astronomical observation sequence represents a discrete historical progression. Pausing on the final observation allows the user to inspect the latest state rather than looping abruptly back to epoch 1.
- **Consequences**: Users can re-play the sequence by scrubbing or clicking "Play" again.
- **Related Documentation**: `docs/SRS.md`, `docs/UI_SPECIFICATION.md`.

---

### ADR-009: Scientific Data Integrity and Mock Provenance

- **Status**: **Accepted**
- **Context**: The challenge requires demonstrating SPHEREx concepts using mock data while maintaining scientific credibility.
- **Decision**:
  - Separate verified astronomical target facts (object names, constellations, catalog coordinates from SIMBAD, Gaia DR3, NASA/IPAC WISE) from synthetic observation data.
  - Do not apply blanket `isMock: true` to factual target records; attach `"isMock": true` specifically to synthetic observation frames, timestamps, and images.
  - Exclude fabricated telemetry (wavelength channels, exposure times, detector temperatures) from the MVP schema and UI.
- **Rationale**: Upholds NASA Space Apps Challenge ethical standards and prevents misrepresenting synthetic demonstration graphics as genuine observatory discoveries.
- **Consequences**: Clear, layered data model with factual targets and synthetic observations.
- **Related Documentation**: `docs/DATA_SCHEMA.md`, `docs/DATA_SOURCES.md`, `AGENTS.md`.

---

### ADR-010: Automated Testing Policy Without External Dependencies

- **Status**: **Accepted**
- **Context**: The project prohibits unapproved npm packages, yet requires reliable verification of coordinate mathematics, range validation, and service logic.
- **Decision**:
  - Use Node.js built-in test runner (`node:test` and `node:assert`) for pure JavaScript unit testing of `coordinates.js` and `observationService.js`.
  - Use browser-based manual acceptance testing for React interactions, responsive layout, and timeline controls.
  - Use `npm run build` for build and bundle verification.
  - Do not install Vitest, Jest, or React Testing Library during MVP.
- **Rationale**: Provides fast, zero-dependency automated testing without modifying `package.json`.
- **Consequences**: Unit tests run via standard `node --test` scripts without third-party packages.
- **Related Documentation**: `docs/ACCEPTANCE_CRITERIA.md`, `docs/TASKS.md`.

---

### ADR-011: Dedicated UI/UX Phase Separation

- **Status**: **Accepted**
- **Context**: Ensuring visual and interaction quality before component development begins.
- **Decision**: Formally mandate **Phase 3 (Dedicated UI/UX Design)** as an independent phase that must be completed and approved before Phase 5 (Frontend Development). No React component code may be written during Phase 3.
- **Rationale**: Separates design thinking (information architecture, wireframes, accessibility contrast, responsive layout) from code implementation, avoiding premature UI decisions.
- **Consequences**: Frontend implementation is blocked until Phase 3 design artifacts are approved.
- **Related Documentation**: `docs/TASKS.md`, `docs/ACCEPTANCE_CRITERIA.md`, `AGENTS.md`.

---

### ADR-012: Git Safety and Antigravity Agent Governance

- **Status**: **Accepted**
- **Context**: Establishing clear guidelines for AI agent operations within Antigravity to prevent destructive commands, unwanted commits, and architectural drift.
- **Decision**:
  - Deploy modular rule files in `.agents/rules/` (`project-scope.md`, `architecture-boundaries.md`, `scientific-data-integrity.md`, `ui-ux-standards.md`, `engineering-standards.md`, `verification.md`, `git-safety.md`).
  - Deploy agent skills in `.agents/skills/` (`documentation-audit/`, `phase-gate-review/`).
  - Ban destructive Git commands (`git reset`, `git clean`).
  - Prohibit automatic Git commits and pushes.
  - Retain `AGENTS.md` as the primary project instruction document.
- **Rationale**: Enforces consistent, safe, and verifiable behavior across all agent turns.
- **Consequences**: All agent actions are constrained by documented governance rules.
- **Related Documentation**: `AGENTS.md`, `.agents/rules/`, `.agents/skills/`.
