# AGENTS.md — Development Rules for SPHEREx Explorer

This file outlines the non-negotiable architectural rules, engineering standards, and constraints for all AI agents and contributors working on the **SPHEREx Explorer** project for the 2026 NASA Space Apps Challenge.

---

## 1. Core Operating Rules

1. **Follow documented project requirements**: Adhere strictly to the requirements defined in the `docs/` directory (`PRD.md`, `SRS.md`, `ARCHITECTURE.md`, `PROJECT_STRUCTURE.md`, `DATA_SCHEMA.md`, and `UI_SPECIFICATION.md`).
2. **Do not invent scientific data or observations**: Never fabricate astronomical values, coordinate tables, spectral fluxes, or mission telemetry outside of the approved mock schema specifications.
3. **All initial observation data must be marked as MOCK**: Any simulated target, observation sequence, epoch timestamp, or instrument parameter must carry explicit identification indicating it is mock data (e.g., `isMock: true`).
4. **Do not present mock images as real NASA data**: Any visual asset used during development or demonstration must be explicitly labeled as a mock or synthetic demonstration graphic. Never claim or imply simulated imagery is genuine SPHEREx observatory data.
5. **Do not introduce unrequested features**: Strictly limit work to the task in scope. Do not add speculative capabilities, extra screens, or superfluous controls.
6. **Do not add dependencies without justification**: Use only the approved minimal technology stack (React, Vite, JavaScript, CSS, local JSON). Do not install UI frameworks, CSS libraries, state management suites, or utility packages without explicit justification and approval.
7. **Keep UI components separate from data services**: Presentation components must remain decoupled from data loading, filtering, and transformation logic. All data retrieval must go through service providers in `src/services/providers/`.
8. **Keep timeline logic separate from presentation**: Astronomical timeline sequencing, interval calculations, playback timers, and epoch indexing must be encapsulated in hooks (`src/hooks/`) or utilities (`src/utils/`), separate from rendering components in `src/components/TimelineControls/`.
9. **Follow the approved project structure**: Place all new files strictly within the directories specified in `docs/PROJECT_STRUCTURE.md`. Do not create arbitrary top-level folders or bypass directory conventions.
10. **Keep changes small and reviewable**: Make incremental, focused modifications with clear rationale. Avoid large monolithic refactors or sweeping renames.
11. **Verify changes before reporting completion**: Always execute the appropriate verification steps (`npm run build`, linting, unit tests) before marking a task as done. Never report a task complete without verification evidence.
12. **Do not modify unrelated files**: Confine changes to files directly relevant to the assigned prompt or feature ticket. Do not touch unrelated configurations or documentation without cause.
13. **Do not create backend or database functionality**: SPHEREx Explorer is designed as a standalone, client-side web application. Do not create backend servers (Node, Express, Python, etc.), databases, or server-side endpoints.
14. **Report any missing or ambiguous requirements instead of inventing them**: When encountering gaps or ambiguities in project specifications, clearly document and report them as items requiring confirmation rather than making unverified assumptions.

---

## 2. Technology Stack Constraints

- **Framework**: React 18+ (SPA)
- **Tooling**: Vite
- **Language**: JavaScript (ES Modules, JSX)
- **Styling**: Standard CSS (Modular or Vanilla with custom properties)
- **Data**: Static local JSON datasets only
- **Prohibited**: Backend engines, SQL/NoSQL databases, user authentication systems, external live APIs, heavy UI component libraries (Material UI, Ant Design, Tailwind, etc.).

---

## 3. Mission & Scientific Context

- **Mission**: NASA SPHEREx (Spectro-Photometer for the History of the Universe, Epoch of Reionization, and Ices Explorer).
- **Challenge**: 2026 NASA Space Apps Challenge.
- **Data Integrity**: SPHEREx is a planned/active NASA astrophysics mission. Accuracy regarding the distinction between real mission assets and mock demonstration data is paramount.
