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
- [x] Move the remaining React implementations out of the monolithic `index.tsx` into genuine per-component source modules.
  - [x] Move Alert, Aspect Ratio, Avatar, Badge, Breadcrumb, Button, Button Group, Card, Description List, Empty, Field, Form, Input, Input Group, Input OTP, Item, Textarea,
        Kbd, Label, Link, Menubar, Meter, Native Select, Navigation Menu, Pagination, Rating, Scroll Area, Separator, Slider, Progress, Table, Toolbar,
        Visually Hidden, Skeleton, and Spinner into genuine component modules while preserving
        compatible exports.
  - [x] Bound the measured all-exports module-boundary tradeoff with a 28 KiB complete-adapter
        budget while retaining tighter standalone subpath and published-package budgets.
  - [x] Move Tabs, Accordion, Collapsible, and Disclosure into genuine component modules, extract
        shared controlled-open helpers, and prevent component-to-barrel dependencies from increasing.
  - [x] Move Dialog, Sheet, Drawer, and Alert Dialog into genuine component modules backed by a
        shared internal Dialog context without introducing root-barrel cycles.
  - [x] Move the remaining React primitives and shared helpers without introducing component-to-barrel
        cycles or exceeding standalone, aggregate, complete-adapter, and published-package budgets.
- [x] Evaluate esbuild code splitting for the React adapter and verify that shared chunks reduce multi-component consumption without adding excessive module overhead.
- [x] Revisit the custom `@floating-ui/dom` React adapter only if its estimated savings justify the accessibility and interaction-maintenance risk.
- [x] Resolve the React Button budget regression by replacing the stale 301 B baseline with a clean-build measurement and a less brittle 512 B budget.

## Replace Floating UI with a sub-5 KiB internal layer

- [x] Define and document the supported positioning contract before implementation: placements,
      8 px offset, viewport flip, boundary shift, RTL behavior, nested scrolling, transformed
      ancestors, portals, and explicitly unsupported Floating UI features.
- [x] Capture reproducible pre-migration behavior and bundle baselines for Popover, Tooltip, Hover
      Card, Dropdown Menu, Context Menu, Select, and other positioned overlays in every framework.
- [x] Implement a framework-neutral positioning engine in `@simurgh-ui/core` using
      `getBoundingClientRect`, offset, flip, and shift/clamping without accessing browser globals
      during module evaluation or server rendering.
- [x] Implement leak-free automatic updates for window and scroll-container scrolling, viewport
      resizing, element resizing, layout changes, and teardown; use observers only when available.
- [x] Implement the shared interaction behavior currently supplied by `@floating-ui/react`: click,
      hover, focus, role assignment, Escape dismissal, outside-press dismissal, composed events, and
      safe focus restoration.
- [x] Replace the React hooks and the Vue and Angular DOM adapters with thin framework-specific
      wrappers around the shared internal positioning and interaction layer.
- [x] Run shared overlay contracts across React, Vue, and Angular for collision handling, RTL,
      keyboard and pointer input, nested overlays, portals, focus management, dismissal, interrupted
      unmounts, and cleanup.
- [x] Add SSR and hydration tests proving that importing and initially rendering every positioned
      overlay does not access `window` or `document` and produces deterministic initial markup.
- [x] Add cross-browser visual fixtures for viewport edges, nested scroll containers, zoom,
      transformed ancestors, mobile viewports, and live anchor/content resizing.
- [x] Enforce a maximum incremental contribution of 5 KiB gzip for the complete internal
      positioning and interaction layer in each framework consumer bundle, with minified and Brotli
      measurements reported alongside gzip.
- [x] Remove `@floating-ui/react` and `@floating-ui/dom` from package manifests, registry runtime
      dependencies, CLI-generated source, lockfiles, bundle tooling, and documentation only after
      behavior, accessibility, SSR, and size gates pass.
- [x] Publish migration notes describing the supported positioning subset, any intentional behavior
      differences, and the per-framework bundle-size reduction.

## Catalog expansion fifth pass

- [x] Add native Disclosure across Angular, React, Vue, the registry, documentation, and contract tests.
- [x] Add semantic Description List across Angular, React, Vue, the registry, documentation, and contract tests.

## Documentation completion: first-time user audit

