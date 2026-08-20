# Release-candidate UI observation worksheet

Use a clean consumer application and the published documentation only. Record the browser, operating
system, framework, package version, screen reader, and date. Do not use repository source as guidance
during the tasks.

For the final five-person release-candidate cohort, copy
`research/release-candidate-study.template.json` into the ignored
`research/sessions/release-candidate` directory for each consented session. Record only structured
outcomes and whole-second timings. Run `pnpm research:release-candidate` after five sessions to
create the anonymized aggregate used by the documentation, journey, and adoption-timing gates.

## Session details

- Tester: Codex agent-run technical session (human sign-off still required)
- Date: 2026-08-18
- Release candidate: local workspace at `9a09e95`
- Framework and version: React 19.2.8
- Browser and version: Not applicable to the agent-run production-build step
- Operating system: Windows, Node.js 26.1.0, pnpm 11.16.0
- Screen reader and version:

## Task-based journey

1. Initialize a fresh application and install one component from its documentation page.
2. Change the primary and focus-ring theme tokens without editing library code.
3. Build a labeled required-email form with an associated error message.
4. Open and dismiss a Dialog using keyboard input; confirm focus returns to its trigger.
5. Handle one Checkbox change event and confirm its submitted form value.
6. Copy one component, add a product-specific data attribute, and complete a production build.

Pass when every task is completed without repository-source assistance. Record unclear wording,
dead ends, commands that need correction, and the time required for each task.

| Task                         | Pass/fail | Time | Evidence or issue |
| ---------------------------- | --------- | ---- | ----------------- |
| Install                      |           |      |                   |
| Theme                        |           |      |                   |
| Form                         |           |      |                   |
| Dialog                       |           |      |                   |
| Event and serialization      |           |      |                   |
| Copied-source edit and build |           |      |                   |

Agent-run technical evidence on 2026-08-18: a new temporary application was initialized through
the public CLI, the documented React components were added, theme tokens were overridden, the
copied Button source gained `data-product-component="release-candidate"`, and the complete form,
Checkbox event, Dialog, JavaScript, and CSS production bundle compiled successfully. Reproduce with
`pnpm test:release-candidate-copy`; machine-readable evidence is retained in
`artifacts/release-candidate-copied-source.json`. This evidence does not replace the remaining human
task-journey sign-off.

## 200% zoom and viewport

- Set browser zoom to 200% at a 1280 × 720 CSS-pixel window.
- Repeat at 390 × 420 and 390 × 844 without page zoom.
- Check the Form, open Dialog, Select, component navigation, code examples, and API tables.

Pass when content reflows without two-dimensional page scrolling, clipping, overlap, or unreachable
controls. Local scrolling inside intentionally scrollable code and table regions is acceptable when
the region is keyboard reachable.

Observation:

User-confirmed pass on 2026-08-13.

## Keyboard and focus appearance

- Navigate from the skip link through page navigation, preview controls, framework tabs, copy
  controls, and the next-page link without using a pointer.
- Verify focus is never hidden by sticky content and remains visible in light, dark, and Windows
  forced-colors modes.
- Open a Dialog, move through its controls, dismiss with Escape, and verify trigger focus restoration.

Pass when focus order follows the visual and semantic reading order and every focused control has a
clearly visible indicator.

Observation:

User-confirmed pass on 2026-08-13.

## Screen-reader observation

Use NVDA with Firefox or Chrome on Windows, or VoiceOver with Safari on macOS.

- Read the Form preview from its heading through the required Email field and Continue button.
- Submit the empty form and confirm the invalid field is identified and focused.
- Read the Radio Group label, selected state, and options; change the selection.
- Open the Dialog and confirm its role, name, description, contained navigation, dismissal, and
  restored trigger context.
- Trigger a Toast and confirm its status is announced once without moving focus.

Pass when names, roles, values, states, descriptions, errors, and live messages are announced once
and in context. Record the exact spoken output for any failure or ambiguity.

Observation:

User-confirmed pass on 2026-08-13.

## Sign-off

- [ ] All task-based steps passed.
- [x] 200% zoom and narrow/short viewport checks passed.
- [x] Keyboard and focus-appearance checks passed.
- [x] Screen-reader checks passed.
- [ ] Issues were filed with component, framework, browser, reproduction steps, and evidence.

Release decision and notes:
