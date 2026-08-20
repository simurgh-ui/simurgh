# Production reference and starter applications

These deliberately small applications import public package subpaths exactly as a consumer does.
Each React, Vue, and Angular client includes a theme override, a native form, and a portalled overlay.
Each framework also has a server entry; the verifier executes React and Vue SSR and production-bundles
the Angular server entry alongside its existing runtime hydration contract.

Each framework directory is also a standalone Vite starter with an `index.html`, package manifest,
TypeScript configuration, and explicit production build settings. Copy the framework directory and
the shared `theme.css`, install its dependencies, then run `pnpm build`. Published package versions
are pinned to compatible minor lines so an update remains an intentional application change.

Run `pnpm build` followed by `pnpm test:references`. The verifier requires JavaScript and CSS output
for every client, compiles every server, renders the React and Vue server output without browser
globals, and fails if any required component or theme import is removed. `pnpm test:tarballs` copies
these same maintained sources into an isolated consumer and bundles them against freshly packed
Simurgh artifacts, preventing workspace source resolution from hiding package defects.
