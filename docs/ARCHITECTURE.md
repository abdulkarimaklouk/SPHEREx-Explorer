# Architecture & Data Flow — SPHEREx Explorer

**Project**: SPHEREx Explorer
**Challenge**: 2026 NASA Space Apps Challenge
**Status**: Architecture Baseline (Phase 2 Finalized & Hardened)
**Last Updated**: 2026-11-14

---

## 1. Architectural Overview

SPHEREx Explorer is designed as a modular client-side Single-Page Application (SPA) built on React 18 and Vite. It maintains strict decoupling between presentation components, state management, domain services, data adapters, and mathematical utilities.

The core architectural layers are:
1. **Presentation Layer (`src/components/`)**: Clean, independent UI components purely responsible for rendering and emitting user actions. UI components **never** access JSON datasets or coordinate math directly.
2. **Application State Layer (`src/hooks/useObservationExplorer.js`)**: Centralized custom hook coordinating active target selection, observation sequence indexing, timeline playback timers, and search status without introducing unnecessary React Context.
3. **Domain Service Layer (`src/services/observationService.js`)**: The application domain service owning target resolution, coordinate matching policies, and chronological observation sorting.
4. **Data Provider Layer (`src/services/providers/MockDataProvider.js`)**: The local data-access adapter isolating the application from physical JSON storage (`src/data/mockTargets.json`).
5. **Utility Layer (`src/utils/coordinates.js`)**: Pure, stateless mathematical functions, including numerically stable great-circle angular separation and boundary checks.
6. **Static Assets (`public/images/demo/`)**: Local static demonstration images representing synthetic observation epochs.

---

## 2. System Architecture Diagram

```mermaid
graph TD
    subgraph UI ["Presentation Layer (React Components)"]
        App["App.jsx (Root Shell)"]
        Header["Header Component<br/>- Branding & Persistent Mock Banner"]
        SearchPanel["SearchPanel Component<br/>- RA/Dec Inputs & 5 Challenge Target Buttons"]
        SkyViewer["SkyViewer Component<br/>- Observation Viewport & Sequence Tag"]
        TimelineControls["TimelineControls Component<br/>- Step Buttons, Scrubber, Play/Pause"]
        ObservationInfo["ObservationInfo Component<br/>- Verified Info vs Synthetic Metadata"]
    end

    subgraph StateLayer ["Application State Layer (Custom Hook)"]
        useObservationExplorer["useObservationExplorer Hook<br/>- Coordinates active target, epoch index, playback timer<br/>- Coordinates requested vs target coordinates"]
    end

    subgraph DomainService ["Domain Service Layer"]
        observationService["src/services/observationService.js<br/>- getPresetTargets()<br/>- getTargetById(targetId)<br/>- findTargetByCoordinates(raDeg, decDeg)"]
    end

    subgraph DataAdapter ["Data Provider Layer (Adapter)"]
        MockDataProvider["src/services/providers/MockDataProvider.js<br/>- loadTargets()"]
    end

    subgraph DomainUtils ["Utility Math Layer"]
        coordUtils["src/utils/coordinates.js<br/>- validateCoordinates(raDeg, decDeg)<br/>- angularSeparationDegrees(ra1Deg, dec1Deg, ra2Deg, dec2Deg)"]
    end

    subgraph DataStore ["Static Datasets & Assets"]
        MockTargetsJSON["src/data/mockTargets.json<br/>- 5 Challenge Objects<br/>- 4 Observations each (20 total)"]
        DemoImages["public/images/demo/*.png<br/>- Synthetic demonstration imagery"]
    end

    App --> Header
    App --> SearchPanel
    App --> SkyViewer
    App --> TimelineControls
    App --> ObservationInfo

    App --> useObservationExplorer

    useObservationExplorer --> observationService
    useObservationExplorer --> coordUtils

    observationService --> MockDataProvider
    observationService --> coordUtils

    MockDataProvider --> MockTargetsJSON
    SkyViewer -.-> DemoImages
```

---

## 3. Data Flow & Sequence

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant SearchPanel as SearchPanel UI
    participant Hook as useObservationExplorer
    participant Service as observationService
    participant Utils as coordinates.js
    participant Provider as MockDataProvider
    participant Viewer as SkyViewer & Timeline

    User->>SearchPanel: Enter RA/Dec or click Challenge Target
    SearchPanel->>Hook: handleSearch(ra, dec) or handleSelectPreset(targetId)

    alt Preset Challenge Target Selected
        Hook->>Service: getTargetById(targetId)
        Service->>Provider: loadTargets()
        Provider-->>Service: Raw target records
        Service-->>Hook: Target with 4 chronologically sorted observations
    else Coordinate Search Submitted
        Hook->>Utils: validateCoordinates(raDeg, decDeg)
        alt Invalid Bounds
            Utils-->>Hook: Validation Error (Out of Bounds)
            Hook-->>SearchPanel: Display inline validation message
        else Valid Bounds
            Hook->>Service: findTargetByCoordinates(raDeg, decDeg)
            Service->>Provider: loadTargets()
            Provider-->>Service: Raw target records
            Service->>Utils: angularSeparationDegrees(ra1, dec1, ra2, dec2)
            alt Within Configured Target Field Coverage
                Service-->>Hook: Match Result (Target, separation, center coordinates)
            else Outside All Mock Field Coverage
                Service-->>Hook: null (No observation field found)
            end
        end
    end

    alt Target Matched / Loaded
        Hook->>Hook: Reset observation index to 0, stop playback
        Hook-->>Viewer: Active observation frame (1 of 4), playback state
        Hook-->>SearchPanel: Display requested coordinates vs catalog center coordinates
    else No Match
        Hook-->>SearchPanel: Set status: "No mock observation in this field"
    end

    opt User Toggles Playback
        User->>Viewer: Click Play
        Viewer->>Hook: togglePlay()
        loop Every 1200ms
            Hook->>Hook: Increment observation index
            alt Reached Final Observation (Index === 3)
                Hook->>Hook: Clear timer, set isPlaying = false (Stop)
            end
            Hook-->>Viewer: Update active observation frame
        end
    end
```

---

## 4. Module Responsibilities & Contracts

### 4.1 Data Provider: `src/services/providers/MockDataProvider.js`
The physical data-access adapter.
- **Contract**: `loadTargets()`: Asynchronously or synchronously imports and returns raw target objects from `src/data/mockTargets.json`.
- **Restrictions**: Does not perform math, coordinate matching, filtering, sorting, or business rule evaluations.

### 4.2 Domain Service: `src/services/observationService.js`
The application domain logic owner.
- `getPresetTargets()`: Returns the five challenge target summaries for quick-select buttons.
- `getTargetById(targetId)`: Resolves target record and ensures observations are sorted in ascending chronological order by `timestamp`.
- `findTargetByCoordinates(raDeg, decDeg)`:
  - Iterates through available target fields.
  - Calls `angularSeparationDegrees(raDeg, decDeg, target.ra, target.dec)`.
  - Evaluates whether separation $\le \text{target.fieldCoverageDegrees}$.
  - If multiple fields match, selects the target with the minimum angular separation.
  - Returns a structured match object: `{ target, separationDegrees, requestedCoordinates: { ra: raDeg, dec: decDeg }, targetCenterCoordinates: { ra: target.ra, dec: target.dec } }`.
  - Returns `null` if no target field covers the requested coordinates.

### 4.3 Coordinate Utilities: `src/utils/coordinates.js`
Pure mathematical utility functions:
- `validateCoordinates(raDeg, decDeg)`: Ensures $0.0 \le \text{raDeg} < 360.0$ and $-90.0 \le \text{decDeg} \le +90.0$.
- `angularSeparationDegrees(ra1Deg, dec1Deg, ra2Deg, dec2Deg)`:
  Computes great-circle separation using a numerically stable spherical law of cosines formula:
  $$\Delta\theta = \arccos\left(\sin(\delta_1)\sin(\delta_2) + \cos(\delta_1)\cos(\delta_2)\cos(\alpha_1 - \alpha_2)\right)$$
  Correctly handles RA wraparound across the $0^\circ / 360^\circ$ boundary.

### 4.4 Custom Hook: `src/hooks/useObservationExplorer.js`
The central state coordinator:
- Manages `activeTarget`, `currentObservationIndex`, `isPlaying`, `searchCoordinates`, `matchDetails`, and `searchError`.
- Manages the 1200ms auto-playback interval and automatically clears it on observation 4.
- No direct JSON access or embedded mathematical formulas.

---

## 5. Architectural Guardrails

1. **Strict Service / Provider Partition**: Providers only read storage; services only execute domain rules.
2. **Coordinate Transparency**: The UI visibly displays requested coordinates alongside matched target center coordinates.
3. **Zero Backend**: All operations execute locally in the browser.
4. **No Premature Global Context**: Single-view application avoids React Context boilerplate.
