---
description: Enforces engineering standards, code readability, naming conventions, and dependency constraints.
trigger: model_decision
---

# Engineering Standards Governance

## Code Quality & Engineering Discipline

1. **Small, Focused Modifications**:
   - Maintain incremental, reviewable changes. Avoid sweeping renames, large refactors, or touching unrelated modules.
2. **Naming & Domain Clarity**:
   - Use descriptive, intention-revealing names reflecting astronomical and software concepts (e.g., `observationService`, `MockDataProvider`, `useObservationExplorer`).
   - Suffix or document physical and mathematical units explicitly in coordinate utilities (e.g., `raDeg`, `decDeg`, `separationDegrees`).
3. **Single Responsibility**:
   - Every module must maintain one clear responsibility. Keep data-access adapters, domain services, custom hooks, and mathematical utilities cleanly partitioned.
4. **Clean, Idiomatic JavaScript**:
   - Write modern, readable ES Module JavaScript without overly clever or obfuscated constructs.
   - Prefer pure functions for mathematical and formatting utilities.
5. **Strict Dependency Discipline**:
   - Confine dependencies to React, Vite, and standard development tooling.
   - Do not install UI frameworks, CSS libraries, state management suites, or utility packages without explicit justification and prior approval.
6. **No Premature Abstractions**:
   - Build functionality incrementally as requirements solidify. Do not create placeholder abstractions or boilerplate layers that contain no active behavior.