Audit date: 2026-08-12. The site has 67 component pages and framework examples, but none of the
component pages currently has a dedicated Installation, Usage, API/Props, Customization,
Accessibility, Examples, or Troubleshooting section. Treat the older checked item "complete
per-component documentation" as example coverage, not as complete consumer documentation.

### P0: make the library usable from the documentation alone

- [x] Define and apply one required component-page template: purpose, import/install, anatomy,
      basic usage, API, state model, customization, accessibility, examples, and related components.
- [x] Add copy-pasteable package imports and component CSS imports to every component page for
      React, Vue, and Angular; do not show unimported component snippets.
- [x] Document every public React prop, callback, ref, default value, inherited native attribute,
      and controlled/uncontrolled pair from the exported TypeScript API.
- [x] Document every public Vue prop, emitted event, slot, exposed method, default value, and
      inherited attribute from the exported TypeScript API.
- [x] Document every public Angular input, output, content slot/directive, public method, default
      value, and host/native attribute behavior from the exported TypeScript API.
- [x] State framework parity and intentional API differences beside each component API instead of
      making users compare three source packages.
- [x] Document required parent/child composition and which parts are optional for compound
      components such as Dialog, Select, Tabs, Accordion, Menu, Form, and Date Picker.
- [x] Add a tested quick start for a fresh React, Vue, and Angular application, covering both CLI
      source-copy installation and package consumption.
- [x] Explain the actual distribution model clearly: when users own copied source, when they import
      `@simurgh-ui/*`, which dependencies are installed, and how registry updates/diffs work.
- [x] Replace all mojibake still visible in consumer docs and add a UTF-8/mojibake check to CI.

### P1: props, state, and real usage

- [x] Add controlled and uncontrolled examples for all stateful controls, including the exact
      value/change APIs in each framework and guidance for resetting state.
- [x] Add form examples for every form-capable component: field name, initial value, disabled,
      required, validation/error state, submission value, and framework form integration.
- [x] Document loading, empty, invalid, read-only, disabled, and error states wherever supported;
      explicitly say when a state is not supported.
- [x] Document keyboard interactions in a compact table for every composite widget, including RTL
      differences, focus entry/exit, Escape behavior, and typeahead where applicable.
- [x] Document focus management for overlays: initial focus, focus trapping, restoration, portals,
      nested overlays, outside interaction, and programmatic open/close.
- [x] Add realistic examples rather than only minimal anatomy snippets: async Dialog submission,
      validated Form, searchable Combobox, server-backed Command, Date Picker constraints,
      upload validation, and dynamic Tabs/Accordion items.
- [x] Add SSR and hydration guidance for generated IDs, portals, browser-only APIs, and async/lazy
      components in Angular, React, and Vue.
- [x] Add TypeScript examples for extending props, wrapping components, typing values/events, and
      forwarding refs or native attributes.

### P1: customization and styling

- [x] Expand the theming guide into a complete semantic-token reference with token name, purpose,
      default value, dark-mode value, and contrast expectations.
- [x] Document the styling contract for every component: recipe class names, `data-*` state hooks,
      ARIA/state selectors, CSS custom properties, and stable DOM parts that consumers may target.
- [x] Show three customization levels: semantic token overrides, recipe/class overrides, and fully
      headless styling without recipe CSS.
- [x] Add per-framework class/style forwarding examples and clarify which element receives
      forwarded attributes for wrapper components.
- [x] Document sizing, density, variants, icons, responsive behavior, animation, reduced motion,
      dark mode, and RTL customization where relevant.
- [x] Explain CSS import order, cascade layers/specificity, global reset assumptions, Tailwind use,
      and how to avoid duplicate token imports.
- [x] Add a custom-theme example with a complete light/dark token set and automated contrast checks.

### P2: navigation and decision support

- [x] Update the component overview from the stale "Sixty-two" count and include all 66 primitive
      pages, grouped by form, overlay, navigation, feedback, layout, and data display.
- [x] Add a component chooser comparing commonly confused primitives: Select vs Native Select vs
      Combobox, Dialog vs Alert Dialog vs Sheet vs Drawer, Tooltip vs Hover Card vs Popover, and
      Accordion vs Disclosure vs Collapsible.
- [x] Add package/version requirements, browser support, framework peer-version support, and a
      compatibility matrix backed by CI.
