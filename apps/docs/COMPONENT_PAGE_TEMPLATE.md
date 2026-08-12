# Component documentation template

Use this checklist for every file in `src/content/docs/components`. A component page is complete
only when a consumer can install, use, customize, and verify the component without reading its
source code.

## Required frontmatter

```yaml
---
title: Component name
description: One sentence describing the user problem and primary behavior.
---
```

## Required section order

1. **Overview** — when to use the component and, when relevant, when to choose another primitive.
2. **Preview** — a keyboard-operable rendering that demonstrates the default recipe.
3. **Installation** — CLI command, package import, and component-level CSS import.
4. **Anatomy** — required and optional parts, nesting rules, and rendered semantic elements.
5. **Usage** — complete Angular, React, and Vue examples, including imports and local state.
6. **API reference** — one framework tab per adapter with every public API and its type, default,
   description, and native-attribute behavior.
7. **State** — controlled/uncontrolled behavior, events, reset behavior, and form value if any.
8. **Customization** — recipe classes, stable `data-*`/ARIA hooks, CSS variables, and a headless
   example. State which element receives forwarded class/style/native attributes.
9. **Accessibility** — semantics, required accessible names, focus behavior, keyboard table, RTL,
   and reduced-motion behavior.
10. **Examples** — disabled, invalid, loading, asynchronous, dynamic, and form examples when they
    apply. Explicitly state when a common state is unsupported.
11. **Troubleshooting** — component-specific integration failures and their fixes.
12. **Related components** — links that help users choose the correct primitive.

## API table format

| API | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | — | Current controlled value. |

Use **Props and callbacks** for React, **Props, events, slots, and exposed methods** for Vue, and
**Inputs, outputs, projected content, and public methods** for Angular. Do not imply parity when an
adapter intentionally follows a different framework convention.

## Example rules

- Every example must include all component and stylesheet imports needed to paste it into an app.
- Prefer component subpath imports such as `@simurgh-ui/react/button`.
- Examples must compile in CI and must not refer to undeclared state or handlers.
- Show accessible names and descriptions in the first example, not only in an accessibility note.
- Describe observable behavior and emitted/submitted values after each non-trivial example.
- Document source-copy and package-consumption paths without mixing their import locations.

## Completion gate

- API entries match the exported TypeScript declarations and tested defaults in all three adapters.
- Preview and examples pass keyboard, RTL, dark-mode, and automated accessibility checks.
- Links, headings, package exports, and code examples pass the documentation CI checks.
- The page records the library version against which its API was verified.
