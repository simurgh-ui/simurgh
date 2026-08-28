# @simurgh-ui/mcp

An MCP server that gives AI coding clients structured access to the Simurgh UI
registry, component source, and component documentation.

## Run locally

Build the workspace package and run it over stdio:

```sh
pnpm --filter @simurgh-ui/mcp build
node packages/mcp/dist/index.js
```

Example client configuration:

```json
{
  "mcpServers": {
    "simurgh-ui": {
      "command": "node",
      "args": ["/absolute/path/to/simurgh/packages/mcp/dist/index.js"]
    }
  }
}
```

The server is read-only and exposes these tools:

- `list_components` — search the registry by name or presentation status.
- `get_component` — retrieve metadata, symbols, status, and CLI install guidance.
- `get_component_source` — retrieve React, Vue, or Angular source.
- `get_component_docs` — retrieve the component’s MDX documentation.

It also exposes `simurgh://registry` and
`simurgh://components/{component}/docs` resources. Files are resolved from the
workspace, so the server is intended for a checked-out Simurgh repository during
development. A published package should pair this server with published registry
assets and docs before being run outside the monorepo.
