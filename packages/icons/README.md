# @simurgh-ui/icons

Accessible SVG icons for React, Vue, and Angular, plus framework-neutral definitions and raw SVG
assets. Static per-icon imports allow bundlers to exclude the rest of the catalog.

> Simurgh UI is pre-release. Pin the package version and review release notes before upgrading.

## Install

```sh
pnpm add @simurgh-ui/icons
```

Install React 18+, Vue 3.4+, or Angular 18+ for the corresponding framework adapter.

## Static icons

Prefer a per-icon entry point when the icon name is known at build time:

```tsx
import { ArrowLeft } from '@simurgh-ui/icons/react/arrow-left';

<ArrowLeft title="Back" />;
```

```ts
import { Home } from '@simurgh-ui/icons/vue/home';
import { Home } from '@simurgh-ui/icons/angular/home';
```

Framework barrels such as `@simurgh-ui/icons/react` are also available and tree-shakeable in
modern bundlers.

## Dynamic icons

Use a dynamic adapter only when an icon name must be selected at runtime:

```tsx
import { SimurghIcon } from '@simurgh-ui/icons/react/dynamic';

<SimurghIcon name="arrow-right" title="Next page" />;
```

The `/react/dynamic`, `/vue/dynamic`, and `/angular/dynamic` entry points intentionally retain the
complete catalog and are much larger than static imports.

Use the explicit `@simurgh-ui/icons/catalog` entry point for `iconGroups`, grouped icon browsers and
menus, `getIcon` for framework-neutral definitions,
or `renderIconSvg` for server-generated markup. Directional icons mirror automatically when
`direction="rtl"`; pass `mirrorInRtl={false}` when direction describes a physical orientation.

Icons without a title are decorative and render with `aria-hidden="true"`. Provide `title` when an
icon conveys information without an adjacent accessible label.

Raw SVG assets are available through `@simurgh-ui/icons/svg/*`.
