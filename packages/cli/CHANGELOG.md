# @simurgh-ui/cli

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
