# Product Requirements Document (PRD) — SPHEREx Explorer

**Project Name**: SPHEREx Explorer
**Event**: 2026 NASA Space Apps Challenge
**Status**: Requirements Finalized (Phase 2)
**Last Updated**: 2026-11-14

---

## 1. Product Objectives & Purpose

**SPHEREx Explorer** is a client-side web application designed for the 2026 NASA Space Apps Challenge. It allows users to enter celestial coordinates (Right Ascension and Declination), explore corresponding sequences of sky images across observation epochs, and navigate multi-epoch timelines for designated astronomical targets.

The core objectives are:
1. Provide an intuitive interface for exploring astronomical coordinates without requiring specialized astronomy software.
2. Demonstrate how astronomical observations evolve across discrete epochs (time sequences).
3. Showcase observations for the five designated NASA challenge objects using structured mock datasets.
4. Maintain strict scientific integrity by clearly separating verified astronomical target data from synthetic demonstration observations.

---

## 2. Target Audience & User Personas

1. **Astronomy Enthusiasts & Students**: Exploring celestial coordinates, learning about multi-epoch observation sequences, and studying target behaviors over time.
2. **General Public**: Accessing an engaging, responsive interface that visualizes celestial fields across discrete time epochs.
3. **Space Apps Challenge Evaluators**: Reviewing adherence to challenge requirements, data integrity, client-side architectural rigor, and UX quality.

---

## 3. Product Scope & The Five Challenge Objects

### 3.1 Five Challenge Objects (Mandatory)
The application must support all five designated NASA Space Apps Challenge objects:

1. **Barnard's Star**: High proper motion red dwarf in the constellation Ophiuchus.
2. **Epsilon Indi B**: Cold brown dwarf binary / substellar companion in the Epsilon Indi system.
3. **WISE 0855** (WISE J085510.83−071442.5): Sub-stellar ultra-cool brown dwarf.
4. **RW Aurigae**: Complex young binary T Tauri variable system exhibiting dramatic occultation events.
5. **R Draconis**: Mira-type long-period pulsating variable star in Draco.

> [!NOTE]
> **MVP Demonstration Volume (Internal Planning Decision)**:
> Each of the five targets will be planned with **four demonstration observations** (a total of 20 demonstration images across the application). This is an internal engineering and UX planning target for MVP richness, not an official NASA challenge constraint.

### 3.2 In-Scope (MVP)
- **Coordinate Input**: Direct input of Right Ascension (RA) and Declination (Dec) in decimal degrees ($0^\circ \le \text{RA} < 360^\circ$ and $-90^\circ \le \text{Dec} \le +90^\circ$).
- **Quick-Select Target Bar**: Instant selection buttons for all five challenge objects.
- **Coordinate-to-Field Matching**: Resolving user-entered coordinates to an available mock target field based on per-target coverage limits (determined in Phase 3/4).
- **Coordinate Transparency**: Clear interface distinction between the user's requested coordinates and the actual center coordinates of the matched target field.
- **Sky Image Viewport**: Display of synthetic observation images corresponding to the selected target and active observation epoch.
- **Timeline & Playback Controls**: Step Previous, Step Next, Scrubber slider, and Play/Pause automated playback (defaulting to 1200ms per frame, stopping automatically at the final observation).
- **Observation Metadata Readout**: Display of Target Name, Catalog Coordinates, Observation Timestamp (UTC), and Observation Sequence Index.
- **Scientific Integrity Indicators**: Prominent, persistent `MOCK DATA` indicators on all synthetic images, observation sequences, and timestamps.

### 3.3 Out-of-Scope (Strictly Enforced)
- Backend servers, external APIs, and database functionality.
- Real-time queries to NASA IPAC/IRSA, SIMBAD, NED, or MAST APIs.
- Scientific data reductions, flux calibration, light curve fitting, or spectrum analysis.
- Telemetry simulation (detector temperatures, pointing jitter, exposure times, wavelength center channels).
- User authentication, profiles, or server-side saved states.
- Third-party UI component libraries (Tailwind, Material UI, Bootstrap, etc.).

---

## 4. Key Functional Features

### 4.1 Coordinate Input & Validation
- **Input Fields**: Number/decimal inputs for RA and Dec in decimal degrees.
- **Validation**:
  - Right Ascension: $0.0 \le \text{RA} < 360.0$.
  - Declination: $-90.0 \le \text{Dec} \le +90.0$.
  - Immediate visual feedback on invalid bounds or non-numeric input.
- **Target Quick-Selection**: Buttons populated with all 5 challenge targets for direct exploration.

### 4.2 Coordinate Matching & Field Coverage
- User coordinates are evaluated against the available mock target fields.
- The matching limit is derived from explicit per-target mock field coverage (exact coverage radius to be formalized in Phases 3 and 4; no arbitrary universal radius is applied).
- If matched, the UI displays the target's image sequence while clearly indicating both the requested coordinates and the matched field's center coordinates.
- If outside coverage, a clear and helpful fallback informs the user and offers direct access to the 5 challenge objects.

### 4.3 Sky Image Viewer
- Displays the synthetic sky image for the active observation epoch.
- Maintains responsive aspect ratio with loading and error fallback states.
- Clear overlay displaying the active observation sequence index (e.g., `Observation 1 of 4`).

### 4.4 Timeline Controls & Playback
- **Sequential Stepping**: "Previous" disabled at the first epoch; "Next" disabled at the final epoch.
- **Automated Playback**:
  - Play/Pause toggle advancing observations chronologically.
  - Default stepping interval: **1200ms** (configurable).
  - **End-of-Sequence Behavior**: Playback stops automatically upon reaching the final observation (no infinite looping).
- **Direct Navigation**: Scrubber slider allowing immediate selection of any observation in the sequence.

### 4.5 Observation Metadata Readout
Focused strictly on MVP fields:
- Target Name & Verified Coordinates (sourced from official catalogs).
- Observation Sequence Index (e.g., `2 / 4`).
- Observation Timestamp (ISO 8601 UTC).
- Persistent `MOCK DATA` indicator.

---

## 5. Development Roadmap & Phasing

To guarantee high design and code quality, the project follows six sequential phases. **Phase 3 (Dedicated UI/UX Design) must be fully completed and approved before frontend implementation begins**:

1. **Phase 1 — Project Foundation** *(Completed)*: Scaffolding, repository setup, AGENTS.md, baseline docs, and build verification.
2. **Phase 2 — Requirements & Architecture** *(Current Phase)*: Specification finalization, schema design, and data contract approvals.
3. **Phase 3 — Dedicated UI/UX Design**: UX research, user flows, information architecture, wireframes, design system, high-fidelity UI design, and responsive design specifications. *(Zero code implementation)*.
4. **Phase 4 — Mock Data Preparation**: Fact-checking the 5 challenge targets, preparing verified coordinates, creating synthetic observation images (4 per target, 20 total), generating `mockTargets.json`, and defining field coverage boundaries.
5. **Phase 5 — Frontend Development**: React component development, custom hook implementation, utility math, and UI assembly based on the approved Phase 3 design.
6. **Phase 6 — Integration & QA**: Verification of functionality, timeline controls, coordinate matching, cross-browser responsiveness, accessibility (WCAG AA), and scientific integrity audits.
