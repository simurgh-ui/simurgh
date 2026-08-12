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
- [x] Add accessible Tags Input across Angular, React, Vue, the registry, documentation, and contract tests.

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
- [x] Enforce standalone bundle budgets for the Tags Input component in every framework.

## Bundle-size optimization third pass

- [x] Remove residual Vue wrapper overhead by marking side-effect-free `Symbol`, `cardPart`, `checkControl`, `carouselControl`, and related helper calls as pure.
- [x] Move Vue implementations into genuine per-component modules so subpaths do not depend on tree-shaking the monolithic `index.ts`.
  - [x] Move Button, Rating, Tags Input, Dialog, Calendar, Checkbox, Switch, Label, Separator, Progress, Alert, Aspect Ratio, Avatar, Skeleton, Spinner, Visually Hidden, Link, Input, Native Select, Slider, Meter, Scroll Area, Textarea, Breadcrumb, Button Group, Input Group, Input OTP, Toolbar, Toggle, Toggle Group, Tabs, Accordion, Collapsible, Card, Empty, Item, Kbd, Badge, Field, Table, Pagination, Form, Navigation Menu, Menubar, Radio Group, Password Input, Number Input, Select, Combobox, Command, File Upload, Toast, Sheet, Drawer, Alert Dialog, Carousel, Sidebar, Tree, Context Menu, Popover, Tooltip, Hover Card, Dropdown Menu, Date Picker, and Resizable into genuine modules.
  - [x] Split the remaining Vue catalog modules.
- [x] Reduce representative Vue component bundles toward the verified optimized measurements.
  - [x] Reduce Vue Button from approximately 1.41 KiB to 0.44 KiB gzip.
  - [x] Reduce Vue Rating from approximately 1.70 KiB to 0.78 KiB gzip.
  - [x] Reduce Vue Tags Input from approximately 1.99 KiB to 1.09 KiB gzip.
  - [x] Reduce Vue Dialog from approximately 1.88 KiB to 0.95 KiB gzip.
  - [x] Reduce Vue Calendar from approximately 2.31 KiB to 1.38 KiB gzip.
- [x] Evaluate replacing `@floating-ui/react` interaction hooks with a smaller `@floating-ui/dom` integration while preserving accessibility and behavior parity.
- [x] Track and reduce Floating UI's approximate gzip contribution: React 12.5 KiB, Vue 6.0 KiB, and Angular 6.3 KiB.
- [x] Add optional aggregate entry points such as `basic` and `overlays` so broad imports can exclude floating components.
- [x] Recommend per-component subpath imports throughout the documentation and examples.
- [x] Add a minimal production Angular fixture that measures bundles after Angular linking and production optimization.
- [x] Keep component-level CSS imports as the recommended path and defer lower-impact full-CSS micro-optimization.

## Bundle-size optimization fourth pass

- [x] Split Angular's shared `internal.ts` into focused modules so non-floating controls do not bundle Floating UI.
  - [x] Move `FloatingBase` into `internal/floating-base.ts`.
  - [x] Move `CheckBase` into `internal/check-base.ts`.
  - [x] Move `compositeKeydown` into `internal/composite-keydown.ts`.
  - [x] Reduce Angular Checkbox from approximately 7.37 KiB to 1.10 KiB gzip.
  - [x] Reduce Angular Switch from approximately 7.37 KiB to 1.11 KiB gzip.
  - [x] Reduce Angular Context Menu from approximately 8.16 KiB to 1.98 KiB gzip.
  - [x] Reduce Angular Select from approximately 8.18 KiB to 1.98 KiB gzip.
  - [x] Reduce the Angular `basic` entry from approximately 12.24 KiB to 6 KiB gzip.
- [x] Finish moving the remaining Vue catalog implementations out of monolithic `index.ts` re-exports and into genuine per-component modules.
  - [x] Reduce individual Vue component overhead and reliance on bundler purity analysis.
  - [x] Reduce the Vue package from its current approximately 722 KiB unpacked size.
