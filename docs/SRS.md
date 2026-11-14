# Software Requirements Specification (SRS) — SPHEREx Explorer

**Project**: SPHEREx Explorer  
**Challenge**: 2026 NASA Space Apps Challenge  
**Version**: 0.1.0 (Template / Inception)  
**Last Updated**: 2026-11-14  

---

## 1. Introduction

### 1.1 Purpose
This Software Requirements Specification (SRS) establishes the complete functional and non-functional requirements for the SPHEREx Explorer client-side web application.

### 1.2 Scope
The software described herein is a browser-based Single-Page Application (SPA) built using React, Vite, and standard JavaScript/CSS. The software allows users to explore sequences of astronomical images based on sky coordinates using local mock datasets.

---

## 2. Functional Requirements

### FR-01: Coordinate Input & Validation
- **FR-01.1**: The system shall provide an input field for Right Ascension (RA) with decimal degree validation ($0^\circ \le \text{RA} < 360^\circ$).
- **FR-01.2**: The system shall provide an input field for Declination (Dec) with decimal degree validation ($-90^\circ \le \text{Dec} \le +90^\circ$).
- **FR-01.3**: The system shall provide clear, non-blocking visual feedback when input values are out of bounds or format is invalid.
- **FR-01.4**: The system shall provide quick-select buttons for pre-configured demo celestial targets.

### FR-02: Target Search & Selection
- **FR-02.1**: Upon submitting coordinates, the system shall query the local mock data provider for a matching celestial target or nearest field.
- **FR-02.2**: If a match is found, the system shall load the corresponding sequence of observations into the active application state.
- **FR-02.3**: If no matching observation sequence exists, the system shall display a friendly message indicating no mock data is available for those coordinates.

### FR-03: Sky Image Display
- **FR-03.1**: The system shall display the sky image corresponding to the active target and active observation epoch.
- **FR-03.2**: The image viewport shall handle image loading states gracefully.
- **FR-03.3**: The system shall display an accessible fallback state if an image fails to load.
- **FR-03.4**: The image viewport shall clearly display an overlaid or adjacent label indicating the active epoch.

### FR-04: Timeline & Sequence Navigation
- **FR-04.1**: The system shall allow sequential navigation between observations using "Previous" and "Next" controls.
- **FR-04.2**: The system shall disable "Previous" when at the first epoch, and disable "Next" when at the final epoch (unless loop mode is specified).
- **FR-04.3**: The system shall provide a "Play / Pause" toggle to advance through the observation sequence automatically.
- **FR-04.4**: The system shall provide a scrubber or stepped timeline bar allowing direct jump to any epoch in the sequence.

### FR-05: Observation Metadata Readout
- **FR-05.1**: The system shall display target metadata including target name/designation and nominal RA/Dec coordinates.
- **FR-05.2**: The system shall display epoch-specific metadata: Observation Timestamp (ISO 8601 UTC), Epoch Index (e.g., "Observation 3 of 6"), simulated Spectral Band, and Exposure Time.
- **FR-05.3**: All metadata readouts shall explicitly show a "MOCK DATA" tag.

### FR-06: Scientific Integrity & Mock Data Disclaimer
- **FR-06.1**: The system shall render a persistent banner or badge stating that all data and imagery shown are simulated/mock.
- **FR-06.2**: The application shall not present synthetic images or fake coordinates as real mission findings.

---

## 3. Non-Functional Requirements

### NFR-01: Usability & Accessibility
- Interface elements must meet WCAG 2.1 AA contrast requirements against dark celestial backgrounds.
- All interactive controls (buttons, inputs, timeline scrubbers) must be fully accessible via keyboard navigation.

### NFR-02: Performance
- Client-side transitions between observation epochs shall execute within 100 milliseconds (excluding initial asset load).
- Initial application bundle size shall remain minimal (< 300 KB uncompressed initial JS).

### NFR-03: Portability & Browser Support
- The application must function without degradation on modern evergreen desktop and mobile browsers (Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge).

### NFR-04: Zero External Runtime Dependencies
- The application must run completely offline once built, relying only on static assets contained in `public/` and `src/data/`.
- No runtime calls to external third-party CDNs, analytics, or remote API endpoints.

---

## 4. Requirements Requiring Confirmation

> [!NOTE]
> The following technical requirements are awaiting formal confirmation:

1. **Sexagesimal Coordinate Parsing**: Whether sexagesimal notation (e.g., `12h 30m 00s`, `+45° 15' 00"`) should be parsed and converted in Phase 1 [Requires Confirmation].
2. **Timeline Loop Behavior**: Whether the timeline playback should loop back to epoch 1 after reaching the final epoch or stop automatically [Requires Confirmation].
3. **Image Aspect Ratio & Sizing**: Confirm the fixed or responsive aspect ratio standard for mock image assets [Requires Confirmation].
