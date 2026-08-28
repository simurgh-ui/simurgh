#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { manifest, registryEntry, type Framework } from '@simurgh-ui/registry';
import { z } from 'zod';

const packageRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const workspaceRoot = resolve(packageRoot, '..', '..');
const docsRoot = resolve(workspaceRoot, 'apps/docs/src/content/docs/components');
const assetsRoot = resolve(workspaceRoot, 'packages/cli/assets');
const frameworks = ['react', 'vue', 'angular'] as const;
const frameworkSchema = z.enum(frameworks);
const componentSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/u);

function componentExists(name: string): name is (typeof manifest.components)[number] {
  return manifest.components.includes(name as (typeof manifest.components)[number]);
}

function text(value: unknown) {
  return [{ type: 'text' as const, text: JSON.stringify(value, null, 2) }];
}

async function readComponentDoc(component: string) {
  return readFile(resolve(docsRoot, `${component}.mdx`), 'utf8');
}

function sourcePath(framework: Framework, component: string) {
  const extension = framework === 'react' ? 'tsx' : 'ts';
  return resolve(assetsRoot, framework, `${component}.${extension}`);
}

export function createServer() {
  const server = new McpServer({
    name: 'simurgh-ui',
    version: manifest.version,
  });

  server.registerTool(
    'list_components',
    {
      title: 'List Simurgh UI components',
      description: 'List components in the Simurgh UI registry, optionally filtered by a search query or presentation status.',
      inputSchema: {
        query: z.string().optional().describe('Case-insensitive component name filter.'),
        status: z.string().optional().describe('Registry presentation status filter, such as stable or beta.'),
      },
    },
    async ({ query, status }) => {
      const normalized = query?.trim().toLowerCase();
      const statusComponents = status
        ? new Set((manifest.presentationStatus as Record<string, readonly string[]>)[status] ?? [])
        : undefined;
      const components = manifest.components.filter((name) =>
        (!normalized || name.includes(normalized)) && (!statusComponents || statusComponents.has(name)),
      );
      return { content: text({ version: manifest.version, count: components.length, components }) };
    },
  );

  server.registerTool(
    'get_component',
    {
      title: 'Get component metadata',
      description: 'Get framework symbols, dependencies, status, and installation guidance for a Simurgh UI component.',
      inputSchema: { component: componentSchema.describe('Registry component name, for example button.') },
    },
    async ({ component }) => {
      if (!componentExists(component)) throw new Error(`Unknown component: ${component}`);
      const statuses = Object.entries(manifest.presentationStatus)
        .filter(([, names]) => names.includes(component))
        .map(([name]) => name);
      return { content: text({ ...registryEntry(component, 'react'), statuses, install: `pnpm dlx @simurgh-ui/cli add ${component}` }) };
    },
  );

  server.registerTool(
    'get_component_source',
    {
      title: 'Get component source',
      description: 'Retrieve the source-owned component implementation bundled for a framework.',
      inputSchema: {
        component: componentSchema.describe('Registry component name.'),
        framework: frameworkSchema.describe('Target framework.'),
      },
    },
    async ({ component, framework }) => {
      if (!componentExists(component)) throw new Error(`Unknown component: ${component}`);
      const source = await readFile(sourcePath(framework, component), 'utf8');
      return { content: [{ type: 'text' as const, text: source }] };
    },
  );

  server.registerTool(
    'get_component_docs',
    {
      title: 'Get component documentation',
      description: 'Retrieve the full Markdown/MDX documentation page for a Simurgh UI component.',
      inputSchema: { component: componentSchema.describe('Registry component name.') },
    },
    async ({ component }) => {
      if (!componentExists(component)) throw new Error(`Unknown component: ${component}`);
      return { content: [{ type: 'text' as const, text: await readComponentDoc(component) }] };
    },
  );

  server.registerResource(
    'registry',
    'simurgh://registry',
    { description: 'The complete Simurgh UI registry manifest.', mimeType: 'application/json' },
    async (uri) => ({ contents: [{ uri: uri.href, mimeType: 'application/json', text: JSON.stringify(manifest, null, 2) }] }),
  );

  server.registerResource(
    'component-doc',
    new ResourceTemplate('simurgh://components/{component}/docs', { list: undefined }),
    { description: 'Documentation for a Simurgh UI component.', mimeType: 'text/markdown' },
    async (uri, variables) => {
      const component = String(variables.component);
      if (!componentExists(component)) throw new Error(`Unknown component: ${component}`);
      return { contents: [{ uri: uri.href, mimeType: 'text/markdown', text: await readComponentDoc(component) }] };
    },
  );

  return server;
}

export async function main() {
  const server = createServer();
  await server.connect(new StdioServerTransport());
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
