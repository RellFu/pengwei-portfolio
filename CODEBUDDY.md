# CodeBuddy bootstrap

Before changing this repository:

1. Read `AGENTS.md`.
2. Read `docs/handoffs/2026-08-14-alibaba-portfolio.md`.
3. Verify the current branch and commit with `git status -sb` and `git log -1 --oneline`.
4. Run `npm run build` before editing.

## Branch safety

- Do not work on `main`.
- Create a new branch named `codebuddy/2026-08-14-alibaba-portfolio-next` from the handoff commit.
- Use a separate worktree. Do not edit the Codex worktree at `.worktrees/pengwei-portfolio-alibaba-preview`.
- Do not force push, reset, or overwrite unrelated changes.
- Before editing, report the intended files and the proposed change.

## Public portfolio boundaries

- The public product name is `Alpha`.
- Do not expose `Phai`, `行云`, the original product mark, internal URLs, local source paths, or confidential screenshots.
- Internal component and file names may still contain `phai`. These are implementation identifiers, not approved visitor-facing names.
- Do not use the em dash character in visitor-facing copy. Follow `AGENTS.md`.
- Treat local Alibaba source materials as read-only evidence. Never add raw documents or screenshots to this public repository.

## Validation before handoff

Run:

```bash
npm run lint
npm run build
git diff --check
```

Report the resulting commit SHA, validation results, and any remaining design questions.
