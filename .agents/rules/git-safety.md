---
description: Enforces Git safety, change preservation, commit discipline, and non-destructive operations.
trigger: always_on
---

# Git Safety Governance

## Version Control Protocol

1. **Pre-Change Status Check**:
   - Always run `git status --short --branch` before initiating file edits to understand existing repository state.
2. **Preserve User Modifications**:
   - Never overwrite, reset, discard, or delete existing user work or uncommitted changes.
   - If uncommitted changes exist, preserve them and report them in the completion summary.
3. **Destructive Command Ban**:
   - Never execute destructive Git commands, including `git reset --hard`, `git clean -f`, or `git checkout -- <file>`.
4. **Commit & Push Authorization**:
   - Never create Git commits automatically unless explicitly instructed by the user.
   - Never push (`git push`) or force-push (`git push --force`) to any remote.
   - Never alter the Git remote URL configuration without explicit instruction.
5. **Selective Staging**:
   - When staging is explicitly requested, stage specific modified files rather than blindly staging the entire working directory with `git add .`.
