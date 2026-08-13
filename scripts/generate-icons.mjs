import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const svgRoot = resolve(root, 'packages/icons/svg');
const output = resolve(root, 'packages/icons/src/icons.generated.ts');
const reactOutput = resolve(root, 'packages/icons/src/react-icons.generated.ts');
const vueOutput = resolve(root, 'packages/icons/src/vue-icons.generated.ts');
const angularOutput = resolve(root, 'packages/icons/src/angular-icons.generated.ts');

const groups = {
  landmarks: ['home', 'dashboard', 'route', 'compass'],
  menus: ['menu', 'more-horizontal', 'more-vertical'],
  arrows: ['arrow-left', 'arrow-right', 'arrow-up', 'arrow-down'],
  chevrons: ['chevron-left', 'chevron-right', 'chevron-up', 'chevron-down', 'chevrons-left', 'chevrons-right', 'chevrons-up', 'chevrons-down'],
  'corner-movement': ['corner-up-left', 'corner-up-right', 'corner-down-left', 'corner-down-right'],
  viewport: ['expand', 'collapse', 'maximize', 'minimize'],
  transfers: ['external-link', 'enter', 'exit'],
  history: ['refresh', 'rotate-clockwise', 'undo', 'redo'],
  'action-basics': ['plus', 'minus', 'close', 'check'],
  editing: ['edit', 'pencil', 'trash', 'cut'],
  clipboard: ['copy', 'duplicate', 'paste'],
  'file-actions': ['archive', 'save', 'download', 'upload', 'print'],
  sharing: ['share', 'send', 'link', 'unlink'],
  organization: ['filter', 'settings'],
  ordering: ['sort-ascending', 'sort-descending', 'swap', 'shuffle'],
  selection: ['select-all', 'deselect'],
  'view-actions': ['zoom-in', 'zoom-out'],
  'semantic-feedback': ['success', 'success-circle', 'error', 'error-circle', 'warning', 'warning-circle', 'info', 'info-circle'],
  assistance: ['help', 'help-circle'],
  notifications: ['notification', 'notification-active', 'notification-off'],
  activity: ['loading', 'pending', 'progress'],
  presence: ['online', 'offline', 'available', 'unavailable'],
  'trust-security': ['verified', 'unverified', 'secure', 'insecure'],
  preferences: ['favorite', 'favorite-filled', 'star', 'star-filled'],
  'visibility-sync': ['visibility', 'visibility-off', 'sync', 'sync-error'],
  documents: ['file', 'file-text', 'file-code', 'file-pdf', 'file-zip', 'file-lock'],
  'document-actions': ['file-plus', 'file-minus', 'file-check', 'file-error', 'file-search', 'file-download', 'file-upload'],
  'media-files': ['file-image', 'file-video', 'file-audio'],
  folders: ['folder', 'folder-open', 'folder-lock'],
  'folder-actions': ['folder-plus', 'folder-minus', 'folder-check', 'folder-error', 'folder-search', 'folder-download', 'folder-upload'],
  'file-collections': ['files', 'folders', 'cloud-file'],
  'file-utilities': ['clipboard', 'clipboard-text', 'attachment'],
  'layout-structures': ['layout', 'layout-dashboard', 'layout-grid', 'layout-list', 'layout-columns', 'layout-rows', 'layout-sidebar-left', 'layout-sidebar-right'],
  'layout-regions': ['layout-header', 'layout-footer', 'layout-navbar', 'layout-toolbar'],
  'layout-panels': ['panel-left', 'panel-right', 'panel-top', 'panel-bottom'],
  'layout-grids': ['grid-2x2', 'grid-3x3', 'columns-2', 'columns-3', 'rows-2', 'rows-3'],
  'layout-splits': ['split-horizontal', 'split-vertical'],
  alignment: ['align-left', 'align-center', 'align-right', 'align-top', 'align-middle', 'align-bottom'],
  'display-modes': ['fullscreen', 'focus-mode'],
};

const directional = new Set([
  ...groups.arrows,
  'chevron-left', 'chevron-right', 'chevrons-left', 'chevrons-right',
  'corner-up-left', 'corner-up-right', 'corner-down-left', 'corner-down-right',
  'external-link', 'enter', 'exit',
  'send', 'undo', 'redo',
]);

const groupByName = new Map(Object.entries(groups).flatMap(([group, names]) => names.map((name) => [name, group])));
const files = (await readdir(svgRoot)).filter((file) => file.endsWith('.svg')).sort();

