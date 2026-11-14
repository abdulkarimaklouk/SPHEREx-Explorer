---
name: phase-gate-review
description: Evaluates development phase prerequisites, deliverables, and acceptance criteria before transitioning to the next phase.
---

# Phase Gate Review Skill

This skill governs formal transitions between phases in the approved SPHEREx Explorer six-phase lifecycle, ensuring strict quality control and preventing premature implementation.

## The Six-Phase Lifecycle

1. **Phase 1 — Project Foundation** *(Completed)*
2. **Phase 2 — Requirements & Architecture** *(Current Phase)*
3. **Phase 3 — Dedicated UI/UX Design** *(Prerequisite for Phase 5)*
4. **Phase 4 — Mock Data Preparation** *(Prerequisite for Phase 5)*
5. **Phase 5 — Frontend Development**
6. **Phase 6 — Integration & QA**

## Phase Transition Protocol

### 1. Identify Phase & Gate
- Determine the completed phase and the prospective target phase.
- Identify all explicit prerequisites and acceptance criteria defined in `docs/TASKS.md` and `docs/ACCEPTANCE_CRITERIA.md`.

### 2. Verify Gate Criteria
- **Transition to Phase 3 (UI/UX Design)**:
  - Architecture and requirements finalized.
  - Core decisions recorded in `docs/DECISIONS.md`.
  - Zero application code written.
- **Transition to Phase 4 (Mock Data)**:
  - Phase 3 visual and structural wireframes approved.
  - Coordinate transparency UI model established.
  - Catalog sources for all five challenge targets verified.
- **Transition to Phase 5 (Frontend Development)**:
  - **Hard Gate**: Complete Phase 3 UI/UX design package formally signed off.
  - **Hard Gate**: Phase 4 canonical `mockTargets.json` and 20 demo images validated.
  - Prohibit any component coding if Phase 3 or Phase 4 is incomplete.
- **Transition to Phase 6 (Integration & QA)**:
  - All Phase 5 components and hooks implemented.
  - `npm run build` succeeds cleanly.
  - Pure JS unit tests pass with Node test runner.

### 3. Readiness Evaluation
- Inspect file tree to verify no unauthorized files or dependencies exist.
- Verify that `git status` shows no unresolved or uncommitted discrepancies.

## Deliverables

Produce a Phase Gate Readiness Report containing:
1. Current phase status and target phase.
2. Verification checklist against phase acceptance criteria.
3. List of unresolved blockers or incomplete dependencies.
4. Formal recommendation: `APPROVED TO PROCEED` or `GATE LOCKED (Action Required)`.
