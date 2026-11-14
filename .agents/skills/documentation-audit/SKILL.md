---
name: documentation-audit
description: Audits project documentation for contradictions, missing requirements, architectural consistency, and unsupported assumptions.
---

# Documentation Audit Skill

This skill provides an automated, structured process for reviewing SPHEREx Explorer documentation in `docs/` and `AGENTS.md` to guarantee conceptual consistency and adherence to approved architectural baselines.

## When to Run

- At the conclusion of requirements or architecture refinements.
- Before beginning a new development phase.
- Whenever specifications, data schemas, or coordinate matching policies are updated.

## Audit Workflow

### 1. Scope & Constraints Check
- Verify that features, schemas, and components remain strictly within the MVP scope.
- Ensure that prohibited items (backend, databases, live NASA APIs, scientific reductions, telemetry calculations) have not leaked into requirements.
- Confirm that the five mandatory challenge objects (Barnard's Star, Epsilon Indi B, WISE 0855, RW Aurigae, and R Draconis) are present.

### 2. Consistency & Cross-Reference Audit
- **Canonical Filenames**: Verify that all documentation references `src/data/mockTargets.json`, `src/services/observationService.js`, `src/services/providers/MockDataProvider.js`, `src/hooks/useObservationExplorer.js`, and `src/utils/coordinates.js`.
- **Coordinate Conventions**: Verify that all documents specify decimal degrees ($0.0 \le \text{RA} < 360.0$, $-90.0 \le \text{Dec} \le +90.0$).
- **Matching Rules**: Check that coordinate matching is framed around per-target mock field coverage (not an arbitrary universal threshold) and enforces coordinate transparency.
- **Timeline Behavior**: Confirm that timeline stepping defaults to 1200ms, organizes chronologically, and stops automatically at the final observation.

### 3. Data Integrity & Provenance Check
- Confirm clear distinction between factual astronomical target data (catalog coordinates from SIMBAD/Gaia/WISE) and synthetic observation demonstration data (`"isMock": true`).
- Verify that no fabricated physical values (wavelength channels, exposure times, detector telemetry) are included in the schema.

### 4. Assumptions & Open Questions Check
- Identify any unverified assumptions or unresolved decisions.
- Ensure they are explicitly labeled as `[Requires Confirmation]`, `Proposed`, or `Deferred`, rather than silently accepted.

## Deliverables

Produce an audit summary with:
1. File-by-file consistency status.
2. Contradictions or discrepancies detected.
3. Unsupported assumptions and their exact locations.
4. Corrective actions required.