- [x] Add migration and update guides for CLI-copied source and package consumers, including how to
      resolve `simurgh diff` conflicts safely.
- [x] Add troubleshooting for missing styles, overlay clipping/z-index, portals, hydration mismatch,
      form submission, focus restoration, Tailwind conflicts, and RTL layout issues.
- [x] Add links between each component page and its relevant accessibility pattern, theming hooks,
      related components, and registry source.
- [x] Add visible pre-release/versioning guidance, stability expectations, changelog links, and the
      policy for breaking API or copied-source updates.

### Documentation quality gate

- [x] Generate or validate API tables from source declarations so undocumented public APIs and stale
      defaults fail CI across all three adapters.
- [x] Compile every React, Vue, and Angular documentation example in CI rather than treating fenced
      code blocks as unverified text.
- [x] Add link checking, heading/anchor checking, spelling, and package-export validation to the docs
      build.
  - [x] Validate internal links, heading anchors, public downloads, and documented package exports.
  - [x] Add offline spelling validation with a project terminology dictionary.
- [x] Add browser tests for framework tabs, copy buttons, component previews, mobile navigation,
      dark mode, RTL, and keyboard-only reading flows.
- [x] Give every page a last-verified version/source marker and require documentation changes for
      public API changes in the pull-request checklist.
- [ ] Run a final task-based user test: install one component, customize its theme, build a form,
      open an overlay, handle an event, and update a copied component using only the published docs.
  - [x] Validate the complete docs-only discovery and interaction journey in a fresh browser session.
  - [x] Compile a release-candidate consumer fixture with theme overrides, a form, an event, an
        overlay, and a product-specific edit to a source-owned component.
  - [x] Complete the copied-component edit and consumer build in a fresh release-candidate app.
    - Use `release-candidate-ui-observations.md` to record the human run and evidence.
  - [x] Publish the reproducible acceptance protocol and validate its automated package, CLI, API,
        example-compilation, contrast, and documentation-integrity evidence.
  - [x] Record the published documentation site's framework-tab, copy-feedback, keyboard-navigation,
        dark-theme, mobile-menu, responsive-overflow, and RTL-guidance browser observations.
  - [x] Record React, Vue, and Angular adapter-host evidence for keyboard/RTL navigation, invalid-form
        focus and alerts, overlay focus restoration, Checkbox events, and form serialization.
  - [x] Record 200% zoom, narrow/short viewport, forced RTL/reduced-motion, light/dark contrast,
        focus-appearance, and assistive-technology observations in release-candidate applications.
  - [x] Automate the reflow-equivalent, short viewport, RTL, reduced-motion, focus-appearance, and
        light/dark WCAG A/AA checks against real documentation previews.
    - [x] Reconfirm in a release browser session that the Button preview remains mounted after a
          30-second dwell at 640 × 360 with no document-level horizontal overflow.
  - [x] Complete manual 200% browser-zoom observations in a release candidate.
  - [x] Complete manual keyboard-navigation and focus-appearance observations in a release
        candidate.
  - [x] Complete manual screen-reader observations in release candidates.
    - Use `release-candidate-ui-observations.md` for the required spoken-output evidence.

## Senior UI/UX review follow-up

### P1: preview fidelity and product clarity

- [x] Replace documentation-only facsimiles with previews that mount the actual public React, Vue,
      or Angular component and load the same component stylesheet consumers import.
- [x] Clearly label any remaining static example as a semantic anatomy illustration rather than a
      live rendered-component preview.
- [x] Add a documented status to every component: `headless`, `structural`, `styled`, or `native`,
      including what behavior, layout, and visual treatment consumers should expect by default.
- [x] Validate that component status matches the published stylesheet, stable styling hooks, docs
      preview, registry metadata, and all three framework adapters.
- [x] Reorder component pages around first-use comprehension: purpose and status, live preview,
      usage guidance, variants/states, framework examples, accessibility, then exhaustive API and
      styling contracts.
- [x] Add screenshot regression coverage for real adapter-powered previews in light, dark, RTL,
      narrow viewport, loading, disabled, invalid, and keyboard-focus states where applicable.
  - [x] Establish portable Chromium baselines for the React Button and Form previews covering light,
        dark, RTL, reduced motion, narrow viewport, loading, disabled, invalid, and focus states.
  - [x] Extend visual baselines to representative Vue and Angular adapter-host previews.

