# @simurgh-ui/core

Framework-neutral interaction, accessibility, positioning, calendar, and chart utilities used by
Simurgh UI adapters. Most applications should install a framework package instead of depending on
Core directly.

> Simurgh UI is pre-release. Pin the package version and review release notes before upgrading.

## Install

```sh
pnpm add @simurgh-ui/core
```

## Usage

```ts
import { createControllableState, nextIndex } from '@simurgh-ui/core';

const state = createControllableState(false);
state.toggle();

const next = nextIndex(0, 4, 'ArrowRight');
```

Chart primitives are available from `@simurgh-ui/core/charts`. Optional chart interaction,
streaming, and canvas helpers use the `/chart-interactions`, `/chart-stream`, and `/chart-canvas`
entry points.

The package is ESM-only, has no runtime dependencies, and is marked as side-effect free for tree
shaking.
