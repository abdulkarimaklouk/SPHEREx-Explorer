# UI Specification — SPHEREx Explorer

**Project**: SPHEREx Explorer  
**Challenge**: 2026 NASA Space Apps Challenge  
**Status**: Specification & Wireframe Blueprint  
**Last Updated**: 2026-11-14  

---

## 1. Interface Layout & Visual Hierarchy

The application interface is structured as a focused single-view dashboard designed for high readability in astronomical dark-mode presentation.

```text
+-----------------------------------------------------------------------------------+
|  [LOGO] SPHEREx Explorer                      [ ⚠️ MOCK DATA ONLY — DEMO MODE ]   |
|  2026 NASA Space Apps Challenge                                                   |
+-----------------------------------------------------------------------------------+
|  COORDINATE SEARCH PANEL                                                          |
|  RA (0 - 360°): [ 270.00   ]   Dec (-90 - +90°): [ +66.56  ]   [ Search Target ]  |
|  Demo Targets:  [ North Ecliptic Pole ]  [ Galactic Center ]  [ Kepler Field ]    |
+-----------------------------------------------------------------------------------+
|                                        |                                          |
|  SKY OBSERVATION VIEWER                |  OBSERVATION METADATA                    |
|  +----------------------------------+  |  Target: North Ecliptic Pole (MOCK)     |
|  |                                  |  |  Coordinates: RA 270.00°, Dec +66.56°   |
|  |        [ SKY IMAGE VIEWPORT ]    |  |  Timestamp: 2026-02-01 12:00:00 UTC     |
|  |                                  |  |  Epoch: 1 of 6                          |
|  |  [ Epoch 1 / 6: 2026-02-01 ]     |  |  Band: Band 1 (0.75 - 1.20 µm)          |
|  |                                  |  |  Wavelength: 0.975 µm                   |
|  +----------------------------------+  |  Exposure: 120s                          |
|                                        |  Status: Simulated Observation           |
|                                        |                                          |
+----------------------------------------+------------------------------------------+
|  TIMELINE CONTROLS                                                                |
|  [ ⏮ First ]  [ ◀ Prev ]  [ ▶ Play ]  [ Next ▶ ]  [ Last ⏭ ]                     |
|  Timeline Scrubber:  ----(●)----------------------  Epoch 1 / 6                   |
+-----------------------------------------------------------------------------------+
```

---

## 2. Component Specifications

### 2.1 Header (`Header/`)
- **Title**: "SPHEREx Explorer".
- **Context Subtitle**: "2026 NASA Space Apps Challenge".
- **Mock Data Banner**: High-contrast, persistent indicator tag reading `MOCK DATA ONLY`.
- **Purpose**: Establishes identity, mission alignment, and transparency regarding data simulation.

### 2.2 Coordinate Search Panel (`SearchPanel/`)
- **Inputs**:
  - Right Ascension (RA): Text or number input with validation ($0^\circ \le \text{RA} < 360^\circ$).
  - Declination (Dec): Text or number input with validation ($-90^\circ \le \text{Dec} \le +90^\circ$).
- **Actions**:
  - "Search Target" button to trigger coordinate matching.
  - "Demo Targets" quick-selection pills to populate coordinates with verified mock records.
- **Feedback**: Inline validation notices for out-of-bounds values or coordinates without available imagery.

### 2.3 Sky Observation Viewer (`SkyViewer/`)
- **Main Viewport**: Renders the image corresponding to the selected observation epoch.
- **Overlay Badge**: Displays current epoch number and observation date.
- **States**:
  - *Loading State*: Subdued pulse or placeholder while the image loads.
  - *Loaded State*: High-resolution rendering within responsive aspect-ratio container.
  - *Error State*: Clear visual indicator if an image resource is unreachable.

### 2.4 Timeline Controls (`TimelineControls/`)
- **Playback Controls**:
  - Step Backward (`◀`) and Step Forward (`▶`): Navigate by single epoch increments.
  - Play/Pause toggle (`▶` / `⏸`): Automated stepping through observations at a fixed interval.
  - First / Last controls for jumping to sequence boundaries.
- **Scrubber / Slider**:
  - Horizontal range input or stepped indicator allowing direct scrubbing across epochs.
  - Labels indicating current epoch index and total epoch count (e.g., `Epoch 2 of 6`).

### 2.5 Observation Info Panel (`ObservationInfo/`)
- **Target Details**: Name, nominal celestial coordinates.
- **Epoch Parameters**: Date/time in ISO 8601 UTC format, simulated spectral band identifier, central wavelength, exposure time.
- **Disclaimers**: Explicit badge reiterating mock data status on every observation sheet.

---

## 3. Visual & Aesthetic Guidelines

- **Theme**: Deep space aesthetic (dark navy/slate background `#0b0f19`, neutral elevated cards `#1e293b`).
- **Accent Color**: Deep sky blue / NASA cyan (`#38bdf8`) for active states and highlights.
- **Typography**: Clean, sans-serif monospace or modern tabular numerals for coordinates and timestamps.
- **Responsiveness**: Fluid layout that stacks gracefully on mobile viewports and organizes side-by-side on desktop displays.

---

## 4. Items Requiring Confirmation

> [!NOTE]
> 1. **Image Zoom/Pan Interaction**: Confirm whether zoom/pan capabilities inside `SkyViewer` are desired in Phase 2 or if fixed fit is preferred [Requires Confirmation].
> 2. **Auto-play Speed Control**: Confirm whether user-adjustable playback speeds (e.g., 0.5x, 1x, 2x) should be included in the timeline controls [Requires Confirmation].
