# @simurgh-ui/vue

Accessible, tree-shakeable Vue components from Simurgh UI. The package supports Vue 3.4 and newer
and exposes every component through a granular subpath.

> Simurgh UI is pre-release. Pin the package version and review release notes before upgrading.

## Recommended: install with the CLI

The CLI copies component source into your application so you can inspect, customize, and own it:

```sh
pnpm dlx @simurgh-ui/cli init --framework vue
pnpm dlx @simurgh-ui/cli add button dialog
```

## Direct package installation

Install the prebuilt component package when you prefer conventional library imports:

```sh
pnpm add @simurgh-ui/vue @simurgh-ui/styles
```

Vue is a peer dependency and must be installed by the application.

## Quick start

```vue
<script setup lang="ts">
import { Button } from '@simurgh-ui/vue/button';
import '@simurgh-ui/styles/button.css';
</script>

<template>
  <Button type="button">Save changes</Button>
</template>
```

Prefer component subpaths such as `/button`, `/dialog`, and `/chart` so bundlers can exclude
unrelated components. The root entry point is also available when a barrel import is more
convenient.

Styles are optional. Import a component stylesheet for the smallest default visual layer, import
`@simurgh-ui/styles/all.css` for the complete theme, or supply your own CSS against the documented
slots and states.

## Related packages

- `@simurgh-ui/icons` provides per-icon Vue entry points.
- `@simurgh-ui/motion/vue` provides optional animation primitives.
- `@simurgh-ui/cli` copies component source into an application for full ownership.