### P2: visual-system maturity

- [x] Define a canonical action hierarchy for Button and button-like controls, covering primary,
      secondary, destructive, quiet/ghost, icon-only, loading, full-width, and size variants.
- [x] Complete a coherent visual family for Button, Input, Checkbox, Select, and Dialog before
      expanding the catalog further; verify hover, pressed, focus-visible, disabled, loading,
      invalid, and responsive states.
- [x] Expand semantic tokens for secondary, success, warning, information, destructive foreground,
      disabled surfaces/text, input surfaces/borders, hover/pressed states, scrims, elevation,
      control heights, spacing, and typography.
- [x] Keep the Tailwind preset in parity with the supported semantic CSS token surface and add a
      regression check that prevents the two theming APIs from drifting.
- [x] Introduce explicit comfortable, compact, and dense control-density modes with documented
      target sizes and consistent application across interactive components.
- [x] Define a restrained Simurgh visual-language guide beyond color, covering typography,
      geometric rhythm, separators/borders, motion, illustration, and empty-state treatment.

### P2: discovery and documentation usability

- [x] Add a visual component gallery with search and filters for category, styling status,
      framework availability, native/custom behavior, and keyboard-interaction complexity.
- [x] Preserve the interaction-based component chooser, but link gallery cards directly to the
      relevant comparison guidance for commonly confused components.
- [x] Reduce generated page density by consolidating shared cross-framework behavior, surfacing
      only meaningful adapter differences, and collapsing exhaustive API/styling tables by default.
- [x] Simplify the component-page table of contents to major user-facing sections and remove
      repetitive generated framework/component subheadings from its default outline.

### UI/UX acceptance gate

- [x] Run a first-time-user comprehension test covering: identify whether a component is styled,
      select the correct primitive, preview its real default output, install it, choose a density,
      customize semantic tokens, and verify focus/RTL/dark behavior without reading source code.

## Icons bundle-size optimization

Baseline was captured at 128 icons; the implemented catalog now contains 474. Budgets for complete
catalogs and package weight therefore scale with the generated asset count, while the per-icon
budgets remain fixed.

### P0: restore component-level tree shaking

- [x] Generate one definition module per icon instead of embedding the complete catalog or repeated
      definition literals in each framework entry.
- [x] Generate one framework component module per icon and expose stable subpaths such as
      `@simurgh-ui/icons/react/home`, `@simurgh-ui/icons/vue/home`, and
      `@simurgh-ui/icons/angular/home`.
- [x] Make named Angular icon imports tree-shake to a single definition and renderer; keep a named
      icon below 2 KiB gzip with `@angular/core` externalized.
- [x] Make named React and Vue components import their shared per-icon definition rather than
      embedding a second copy of the icon data.
- [x] Preserve a single named React and Vue icon below 1.5 KiB gzip and three named icons below
      3 KiB gzip after restructuring the generated output.

### P1: separate static and dynamic catalogs

- [x] Move `SimurghIcon`, `icons`, `iconNames`, `iconGroups`, `getIcon`, and `renderIconSvg` into
      explicit dynamic/catalog entry points so static framework entries do not retain all 474
      definitions.
- [x] Keep default React, Vue, and Angular entries static-only, with dynamic lookup available from
      documented subpaths such as `@simurgh-ui/icons/react/dynamic`.
- [x] Avoid publishing two complete catalog representations in React and Vue; keep complete-entry
      budgets proportional to the 474-icon catalog until per-icon lazy loading is introduced.
- [x] Document that dynamic name-based lookup retains the full catalog and recommend named imports
      for application UI.

### P1: package and regression budgets

- [x] Exclude `dist/**/*.map` from the published icons package, while retaining source maps in local
      build artifacts when useful for development.
- [x] Review whether raw SVG files should remain in the primary package or move to a separate
      export/package so framework consumers do not install unused assets.
- [x] Keep published package weight below 6 MiB unpacked for the 474-icon catalog and track gzip and
      Brotli size alongside unpacked size.
- [x] Add enforced minified, gzip, and Brotli budgets for one named icon, three named icons, dynamic
      catalogs, complete framework entries, raw SVG imports, and published package weight.
