# @simurgh-ui/vue

## 1.0.0-beta.4

### Patch Changes

- Updated dependencies [36a646f]
- Updated dependencies [bf7181c]
  - @simurgh-ui/motion@0.2.0-beta.2

## 0.3.2-beta.3

### Patch Changes

- Publish the completed chart capability expansion with React, Vue, and Angular parity, specialty charts, large-data rendering, localization, accessibility contracts, and updated bundle budgets.
- Updated dependencies
  - @simurgh-ui/core@0.3.2-beta.1
  - @simurgh-ui/motion@0.1.3-beta.1

## 0.3.2-beta.2

### Patch Changes

- fbf7a0f: Move Vue Calendar keyboard focus after rendering with Vue's deterministic `nextTick` boundary.
  This avoids delayed animation-frame focus under heavy or instrumented workloads and keeps generated
  CLI components synchronized with the package implementation.

## 0.3.2-beta.1

### Patch Changes

- Give Toast viewports a named region role so their accessible label is valid while individual Toast
  status messages continue to announce without moving focus.

## 0.3.2-beta.0

### Patch Changes

- df95f0a: Declare the MIT license and complete the public repository metadata in every published package.
- 81b0d91: Lock document scrolling and make background content inert while a Dialog is open, with nesting-safe
  cleanup when dialogs close or are interrupted by adapter unmounts.
- 3c9b7f5: Add typeahead navigation to composite widgets, skip disabled Tabs triggers consistently, and keep
  Vue Tabs navigation reactive when orientation or direction changes.
- ffa7b93: Restore each form-capable component's initial value when its owning form resets, preserve native serialization and validation behavior, and avoid committing IME composition keystrokes in composite inputs.
- Updated dependencies [df95f0a]
- Updated dependencies [7b4848d]
- Updated dependencies [81b0d91]
- Updated dependencies [3c9b7f5]
- Updated dependencies [ffa7b93]
  - @simurgh-ui/core@0.3.2-beta.0
  - @simurgh-ui/motion@0.1.3-beta.0

## 0.3.1

### Patch Changes

- Add npm-facing package documentation with installation, quick-start, granular import, styling,
  and package-specific usage guidance.
- Updated dependencies
  - @simurgh-ui/core@0.3.1
  - @simurgh-ui/motion@0.1.2

## 0.3.0

### Minor Changes

- 8f9b16f: Replace Floating UI with a shared sub-5 KiB internal positioning engine. Positioned overlays retain offset, viewport flip and shift, RTL alignment, automatic updates, dismissal, and focus restoration without an additional runtime dependency.

### Patch Changes

- Updated dependencies [8f9b16f]
  - @simurgh-ui/core@0.3.0

## 0.2.0

### Minor Changes

- e5a636e: Add the tree-shakeable Simurgh Charts system with framework-neutral geometry, accessible React,
  Vue, and Angular adapters, optional Canvas, worker, streaming and motion entry points, source-copy
  CLI support, design tokens, and documentation.

### Patch Changes

- Updated dependencies [e5a636e]
  - @simurgh-ui/core@0.2.0

## 0.1.1

### Patch Changes

- Publish the current Simurgh UI source and refreshed compatible dependencies.
- Updated dependencies
  - @simurgh-ui/core@0.1.1
