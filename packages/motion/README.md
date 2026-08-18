# @simurgh-ui/motion

Lightweight, opt-in animation primitives for Simurgh UI. The engine uses the Web Animations API,
supports reduced-motion preferences, and includes React, Vue, and Angular adapters.

> Simurgh UI is pre-release. Pin the package version and review release notes before upgrading.

## Install

```sh
pnpm add @simurgh-ui/motion
```

Install React 18+, Vue 3.4+, or Angular 18+ for the corresponding framework adapter.

## Framework-neutral usage

```ts
import { animate } from '@simurgh-ui/motion';

const controls = animate(
  element,
  { opacity: [0, 1], y: [8, 0] },
  {
    duration: 0.24,
  },
);

await controls.finished;
```

Import framework integrations from `@simurgh-ui/motion/react`, `@simurgh-ui/motion/vue`, or
`@simurgh-ui/motion/angular`. Motion is an optional peer of the Simurgh component adapters, so
applications that do not use animation do not pay for it.
