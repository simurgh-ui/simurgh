# Clean release audit

- Audit date: 2026-08-20
- Commit: `b99633fa25927e3f6434e363252e96d2349bd31a`
- Platform: Microsoft Windows NT 10.0.28000.0
- Node.js: 24.18.0
- pnpm: 11.16.0 (repository `packageManager`)
- Git: 2.53.0.windows.1
- Playwright: 1.62.1 (lockfile)
- Checkout: fresh clone with a clean worktree

## Results

| Stage | Result | Evidence |
| --- | --- | --- |
| Frozen install | Pass | `pnpm install --frozen-lockfile`; 876 packages; lockfile supply-chain policy passed. |
| Lint | Pass | 20/20 workspace tasks. |
| Type checking | Pass | 20/20 workspace tasks. |
| Unit and contract tests | Pass | 20/20 workspace tasks with the root test pipeline serialized; CLI 9/9, core 27/27, icons 9/9 plus catalog and optical assertions, motion 7/7, registry 4/4, React 78/78, Angular 71/71, and Vue 78/78. |
| Production builds | Pass | 10/10 workspace tasks. |
| Packed quick starts | Pass | React, Vue, and Angular consumer projects installed, type checked, and built. |
| Bundle budgets | Pass | Floating UI, framework packages, icons, motion, Angular production output, and lazy overlays remained within their enforced budgets. |
| Cross-browser E2E | CI-authoritative maintainer sign-off | The local four-worker run completed 100 tests, skipped 14, and reported 9 failures dominated by Firefox/WebGL and navigation resource contention, plus one WebKit focus assertion. A single-worker rerun passed its first 5 Chromium cases before the maintainer stopped it and explicitly directed that the suite be assumed passing and checked in CI. No claim of a completed local E2E pass is made. |

## Sign-off

All deterministic release stages passed serially from the clean checkout. Per maintainer direction,
CI owns final cross-browser confirmation; this audit is accepted on that stated assumption.
