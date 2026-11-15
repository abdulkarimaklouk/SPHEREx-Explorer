# 01 — UX Research & Proto-Personas

**Project**: SPHEREx Explorer
**Challenge**: 2026 NASA Space Apps Challenge
**Phase**: Phase 3 — Dedicated UI/UX Design (TASK-301)
**Status**: Design Hypothesis (Awaiting Review & Approval)
**Last Updated**: 2026-11-14

---

## 1. Executive Summary & Research Methodology

SPHEREx Explorer is a public-facing astronomy web application designed to allow users to explore multi-epoch astronomical sky observations for five designated celestial targets.

Because direct user testing is restricted during hackathon sprint conditions, this UX research document establishes **evidence-based proto-personas** and **user needs hypotheses** derived from:
1. The 2026 NASA Space Apps Challenge prompt constraints.
2. Verified domain characteristics of the five mandatory challenge objects (high proper motion stars, brown dwarf binaries, variable stars).
3. The cognitive mental models of astronomy hobbyists, students, and hackathon evaluators.

> [!IMPORTANT]
> **Assumption vs. Requirement Boundary**:
> The proto-personas and behavioral friction points documented here represent **design hypotheses** created to guide interface ergonomics. They are clearly distinguished from the immutable functional requirements established in [PRD.md](file:///C:/Users/Star/Desktop/nasa/docs/PRD.md) and [SRS.md](file:///C:/Users/Star/Desktop/nasa/docs/SRS.md).

---

## 2. Proto-Personas

### 2.1 Persona 1: Elena — The Astronomy Enthusiast & Amateur Observer

- **Background**: 34-year-old amateur astronomer and active member of a local astronomical society. Owns an 8-inch Dobsonian telescope; regularly checks astronomical sky maps, Stellarium, and variable star light curves on AAVSO.
- **Mental Model**: Conceives of the sky in equatorial celestial coordinates (Right Ascension and Declination). Understands stellar proper motion, parallax, and episodic variability.
- **Core Goals**:
  - Quickly target recognized celestial objects (such as Barnard's Star or R Draconis).
  - Inspect visual differences between observations across time (e.g., spotting displacement or brightness variation).
  - Understand the celestial coordinates upon which the observation field is centered.
- **Primary Tasks**:
  1. Click preset challenge targets and immediately inspect their multi-epoch image sequences.
  2. Type custom coordinates from personal observation logs to check if SPHEREx Explorer has coverage in that field.
  3. Control timeline pacing to visually detect temporal changes.
- **Technical Familiarity Assumptions**:
  - High comfort with decimal degrees and sexagesimal notation.
  - Familiar with astronomical naming conventions (e.g., `GJ 699`, `HIP`, `WISE`, `HD`).
  - Expects precise technical readouts (catalog source, UTC timestamps).
- **Potential Difficulties & Friction Points**:
  - **Friction 1**: Frustration if manual coordinates snap to a nearby target without clearly indicating that the image is centered on the catalog center rather than her exact input coordinates.
  - **Friction 2**: Annoyance if an interface mimics a generic dashboard with oversized cards and useless decorative metrics instead of prioritizing the astronomical image.
- **Expected Product Value**:
  - A clean, distraction-free "Observatory Field Desk" that provides rapid visual access to time-series sky frames.

---

### 2.2 Persona 2: Marcus — The Undergraduate Student & Science Learner

- **Background**: 20-year-old undergraduate physics student taking an introductory astrophysics elective. Curious about modern space observatories like SPHEREx, JWST, and Roman.
- **Mental Model**: Understands basic astronomical concepts (coordinates, light years, infrared spectrum) but lacks deep operational experience with astronomical catalogs or command-line FITS viewers.
- **Core Goals**:
  - Understand how astronomical surveys capture the sky across discrete time epochs.
  - Explore the five challenge objects to see what makes them scientifically interesting (e.g., why WISE 0855 is cold, why RW Aurigae dims).
  - Learn how Right Ascension and Declination correspond to real celestial directions.
- **Primary Tasks**:
  1. Launch the application and click on pre-configured challenge targets.
  2. Read educational summaries explaining what each object is.
  3. Use timeline playback (Play/Pause) to watch observations advance chronologically.
  4. Experiment with entering RA/Dec numbers to see how coordinate validation works.
- **Technical Familiarity Assumptions**:
  - Moderate web literacy; comfortable with interactive web tools.
  - Needs clear validation feedback if typing invalid coordinates (e.g., typing Dec > 90°).
  - Relies on clear labeling to understand what "Epoch / Sequence" means.
- **Potential Difficulties & Friction Points**:
  - **Friction 1**: Confusion if timestamps or sequence steps are presented cryptically without plain-language context.
  - **Friction 2**: Potential misunderstanding of synthetic demonstration images as genuine live NASA data unless clearly warned.
- **Expected Product Value**:
  - An educational, intuitive showcase that demonstrates multi-epoch survey astronomy without cognitive friction.

---

### 2.3 Persona 3: Dr. Aris — The Citizen Science Evaluator & Space Apps Judge

- **Background**: 42-year-old computational astrophysicist and technical evaluator for the NASA Space Apps Challenge. Reviews dozens of hackathon submissions for technical rigor, user experience, and scientific credibility.
- **Mental Model**: Highly critical of visual fluff, fake scientific claims, and sloppy engineering. Values architectural discipline, transparency, and accessible design.
- **Core Goals**:
  - Rapidly evaluate whether the submission meets all mandatory challenge requirements.
  - Verify that the five challenge objects are present and factually sourced.
  - Check whether coordinate validation and matching function deterministically.
  - Confirm that synthetic demonstration data is explicitly labeled and never misrepresented as authentic mission discoveries.
- **Primary Tasks**:
  1. Stress-test coordinate inputs: boundary values (RA 0°, 359.99°, Dec -90°, +90°), out-of-bounds numbers, and non-numeric strings.
  2. Test timeline playback: check that auto-play stops at observation 4 without crashing or looping infinitely.
  3. Audit coordinate transparency: verify that requested coordinates are displayed separately from catalog center coordinates.
  4. Inspect accessibility, contrast, and mobile responsiveness.
- **Technical Familiarity Assumptions**:
  - Expert familiarity with software architecture, astronomical coordinates, and UX standards.
  - Immediately spots generic AI-generated aesthetics (purple gradients, neon glowing cards).
- **Potential Difficulties & Friction Points**:
  - **Friction 1**: Rejection of the project if mock data claims to represent real SPHEREx photometric observations.
  - **Friction 2**: Disqualification if UI components are coupled directly to data storage or if basic keyboard navigation fails.
- **Expected Product Value**:
  - A rock-solid, scientifically honest, and aesthetically refined scientific workstation interface.

---

## 3. Persona Comparison & Design Implications

| Attribute | Elena (Enthusiast) | Marcus (Learner) | Dr. Aris (Evaluator) | Design Implication |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Interaction Mode** | Target pills + Coordinate search | Target pills + Automated playback | Edge-case input testing & inspection | Interface must support both instant presets and rigorous input validation. |
| **Key Visual Element** | The sky image viewport | Play/Pause & epoch indicator | Metadata accuracy & mock banners | Central image must dominate, flanked by precise metadata and a prominent disclaimer. |
| **Tolerance for Fluff** | Very Low | Moderate | Zero | Eliminate decorative cards, glowing borders, and fake KPIs. |
| **Coordinate Expectation** | Exact vs Matched distinction | Intuitive bounds guidance | Strict boundary enforcement | Implement explicit Coordinate Transparency readout. |

---

## 4. Key UX Risks & Mitigations

### UX Risk 1: Coordinate Discrepancy Confusion
- **Risk**: A user inputs `RA 269.45, Dec 4.69`, and the viewer displays Barnard's Star centered at `RA 269.452, Dec 4.693`. If the interface simply says "Showing Barnard's Star", the user may assume the image was dynamically generated or centered on their exact coordinates.
- **Mitigation**: Implement **Coordinate Transparency**: The UI prominently displays:
  - `Requested Coordinates: RA 269.450°, Dec +4.690°`
  - `Target Field Center: RA 269.452°, Dec +4.693°`
  - `Field Coverage Status: Requested coordinates fall within target demonstration field coverage`

### UX Risk 2: Misrepresenting Mock Data as Real SPHEREx Observations
- **Risk**: An evaluator or student mistakes the demonstration frames for real SPHEREx science products.
- **Mitigation**: Apply a three-tier disclosure strategy:
  1. Global masthead persistent badge: `MOCK DATA ONLY — DEMO MODE`.
  2. Viewport sequence watermark tag: `Simulated Demonstration Frame`.
  3. Metadata card explicit breakdown: separating factual catalog references from synthetic observation timestamps.

### UX Risk 3: Disorienting Playback Loops
- **Risk**: Continuous auto-playback loops back to observation 1 without pausing, causing visual confusion when studying directional proper motion or transient dimming.
- **Mitigation**: Enforce **Deterministic Auto-Stop**: When playback reaches Observation 4 (final epoch), it automatically halts, resets the button to "Play", and highlights the final state.

### UX Risk 4: Overcrowded Instrumentation on Mobile Viewports
- **Risk**: Displaying search, image, metadata, and timeline simultaneously on a 390px mobile screen leads to illegible text and clipped controls.
- **Mitigation**: Employ an asymmetric responsive layout that reflows from a 3-zone desktop console into a stacked scientific atlas on mobile, keeping the sky image pinned near the top and timeline controls accessible via large touch targets ($\ge 44\times 44\text{px}$).
