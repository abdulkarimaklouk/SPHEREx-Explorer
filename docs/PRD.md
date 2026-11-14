# Product Requirements Document (PRD) — SPHEREx Explorer

**Project Name**: SPHEREx Explorer  
**Event**: 2026 NASA Space Apps Challenge  
**Status**: Initial Project Setup  
**Last Updated**: 2026-11-14  

---

## 1. Product Objectives & Purpose

**SPHEREx Explorer** is a lightweight, public-facing web application that enables users to input celestial coordinates (Right Ascension and Declination), explore corresponding sequences of astronomical sky images, and navigate observation timelines across multiple epochs.

The core objectives are:
1. Provide an intuitive interface for exploring astronomical coordinates without requiring specialized astronomy software.
2. Demonstrate how space observatory observations evolve across discrete epochs (time intervals).
3. Offer an educational and accessible showcase for NASA's SPHEREx mission concepts using structured mock datasets.

---

## 2. Target Audience & User Personas

1. **Astronomy Enthusiasts & Students**: Individuals interested in exploring astronomical coordinates, understanding celestial navigation, and learning about SPHEREx observations.
2. **General Public**: Casual users looking for a clean, visual representation of deep-space observation sequences.
3. **Space Apps Challenge Evaluators**: Judges assessing architectural soundness, usability, code discipline, and adherence to scientific integrity.

---

## 3. Product Scope

### In-Scope (Phase 1)
- Input of celestial coordinates: Right Ascension (RA) and Declination (Dec).
- Preset demo astronomical targets for rapid coordinate testing.
- Visual sky display showing observation imagery corresponding to entered coordinates and selected observation epoch.
- Interactive timeline navigation (Previous, Next, Play/Pause, Epoch Scrubber).
- Readout of observation metadata (timestamp, epoch number, mock spectral band, simulated instrument settings).
- Prominent mock data indicators ensuring transparency.
- Pure client-side application using React and local JSON mock datasets.

### Out-of-Scope (Phase 1)
- Backend server or database implementation.
- User accounts, authentication, or personalized saved views.
- Real-time connection to live NASA or IPAC APIs.
- Real scientific FITS file processing or pipeline reductions.
- Image generation or scientific calculations on the fly.
- Arbitrary coordinate spherical-coordinate rasterization outside predefined mock fields.

---

## 4. Key Features

### 4.1 Coordinate Search & Target Selection
- Dual input fields for Right Ascension (RA) and Declination (Dec).
- Support for quick-selection buttons pre-loaded with demo targets.
- Clear error handling for invalid ranges or coordinates without available observation series.

### 4.2 Sky Image Viewer
- Central display area rendering sky image assets for the currently active observation epoch.
- High-contrast visual container optimized for astronomical imagery.
- Image loading and fallback states.

### 4.3 Timeline & Epoch Navigation
- Interactive controls to move chronologically forward and backward across observation epochs.
- Play/Pause toggle for animated sequence playback.
- Visual scrubber or step indicator showing active epoch relative to total available observations.

### 4.4 Observation Info Panel
- Displays metadata for the currently viewed observation.
- Attributes include: RA/Dec, Observation Date/Time (UTC), Epoch Index, Spectral Band, Exposure Time, and explicit Mock Data indicator.

---

## 5. Items Requiring Confirmation

> [!NOTE]
> The following product requirements require formal confirmation during the next development phase:

1. **Coordinate Format Support**: Confirm whether coordinate input is restricted to decimal degrees (e.g., `RA: 180.00`, `Dec: +45.00`) or if sexagesimal notation (`HH:MM:SS`, `DD:MM:SS`) is required in Phase 1 [Requires Confirmation].
2. **Coordinate Tolerance / Snapping**: Confirm the angular tolerance (in arcminutes/degrees) for matching user-entered coordinates against mock targets [Requires Confirmation].
3. **SPHEREx Spectral Bands**: Confirm which of the 6 SPHEREx detector bands (covering 0.75 µm to 5.0 µm) should be represented in the mock observation metadata [Requires Confirmation].
4. **Playback Speed**: Confirm the default playback interval for the timeline auto-play feature (e.g., 1000ms vs 1500ms per epoch) [Requires Confirmation].
