# AGENTS.md — Development Rules for SPHEREx Explorer

This file outlines the non-negotiable architectural rules, engineering standards, and constraints for all AI agents and contributors working on the **SPHEREx Explorer** project for the 2026 NASA Space Apps Challenge.

---

## 1. Core Operating Rules

1. **Follow documented project requirements**: Adhere strictly to the requirements defined in the `docs/` directory (`PRD.md`, `SRS.md`, `ARCHITECTURE.md`, `PROJECT_STRUCTURE.md`, `DATA_SCHEMA.md`, `UI_SPECIFICATION.md`, and `DECISIONS.md`).
2. **Do not invent scientific data or observations**: Never fabricate astronomical values, coordinate tables, spectral fluxes, or mission telemetry outside of the approved mock schema specifications.
3. **Separate verified target facts from synthetic observations**: Target names, constellations, and catalog coordinates must originate from documented astronomical sources (SIMBAD, Gaia, WISE) and must not be marked as synthetic. Synthetic observation images, sequence indices, and observation timestamps must be explicitly marked as MOCK (e.g., `isMock: true`). Do not place a blanket `isMock: true` on verified target records.
4. **Do not present mock images as real NASA data**: Any visual asset used during development or demonstration must be explicitly labeled as a mock or synthetic demonstration graphic. Never claim or imply simulated imagery is genuine SPHEREx observatory data.
5. **Do not introduce unrequested features**: Strictly limit work to the task in scope. Do not add speculative capabilities, extra screens, or superfluous controls.
6. **Do not add dependencies without justification**: Use only the approved minimal technology stack (React, Vite, JavaScript, CSS, local JSON). Do not install UI frameworks, CSS libraries, state management suites, or test packages without explicit justification and approval.
7. **Keep UI components separate from data services**: Presentation components must remain decoupled from data loading, filtering, and transformation logic. All data retrieval and coordinate matching must go through the domain service (`src/services/observationService.js`), backed by the data provider adapter (`src/services/providers/MockDataProvider.js`).
8. **Keep timeline logic separate from presentation**: Astronomical timeline sequencing, interval calculations, playback timers, and epoch indexing must be encapsulated in hooks (`src/hooks/useObservationExplorer.js`) or utilities (`src/utils/coordinates.js`), separate from rendering components in `src/components/TimelineControls/`.
9. **UI/UX Design Precedence**: Complete, dedicated UI/UX design (Phase 3) must be finished and approved before frontend component development (Phase 5) commences.
10. **Follow the approved project structure**: Place all new files strictly within the directories specified in `docs/PROJECT_STRUCTURE.md`. Do not create arbitrary top-level folders or bypass directory conventions.
11. **Keep changes small and reviewable**: Make incremental, focused modifications with clear rationale. Avoid large monolithic refactors or sweeping renames.
12. **Verify changes before reporting completion**: Always execute the appropriate verification steps (`npm run build`, Node built-in test runner `node --test` for pure JS logic) before marking a task as done. Never report a task complete without verification evidence.
13. **Do not modify unrelated files**: Confine changes to files directly relevant to the assigned prompt or feature ticket. Do not touch unrelated configurations or documentation without cause.
14. **Do not create backend or database functionality**: SPHEREx Explorer is designed as a standalone, client-side web application. Do not create backend servers (Node, Express, Python, etc.), databases, or server-side endpoints.
15. **Report any missing or ambiguous requirements instead of inventing them**: When encountering gaps or ambiguities in project specifications, clearly document and report them as items requiring confirmation rather than making unverified assumptions.

---

## 2. Technology Stack Constraints

- **Framework**: React 18+ (SPA)
- **Tooling**: Vite
- **Language**: JavaScript (ES Modules, JSX)
- **Styling**: Standard CSS (Modular or Vanilla with custom properties)
- **Data**: Static local JSON dataset (`src/data/mockTargets.json`)
- **Prohibited**: Backend engines, SQL/NoSQL databases, user authentication systems, external live APIs, heavy UI component libraries (Material UI, Ant Design, Tailwind, etc.).

---

## 3. Mission & Scientific Context

- **Mission**: NASA SPHEREx (Spectro-Photometer for the History of the Universe, Epoch of Reionization, and Ices Explorer).
- **Challenge**: 2026 NASA Space Apps Challenge.
- **The Five Mandatory Objects**: Barnard's Star, Epsilon Indi B, WISE 0855, RW Aurigae, and R Draconis.
- **Data Integrity**: SPHEREx is a planned/active NASA astrophysics mission. Accuracy regarding the distinction between real mission assets and mock demonstration data is paramount.
