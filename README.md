# SPHEREx Explorer

A web application developed for the **2026 NASA Space Apps Challenge** to explore celestial observations from NASA's SPHEREx mission.

## Overview

**SPHEREx Explorer** is a public-facing, client-side web application designed to allow users to:
- Enter astronomical coordinates: Right Ascension (RA) and Declination (Dec) in decimal degrees.
- Explore observation fields for the five mandatory NASA challenge targets: **Barnard's Star**, **Epsilon Indi B**, **WISE 0855**, **RW Aurigae**, and **R Draconis**.
- View corresponding sequences of sky images across observation epochs.
- Navigate across observations over time using interactive timeline controls (Step, Play/Pause, Scrubber).
- Inspect observation metadata across different observation sequences.

> **Important Notice on Data Integrity**:
> - **Verified Target Data**: Target designations, physical types, and catalog coordinates are factual astronomical values sourced from official astronomical catalogs (SIMBAD, Gaia, WISE).
> - **Mock Observation Sequences**: The demonstration sky images, observation timestamps, sequence numbers, and mock field coverages are synthetic **MOCK DATA** created solely for client demonstration.

---

## Technology Stack

Strictly minimal and client-centric:

- **Framework**: [React](https://react.dev/) (v18+)
- **Build Tool**: [Vite](https://vite.dev/)
- **Language**: JavaScript (ES Modules / JSX)
- **Styling**: Standard CSS with design tokens
- **Data Source**: Local JSON mock dataset (`src/data/mockTargets.json`)

No backend, database, authentication, external APIs, or third-party UI component libraries are utilized.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.0.0 or higher recommended)
- `npm` (bundled with Node.js)

### Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone <repository-url>
cd spherex-explorer

# Install dependencies
npm install
```

### Running the Application

To start the local Vite development server:

```bash
npm run dev
```

Open your browser at the local URL printed in your terminal (typically `http://localhost:5173/`).

### Building for Production

To create a production-ready static build:

```bash
npm run build
```

The output will be generated in the `dist/` directory.

### Previewing Production Build

```bash
npm run preview
```

---

## Project Structure

```text
spherex-explorer/
│
├── public/
│   └── images/
│       └── demo/             # 20 synthetic demo sky images (4 per challenge target)
│
├── src/
│   ├── assets/               # Build-time static assets (logos, icons)
│   │
│   ├── components/           # UI Presentation components
│   │   ├── Header/           # Title and persistent mock data banner
│   │   ├── SearchPanel/      # Coordinate inputs (RA / Dec) & 5 challenge buttons
│   │   ├── SkyViewer/        # Sky image observation viewport
│   │   ├── TimelineControls/ # Epoch navigation & playback controls (1200ms default)
│   │   └── ObservationInfo/  # Target info (verified) vs observation metadata (mock)
│   │
│   ├── data/
│   │   └── mockTargets.json  # Canonical dataset for 5 targets & 20 observations
│   │
│   ├── services/
│   │   └── providers/
│   │       └── MockDataProvider.js # Single data provider module
│   │
│   ├── hooks/
│   │   └── useObservationExplorer.js # Application state coordinator hook
│   │
│   ├── utils/
│   │   └── coordinates.js    # Domain validation and angular distance math
│   │
│   ├── styles/
│   │   └── index.css         # Global CSS stylesheet and design tokens
│   │
│   ├── App.jsx               # Application root component
│   └── main.jsx              # React application entry point
│
├── docs/                     # Project specification & architectural docs
│   ├── PRD.md
│   ├── SRS.md
│   ├── ARCHITECTURE.md
│   ├── PROJECT_STRUCTURE.md
│   ├── DATA_SCHEMA.md
│   ├── UI_SPECIFICATION.md
│   ├── TASKS.md
│   ├── ACCEPTANCE_CRITERIA.md
│   ├── GLOSSARY.md
│   └── DATA_SOURCES.md
│
├── AGENTS.md                 # Agent and developer constraints & rules
├── README.md                 # Project introduction and setup guide
├── index.html                # HTML entry point
├── package.json              # Project metadata and dependencies
└── .gitignore                # Git ignore patterns
```

---

## Documentation

Comprehensive project documentation is maintained under the `docs/` folder:

| Document | Purpose |
| :--- | :--- |
| [PRD.md](docs/PRD.md) | Product objectives, users, scope, and five challenge targets |
| [SRS.md](docs/SRS.md) | Functional and non-functional requirements |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | System architecture, data flow, and custom hook design |
| [PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) | Directory structure and module responsibilities |
| [DATA_SCHEMA.md](docs/DATA_SCHEMA.md) | Target and observation schema definitions (verified vs mock) |
| [UI_SPECIFICATION.md](docs/UI_SPECIFICATION.md) | Interface layout, components, and coordinate transparency |
| [TASKS.md](docs/TASKS.md) | 6-phase implementation roadmap |
| [ACCEPTANCE_CRITERIA.md](docs/ACCEPTANCE_CRITERIA.md) | Quality gates and verification conditions |
| [GLOSSARY.md](docs/GLOSSARY.md) | Astronomical and technical terminology |
| [DATA_SOURCES.md](docs/DATA_SOURCES.md) | Catalog provenance for challenge targets and mock rules |

---

## Development Guidelines

All contributors and AI agents must review and strictly observe [AGENTS.md](AGENTS.md).
