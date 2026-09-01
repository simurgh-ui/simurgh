# @simurgh-ui/svelte public API

```json
{
  "name": "@simurgh-ui/svelte",
  "version": "0.4.0-beta.4",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./*": {
      "types": "./dist/components/*.svelte.d.ts",
      "svelte": "./dist/components/*.svelte",
      "import": "./dist/components/*.svelte"
    }
  }
}
```
