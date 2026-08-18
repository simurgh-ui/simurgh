import console from 'node:console';
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const svgRoot = resolve(root, 'packages/icons/svg');
const output = resolve(root, 'packages/icons/src/icons.generated.ts');
const reactOutput = resolve(
  root,
  'packages/icons/src/react-icons.generated.ts',
);
const vueOutput = resolve(root, 'packages/icons/src/vue-icons.generated.ts');
const angularOutput = resolve(
  root,
  'packages/icons/src/angular-icons.generated.ts',
);
const definitionsRoot = resolve(root, 'packages/icons/src/definitions');
const reactRoot = resolve(root, 'packages/icons/src/react-icons');
const vueRoot = resolve(root, 'packages/icons/src/vue-icons');
const angularRoot = resolve(root, 'packages/icons/src/angular-icons');

const groups = {
  landmarks: ['home', 'dashboard', 'route', 'compass'],
  menus: ['menu', 'more-horizontal', 'more-vertical'],
  arrows: ['arrow-left', 'arrow-right', 'arrow-up', 'arrow-down'],
  chevrons: [
    'chevron-left',
    'chevron-right',
    'chevron-up',
    'chevron-down',
    'chevrons-left',
    'chevrons-right',
    'chevrons-up',
    'chevrons-down',
  ],
  'corner-movement': [
    'corner-up-left',
    'corner-up-right',
    'corner-down-left',
    'corner-down-right',
  ],
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
  'semantic-feedback': [
    'success',
    'success-circle',
    'error',
    'error-circle',
    'warning',
    'warning-circle',
    'info',
    'info-circle',
  ],
  assistance: ['help', 'help-circle'],
  notifications: ['notification', 'notification-active', 'notification-off'],
  activity: ['loading', 'pending', 'progress'],
  presence: ['online', 'offline', 'available', 'unavailable'],
  'trust-security': ['verified', 'unverified', 'secure', 'insecure'],
  preferences: ['favorite', 'favorite-filled', 'star', 'star-filled'],
  'visibility-sync': ['visibility', 'visibility-off', 'sync', 'sync-error'],
  documents: [
    'file',
    'file-text',
    'file-code',
    'file-pdf',
    'file-zip',
    'file-lock',
  ],
  'document-actions': [
    'file-plus',
    'file-minus',
    'file-check',
    'file-error',
    'file-search',
    'file-download',
    'file-upload',
  ],
  'media-files': ['file-image', 'file-video', 'file-audio'],
  folders: ['folder', 'folder-open', 'folder-lock'],
  'folder-actions': [
    'folder-plus',
    'folder-minus',
    'folder-check',
    'folder-error',
    'folder-search',
    'folder-download',
    'folder-upload',
  ],
  'file-collections': ['files', 'folders', 'cloud-file'],
  'file-utilities': ['clipboard', 'clipboard-text', 'attachment'],
  'layout-structures': [
    'layout',
    'layout-dashboard',
    'layout-grid',
    'layout-list',
    'layout-columns',
    'layout-rows',
    'layout-sidebar-left',
    'layout-sidebar-right',
  ],
  'layout-regions': [
    'layout-header',
    'layout-footer',
    'layout-navbar',
    'layout-toolbar',
  ],
  'layout-panels': ['panel-left', 'panel-right', 'panel-top', 'panel-bottom'],
  'layout-grids': [
    'grid-2x2',
    'grid-3x3',
    'columns-2',
    'columns-3',
    'rows-2',
    'rows-3',
  ],
  'layout-splits': ['split-horizontal', 'split-vertical'],
  alignment: [
    'align-left',
    'align-center',
    'align-right',
    'align-top',
    'align-middle',
    'align-bottom',
  ],
  'display-modes': ['fullscreen', 'focus-mode'],
  messaging: [
    'message',
    'message-dots',
    'messages',
    'message-square',
    'reply',
    'forward',
  ],
  mail: ['mail', 'mail-open', 'mail-notification', 'inbox', 'outbox'],
  calling: [
    'phone',
    'phone-incoming',
    'phone-outgoing',
    'phone-missed',
    'video',
    'video-off',
  ],
  audio: ['microphone', 'microphone-off', 'headphones', 'headset'],
  broadcasting: ['megaphone', 'announcement', 'broadcast', 'rss', 'at-sign'],
  people: [
    'user',
    'user-circle',
    'users',
    'users-group',
    'contact',
    'contacts',
    'community',
  ],
  'user-actions': [
    'user-plus',
    'user-check',
    'user-minus',
    'user-x',
    'user-settings',
    'user-search',
    'user-edit',
  ],
  'user-security': ['user-lock', 'user-shield', 'user-star', 'user-heart'],
  profiles: [
    'user-card',
    'profile',
    'profile-card',
    'id-card',
    'badge-check',
    'account',
    'account-circle',
  ],
  roles: [
    'admin',
    'moderator',
    'employee',
    'customer',
    'guest',
    'child',
    'accessibility',
  ],
  calendars: ['calendar', 'calendar-days', 'calendar-week', 'calendar-month'],
  'calendar-actions': [
    'calendar-plus',
    'calendar-minus',
    'calendar-check',
    'calendar-x',
    'calendar-search',
    'calendar-edit',
    'calendar-settings',
    'calendar-lock',
    'calendar-star',
  ],
  scheduling: [
    'calendar-clock',
    'calendar-event',
    'calendar-range',
    'date',
    'date-today',
    'day',
    'week',
    'month',
    'schedule',
    'appointment',
    'reminder',
  ],
  time: [
    'clock',
    'clock-plus',
    'clock-check',
    'alarm',
    'alarm-off',
    'timer',
    'stopwatch',
    'history-clock',
  ],
  playback: [
    'play',
    'pause',
    'stop',
    'skip-next',
    'skip-previous',
    'fast-forward',
    'rewind',
    'eject',
    'repeat',
  ],
  'media-audio': [
    'volume',
    'volume-low',
    'volume-high',
    'volume-off',
    'music',
    'music-note',
    'playlist',
    'radio',
  ],
  'visual-media': [
    'image',
    'images',
    'camera',
    'camera-off',
    'film',
    'clapperboard',
    'gallery',
    'picture-in-picture',
  ],
  'media-content': [
    'captions',
    'subtitles',
    'equalizer',
    'waveform',
    'podcast',
    'disc',
    'cast',
  ],
  shopping: [
    'shopping-cart',
    'cart-plus',
    'cart-minus',
    'cart-check',
    'cart-x',
    'shopping-bag',
    'basket',
    'store',
  ],
  fulfillment: [
    'package',
    'package-open',
    'package-check',
    'package-x',
    'delivery-truck',
    'shipping',
    'warehouse',
    'barcode',
  ],
  payments: [
    'credit-card',
    'card-check',
    'wallet',
    'cash',
    'banknote',
    'coins',
    'receipt',
    'invoice',
  ],
  pricing: [
    'tag',
    'tags',
    'coupon',
    'percent',
    'gift',
    'cash-register',
    'checkout',
    'refund',
  ],
  charts: [
    'bar-chart',
    'bar-chart-horizontal',
    'bar-chart-stacked',
    'column-chart',
    'line-chart',
    'area-chart',
    'pie-chart',
    'donut-chart',
  ],
  'statistical-charts': [
    'trend-up',
    'trend-down',
    'activity-chart',
    'scatter-chart',
    'bubble-chart',
    'radar-chart',
    'gauge',
    'histogram',
  ],
  'chart-interface': [
    'chart-grid',
    'chart-axis',
    'chart-label',
    'chart-legend',
    'chart-tooltip',
    'data-table',
    'analytics',
    'dashboard-chart',
  ],
  'chart-actions': [
    'percent-chart',
    'progress-chart',
    'target-chart',
    'comparison-chart',
    'report-chart',
    'presentation-chart',
    'chart-plus',
    'chart-settings',
  ],
  devices: [
    'monitor',
    'laptop',
    'desktop',
    'tablet',
    'smartphone',
    'watch',
    'keyboard',
    'mouse',
  ],
  hardware: [
    'printer',
    'scanner',
    'router',
    'server',
    'hard-drive',
    'cpu',
    'memory',
    'usb',
  ],
  connectivity: [
    'battery',
    'battery-low',
    'battery-charging',
    'power',
    'plug',
    'wifi',
    'wifi-off',
    'bluetooth',
  ],
  'device-actions': [
    'device-mobile',
    'device-desktop',
    'devices',
    'screen-share',
    'screen-off',
    'cast-device',
    'gamepad',
    'webcam',
  ],
  'access-control': [
    'lock',
    'unlock',
    'lock-keyhole',
    'shield',
    'shield-check',
    'shield-x',
    'shield-alert',
    'shield-lock',
  ],
  'identity-security': [
    'key',
    'key-round',
    'fingerprint',
    'face-id',
    'scan-face',
    'password',
    'pin-code',
    'access-key',
  ],
  'privacy-security': [
    'privacy',
    'incognito',
    'hidden',
    'firewall',
    'antivirus',
    'bug-shield',
    'secure-server',
    'secure-cloud',
  ],
  authentication: [
    'authentication',
    'two-factor',
    'verified-user',
    'user-blocked',
    'certificate',
    'passkey',
    'security-scan',
    'security-warning',
  ],
  mapping: [
    'map',
    'map-pin',
    'map-pin-filled',
    'map-pinned',
    'navigation-arrow',
    'compass-map',
    'route-map',
    'directions',
  ],
  'location-services': [
    'location',
    'location-check',
    'location-x',
    'location-plus',
    'current-location',
    'crosshair-location',
    'gps',
    'satellite',
  ],
  geography: [
    'globe',
    'globe-alt',
    'earth',
    'landmark',
    'building',
    'buildings',
    'road',
    'signpost',
  ],
  transportation: [
    'car',
    'bus',
    'train',
    'airplane',
    'ship',
    'bike',
    'walking',
    'flag',
  ],
  coding: [
    'code',
    'code-alt',
    'terminal',
    'command-line',
    'braces',
    'brackets',
    'binary',
    'regex',
  ],
  'version-control': [
    'git-branch',
    'git-commit',
    'git-merge',
    'git-pull-request',
    'git-fork',
    'version-control',
    'repository',
    'package-code',
  ],
  'testing-delivery': [
    'bug',
    'debug',
    'breakpoint',
    'unit-test',
    'integration-test',
    'deploy',
    'rocket',
    'build',
  ],
  'development-infrastructure': [
    'api',
    'webhook',
    'database',
    'cloud-code',
    'server-code',
    'container',
    'settings-code',
    'tools',
  ],
};