- [x] Tighten standalone bundle regression budgets to approximately 20–30% above verified measurements.
  - [x] Tighten React Button from its 1 KiB budget around the current 226 B gzip measurement.
  - [x] Tighten Angular Button from its 2 KiB budget around the current 398 B gzip measurement.
  - [x] Tighten React Dialog from its 4 KiB budget around the current 1.14 KiB gzip measurement.
- [x] Expand the linked and optimized Angular production-size fixture beyond Button.
  - [x] Measure Angular Checkbox in the production fixture.
  - [x] Measure Angular Select in the production fixture.
  - [x] Measure Angular Calendar in the production fixture.
  - [x] Measure the Angular `basic` entry in the production fixture.
  - [x] Measure the Angular `overlays` entry in the production fixture.
- [x] Treat Floating UI as an explicit feature cost in bundle reports: approximately 12.8 KiB gzip for React and 6.2 KiB for Vue and Angular.
- [x] Preserve component subpaths and the non-floating `basic` entry so consumers can avoid Floating UI when overlays are unused.

## Bundle-size optimization fifth pass

- [x] Audit component-level CSS exports and documentation so consumers can load only the recipes they use instead of the complete stylesheet.
- [x] Add lazy-loading guidance and fixtures for overlay-heavy entry points so Floating UI stays out of initial application bundles.
- [ ] Move the remaining React implementations out of the monolithic `index.tsx` into genuine per-component source modules.
- [x] Evaluate esbuild code splitting for the React adapter and verify that shared chunks reduce multi-component consumption without adding excessive module overhead.
- [x] Revisit the custom `@floating-ui/dom` React adapter only if its estimated savings justify the accessibility and interaction-maintenance risk.
- [x] Resolve the React Button budget regression by replacing the stale 301 B baseline with a clean-build measurement and a less brittle 512 B budget.

## Catalog expansion fifth pass

- [x] Add native Disclosure across Angular, React, Vue, the registry, documentation, and contract tests.

## Documentation completion: first-time user audit

Audit date: 2026-08-12. The site has 67 component pages and framework examples, but none of the
component pages currently has a dedicated Installation, Usage, API/Props, Customization,
Accessibility, Examples, or Troubleshooting section. Treat the older checked item "complete
per-component documentation" as example coverage, not as complete consumer documentation.

### P0: make the library usable from the documentation alone

- [ ] Define and apply one required component-page template: purpose, import/install, anatomy,
      basic usage, API, state model, customization, accessibility, examples, and related components.
- [ ] Add copy-pasteable package imports and component CSS imports to every component page for
      React, Vue, and Angular; do not show unimported component snippets.
- [ ] Document every public React prop, callback, ref, default value, inherited native attribute,
      and controlled/uncontrolled pair from the exported TypeScript API.
- [ ] Document every public Vue prop, emitted event, slot, exposed method, default value, and
      inherited attribute from the exported TypeScript API.
- [ ] Document every public Angular input, output, content slot/directive, public method, default
      value, and host/native attribute behavior from the exported TypeScript API.
- [ ] State framework parity and intentional API differences beside each component API instead of
      making users compare three source packages.
- [ ] Document required parent/child composition and which parts are optional for compound
      components such as Dialog, Select, Tabs, Accordion, Menu, Form, and Date Picker.
- [ ] Add a tested quick start for a fresh React, Vue, and Angular application, covering both CLI
      source-copy installation and package consumption.
- [x] Explain the actual distribution model clearly: when users own copied source, when they import
      `@simurgh-ui/*`, which dependencies are installed, and how registry updates/diffs work.
- [x] Replace all mojibake still visible in consumer docs and add a UTF-8/mojibake check to CI.

### P1: props, state, and real usage

- [ ] Add controlled and uncontrolled examples for all stateful controls, including the exact
      value/change APIs in each framework and guidance for resetting state.
