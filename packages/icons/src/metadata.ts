import {
  iconNames,
  icons,
  type IconName,
} from './icons.generated.js';
import type { IconGroup, IconMetadata, IconUserCategory } from './types.js';

export const iconCategoryGroups = {
  navigation: [
    'landmarks',
    'menus',
    'arrows',
    'chevrons',
    'corner-movement',
    'viewport',
    'transfers',
    'history',
  ],
  actions: [
    'action-basics',
    'editing',
    'clipboard',
    'file-actions',
    'sharing',
    'organization',
    'ordering',
    'selection',
    'view-actions',
  ],
  status: [
    'semantic-feedback',
    'assistance',
    'notifications',
    'activity',
    'presence',
    'trust-security',
    'preferences',
    'visibility-sync',
  ],
  files: [
    'documents',
    'document-actions',
    'media-files',
    'folders',
    'folder-actions',
    'file-collections',
    'file-utilities',
  ],
  layout: [
    'layout-structures',
    'layout-regions',
    'layout-panels',
    'layout-grids',
    'layout-splits',
    'alignment',
    'display-modes',
  ],
  communication: ['messaging', 'mail', 'calling', 'audio', 'broadcasting'],
  people: ['people', 'user-actions', 'user-security', 'profiles', 'roles'],
  'date-and-media': [
    'calendars',
    'calendar-actions',
    'scheduling',
    'time',
    'playback',
    'media-audio',
    'visual-media',
    'media-content',
  ],
  commerce: ['shopping', 'fulfillment', 'payments', 'pricing'],
  'data-and-devices': [
    'charts',
    'statistical-charts',
    'chart-interface',
    'chart-actions',
    'devices',
    'hardware',
    'connectivity',
    'device-actions',
  ],
  security: [
    'access-control',
    'identity-security',
    'privacy-security',
    'authentication',
  ],
  'maps-and-development': [
    'mapping',
    'location-services',
    'geography',
    'transportation',
    'coding',
    'version-control',
    'testing-delivery',
    'development-infrastructure',
  ],
} as const satisfies Record<IconUserCategory, readonly IconGroup[]>;

const categoryByGroup = new Map<IconGroup, IconUserCategory>(
  Object.entries(iconCategoryGroups).flatMap(([category, groups]) =>
    groups.map((group) => [group, category as IconUserCategory]),
  ),
);

const aliases: Partial<Record<IconName, readonly string[]>> = {
  'arrow-left': ['back', 'previous', 'return'],
  'arrow-right': ['next', 'forward', 'continue'],
  close: ['dismiss', 'cancel', 'x'],
  trash: ['delete', 'remove', 'bin'],
  settings: ['preferences', 'configure', 'gear'],
  user: ['person', 'account', 'profile', 'avatar'],
  home: ['start', 'homepage', 'house'],
  menu: ['navigation', 'hamburger'],
  'more-horizontal': ['overflow', 'ellipsis', 'options'],
  'more-vertical': ['overflow', 'kebab', 'options'],
  success: ['done', 'complete', 'valid', 'check'],
  warning: ['caution', 'alert'],
  error: ['failure', 'invalid', 'danger'],
  notification: ['bell', 'alert'],
  'map-pin': ['place', 'address', 'marker'],
  'current-location': ['position', 'geolocation'],
};

const intended: Partial<Record<IconName, string>> = {
  message: 'A single conversation or message destination.',
  messages: 'A collection of conversations.',
  'message-dots': 'An active conversation, reply, or composing state.',
  user: 'A person or generic user identity.',
  profile: 'An account-facing profile destination.',
  'user-card': 'A structured person record.',
  'map-pin': 'A place or map marker.',
  'current-location': "The user's detected position.",
  'navigation-arrow': 'Heading, travel direction, or map navigation.',
  file: 'A single generic document.',
  files: 'A collection of documents.',
  folder: 'A container for files or records.',
};
const discouraged: Partial<Record<IconName, string>> = {
  close: 'Do not rely on the icon alone for destructive deletion.',
  warning: 'Do not communicate severity by shape or color alone.',
  error: 'Do not communicate an error without visible or announced text.',
  user: 'Do not use as a specific person avatar without an accessible name.',
  'navigation-arrow':
    'Do not use for browser back/next actions when a semantic arrow is clearer.',
};

const words = (value: string) => value.split('-').filter(Boolean);
const variantFamily = (name: string) =>
  name.replace(/-(?:filled|circle|round|alt)$/u, '');

export const iconMetadata = Object.fromEntries(
  iconNames.map((name) => {
    const definition = icons[name];
    const category = categoryByGroup.get(definition.group);
    if (!category)
      throw new Error(
        `Missing user category for icon group ${definition.group}`,
      );
    const nameAliases = aliases[name] ?? [];
    const keywords = [
      ...new Set([...words(name), ...words(definition.group), ...nameAliases]),
    ];
    return [
      name,
      {
        aliases: nameAliases,
        keywords,
        intendedUse:
          intended[name] ??
          `Represents ${name.replaceAll('-', ' ')} in ${definition.group.replaceAll('-', ' ')} interfaces.`,
        discouragedUse:
          discouraged[name] ??
          'Do not use without adjacent text or an accessible name when the meaning could be ambiguous.',
        userCategory: category,
        visualStyle:
          new Set(definition.paths.map((path) => path.fill)).size === 1
            ? 'single-color'
            : 'multicolor',
        variantFamily: variantFamily(name),
      } satisfies IconMetadata,
    ];
  }),
) as unknown as Record<IconName, IconMetadata>;