const directional = new Set([
  ...groups.arrows,
  'chevron-left',
  'chevron-right',
  'chevrons-left',
  'chevrons-right',
  'corner-up-left',
  'corner-up-right',
  'corner-down-left',
  'corner-down-right',
  'external-link',
  'enter',
  'exit',
  'send',
  'undo',
  'redo',
  'reply',
  'forward',
]);

const groupByName = new Map(
  Object.entries(groups).flatMap(([group, names]) =>
    names.map((name) => [name, group]),
  ),
);
const files = (await readdir(svgRoot))
  .filter((file) => file.endsWith('.svg'))
  .sort();

const definitions = await Promise.all(
  files.map(async (file) => {
    const name = basename(file, '.svg');
    const group = groupByName.get(name);
    if (!group) throw new Error(`Missing functional group for ${name}`);
    const source = await readFile(resolve(svgRoot, file), 'utf8');
    const transform = source.match(/<g transform="([^"]+)"/)?.[1] ?? '';
    const paths = [...source.matchAll(/<path\s+([^>]+)\/?\s*>/g)].map(
      ([, attributes]) => {
        const d = attributes.match(/d="([^"]+)"/)?.[1];
        const fill = attributes.match(/fill="([^"]+)"/)?.[1];
        const opacity = attributes.match(/opacity="([^"]+)"/)?.[1];
        if (!d || !fill) throw new Error(`Invalid path in ${file}`);
        return { d, fill, ...(opacity ? { opacity: Number(opacity) } : {}) };
      },
    );
    return {
      name,
      group,
      direction: directional.has(name) ? 'directional' : 'neutral',
      transform,
      paths,
    };
  }),
);

