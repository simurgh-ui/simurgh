# Simurgh UI

Accessible, source-owned UI primitives for Angular, React, and Vue. Simurgh keeps framework-neutral interaction logic separate from idiomatic framework components, optional CSS recipes, icons, and motion utilities.

> [!WARNING]
> Simurgh UI is pre-release. APIs may change, and the `@simurgh-ui` package scope is provisional pending name and trademark checks.

## Why Simurgh?

- **Accessible by default** — components are tested for keyboard behavior, supported states, and accessibility contracts.
- **Source-owned** — the CLI copies component source into your application so you can inspect, edit, and keep it.
- **Framework-native** — React, Vue, and Angular adapters expose conventions appropriate to each framework.
- **Style-flexible** — use the supplied tokens and CSS recipes, import individual component styles, or replace the visual layer.
- **Tree-shakeable** — component entry points, icons, and motion adapters are designed for granular imports.

## Quick start

Simurgh's CLI detects React, Vue, or Angular from your application's `package.json`, installs the required runtime dependencies, creates `simurgh.json`, and copies the base style files.

```sh
pnpm dlx @simurgh-ui/cli init
pnpm dlx @simurgh-ui/cli add button dialog
```

Import the generated styles from the location configured in `simurgh.json`:

```css
@import "./styles/simurgh/tokens.css";
@import "./styles/simurgh/recipes.css";
```

For React and Vue, the CLI follows the existing project layout: it writes to `src/components/ui` when a `src` directory exists, or `components/ui` otherwise. Angular components live in `src/app/components/ui`. The generated source belongs to your application and can be customized directly.

To select a framework explicitly or avoid installing dependencies during initialization:

```sh
pnpm dlx @simurgh-ui/cli init --framework react
pnpm dlx @simurgh-ui/cli init --framework vue --skip-install
pnpm dlx @simurgh-ui/cli init --framework angular
```

## CLI commands

| Command | Purpose |
| --- | --- |
| `simurgh init` | Detect or select a framework and initialize Simurgh. |
| `simurgh list` | List all components in the registry. |
| `simurgh add [components...]` | Copy selected components, or the complete catalog when no names are supplied. |
| `simurgh add dialog --overwrite` | Replace an existing generated component with the registry version. |
| `simurgh diff [component]` | Compare local component source with the current registry without overwriting customizations. |

## Packages

| Package | Description |
| --- | --- |
| `@simurgh-ui/core` | Framework-neutral state and interaction logic. |
| `@simurgh-ui/react` | React 18+ components. |
| `@simurgh-ui/vue` | Vue 3.4+ components. |
| `@simurgh-ui/angular` | Angular 18+ components. |
| `@simurgh-ui/styles` | Design tokens, shared recipes, and per-component CSS. |
| `@simurgh-ui/icons` | SVG and tree-shakeable React, Vue, and Angular icon entry points. |
| `@simurgh-ui/motion` | Framework-neutral motion primitives and framework adapters. |
| `@simurgh-ui/registry` | Component registry metadata consumed by the CLI. |
| `@simurgh-ui/cli` | Source installation and local-registry comparison commands. |

Framework packages support both their main entry point and per-component imports. The styles package exposes `tokens.css`, `recipes.css`, `all.css`, and individual component styles.

## Design system

The default color system draws from Iranian architectural materials and pigments: firuzeh (turquoise), Persian and lapis blues, cobalt glaze, ochre brick, saffron, pomegranate, ivory, and manuscript ink.

Raw heritage tokens are kept separate from semantic UI roles. This lets themes remain culturally grounded while preserving contrast, state clarity, and accessibility. Consumers can override semantic custom properties without changing component behavior.

## Local development

### Requirements

- Node.js 22 (the version used in CI)
- pnpm 11.16.0

Install dependencies and start the workspace in development mode:

```sh
pnpm install
pnpm dev
```

The monorepo is managed with pnpm workspaces and Turborepo. The documentation app is under `apps/docs`; libraries and tooling are under `packages`.

### Useful commands

```sh
pnpm build                 # build every package and the documentation site
pnpm test                  # run package tests
pnpm test:contracts        # run framework and CLI contract tests
pnpm test:quick-starts     # verify framework quick-start examples
pnpm test:e2e              # run Playwright end-to-end tests
pnpm coverage              # collect test coverage
pnpm lint                  # lint the workspace
pnpm typecheck             # type-check the workspace
pnpm bundle:size           # enforce package and lazy-loading size budgets
pnpm bundle:react-splitting # inspect React code splitting
pnpm format                # format the repository with Prettier
```

Install Playwright's browsers before running end-to-end tests for the first time:

```sh
pnpm exec playwright install chromium firefox webkit
```

## Contributing

Before opening a pull request, run the same core checks used by CI:

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:quick-starts
pnpm bundle:size
pnpm test:e2e
```

Changes to published packages should include an appropriate Changesets entry in `.changeset`. Keep framework implementations, component documentation, styling contracts, and accessibility behavior aligned when adding or changing a component.

## Project status

Simurgh UI is under active development and is not yet a stable release. Pin package versions in production experiments and review generated changes before using `--overwrite`.
