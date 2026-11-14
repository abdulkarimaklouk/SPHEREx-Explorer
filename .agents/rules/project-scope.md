---
description: Enforces project scope boundaries, MVP focus, and NASA challenge constraints.
trigger: always_on
---

# Project Scope Governance

## Scope Boundaries

1. **MVP Focus**: SPHEREx Explorer is strictly a client-side web application allowing users to input celestial coordinates, view corresponding sky image sequences across time, and navigate observation timelines.
2. **The Five Required Challenge Objects**:
   - Barnard's Star
   - Epsilon Indi B
   - WISE 0855
   - RW Aurigae
   - R Draconis
   All demonstration features must center on these five targets.
3. **Mock Data Scope**: All observation imagery, timestamps, sequence numbers, and mock coverage areas are synthetic demonstration data.
4. **Prohibited Capabilities**:
   - **No Backend / Database**: Do not introduce Node/Express/Python servers, SQL/NoSQL databases, or serverless functions.
   - **No Real API Integration**: No live network requests to NASA, IPAC/IRSA, SIMBAD, NED, or MAST endpoints during MVP.
   - **No Scientific Analysis**: No photometric flux calculations, redshift derivations, light-curve modeling, or spectral analysis.
   - **No Unrequested Features**: Confine development strictly to agreed requirements; do not build speculative screens or user management.