const q = JSON.stringify;
const names = definitions.map(({ name }) => name);
const pascal = (name) =>
  name
    .split('-')
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join('');
const definitionLiteral = (icon) =>
  JSON.stringify({ ...icon, viewBox: '0 0 144 144' });

for (const directory of [definitionsRoot, reactRoot, vueRoot, angularRoot]) {
  await rm(directory, { recursive: true, force: true });
  await mkdir(directory, { recursive: true });
}

await Promise.all(
  definitions.map(async (icon) => {
    const className = pascal(icon.name);
    await writeFile(
      resolve(definitionsRoot, `${icon.name}.ts`),
      [
        "import type { IconDefinition } from '../types.js';",
        `export const definition = ${definitionLiteral(icon)} as const satisfies IconDefinition;`,
        '',
      ].join('\n'),
    );
    await writeFile(
      resolve(reactRoot, `${icon.name}.tsx`),
      [
        "import { createIconComponent } from '../react-base.js';",
        `import { definition } from '../definitions/${icon.name}.js';`,
        `export const ${className} = /* @__PURE__ */ createIconComponent(definition, '${className}');`,
        '',
      ].join('\n'),
    );
    await writeFile(
      resolve(vueRoot, `${icon.name}.ts`),
      [
        "import { createIconComponent } from '../vue-base.js';",
        `import { definition } from '../definitions/${icon.name}.js';`,
        `export const ${className} = /* @__PURE__ */ createIconComponent(definition, '${className}');`,
        '',
      ].join('\n'),
    );
    await writeFile(
      resolve(angularRoot, `${icon.name}.ts`),
      [
        "import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';",
        "import { IconSvgHost } from '../angular-svg-host.js';",
        "import { explicitMirrorTransform, iconDirectionMode, iconDirectionStyles } from '../direction.js';",
        `import { definition } from '../definitions/${icon.name}.js';`,
        "import type { IconDefinition } from '../types.js';",
        `@Component({ selector: 'simurgh-${icon.name}-icon', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush,`,
        '  template: `<svg #svg class="simurgh-icon" data-slot="icon" [attr.width]="size()" [attr.height]="size()" [attr.viewBox]="icon.viewBox"',
        '    [attr.role]="title() ? \'img\' : null" [attr.aria-hidden]="title() ? null : \'true\'"',
        '    [attr.aria-label]="title() || null" [attr.data-simurgh-direction]="directionMode()" focusable="false">',
        '    <g class="simurgh-icon-directional" [attr.transform]="mirrorTransform()"><g [attr.transform]="icon.transform">',
        '      @for (path of icon.paths; track $index) {<path [attr.d]="path.d" [attr.fill]="pathFill(path.fill, $index)" [attr.opacity]="path.opacity ?? null" />}',
        '    </g></g></svg>`, styles: [iconDirectionStyles] })',
        `export class ${className} extends IconSvgHost {`,
        "  readonly size = input<number | string>(24); readonly title = input<string>(); readonly colorMode = input<'duotone' | 'currentColor'>('duotone');",
        "  readonly direction = input<'ltr' | 'rtl'>(); readonly mirrorInRtl = input(true);",
        '  readonly icon: IconDefinition = definition;',
        "  readonly directionMode = computed(() => iconDirectionMode(this.direction(), this.mirrorInRtl(), this.icon.direction === 'directional'));",
        '  readonly mirrorTransform = computed(() => explicitMirrorTransform(this.directionMode()));',
        "  pathFill(fill: string, index: number): string { return this.colorMode() === 'currentColor' ? 'currentColor' : index === 0 ? `var(--simurgh-icon-primary, ${fill})` : `var(--simurgh-icon-secondary, ${fill})`; }",
        '}',
        '',
      ].join('\n'),
    );
  }),
);