- [x] Add a generator integrity test ensuring every SVG has exactly one definition module and one
      component export per supported framework without duplicated catalog data.

## Icons UI/UX research follow-up

### P0: catalog trust and release coherence

- [x] Derive the documented icon count from the generated catalog so the package README, docs,
      tests, and published assets cannot disagree as the collection grows.
- [x] Add a release integrity check that every documented icon name exists in the published package
      and every published icon is represented in the catalog.

### P1: discovery and selection

- [x] Add persistent catalog search across names, aliases, keywords, categories, and intended uses;
      include common synonym mappings such as `delete` to `trash` and `back` to `arrow-left`.
- [x] Consolidate the 81 implementation groups into approximately 10–15 user-facing categories,
      while retaining granular groups as optional filters.
- [x] Add category and visual-style filters, a result count, an empty state, and keyboard-accessible
      search and filtering behavior.
- [x] Make every catalog card copy the kebab-case name with visible and announced confirmation, and
      provide actions for copying React, Vue, Angular, and SVG usage snippets.
- [x] Add comparison guidance for easily confused families such as message variants, user/profile
      variants, maps/location, files/folders, and status shapes.
- [x] Extend icon metadata with aliases, search keywords, intended meanings, discouraged meanings,
      and variant-family relationships; validate metadata completeness in CI.

### P1: visual adaptability and consistency

- [x] Add a themeable `currentColor` rendering mode for routine interface use while preserving the
      authored duotone treatment as an explicit visual mode.
- [x] Define stable CSS variables for duotone primary and secondary fills so product themes,
      disabled states, and high-contrast treatments do not require path-level overrides.
- [x] Audit every icon at 16, 20, 24, and 32 pixels for optical centering, recognizability, detail
      loss, apparent weight, and alignment beside text; add visual regression coverage for failures.
  - [x] Add a 1,896-render regression gate covering empty output, extreme imbalance, sparse artwork,
        and collapsed bounds across all four target sizes.
- [x] Define a consistent variant policy for filled, circle, alternate, and rounded forms, including
      naming rules and guidance for when each variant should exist.
- [x] Validate icon and adjacent-label contrast in light, dark, forced-colors, disabled, selected,
      destructive, success, and warning contexts.

### P1: RTL, accessibility, and framework parity

- [x] Infer direction from the nearest `dir` context or CSS `:dir()` state by default, while keeping
      the explicit direction property as an override for portals and physical-direction meanings.
- [x] Audit directional metadata for navigation, editing, communication, media, charts, maps, and
      physical-direction exceptions in both LTR and RTL.
- [x] Give Angular consumers parity with React and Vue for root SVG classes, styles, data attributes,
      ARIA attributes, and reusable presentation hooks.
- [x] Add catalog examples for decorative icons, informative icons, and named icon-only controls;
      test accessible names, hidden decorative SVGs, focus behavior, and duplicate announcements.

### P2: evidence and adoption

- [x] Publish measured examples comparing named, dynamic, category-level, and raw-SVG imports,
      including their tree-shaking and bundle-size consequences.
- [ ] Run a first-time-user study covering: find an icon from a concept, compare similar candidates,
      copy the correct framework import, theme it, label an icon-only control, and verify RTL.
- [ ] Track search success rate, time to first correct icon, zero-result queries, copy success, and
      mistaken icon substitutions to guide taxonomy and alias improvements.

## Chart capability expansion

### P0: core chart interactions

- [ ] Wire component-level zooming to mouse drag, wheel, touch pinch, keyboard controls, and reset/zoom-out actions.
- [ ] Wire component-level panning to mouse drag, touch gestures, keyboard controls, and bounded domains.
- [ ] Implement brush/range selection with x/y selection modes, resize handles, cancel/reset behavior, selected-domain output, and selected-data output.
- [x] Add pointer interaction events for hover, leave, click, double-click, context menu, and point/series selection across React, Vue, and Angular.
- [ ] Replace the basic tooltip with configurable nearest, intersect, index/shared, click-to-pin, cursor-following, formatting, and custom-content modes.
- [x] Complete crosshair behavior with x/y lines, series snapping, axis labels, and synchronized crosshairs.
- [ ] Add linked-chart synchronization for zoom, pan, brush, tooltip, and crosshair state.

