# @simurgh-ui/icons

Simurgh's generated functional icon catalog for navigation, actions, status, files, and layout. The
runtime catalog is the source of truth for the current icon count and functional groups.

```tsx
import { SimurghIcon } from '@simurgh-ui/icons/react/dynamic';

<SimurghIcon name="arrow-right" title="Next page" />;
```

Prefer named components for static application UI so unused icons can be tree-shaken:

```tsx
import { ArrowLeft, Home, Menu } from '@simurgh-ui/icons/react';

<ArrowLeft title="Back" />;
```

```ts
import { Home } from '@simurgh-ui/icons/vue/home';
import { SimurghIcon } from '@simurgh-ui/icons/vue/dynamic';
```

```ts
import { Home } from '@simurgh-ui/icons/angular/home';
import { SimurghIcon } from '@simurgh-ui/icons/angular/dynamic';
```

Use the explicit `@simurgh-ui/icons/catalog` entry point for `iconGroups`, grouped icon browsers and
menus, `getIcon` for framework-neutral definitions,
or `renderIconSvg` for server-generated markup. Directional icons mirror automatically when
`direction="rtl"`; pass `mirrorInRtl={false}` when direction describes a physical orientation.

Icons without a title are decorative and render with `aria-hidden="true"`. Provide `title` when an
icon conveys information without an adjacent accessible label.

Dynamic entry points intentionally retain the complete catalog. Prefer a named component (or the
per-icon `react/home`, `vue/home`, and `angular/home` subpaths) when the icon name is known at build
time. Raw SVG assets remain available through `@simurgh-ui/icons/svg/*`; they are kept in this
package because they are an explicit, independently consumed export rather than runtime overhead.
