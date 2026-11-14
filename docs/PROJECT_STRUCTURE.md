# Project Structure & File Responsibilities — SPHEREx Explorer

**Project**: SPHEREx Explorer  
**Challenge**: 2026 NASA Space Apps Challenge  
**Status**: Initial Project Specification  
**Last Updated**: 2026-11-14  

---

## 1. Directory Tree Overview

```text
spherex-explorer/
│
├── public/
│   ├── images/
│   │   └── demo/                 # Static demo sky images for mock observations
│   └── vite.svg                  # Vite standard favicon
│
├── src/
│   ├── assets/                   # Bundled static assets (logos, icons)
│   │
│   ├── components/               # Presentation UI components
│   │   ├── Header/               # Application header and mission branding
│   │   ├── SearchPanel/          # RA/Dec coordinate inputs and preset buttons
│   │   ├── SkyViewer/            # Canvas/viewport for current epoch sky image
│   │   ├── TimelineControls/     # Scrubber, play/pause, step controls
│   │   └── ObservationInfo/      # Metadata display panel for current observation
│   │
│   ├── data/                     # Static JSON mock datasets
│   │
│   ├── services/                 # Business logic and data access
│   │   └── providers/            # Data provider modules (MockDataProvider)
│   │
│   ├── hooks/                    # Custom React hooks (useTimeline, useCoordinates)
│   │
│   ├── utils/                    # Coordinate math, validation, and date formatters
│   │
│   ├── styles/                   # CSS style sheets and design variables
│   │
│   ├── App.jsx                   # Root application component shell
│   └── main.jsx                  # React DOM mount entry point
│
├── docs/                         # Project specifications and documentation
│   ├── PRD.md                    # Product objectives, users, scope, features
│   ├── SRS.md                    # Functional and non-functional requirements
│   ├── ARCHITECTURE.md           # Architecture and client-side data flow
│   ├── PROJECT_STRUCTURE.md      # Directory layout and file responsibilities
│   ├── DATA_SCHEMA.md            # Mock object and observation schema definitions
│   ├── UI_SPECIFICATION.md       # UI layout, sections, and behavior
│   ├── TASKS.md                  # Ordered implementation tasks
│   ├── ACCEPTANCE_CRITERIA.md    # Acceptance conditions for completed work
│   ├── GLOSSARY.md               # Astronomical and technical terminology
│   └── DATA_SOURCES.md           # Data provenance and NASA references
│
├── AGENTS.md                     # Non-negotiable contributor & agent rules
├── README.md                     # Getting started and project introduction
├── index.html                    # Single page HTML entry point
├── package.json                  # Dependencies and build scripts
├── vite.config.js                # Vite build configuration
└── .gitignore                    # Version control ignore rules
```

---

## 2. Directory Responsibilities

### `public/images/demo/`
- Holds static mock sky images (PNG, JPEG, WebP) representing observation frames.
- Served directly by the browser under the root path `/images/demo/<filename>`.
- **Constraint**: All images placed here must be labeled or documented as mock graphics.

### `src/components/`
Contains modular, reusable UI components. Each component resides in its own dedicated directory:
- `Header/`: Renders application title, mission banner, and prominent "MOCK DATA ONLY" badge.
- `SearchPanel/`: Handles coordinate input fields, format validation, submission triggers, and demo coordinate quick-select pills.
- `SkyViewer/`: Displays the observation image for the active epoch, with loading and error fallbacks.
- `TimelineControls/`: Contains the interactive scrubber, epoch index indicators, and playback buttons.
- `ObservationInfo/`: Displays the metadata table/readout for the currently selected observation.

### `src/data/`
- Contains static `.json` files representing mock astronomical targets and observation records.
- No network requests are made; these files are imported or read by the services layer.

### `src/services/providers/`
- Implements provider abstractions to query target observations by coordinate or ID.
- Keeps data parsing and filtering out of UI components.

### `src/hooks/`
- Contains reusable React custom hooks.
- Examples: `useCoordinates` (input handling and validation), `useTimeline` (epoch state, interval-based auto playback).

### `src/utils/`
- Pure utility functions:
  - Coordinate format conversions (decimal degrees, sexagesimal formatting).
  - Astronomical boundary validation.
  - Timestamp formatting (UTC ISO strings to readable formats).

### `src/styles/`
- Centralized CSS stylesheets, CSS custom properties (color palette, spacing, typography), and resets.

### `docs/`
- Living documentation tracking specifications, requirements, architecture, and verification records.

---

## 3. Placement Conventions

1. **New UI features** must be created inside `src/components/<ComponentName>/`.
2. **Business logic & calculation helpers** must be placed in `src/utils/` or `src/services/`.
3. **Stateful behavioral hooks** must be placed in `src/hooks/`.
4. **Mock data assets** must reside in `src/data/` (for JSON) and `public/images/demo/` (for images).
5. Never place business logic directly in top-level `App.jsx`.

---

## 4. Items Requiring Confirmation

> [!NOTE]
> 1. Confirm whether components should use CSS Modules (`ComponentName.module.css`) or standard scoped class naming [Requires Confirmation].
> 2. Confirm whether additional asset formats (e.g., SVG overlays for sky grids) will be placed in `src/assets/` [Requires Confirmation].