### P1: chart usability and presentation

- [ ] Build a complete axis system with x/y axes, tick generation, date/number/locale formatting, axis titles, rotation, grid configuration, and multiple axes.
- [ ] Expose controlled x/y domains and domain-change events consistently across React, Vue, and Angular.
- [ ] Add responsive sizing with ResizeObserver, percentage dimensions, responsive containers, and layout/margin measurement.
- [ ] Add PNG, SVG, CSV, print, clipboard, and image export APIs.
- [ ] Add reference lines/areas, thresholds, point annotations, labels, callouts, and annotation accessibility.
- [ ] Add data labels with placement and collision handling for bars, points, and pie/donut slices.
- [ ] Expand legend controls with placement, orientation, scrolling, select-all, isolate-series, and custom content.
- [ ] Add continuous and piecewise visual mapping for color, opacity, size, and threshold-based styling.
- [ ] Add configurable curves and marks: smooth/spline, step, monotone, tension, line width/dash, point symbols, gradients, patterns, and per-point styles.
- [ ] Add drilldown interactions for bars, points, and pie/donut slices, including accessible announcements and back navigation.
- [ ] Add pie/donut center labels, totals, slice hover/selection, labels, and richer polar interactions.

### P1: data and performance

- [ ] Add missing-value policies, interpolation options, sorting, filtering, aggregation, windowing, and configurable stacking behavior.
- [ ] Integrate decimation and worker-backed processing consistently across SVG, Canvas, React, Vue, and Angular.
- [ ] Add viewport culling, progressive rendering, and optional WebGL rendering for large datasets.
- [ ] Add streaming-chart controls for pause/resume, auto-scroll, live-window selection, backfill, and accessible new-data announcements.
- [ ] Integrate chart motion with initial render, data updates, enter/exit transitions, zoom, pan, and reduced-motion preferences.

### P2: chart coverage and accessibility

- [ ] Add candlestick/OHLC, box plot, violin, histogram, funnel, gauge, polar-area, waterfall, treemap, Sankey, and map/geo chart types where scope permits.
- [ ] Add screen-reader navigation for individual points, series regions, dynamic updates, selections, zoom state, and chart controls.
- [ ] Add chart-level localization for labels, controls, tooltips, export text, and data-table pagination.
- [ ] Add cross-framework chart capability and accessibility contract tests for every implemented interaction.

## Release-readiness development roadmap

Freeze material catalog expansion until the structural, validation, governance, and release gates
below are complete. Existing open React, final user-journey, and icon tasks above remain part of this
roadmap and are not duplicated here.

### Phase 0: establish the release baseline

- [x] Run lint, type checking, unit/contract tests, production builds, quick starts, bundle budgets,
      and cross-browser E2E serially from a clean checkout; record tool and platform versions.
- [ ] Complete and sign off the release-candidate task journey, including installation, theming,
      forms, Dialog focus restoration, form serialization, copied-source customization, and issue
      filing for every failure.
- [x] Decide and document whether packages use fixed or independent versioning; enforce compatible
      CLI, registry, styles, adapter, icons, and motion versions with a generated release check.
- [x] Add LICENSE, SECURITY, CONTRIBUTING, CODE_OF_CONDUCT, and CODEOWNERS policies suitable for a
      public component library.
- [x] Add license, repository, homepage, bugs, engines, funding where applicable, and publish
      configuration metadata to every published package.
- [x] Publish coverage reports in CI and establish non-blocking baselines before adopting meaningful
      per-package thresholds.

### Phase 1: remove structural and test-maintenance debt

- [x] Complete the open React source decomposition above, then extract focused shared internals for
      focus management, composite widgets, forms, overlays, IDs, and controlled state.
- [x] Assert that every framework component subpath is independent of its root barrel and retain
      existing standalone and aggregate bundle budgets during the React decomposition.
- [x] Remove `--passWithNoTests` from packages expected to own tests so accidental test-discovery
      failures cannot pass CI.
- [x] Split monolithic framework accessibility suites into component or behavior-family suites with
      clear ownership and failure localization.
- [x] Generate a framework-parity matrix from the registry and fail CI when a registered component
      lacks an implementation, export, style status, documentation page, or required contract test.
