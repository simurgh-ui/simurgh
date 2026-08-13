# @simurgh-ui/icons

Simurgh's functional icon catalog. The current release contains 160 navigation, action, status,
file, and layout icons, organized into functional groups for browsing and dynamic selection.

```tsx
import { SimurghIcon } from '@simurgh-ui/icons/react';

<SimurghIcon name="arrow-right" title="Next page" />;
```

Prefer named components for static application UI so unused icons can be tree-shaken:

```tsx
import { ArrowLeft, Home, Menu } from '@simurgh-ui/icons/react';

<ArrowLeft title="Back" />;
```

```ts
import { SimurghIcon } from '@simurgh-ui/icons/vue';
```

```ts
import { SimurghIcon } from '@simurgh-ui/icons/angular';
```

Use `iconGroups` for grouped icon browsers and menus, `getIcon` for framework-neutral definitions,
or `renderIconSvg` for server-generated markup. Directional icons mirror automatically when
`direction="rtl"`; pass `mirrorInRtl={false}` when direction describes a physical orientation.

Icons without a title are decorative and render with `aria-hidden="true"`. Provide `title` when an
icon conveys information without an adjacent accessible label.
