---
description: Enforces separation of concerns between presentation, state, domain services, data providers, and utilities.
trigger: model_decision
---

# Architecture Boundaries Governance

## Architectural Layers & Separation of Concerns

1. **Presentation Layer (`src/components/`)**:
   - Pure UI rendering and dispatching user callbacks.
   - **Prohibited**: Direct JSON imports, coordinate distance math, data provider calls, or embedded business rules.
2. **Application State Layer (`src/hooks/useObservationExplorer.js`)**:
   - Coordinates React state: active target, observation sequence index, playback timers, and search states.
   - Interacts with `observationService.js` to resolve targets and coordinates.
   - **Prohibited**: Direct JSON access, embedded coordinate matching algorithms, or duplicated service logic.
3. **Domain Service Layer (`src/services/observationService.js`)**:
   - Owns target resolution, coordinate matching policies, and chronological observation ordering.
   - Exposes public domain methods: `getPresetTargets()`, `getTargetById(targetId)`, `findTargetByCoordinates(raDeg, decDeg)`.
4. **Data Provider Layer (`src/services/providers/MockDataProvider.js`)**:
   - Minimal data-access adapter isolating the application from physical JSON storage.
   - Exposes raw dataset loading (e.g., `loadTargets()`).
   - **Prohibited**: Angular math calculations, coordinate matching policies, business rules, or UI logic.
5. **Utility Layer (`src/utils/coordinates.js`)**:
   - Pure, stateless mathematical functions (`angularSeparationDegrees`).
   - Validates numerical bounds, handles RA wraparound, and maintains zero dependencies on React state or JSON files.
6. **No Premature Abstractions**:
   - Avoid global React Context or heavy state management suites for this single-view application.
   - Do not duplicate matching or target resolution functions across layers.