- [x] Replace brittle hard-coded catalog-count assertions with generated registry invariants while
      retaining an explicit review step for intentional catalog changes.

### Phase 2: harden behavior, accessibility, and compatibility

- [x] Define shared, data-driven behavioral contracts and execute applicable contracts across
      React, Vue, and Angular instead of relying only on equal test counts.
- [x] Expand overlay coverage for initial focus, trapping, dismissal, restoration, nesting, portals,
      scroll locking, inert backgrounds, and interrupted unmounts.
- [x] Expand composite-widget coverage for LTR and RTL navigation, typeahead, disabled items,
      selection models, orientation changes, and dynamic collection updates.
- [x] Test IME/composition, form reset, serialization, autofill, invalid state, native validation,
      and browser form submission for every form-capable component.
- [x] Add SSR and hydration fixtures for every supported framework major, including generated IDs,
      portals, browser-only APIs, lazy overlays, and streamed or deferred content.
- [x] Maintain an executable browser/framework compatibility matrix covering the oldest and newest
      supported peer versions rather than documenting untested version ranges.
- [x] Add representative Android and iOS browser accessibility smoke tests for form semantics,
      Dialog context and focus restoration, native Select and Toast semantics, reduced motion,
      touch targets, and automated WCAG A/AA checks.
- [ ] Retain physical-device TalkBack and VoiceOver evidence plus manual observations for zoom,
      forced colors, reduced motion, touch targets, and focus appearance.
- [x] Create small production reference applications for React, Vue, and Angular that exercise
      installation, theming, forms, overlays, SSR where relevant, and production bundling.

### Phase 3: complete the icons product

- [x] Complete the multi-size optical audit, automatic RTL inference, Angular host parity,
      accessibility examples, and bundle comparisons in the icon sections above.
- [ ] Complete the first-time-user icon study and discovery metrics tasks above before expanding
      the catalog.
- [x] Generate review sheets for all icons at 16, 20, 24, and 32 pixels and retain approved sheets
      or targeted visual baselines as release evidence.
- [x] Document a privacy-preserving method for collecting icon-search evidence; use structured user
      studies instead if product telemetry is not appropriate.

### Phase 4: make releases reproducible

- [x] Add Changesets-driven release-candidate and publish workflows with human approval before
      registry publication.
- [x] Generate package-scoped release notes and validate that every consumer-visible package change
      has an appropriate Changeset entry.
- [x] Pack every publishable package and run export, type-resolution, package-content, installation,
      and framework quick-start checks against tarballs rather than workspace source.
- [x] Configure the release workflow for token-free npm trusted publishing with OIDC and automatic
      provenance; document maintainer recovery and release-access procedures.
- [ ] Configure `release.yml` as the trusted publisher for all nine npm packages and record a
      successful provenance-bearing CI publication.
- [x] Add public API report snapshots and require explicit review for additions, removals, signature
      changes, and framework parity differences.
- [x] Define deprecation, support, and breaking-change policies, including a minimum notice period
      and an experimental namespace or package for unstable chart and motion APIs.

### Phase 5: improve developer experience and measure adoption

- [x] Add CLI dry-run and machine-readable output for `init`, `add`, `list`, and `diff`.
- [x] Improve `simurgh diff` guidance for customized generated source, conflict resolution, registry
      upgrades, and safe adoption of upstream fixes.
- [x] Version the registry schema and provide migrations or actionable compatibility errors for
      older `simurgh.json` files and generated-source metadata.
- [x] Publish maintained starter applications for React, Vue, and Angular using packed or released
      artifacts and production-representative configuration.
- [x] Add component/version/framework-aware documentation feedback and issue links that prefill the
      diagnostic context needed to reproduce a problem.
- [ ] Measure time to first component, first theme customization, accessible form completion, and
      first production build through structured release-candidate studies.
- [x] Publish and maintain a v1-readiness scorecard covering architecture, parity, accessibility,
      compatibility, documentation, package integrity, governance, and release automation.

### V1 exit gate

- [ ] Confirm a clean, reproducible release run; complete manual accessibility and first-time-user
      sign-off; close or explicitly defer every P0/P1 item; publish a beta; and collect beta evidence
      before declaring the public API stable at 1.0.
