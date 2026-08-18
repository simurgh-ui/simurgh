# @simurgh-ui/angular

Accessible, tree-shakeable Angular components from Simurgh UI. The package supports Angular 18 and
newer and exposes standalone components through granular subpaths.

> Simurgh UI is pre-release. Pin the package version and review release notes before upgrading.

## Recommended: install with the CLI

The CLI copies component source into your application so you can inspect, customize, and own it:

```sh
pnpm dlx @simurgh-ui/cli init --framework angular
pnpm dlx @simurgh-ui/cli add button dialog
```

## Direct package installation

Install the prebuilt component package when you prefer conventional library imports:

```sh
pnpm add @simurgh-ui/angular @simurgh-ui/styles
```

Angular Core and Angular Common are peer dependencies and must be installed by the application.

## Quick start

```ts
import { Component } from '@angular/core';
import { ButtonComponent } from '@simurgh-ui/angular/button';

@Component({
  selector: 'app-save-button',
  standalone: true,
  imports: [ButtonComponent],
  template: `<simurgh-button type="button">Save changes</simurgh-button>`,
})
export class SaveButtonComponent {}
```

Add the component stylesheet to the application's global styles:

```css
@import '@simurgh-ui/styles/button.css';
```

Prefer component subpaths such as `/button`, `/dialog`, and `/chart` so production builds can
exclude unrelated components. The root entry point is also available.

## Related packages

- `@simurgh-ui/icons` provides per-icon Angular entry points.
- `@simurgh-ui/motion/angular` provides optional animation primitives.
- `@simurgh-ui/cli` copies component source into an application for full ownership.
