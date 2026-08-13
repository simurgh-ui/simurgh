# Release-candidate UI observation worksheet

Use a clean consumer application and the published documentation only. Record the browser, operating
system, framework, package version, screen reader, and date. Do not use repository source as guidance
during the tasks.

## Session details

- Tester:
- Date:
- Release candidate:
- Framework and version:
- Browser and version:
- Operating system:
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

## 200% zoom and viewport

- Set browser zoom to 200% at a 1280 × 720 CSS-pixel window.
- Repeat at 390 × 420 and 390 × 844 without page zoom.
- Check the Form, open Dialog, Select, component navigation, code examples, and API tables.

Pass when content reflows without two-dimensional page scrolling, clipping, overlap, or unreachable
controls. Local scrolling inside intentionally scrollable code and table regions is acceptable when
the region is keyboard reachable.

Observation:

## Keyboard and focus appearance

- Navigate from the skip link through page navigation, preview controls, framework tabs, copy
  controls, and the next-page link without using a pointer.
- Verify focus is never hidden by sticky content and remains visible in light, dark, and Windows
  forced-colors modes.
- Open a Dialog, move through its controls, dismiss with Escape, and verify trigger focus restoration.

Pass when focus order follows the visual and semantic reading order and every focused control has a
clearly visible indicator.

Observation:

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

## Sign-off

- [ ] All task-based steps passed.
- [ ] 200% zoom and narrow/short viewport checks passed.
- [ ] Keyboard and focus-appearance checks passed.
- [ ] Screen-reader checks passed.
- [ ] Issues were filed with component, framework, browser, reproduction steps, and evidence.

Release decision and notes:
