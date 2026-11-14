# Architecture & Data Flow — SPHEREx Explorer

**Project**: SPHEREx Explorer
**Challenge**: 2026 NASA Space Apps Challenge
**Status**: Architecture Baseline (Phase 2 Finalized)
**Last Updated**: 2026-11-14

---

## 1. Architectural Overview

SPHEREx Explorer is designed as a focused, modular client-side Single-Page Application (SPA) built on React 18 and Vite. It maintains strict decoupling between presentation components, state management, and data access.

The core architectural layers are:
1. **Presentation Layer (`src/components/`)**: Clean, independent UI components purely responsible for rendering and emitting user actions. UI components **never** access JSON datasets or coordinate math directly.
2. **Application State Layer (`src/hooks/`)**: Centralized in the `useObservationExplorer` custom hook, coordinating active target selection, observation sequence indexing, timeline playback timers, and input validation without introducing unnecessary React Context.
3. **Data Provider Layer (`src/services/providers/`)**: Consolidated in a single `MockDataProvider` module that imports local static JSON (`src/data/mockTargets.json`) and exposes clean, queryable accessor methods.
4. **Utility Layer (`src/utils/`)**: Pure, stateless mathematical and formatting functions (`src/utils/coordinates.js`), including angular distance calculations and boundary checks.
5. **Static Assets (`public/images/demo/`)**: Local static demonstration images representing synthetic observation epochs.

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

    subgraph DomainUtils ["Utility Math Layer"]
        coordUtils["src/utils/coordinates.js<br/>- Domain validation (RA: 0-360, Dec: ±90)<br/>- Great-circle angular separation calculation"]
    end

    subgraph ServiceLayer ["Data Provider Layer"]
        MockDataProvider["src/services/providers/MockDataProvider.js<br/>- getPresetTargets()<br/>- getTargetById(targetId)<br/>- findTargetByCoordinates(ra, dec)"]
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

    useObservationExplorer --> MockDataProvider
    useObservationExplorer --> coordUtils

    MockDataProvider --> MockTargetsJSON
    MockDataProvider --> coordUtils
    SkyViewer -.-> DemoImages
```

---

## 3. Data Flow & State Lifecycle

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant SearchPanel as SearchPanel UI
    participant Hook as useObservationExplorer
    participant Utils as coordinates.js
    participant Provider as MockDataProvider
    participant Viewer as SkyViewer & Timeline

    User->>SearchPanel: Enter RA/Dec or click Challenge Target
    SearchPanel->>Hook: handleSearch(ra, dec) or handleSelectPreset(targetId)

    alt Preset Challenge Target Selected
        Hook->>Provider: getTargetById(targetId)
        Provider-->>Hook: Target object with 4 sorted observations
    else Coordinate Search Submitted
        Hook->>Utils: validateCoordinates(ra, dec)
        alt Invalid Bounds
            Utils-->>Hook: Validation Error (Out of Bounds)
            Hook-->>SearchPanel: Display inline validation message
        else Valid Bounds
            Hook->>Provider: findTargetByCoordinates(ra, dec)
            Provider->>Utils: calculateAngularDistance(ra1, dec1, ra2, dec2)
            alt Within Target Field Coverage Boundary
                Provider-->>Hook: Matched Target (with coverage details)
            else Outside All Mock Field Coverage
                Provider-->>Hook: null (No observation field found)
            end
        end
    end

    alt Target Matched / Loaded
        Hook->>Hook: Reset epoch index to 0, stop playback
        Hook-->>Viewer: Active observation, sequence (1/4), playback state
        Hook-->>SearchPanel: Update coordinates (show requested vs target center)
    else No Match
        Hook-->>SearchPanel: Set status: "No mock observation in this field"
    end

    opt User Toggles Playback
        User->>Viewer: Click Play
        Viewer->>Hook: togglePlay()
        loop Every 1200ms
            Hook->>Hook: Increment epoch index
            alt Reached Final Observation (Index === 3)
                Hook->>Hook: Clear timer, set isPlaying = false (Stop)
            end
            Hook-->>Viewer: Update active observation frame
        end
    end
```

---

## 4. Component & Module Responsibilities

### 4.1 `src/services/providers/MockDataProvider.js`
The single authoritative data access module. Responsibilities:
- `getPresetTargets()`: Returns an array of the five NASA challenge objects (`id`, `name`, `ra`, `dec`, `constellation`, `description`, `fieldCoverageDegrees`).
- `getTargetById(targetId)`: Retrieves the target record and ensures its observations are sorted in ascending chronological order by `timestamp`.
- `findTargetByCoordinates(ra, dec)`: Iterates through mock target fields, computes great-circle celestial separation against target center coordinates, and returns the target if the separation is within that target's documented coverage boundary. Returns `null` if outside all target coverage.

### 4.2 `src/utils/coordinates.js`
Pure, stateless utility functions:
- `validateCoordinates(ra, dec)`: Checks that RA and Dec are valid numbers and satisfy $0.0 \le \text{RA} < 360.0$ and $-90.0 \le \text{Dec} \le +90.0$.
- `calculateAngularDistance(ra1, dec1, ra2, dec2)`: Computes angular separation $\Delta\theta$ using the spherical law of cosines:
  $$\Delta\theta = \arccos\left(\sin(\delta_1)\sin(\delta_2) + \cos(\delta_1)\cos(\delta_2)\cos(\alpha_1 - \alpha_2)\right)$$
- `formatCoordinates(ra, dec)`: Standardizes coordinates for human-readable display.

### 4.3 `src/hooks/useObservationExplorer.js`
The central coordinator hook. It encapsulates:
- `activeTarget`: Currently selected challenge target or `null`.
- `currentObservationIndex`: Integer pointer ($0 \le \text{index} < N$, default 0).
- `isPlaying`: Boolean state controlling the automated playback interval timer.
- `searchCoordinates`: Object tracking requested coordinates `{ ra, dec }`.
- `searchError`: Message when coordinates are invalid or outside coverage.
- **Timer Management**: Handles `setInterval` at 1200ms, automatically clearing the timer and pausing when reaching the last observation index.

### 4.4 Presentation Components (`src/components/`)
- All components receive data and action callbacks via props from `App.jsx`.
- Components maintain no independent data caching, external state subscriptions, or timer side-effects.

---

## 5. Architectural Boundaries & Guardrails

1. **Decoupled UI**: Presentation components remain agnostic of JSON file paths, providers, and mathematical formulas.
2. **Transparent Coordinate Display**: The interface must visibly distinguish user requested coordinates from target field center coordinates whenever an observation is displayed.
3. **Zero Backend / Serverless**: No backend endpoints or remote storage.
4. **No Premature Context**: For this focused single-screen application, standard React hook composition in `App.jsx` prevents unnecessary Context re-render performance costs.
