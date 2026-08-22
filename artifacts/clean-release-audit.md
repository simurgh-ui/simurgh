# Clean release audit

- Audit date: 2026-08-22
- Commit: `02acf805994db15da0b433e8e8e4c38b3fdc286e`
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
| Cross-browser E2E | Pass | `pnpm exec playwright test --workers=1 --reporter=line`; 119 passed and 14 intentionally skipped in 6.2 minutes across Chromium, Firefox, WebKit, Android emulation, and iOS emulation. The mobile projects validate automated accessibility behavior only; this result does not claim physical TalkBack or VoiceOver coverage. |

## Sign-off

All deterministic release stages passed serially from the clean checkout. The complete local
cross-browser matrix now passes without an assumption-based sign-off. Physical mobile
assistive-technology observations remain tracked as a separate v1 requirement.
