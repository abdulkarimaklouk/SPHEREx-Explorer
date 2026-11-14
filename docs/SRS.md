# Software Requirements Specification (SRS) — SPHEREx Explorer

**Project**: SPHEREx Explorer
**Challenge**: 2026 NASA Space Apps Challenge
**Version**: 0.2.0 (Phase 2 Architectural Baseline)
**Last Updated**: 2026-11-14

---

## 1. Introduction

### 1.1 Purpose
This Software Requirements Specification (SRS) defines the formal functional and non-functional requirements for the SPHEREx Explorer client-side web application.

### 1.2 Scope & Challenge Objects
The application allows users to enter astronomical coordinates in decimal degrees, resolve nearby celestial fields among five mandatory NASA Space Apps Challenge objects, and navigate a sequence of demonstration observations over time:
1. **Barnard's Star**
2. **Epsilon Indi B**
3. **WISE 0855**
4. **RW Aurigae**
5. **R Draconis**

Each object is planned with **four demonstration observations** (20 images total in the demonstration suite) as an internal MVP planning target.

---

## 2. Functional Requirements

### FR-01: Coordinate Input & Validation
- **FR-01.1**: The system shall provide dedicated input controls for Right Ascension (RA) and Declination (Dec) accepting decimal degrees.
- **FR-01.2**: RA values shall be validated within the mathematical domain:
  $$0.0^\circ \le \text{RA} < 360.0^\circ$$
- **FR-01.3**: Dec values shall be validated within the celestial domain:
  $$-90.0^\circ \le \text{Dec} \le +90.0^\circ$$
- **FR-01.4**: The system shall provide immediate, non-blocking visual validation messages when input values are non-numeric, empty, or out of range, preventing submission.
- **FR-01.5**: The system shall provide prominent quick-selection controls for all five mandatory NASA challenge targets.

### FR-02: Coordinate Matching & Field Resolution
- **FR-02.1**: Upon receiving valid coordinates, the system shall calculate the celestial separation against available mock target fields using spherical geometry (great-circle distance).
- **FR-02.2**: A target field shall be matched if the requested coordinates fall within that target's documented mock field coverage boundary.
  > [!IMPORTANT]
  > No arbitrary universal matching threshold (e.g., 2.0°) shall be applied. The matching threshold shall be derived from explicitly documented per-target mock field coverage (to be finalized during Phase 3 UI/UX and Phase 4 mock data design).
- **FR-02.3**: If the coordinates fall outside all mock field coverage boundaries, the system shall display an informative fallback state stating no mock observation is available for that field, and presenting direct links to the five challenge objects.
- **FR-02.4**: **Coordinate Transparency**: When a mock target field is displayed, the interface **must not** imply the image is centered on the user's requested coordinates unless they match exactly. The interface shall explicitly display:
  1. *Requested Coordinates* (user input).
  2. *Target Field Center Coordinates* (catalog reference position).

### FR-03: Sky Image Display
- **FR-03.1**: The system shall display the synthetic demonstration image corresponding to the active target and active observation sequence index.
- **FR-03.2**: The image viewport shall handle loading states with responsive layout preservation.
- **FR-03.3**: The system shall display an accessible visual fallback if an image asset fails to load.
- **FR-03.4**: The viewport shall render an overlay indicating the observation sequence index (e.g., `Observation 1 of 4`).

### FR-04: Timeline & Playback Navigation
- **FR-04.1**: Observation sequences shall be organized in strictly ascending chronological order based on UTC timestamps.
- **FR-04.2**: The system shall provide sequential navigation controls:
  - "Previous": Decrements observation index; **disabled** when at the first observation (`index === 0`).
  - "Next": Increments observation index; **disabled** when at the final observation (`index === N - 1`).
- **FR-04.3**: The system shall provide an automated "Play / Pause" toggle:
  - Default playback stepping interval: **1200ms** per observation (configurable).
  - **End-of-Sequence Rule**: When playback reaches the final observation (`index === N - 1`), automated playback **shall stop automatically** and return the toggle to "Play". The timeline shall **not** loop infinitely.
- **FR-04.4**: The system shall provide a visual scrubber slider allowing direct navigation to any observation in the sequence.

### FR-05: Observation Metadata Readout
- **FR-05.1**: The system shall display verified target identity: Target Name, Constellation, and Catalog Coordinates from documented factual sources.
- **FR-05.2**: The system shall display observation-specific parameters:
  - Observation Sequence Index (e.g., `3 of 4`).
  - Observation Timestamp (ISO 8601 UTC).
  - Explicit Mock Indicator.
- **FR-05.3**: **Excluded from Initial MVP**:
  - Wavelength center channels.
  - Exposure time.
  - Spectral band photometric measurements.
  - Detector engineering telemetry.
  - Scientific measurements or flux calibrations.
  *(These items are preserved for future real data integration and must not be fabricated).*

### FR-06: Scientific Integrity & Mock Status
- **FR-06.1**: Verified astronomical facts (target names, physical types, catalog coordinates) shall be distinguished from synthetic observation sequences.
- **FR-06.2**: All synthetic images, observation sequence indices, and observation timestamps must be explicitly identified with a persistent `MOCK DATA` indicator.
- **FR-06.3**: The application shall never claim or imply that synthetic demonstration graphics represent authentic SPHEREx observatory data.

---

## 3. Non-Functional Requirements

### NFR-01: Usability & Accessibility
- Interface elements must meet WCAG 2.1 AA standards (minimum contrast ratio 4.5:1 against dark backgrounds).
- All interactive controls (buttons, inputs, sliders) must be operable via standard keyboard navigation (`Tab`, `Enter`, `Space`, Arrows).

### NFR-02: Performance & Footprint
- Transitions between observation frames shall execute smoothly within 100ms.
- Initial client bundle shall remain lightweight (< 200 KB gzipped).

### NFR-03: Zero External Runtime Dependencies
- The application must operate fully client-side once loaded, with zero backend servers, zero database calls, and zero external live API requests.

---

## 4. Pending Specifications (Deferred to Phases 3 & 4)

1. **Per-Target Field Coverage Values**: Specific coverage radius parameters for each of the five targets will be defined during Phase 4 (Mock Data Preparation) based on the framing of the synthetic demonstration images.
2. **UI Layout and Component Styling**: Complete visual specifications, color tokens, and layout breakpoints will be established in Phase 3 (Dedicated UI/UX Design).
