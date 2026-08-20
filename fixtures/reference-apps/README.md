# Production reference applications

These deliberately small applications import public package subpaths exactly as a consumer does.
Each React, Vue, and Angular client includes a theme override, a native form, and a portalled overlay.
Each framework also has a server entry; the verifier executes React and Vue SSR and production-bundles
the Angular server entry alongside its existing runtime hydration contract.

Run `pnpm build` followed by `pnpm test:references`. The verifier requires JavaScript and CSS output
for every client, compiles every server, renders the React and Vue server output without browser
globals, and fails if any required component or theme import is removed.