- [ ] Add form examples for every form-capable component: field name, initial value, disabled,
      required, validation/error state, submission value, and framework form integration.
- [ ] Document loading, empty, invalid, read-only, disabled, and error states wherever supported;
      explicitly say when a state is not supported.
- [ ] Document keyboard interactions in a compact table for every composite widget, including RTL
      differences, focus entry/exit, Escape behavior, and typeahead where applicable.
- [ ] Document focus management for overlays: initial focus, focus trapping, restoration, portals,
      nested overlays, outside interaction, and programmatic open/close.
- [ ] Add realistic examples rather than only minimal anatomy snippets: async Dialog submission,
      validated Form, searchable Combobox, server-backed Command, Date Picker constraints,
      upload validation, and dynamic Tabs/Accordion items.
- [ ] Add SSR and hydration guidance for generated IDs, portals, browser-only APIs, and async/lazy
      components in Angular, React, and Vue.
- [ ] Add TypeScript examples for extending props, wrapping components, typing values/events, and
      forwarding refs or native attributes.

### P1: customization and styling

- [ ] Expand the theming guide into a complete semantic-token reference with token name, purpose,
      default value, dark-mode value, and contrast expectations.
- [ ] Document the styling contract for every component: recipe class names, `data-*` state hooks,
      ARIA/state selectors, CSS custom properties, and stable DOM parts that consumers may target.
- [ ] Show three customization levels: semantic token overrides, recipe/class overrides, and fully
      headless styling without recipe CSS.
- [ ] Add per-framework class/style forwarding examples and clarify which element receives
      forwarded attributes for wrapper components.
- [ ] Document sizing, density, variants, icons, responsive behavior, animation, reduced motion,
      dark mode, and RTL customization where relevant.
- [ ] Explain CSS import order, cascade layers/specificity, global reset assumptions, Tailwind use,
      and how to avoid duplicate token imports.
- [ ] Add a custom-theme example with a complete light/dark token set and automated contrast checks.

### P2: navigation and decision support

- [x] Update the component overview from the stale "Sixty-two" count and include all 66 primitive
      pages, grouped by form, overlay, navigation, feedback, layout, and data display.
- [x] Add a component chooser comparing commonly confused primitives: Select vs Native Select vs
      Combobox, Dialog vs Alert Dialog vs Sheet vs Drawer, Tooltip vs Hover Card vs Popover, and
      Accordion vs Disclosure vs Collapsible.
- [ ] Add package/version requirements, browser support, framework peer-version support, and a
      compatibility matrix backed by CI.
- [ ] Add migration and update guides for CLI-copied source and package consumers, including how to
      resolve `simurgh diff` conflicts safely.
- [x] Add troubleshooting for missing styles, overlay clipping/z-index, portals, hydration mismatch,
      form submission, focus restoration, Tailwind conflicts, and RTL layout issues.
- [ ] Add links between each component page and its relevant accessibility pattern, theming hooks,
      related components, and registry source.
- [ ] Add visible pre-release/versioning guidance, stability expectations, changelog links, and the
      policy for breaking API or copied-source updates.

### Documentation quality gate

- [ ] Generate or validate API tables from source declarations so undocumented public APIs and stale
      defaults fail CI across all three adapters.
- [ ] Compile every React, Vue, and Angular documentation example in CI rather than treating fenced
      code blocks as unverified text.
- [ ] Add link checking, heading/anchor checking, spelling, and package-export validation to the docs
      build.
- [ ] Add browser tests for framework tabs, copy buttons, component previews, mobile navigation,
      dark mode, RTL, and keyboard-only reading flows.
- [ ] Give every page a last-verified version/source marker and require documentation changes for
      public API changes in the pull-request checklist.
- [ ] Run a final task-based user test: install one component, customize its theme, build a form,
      open an overlay, handle an event, and update a copied component using only the published docs.
