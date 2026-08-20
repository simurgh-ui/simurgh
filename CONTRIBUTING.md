# Contributing to Simurgh UI

Thank you for helping improve Simurgh UI. The project accepts focused bug fixes, accessibility and
documentation improvements, framework-parity work, and proposals that align with the current
release roadmap.

## Before changing code

- Search existing issues and the roadmap in `todo.md`.
- Open an issue before a broad API, registry-schema, visual-language, dependency, or catalog change.
- Keep React, Vue, Angular, registry metadata, styles, documentation, and accessibility behavior in
  parity unless an intentional framework difference is documented.

## Development

Use Node.js 22 and pnpm 11.16.0.

```sh
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:quick-starts
pnpm bundle:size
pnpm test:e2e
```

Add or update focused tests for observable behavior. Component changes should cover keyboard input,
focus, accessible names and states, forms where applicable, RTL, styling hooks, and framework
parity. Do not update visual snapshots without reviewing the rendered difference.

## Changesets and pull requests

Add a Changeset for every consumer-visible change to a published package. Choose the smallest
appropriate release level and explain migrations for breaking pre-release changes. Internal tests,
documentation-only changes, and repository maintenance do not require a package release unless
they alter published files. After Changesets are merged to `main`, automation collects them into a
release pull request and generates each affected package's `CHANGELOG.md` entry.

Public API changes must follow the deprecation, support, breaking-change, and experimental-surface
rules in the [versioning guide](apps/docs/src/content/docs/guides/versioning.mdx). Do not bypass its
minimum notice window or place an unstable chart or motion API on a stable surface.

Keep pull requests scoped, describe the consumer-visible result, and complete the repository pull
request checklist. By contributing, you agree that your contribution is provided under the MIT
License in `LICENSE`.
