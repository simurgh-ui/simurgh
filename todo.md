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
- [ ] Harden overlay and composite-widget parity across all three frameworks.
  - [x] Add Angular Floating UI positioning, dialog focus management, and reactive tab/panel bindings.
  - [x] Add Vue tooltip hover/focus behavior, dialog focus containment, and overlay semantics.
  - [ ] Complete cross-framework menu/select keyboard parity and contract coverage.