const definitions = [];
for (const file of files) {
  const name = basename(file, '.svg');
  const group = groupByName.get(name);
  if (!group) throw new Error(`Missing functional group for ${name}`);
  const source = await readFile(resolve(svgRoot, file), 'utf8');
  const transform = source.match(/<g transform="([^"]+)"/)?.[1] ?? '';
  const paths = [...source.matchAll(/<path\s+([^>]+)\/?\s*>/g)].map(([, attributes]) => {
    const d = attributes.match(/d="([^"]+)"/)?.[1];
    const fill = attributes.match(/fill="([^"]+)"/)?.[1];
    const opacity = attributes.match(/opacity="([^"]+)"/)?.[1];
    if (!d || !fill) throw new Error(`Invalid path in ${file}`);
    return { d, fill, ...(opacity ? { opacity: Number(opacity) } : {}) };
  });
  definitions.push({ name, group, direction: directional.has(name) ? 'directional' : 'neutral', transform, paths });
}

const q = JSON.stringify;
const names = definitions.map(({ name }) => name);
const lines = [
  "import type { IconDefinition, IconGroup, IconRenderOptions } from './types.js';",
  '',
  `export const iconNames = ${JSON.stringify(names)} as const;`,
  'export type IconName = (typeof iconNames)[number];',
  '',
  'export const icons = {',
  ...definitions.map((icon) => `  ${q(icon.name)}: ${JSON.stringify({ ...icon, viewBox: '0 0 144 144' })},`),
  '} as const satisfies Record<IconName, IconDefinition>;',
  '',
  `export const iconGroups = ${JSON.stringify(groups, null, 2)} as const satisfies Record<IconGroup, readonly IconName[]>;`,
  '',
  'export function getIcon(name: IconName): IconDefinition { return icons[name]; }',
  '',
  'function escape(value: string): string {',
  `  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');`,
  '}',
  '',
  'export function renderIconSvg(name: IconName, options: IconRenderOptions = {}): string {',
  '  const icon = getIcon(name);',
  '  const size = options.size ?? 24;',
  "  const mirror = options.mirrorInRtl !== false && options.direction === 'rtl' && icon.direction === 'directional';",
  "  const transform = mirror ? `translate(144 0) scale(-1 1) ${icon.transform}` : icon.transform;",
  "  const accessibility = options.title ? `role=\"img\" aria-label=\"${escape(options.title)}\"` : 'aria-hidden=\"true\"';",
  "  const className = options.class ? ` class=\"${escape(options.class)}\"` : '';",
  "  const paths = icon.paths.map((path) => `<path d=\"${path.d}\" fill=\"${path.fill}\"${path.opacity === undefined ? '' : ` opacity=\"${path.opacity}\"`}/>`).join('');",
  "  return `<svg width=\"${escape(String(size))}\" height=\"${escape(String(size))}\" viewBox=\"${icon.viewBox}\" ${accessibility} focusable=\"false\"${className}><g transform=\"${transform}\">${paths}</g></svg>`;",
  '}',
];

await mkdir(resolve(root, 'packages/icons/src'), { recursive: true });
await writeFile(output, `${lines.join('\n')}\n`);
const pascal = (name) => name.split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join('');
const definitionLiteral = (icon) => JSON.stringify({ ...icon, viewBox: '0 0 144 144' });

await writeFile(reactOutput, [
  "import { createIconComponent } from './react-base.js';",
  "import type { IconDefinition } from './types.js';",
  '',
  ...definitions.map((icon) => `export const ${pascal(icon.name)} = /* @__PURE__ */ createIconComponent(${definitionLiteral(icon)} satisfies IconDefinition, '${pascal(icon.name)}');`),
  '',
].join('\n'));

await writeFile(vueOutput, [
  "import { createIconComponent } from './vue-base.js';",
  "import type { IconDefinition } from './types.js';",
  '',
  ...definitions.map((icon) => `export const ${pascal(icon.name)} = /* @__PURE__ */ createIconComponent(${definitionLiteral(icon)} satisfies IconDefinition, '${pascal(icon.name)}');`),
  '',
].join('\n'));

await writeFile(angularOutput, [
  "import { ChangeDetectionStrategy, Component, input } from '@angular/core';",
  "import { SimurghIcon } from './angular-base.js';",
  '',
  ...definitions.flatMap((icon) => {
    const className = pascal(icon.name);
    return [
      `@Component({ selector: 'simurgh-${icon.name}-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,`,
      `  template: \`<simurgh-icon name="${icon.name}" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />\` })`,
      `export class ${className} { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }`,
      '',
    ];
  }),
].join('\n'));
console.log(`Generated ${definitions.length} icon definitions`);
