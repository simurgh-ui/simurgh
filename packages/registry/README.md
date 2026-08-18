# @simurgh-ui/registry

Typed component registry metadata consumed by `@simurgh-ui/cli`. It describes the available
Simurgh UI components, framework-specific symbols and paths, shared files, and registry version.

Most applications should use `@simurgh-ui/cli` rather than depending on this package directly.

## Install

```sh
pnpm add @simurgh-ui/registry
```

## Usage

```ts
import { manifest, registryEntry } from '@simurgh-ui/registry';

console.log(manifest.components);
const button = registryEntry('button', 'react');
```

The package is ESM-only and exports TypeScript types for framework names, component names, and the
registry manifest.
