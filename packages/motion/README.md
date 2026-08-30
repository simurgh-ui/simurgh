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

For multiple elements, use `animateAll` with a numeric or functional stagger:

```ts
import { animateAll } from '@simurgh-ui/motion';

animateAll(document.querySelectorAll('.item'), { opacity: [0, 1], y: [8, 0] }, {
  duration: 0.24,
  stagger: (index) => index * 0.04,
});
```

For coordinated scenes, `timeline` accepts absolute offsets or named labels:

```ts
import { timeline } from '@simurgh-ui/motion';

timeline([
  { target: panel, keyframes: { opacity: [0, 1] }, transition: { duration: 0.2 } },
  { target: details, keyframes: { y: [12, 0] }, at: 'details' },
], { labels: { details: 0.2 } });
```

Scroll-linked animation is opt-in so applications that do not use it do not pay for
the scroll listener:

```ts
import { scroll } from '@simurgh-ui/motion/scroll';

scroll(panel, { opacity: [0, 1], y: [24, 0] }, { once: true });
```

Layout changes can be animated through the opt-in FLIP helper:

```ts
import { layout } from '@simurgh-ui/motion/layout';

layout(card, () => card.classList.toggle('expanded'), {
  transition: { type: 'spring', stiffness: 240, damping: 24 },
});
```

The core stays WAAPI-based and does not include a permanent frame scheduler, drag
recognizer, or motion-value graph. Those heavier capabilities can be added as separate
entry points without increasing the base import.

Import framework integrations from `@simurgh-ui/motion/react`, `@simurgh-ui/motion/vue`, or
`@simurgh-ui/motion/angular`. Motion is an optional peer of the Simurgh component adapters, so
applications that do not use animation do not pay for it.
