# @simurgh-ui/cli

## 0.5.0-beta.4

### Minor Changes

- 36a646f: Add full Preact, Svelte, and Lit component catalogs with icons, motion, CLI source-copy, SSR/reference apps, package quick starts, and framework detection.

### Patch Changes

- Updated dependencies [36a646f]
  - @simurgh-ui/registry@0.4.0-beta.2

## 0.4.1-beta.3

### Patch Changes

- Publish the completed chart capability expansion with React, Vue, and Angular parity, specialty charts, large-data rendering, localization, accessibility contracts, and updated bundle budgets.
- Updated dependencies
  - @simurgh-ui/registry@0.3.2-beta.1

## 0.4.1-beta.2

### Patch Changes

- fbf7a0f: Move Vue Calendar keyboard focus after rendering with Vue's deterministic `nextTick` boundary.
  This avoids delayed animation-frame focus under heavy or instrumented workloads and keeps generated
  CLI components synchronized with the package implementation.

## 0.4.1-beta.1

### Patch Changes

- Give Toast viewports a named region role so their accessible label is valid while individual Toast
  status messages continue to announce without moving focus.

## 0.4.1-beta.0

### Patch Changes

- df95f0a: Declare the MIT license and complete the public repository metadata in every published package.
- 7b4848d: Exclude source maps from published tarballs, synchronize CLI-owned adapter templates, and enforce packed-package installation checks.
- Updated dependencies [df95f0a]
- Updated dependencies [7b4848d]
  - @simurgh-ui/registry@0.3.2-beta.0

## 0.4.0

### Minor Changes

- 0d34519: Copy a separate CSS recipe for each CLI-installed component and maintain a stable `recipes.css`
  index containing only the installed component imports. Preserve customized recipe files unless
  `--overwrite` is used.

## 0.3.2

### Patch Changes

- Bundle original per-component registry modules so generated source no longer contains repeated
  imports collected from the concatenated fallback registry.

## 0.3.1

### Patch Changes

- Add npm-facing package documentation with installation, quick-start, granular import, styling,
  and package-specific usage guidance.
- Updated dependencies
  - @simurgh-ui/registry@0.3.1

## 0.3.0

### Minor Changes

- 8f9b16f: Replace Floating UI with a shared sub-5 KiB internal positioning engine. Positioned overlays retain offset, viewport flip and shift, RTL alignment, automatic updates, dismissal, and focus restoration without an additional runtime dependency.

### Patch Changes

- Updated dependencies [8f9b16f]
  - @simurgh-ui/registry@0.3.0

## 0.2.0

### Minor Changes

- e5a636e: Add the tree-shakeable Simurgh Charts system with framework-neutral geometry, accessible React,
  Vue, and Angular adapters, optional Canvas, worker, streaming and motion entry points, source-copy
  CLI support, design tokens, and documentation.

### Patch Changes

- Updated dependencies [e5a636e]
  - @simurgh-ui/registry@0.2.0

## 0.1.2

### Patch Changes

- Publish the current Simurgh UI source and refreshed compatible dependencies.
- Updated dependencies
  - @simurgh-ui/registry@0.1.1

## 0.1.1

### Patch Changes

- Bundle framework source and style registry assets with the CLI so installed releases can initialize and add components without access to the development monorepo.
