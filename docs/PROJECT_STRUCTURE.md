# Project Structure & File Responsibilities — SPHEREx Explorer

**Project**: SPHEREx Explorer
**Challenge**: 2026 NASA Space Apps Challenge
**Status**: Architecture Baseline (Phase 2 Finalized & Hardened)
**Last Updated**: 2026-11-14

---

## 1. Directory Tree Overview

```text
spherex-explorer/
│
├── .agents/                      # Antigravity governance and agent skills
│   ├── rules/                    # Focused engineering and quality rules
│   │   ├── project-scope.md
│   │   ├── architecture-boundaries.md
│   │   ├── scientific-data-integrity.md
│   │   ├── ui-ux-standards.md
│   │   ├── engineering-standards.md
│   │   ├── verification.md
│   │   └── git-safety.md
│   │
│   └── skills/                   # Reusable engineering skills
│       ├── documentation-audit/
│       │   └── SKILL.md
│       └── phase-gate-review/
│           └── SKILL.md
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
│   ├── services/                 # Domain business logic & data access
│   │   ├── observationService.js # Domain service: matching, target resolution, sorting
│   │   └── providers/
│   │       └── MockDataProvider.js # Data-access adapter: loads mockTargets.json
│   │
│   ├── hooks/
│   │   └── useObservationExplorer.js # Application state coordinator hook
│   │
│   ├── utils/
│   │   └── coordinates.js        # Domain validation and angular distance math
│   │
│   ├── styles/
│   │   └── index.css             # Design tokens and base stylesheet
│   │
│   ├── App.jsx                   # Application root shell connecting hook to UI
│   └── main.jsx                  # React DOM mount entry point
│
├── docs/                         # Specifications, requirements, architecture & decisions
│   ├── research/                 # Deep scientific research & technical guides (TASK-601)
│   │   ├── SOURCE_REGISTRY.md    # Permanent scientific source & citation registry
│   │   ├── SPHEREX_FITS_GUIDE.md # Multi-Extension FITS (6 HDUs), WCS, 102 channels guide
│   │   ├── IRSA_ARCHIVE_ACCESS.md# SIA2, TAP/ADQL, IBE, Cutout Tool, and S3 guide
│   │   ├── DATA_INGESTION_ARCHITECTURE.md # Ingestion options (A, B, C) & workflow
│   │   ├── WISEVIEW_INTERACTION_ANALYSIS.md # Interaction inspiration from Backyard Worlds
│   │   └── REAL_DATA_IMPLEMENTATION_ROADMAP.md # Future Phases A through I roadmap
│   ├── PRD.md                    # Product objectives, scope, 5 challenge targets
│   ├── SRS.md                    # Detailed functional & non-functional specifications
│   ├── ARCHITECTURE.md           # System architecture, data flow & custom hook design
│   ├── PROJECT_STRUCTURE.md      # Directory layout and file responsibilities
│   ├── DATA_SCHEMA.md            # Verified target & synthetic observation schema definitions
│   ├── UI_SPECIFICATION.md       # Layout wireframe, component states & transparency rules
│   ├── TASKS.md                  # Implementation roadmap & task breakdown
│   ├── ACCEPTANCE_CRITERIA.md    # Quality gates and verification criteria
│   ├── GLOSSARY.md               # Astronomical and technical terminology
│   ├── DATA_SOURCES.md           # Factual provenance for 5 targets & mock attribution rules
│   └── DECISIONS.md              # Architecture Decision Records (ADRs 001 - 014)
│
├── test/                         # Pure JavaScript unit and integration contract tests
│   ├── observationService.test.js# Coordinate matching and exact center unit tests
│   └── integrationContracts.test.js# Schema, normalization, math, and timeline contracts
│
├── AGENTS.md                     # Primary project instruction document
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
Modular presentation components receiving data and emitting callbacks via props:
- `Header/`: Application branding, challenge context, and persistent `MOCK DATA` banner.
- `SearchPanel/`: Numeric decimal inputs for RA and Dec, inline validation feedback, and quick-select buttons for all five challenge objects.
- `SkyViewer/`: Viewport for synthetic sky images, loading and error fallbacks, and sequence tag overlay (`Observation X of 4`).
- `TimelineControls/`: Interactive controls: Step Backward, Step Forward, Scrubber range slider, and Play/Pause toggle with automatic stop on the final observation.
- `ObservationInfo/`: Displays verified target information (name, constellation, reference coordinates) alongside synthetic observation metadata (timestamp, sequence number, mock status).

### `src/data/mockTargets.json`
- Canonical JSON dataset containing factual catalog data for all five challenge targets, paired with synthetic demonstration observation sequences (4 per target, 20 total).

### `src/services/observationService.js`
- Domain service owning application logic.
- Exposes:
  - `getPresetTargets()`: Returns summary list of 5 challenge objects.
  - `getTargetById(targetId)`: Resolves target record and ensures observations are sorted chronologically.
  - `findTargetByCoordinates(raDeg, decDeg)`: Matches user coordinates against available target fields using configured coverage limits.

### `src/services/providers/MockDataProvider.js`
- Local data-access adapter.
- Exposes `loadTargets()` to import and return raw target records from `mockTargets.json`.
- Maintains zero business logic, math calculations, or React state.

### `src/hooks/useObservationExplorer.js`
- Application state coordinator hook.
- Manages active target, current observation index, play/pause interval timer (1200ms default), and search state.

### `src/utils/coordinates.js`
- Pure mathematical functions:
  - `validateCoordinates(raDeg, decDeg)`: Boundary validation ($0 \le \text{RA} < 360$, $-90 \le \text{Dec} \le 90$).
  - `angularSeparationDegrees(ra1Deg, dec1Deg, ra2Deg, dec2Deg)`: Numerically stable great-circle separation with RA wraparound handling.

---

## 3. Automated Testing Structure

- Pure JavaScript modules (`src/utils/coordinates.js` and `src/services/observationService.js`) are tested using the built-in Node.js test runner (`node --test`).
- Tests are executed without adding external npm dependencies.
- Component and visual interactions are verified via browser-based manual testing against `docs/ACCEPTANCE_CRITERIA.md`.
