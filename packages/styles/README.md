# @simurgh-ui/styles

Design tokens and optional CSS recipes for Simurgh UI components. Use the complete theme, import
only the components an application renders, or override the semantic custom properties to create
a custom theme.

> Simurgh UI is pre-release. Pin the package version and review release notes before upgrading.

## Install

```sh
pnpm add @simurgh-ui/styles
```

## Usage

For the smallest CSS bundle, import individual component styles:

```css
@import '@simurgh-ui/styles/button.css';
@import '@simurgh-ui/styles/dialog.css';
```

Each component stylesheet includes the shared token layer. A CSS bundler should deduplicate those
imports when several component styles are used.

Import the entire default theme when granular CSS is not needed:

```css
@import '@simurgh-ui/styles/all.css';
```

The package also exposes `tokens.css` for custom visual implementations and `recipes.css` for the
complete component recipe collection.

Component behavior does not depend on these styles. Applications may replace the visual layer and
target the components' `data-slot`, state, and semantic attributes directly.
