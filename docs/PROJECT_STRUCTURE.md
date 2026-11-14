# Project Structure & File Responsibilities — SPHEREx Explorer

**Project**: SPHEREx Explorer
**Challenge**: 2026 NASA Space Apps Challenge
**Status**: Architecture Baseline (Phase 2 Finalized)
**Last Updated**: 2026-11-14

---

## 1. Directory Tree Overview

```text
spherex-explorer/
│
├── public/
│   ├── images/
│   │   └── demo/                 # Static demo sky images (20 synthetic images, 4 per object)
│   └── vite.svg                  # Vite standard favicon
│
├── src/
│   ├── assets/                   # Build-time static assets (logos, icons)
│   │
│   ├── components/               # Presentation UI components (stateless/visual)
│   │   ├── Header/               # App branding, title, persistent MOCK DATA banner
│   │   ├── SearchPanel/          # RA/Dec inputs and 5 challenge target buttons
│   │   ├── SkyViewer/            # Celestial image viewport & sequence overlay
│   │   ├── TimelineControls/     # Step controls, scrubber, and 1200ms play/pause
│   │   └── ObservationInfo/      # Target info (verified) vs observation metadata (mock)
│   │
│   ├── data/
│   │   └── mockTargets.json      # Canonical dataset for 5 challenge objects & 20 observations
│   │
│   ├── services/
│   │   └── providers/
│   │       └── MockDataProvider.js  # Single data provider module
│   │
│   ├── hooks/
│   │   └── useObservationExplorer.js # Application state coordinator hook
│   │
│   ├── utils/
│   │   └── coordinates.js        # Coordinate domain validation and angular distance math
│   │
│   ├── styles/
│   │   └── index.css             # Design tokens and base stylesheet
│   │
│   ├── App.jsx                   # Application root shell connecting hook to UI
│   └── main.jsx                  # React DOM mount entry point
│
├── docs/                         # Specifications, requirements & roadmap
│   ├── PRD.md                    # Product objectives, scope, 5 challenge targets
│   ├── SRS.md                    # Detailed functional & non-functional specifications
│   ├── ARCHITECTURE.md           # System architecture, data flow & custom hook design
│   ├── PROJECT_STRUCTURE.md      # Directory layout and file responsibilities
│   ├── DATA_SCHEMA.md            # Verified target & synthetic observation schema definitions
│   ├── UI_SPECIFICATION.md       # Layout wireframe, component states & transparency rules
│   ├── TASKS.md                  # 6-phase implementation roadmap
│   ├── ACCEPTANCE_CRITERIA.md    # Quality gates and verification criteria
│   ├── GLOSSARY.md               # Astronomical and technical terminology
│   └── DATA_SOURCES.md           # Factual provenance for 5 targets & mock attribution rules
│
├── AGENTS.md                     # Contributor & agent operating rules
├── README.md                     # Project overview and run instructions
├── index.html                    # Single page HTML entry point
├── package.json                  # Dependencies and build scripts
├── vite.config.js                # Vite build configuration
└── .gitignore                    # Version control ignore patterns
```

---

## 2. Directory & Module Responsibilities

### `public/images/demo/`
- Contains static synthetic demonstration images representing observation epochs for the five challenge targets (4 images per target, 20 images total).
- Served directly by the browser under the path `/images/demo/<filename>`.
- **Constraint**: All demonstration graphics must carry clear mock identification.

### `src/components/`
Modular presentation components. Components receive data and emit actions via props; they **never** access the data provider or raw JSON directly:
- `Header/`: Displays application branding, NASA challenge context, and a persistent `MOCK DATA` banner.
- `SearchPanel/`: Renders numeric decimal inputs for RA and Dec, displays inline validation feedback, and provides quick-selection buttons for all five challenge objects.
- `SkyViewer/`: Renders the synthetic sky image for the active observation sequence, handles image loading and error fallbacks, and displays an overlay tag with the observation sequence (e.g., `Observation 2 of 4`).
- `TimelineControls/`: Interactive controls for time navigation: Step Backward, Step Forward, Scrubber range slider, and Play/Pause toggle with automatic stop on the final observation.
- `ObservationInfo/`: Displays verified target information (name, constellation, reference coordinates) alongside synthetic observation metadata (timestamp, sequence number, mock status).

### `src/data/mockTargets.json`
- Canonical JSON file defining all five challenge objects and their four demonstration observation epochs.
- Enforces strict separation between verified astronomical facts (catalog coordinates and names) and synthetic observation data (marked `"isMock": true`).

### `src/services/providers/MockDataProvider.js`
- The single data provider module.
- Exposes:
  - `getPresetTargets()`: Returns the list of 5 challenge objects.
  - `getTargetById(targetId)`: Returns target record with observations sorted in ascending chronological order.
  - `findTargetByCoordinates(ra, dec)`: Resolves coordinates against documented per-target mock field coverage boundaries.

### `src/hooks/useObservationExplorer.js`
- Coordinates application-level state: active target, current observation index, play/pause timer (1200ms default), and coordinate search state.
- Ensures playback stops automatically when reaching the final observation.

### `src/utils/coordinates.js`
- Pure mathematical functions:
  - Validates coordinate bounds: $0.0 \le \text{RA} < 360.0$, $-90.0 \le \text{Dec} \le +90.0$.
  - Calculates spherical angular separation (great-circle distance).
  - Formats coordinates for display.

### `src/styles/`
- Central stylesheet (`index.css`) containing color tokens, typography, and responsive reset rules.

---

## 3. Placement & Development Conventions

1. **Strict Decoupling**: UI components must never import `src/data/` or `src/services/providers/`.
2. **File Location Discipline**: All code must reside strictly within the approved directories above. Do not create unapproved top-level folders.
3. **Phase Dependency**: No React components or CSS styling may be built until Phase 3 (Dedicated UI/UX Design) is formally completed and approved.
