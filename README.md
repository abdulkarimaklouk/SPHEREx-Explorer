# SPHEREx Explorer

A web application developed for the **2026 NASA Space Apps Challenge** to explore celestial observations from NASA's SPHEREx mission.

## Overview

**SPHEREx Explorer** is a public-facing, client-side web application designed to allow users to:
- Enter astronomical coordinates: Right Ascension (RA) and Declination (Dec).
- View corresponding sequences of sky images.
- Navigate across observations over time using interactive timeline controls.
- Inspect observation metadata across different observation epochs.

> **Important Notice**: The initial version of this application operates entirely on **MOCK DATA**. No live NASA APIs, external servers, or real scientific observation data are integrated at this phase. All imagery and metadata are synthetic for demonstration purposes.

---

## Technology Stack

Strictly minimal and client-centric:

- **Framework**: [React](https://react.dev/) (v18+)
- **Build Tool**: [Vite](https://vite.dev/)
- **Language**: JavaScript (ES Modules / JSX)
- **Styling**: Standard CSS with design variables
- **Data Source**: Local JSON mock datasets

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
│       └── demo/             # Static demo sky images for mock observations
│
├── src/
│   ├── assets/               # Build-time static assets (logos, icons)
│   │
│   ├── components/           # UI Presentation components
│   │   ├── Header/           # Title and mock data disclaimer
│   │   ├── SearchPanel/      # Coordinate inputs (RA / Dec)
│   │   ├── SkyViewer/        # Sky image observation viewport
│   │   ├── TimelineControls/ # Epoch navigation & playback controls
│   │   └── ObservationInfo/  # Active observation metadata panel
│   │
│   ├── data/                 # Mock astronomical JSON datasets
│   │
│   ├── services/             # Data provider abstractions
│   │   └── providers/
│   │
│   ├── hooks/                # Custom React hooks (timeline, coordinates)
│   │
│   ├── utils/                # Coordinate conversions and formatting helpers
│   │
│   ├── styles/               # Global CSS stylesheets and design tokens
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
| [PRD.md](docs/PRD.md) | Product objectives, users, scope, and key features |
| [SRS.md](docs/SRS.md) | Functional and non-functional requirements |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | System architecture and client-side data flow |
| [PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) | Directory structure and module responsibilities |
| [DATA_SCHEMA.md](docs/DATA_SCHEMA.md) | Mock target and observation data structures |
| [UI_SPECIFICATION.md](docs/UI_SPECIFICATION.md) | Interface layout, components, and expected behavior |
| [TASKS.md](docs/TASKS.md) | Ordered implementation roadmap |
| [ACCEPTANCE_CRITERIA.md](docs/ACCEPTANCE_CRITERIA.md) | Verification conditions for completed deliverables |
| [GLOSSARY.md](docs/GLOSSARY.md) | Astronomical and technical terminology |
| [DATA_SOURCES.md](docs/DATA_SOURCES.md) | Data provenance and official NASA reference documentation |

---

## Development Guidelines

All contributors and AI agents must review and strictly observe [AGENTS.md](AGENTS.md).
