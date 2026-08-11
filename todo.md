# Simurgh UI v1 implementation

- [x] Establish the pnpm/Turborepo workspace, strict TypeScript, Changesets, linting, and formatting.
- [x] Implement the framework-neutral core utilities and initial unit tests.
- [x] Implement the shared CSS tokens and optional Tailwind recipes.
- [x] Implement all ten accessible React primitives.
- [x] Implement all ten accessible Vue primitives.
- [x] Implement all ten accessible Angular primitives.
- [x] Build the versioned, framework-aware component registry.
- [x] Implement `simurgh init`, `add`, `list`, and `diff`.
- [x] Build the Astro/Starlight documentation site with framework examples and guides.
- [x] Add framework contract, accessibility, CLI fixture, and browser-level test coverage.
- [x] Add CI for linting, type checking, builds, unit tests, accessibility checks, and CLI fixtures.
- [x] Install dependencies and run type checks, unit tests, linting, CLI smoke checks, and the production documentation build.

## Quality gate

Framework DOM contracts, axe accessibility audits, disposable CLI application fixtures, and
Playwright browser scenarios are implemented and passing alongside package compilation and linting.

Items are checked only after their implementation exists and the relevant verification has passed.

## V1 completeness follow-up

- [x] Add complete per-component documentation with Angular, React, and Vue examples.
- [x] Make registry additions component-granular instead of copying the complete catalog.
- [x] Harden overlay and composite-widget parity across all three frameworks.
  - [x] Add Angular Floating UI positioning, dialog focus management, and reactive tab/panel bindings.
  - [x] Add Vue tooltip hover/focus behavior, dialog focus containment, and overlay semantics.
  - [x] Complete cross-framework menu/select keyboard parity and contract coverage.
    - [x] Add React menu/listbox focus entry, navigation, keyboard selection, and form coverage.
    - [x] Add Vue menu/listbox focus entry, navigation, keyboard selection, and form coverage.
    - [x] Add Angular menu/listbox focus entry, navigation, keyboard selection, and form coverage.

## Catalog expansion

- [x] Add Radio Group across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add Combobox across Angular, React, Vue, the registry, documentation, and contract tests.
  - [x] Implement and verify React Combobox.
  - [x] Implement and verify Vue Combobox.
  - [x] Implement and verify Angular Combobox.
  - [x] Register and document Combobox after framework parity passes.
- [x] Add native Label across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add rendered component previews to every component guide.
- [x] Add semantic Separator across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Progress across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Toggle across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add Visually Hidden across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Avatar across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add semantic Alert across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Normalize legacy mojibake in component documentation.
- [x] Add Aspect Ratio across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Skeleton across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Spinner across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add native Button across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add native Input across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add native Textarea across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add semantic Badge across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Breadcrumb across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add composable Card anatomy across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add semantic Kbd across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add native Field grouping across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add semantic Table anatomy across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Pagination across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Collapsible across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add native Slider across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add semantic Meter across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Toolbar across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Toggle Group across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add native Scroll Area across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add native Link across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Navigation Menu across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Menubar across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Hover Card across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Context Menu across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Sheet across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Alert Dialog across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Form across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add native Select across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Button Group across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Input Group across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add semantic Empty State across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Input OTP across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add semantic Item anatomy across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Command across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Drawer across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Calendar across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Date Picker across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Carousel across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Resizable panels across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Sidebar navigation across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Tree View across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible File Upload across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Password Input across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Number Input across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add accessible Rating across Angular, React, Vue, the registry, documentation, and contract tests.

## Bundle-size optimization

- [x] Split each framework adapter into per-component source and output modules while retaining the root barrel exports.
- [x] Add explicit per-component package subpath exports, such as `@simurgh-ui/react/button`.
- [x] Mark top-level React and Vue component and helper factory calls as pure where they have no side effects.
- [x] Isolate Floating UI imports to overlay and floating-component modules so basic components do not include it.
- [x] Package Angular with `ng-packagr` or `ngc` using Angular partial compilation instead of plain `tsc`.
- [x] Move Angular's `SIMURGH_COMPONENTS` aggregate into an opt-in `@simurgh-ui/angular/all` entry point.
- [x] Fix the current Angular TypeScript build errors before establishing the optimized size baseline.
- [x] Split the shared recipe CSS into per-component styles while preserving an aggregate `all.css` export.
- [x] Add bundle-size regression checks for representative single-component imports and complete adapters.
  - [x] Keep a React Button import below 1 KiB gzip.
  - [x] Keep a Vue Button import below 1.5 KiB gzip.
  - [x] Keep an Angular Button import below 2 KiB gzip.
  - [x] Keep a React Dialog import below 4 KiB gzip.
  - [x] Track the minified, gzip, and Brotli sizes of each complete framework adapter and the optional CSS.

## Bundle-size optimization follow-up

- [x] Move Angular component implementations out of the monolithic `index.ts` into genuine per-component modules instead of re-exporting them from `../index.js`.
- [x] Reduce complex Angular component subpaths, including Dialog and Calendar, from approximately 26.35 KiB gzip to component-granular bundles.
- [x] Make root Angular named imports tree-shake effectively; importing Button currently costs approximately 25.3 KiB gzip.
- [x] Expand bundle-size regression checks to cover root named imports and representative complex Angular subpaths.
- [x] Measure consumer bundle sizes with only framework peer dependencies externalized so Core and Floating UI costs remain visible.
- [x] Correct the complete-adapter baselines to include library dependencies: React 25.48 KiB gzip, Vue 19.45 KiB gzip, and Angular 26.36 KiB gzip.
- [x] Add enforced gzip budgets for complete framework adapters instead of recording their sizes without limits.
- [x] Reduce published package weight by generating source maps without embedded source content or excluding source maps from published packages.
- [x] Eliminate duplicated Angular component output that currently contributes to an approximately 21.5 MiB `dist` directory.
- [x] Add published-package size checks alongside browser bundle-size checks.
- [x] Enforce standalone bundle budgets for the Rating component in every framework.