const lines = [
  "import type { IconDefinition, IconGroup, IconRenderOptions } from './types.js';",
  "import { explicitMirrorTransform, iconDirectionMode, iconDirectionStyles } from './direction.js';",
  ...definitions.map(
    (icon) =>
      `import { definition as ${pascal(icon.name)}Definition } from './definitions/${icon.name}.js';`,
  ),
  '',
  `export const iconNames = ${JSON.stringify(names)} as const;`,
  'export type IconName = (typeof iconNames)[number];',
  '',
  'export const icons: Readonly<Record<IconName, IconDefinition>> = {',
  ...definitions.map(
    (icon) => `  ${q(icon.name)}: ${pascal(icon.name)}Definition,`,
  ),
  '};',
  '',
  `export const iconGroups: Readonly<Record<IconGroup, readonly IconName[]>> = ${JSON.stringify(groups, null, 2)};`,
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
  "  const directionMode = iconDirectionMode(options.direction, options.mirrorInRtl !== false, icon.direction === 'directional');",
  '  const mirrorTransform = explicitMirrorTransform(directionMode);',
  '  const accessibility = options.title ? `role="img" aria-label="${escape(options.title)}"` : \'aria-hidden="true"\';',
  '  const className = options.class ? ` class="${escape(options.class)}"` : \'\';',
  "  const paths = icon.paths.map((path, index) => { const fill = options.colorMode === 'currentColor' ? 'currentColor' : index === 0 ? `var(--simurgh-icon-primary, ${path.fill})` : `var(--simurgh-icon-secondary, ${path.fill})`; return `<path d=\"${path.d}\" fill=\"${fill}\"${path.opacity === undefined ? '' : ` opacity=\"${path.opacity}\"`}/>`; }).join('');",
  '  const directionAttribute = directionMode ? ` data-simurgh-direction="${directionMode}"` : \'\';',
  "  const directionStyle = directionMode === 'auto' ? `<style>${iconDirectionStyles}</style>` : '';",
  '  const mirrorAttribute = mirrorTransform ? ` transform="${mirrorTransform}"` : \'\';',
  '  return `<svg width="${escape(String(size))}" height="${escape(String(size))}" viewBox="${icon.viewBox}" ${accessibility} focusable="false"${directionAttribute}${className}>${directionStyle}<g class="simurgh-icon-directional"${mirrorAttribute}><g transform="${icon.transform}">${paths}</g></g></svg>`;',
  '}',
];

await writeFile(output, `${lines.join('\n')}\n`);
await writeFile(
  reactOutput,
  [
    ...definitions.map(
      (icon) =>
        `export { ${pascal(icon.name)} } from './react-icons/${icon.name}.js';`,
    ),
    '',
  ].join('\n'),
);

await writeFile(
  vueOutput,
  [
    ...definitions.map(
      (icon) =>
        `export { ${pascal(icon.name)} } from './vue-icons/${icon.name}.js';`,
    ),
    '',
  ].join('\n'),
);

await writeFile(
  angularOutput,
  [
    ...definitions.map(
      (icon) =>
        `export { ${pascal(icon.name)} } from './angular-icons/${icon.name}.js';`,
    ),
  ].join('\n'),
);
console.log(`Generated ${definitions.length} icon definitions`);
