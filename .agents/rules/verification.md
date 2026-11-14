---
description: Enforces verification discipline, task acceptance criteria checks, and testing integrity.
trigger: model_decision
---

# Verification Standards Governance

## Verification Protocol

1. **Verify Against Acceptance Criteria**:
   - Compare deliverables directly against the conditions defined in `docs/ACCEPTANCE_CRITERIA.md` before claiming completion.
2. **Execute Production Builds**:
   - Run `npm run build` whenever application code, styling, or configuration changes are made.
   - Confirm zero build errors, zero compiler warnings, and clean bundle output.
3. **Automated Testing Execution**:
   - Run unit tests for pure JavaScript mathematical and domain logic using Node.js built-in test runner (`node --test`).
   - Never report tests or builds as passed without actual execution evidence and exit codes.
4. **Pre-Completion Inspection**:
   - Execute `git status --short --branch` and inspect modified files with `git diff --stat` and `git diff --check`.
   - Ensure no unintended files, trailing whitespace, or temporary artifacts are left behind.
5. **Accurate Reporting**:
   - Document the exact commands run, outputs observed, and any known limitations or deviations in completion reports.
