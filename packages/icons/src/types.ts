export type IconGroup =
  | 'landmarks'
  | 'menus'
  | 'arrows'
  | 'chevrons'
  | 'corner-movement'
  | 'viewport'
  | 'transfers'
  | 'history'
  | 'action-basics'
  | 'editing'
  | 'clipboard'
  | 'file-actions'
  | 'sharing'
  | 'organization'
  | 'ordering'
  | 'selection'
  | 'view-actions'
  | 'semantic-feedback'
  | 'assistance'
  | 'notifications'
  | 'activity'
  | 'presence'
  | 'trust-security'
  | 'preferences'
  | 'visibility-sync'
  | 'documents'
  | 'document-actions'
  | 'media-files'
  | 'folders'
  | 'folder-actions'
  | 'file-collections'
  | 'file-utilities'
  | 'layout-structures'
  | 'layout-regions'
  | 'layout-panels'
  | 'layout-grids'
  | 'layout-splits'
  | 'alignment'
  | 'display-modes'
  | 'messaging'
  | 'mail'
  | 'calling'
  | 'audio'
  | 'broadcasting'
  | 'people'
  | 'user-actions'
  | 'user-security'
  | 'profiles'
  | 'roles'
  | 'calendars'
  | 'calendar-actions'
  | 'scheduling'
  | 'time'
  | 'playback'
  | 'media-audio'
  | 'visual-media'
  | 'media-content'
  | 'shopping'
  | 'fulfillment'
  | 'payments'
  | 'pricing'
  | 'charts'
  | 'statistical-charts'
  | 'chart-interface'
  | 'chart-actions'
  | 'devices'
  | 'hardware'
  | 'connectivity'
  | 'device-actions'
  | 'access-control'
  | 'identity-security'
  | 'privacy-security'
  | 'authentication'
  | 'mapping'
  | 'location-services'
  | 'geography'
  | 'transportation'
  | 'coding'
  | 'version-control'
  | 'testing-delivery'
  | 'development-infrastructure';

export type IconDirection = 'neutral' | 'directional';
export type IconVisualStyle = 'single-color' | 'multicolor';
export type IconUserCategory =
  | 'navigation'
  | 'actions'
  | 'status'
  | 'files'
  | 'layout'
  | 'communication'
  | 'people'
  | 'date-and-media'
  | 'commerce'
  | 'data-and-devices'
  | 'security'
  | 'maps-and-development';

export interface IconPath {
  readonly d: string;
  readonly fill: string;
  readonly opacity?: number;
}

export interface IconDefinition {
  readonly name: string;
  readonly group: IconGroup;
  readonly direction: IconDirection;
  readonly viewBox: '0 0 144 144';
  readonly transform: string;
  readonly paths: readonly IconPath[];
}

export interface IconRenderOptions {
  readonly title?: string;
  readonly size?: number | string;
  readonly class?: string;
  readonly direction?: 'ltr' | 'rtl';
  readonly mirrorInRtl?: boolean;
  readonly colorMode?: 'duotone' | 'currentColor';
}

export interface IconMetadata {
  readonly aliases: readonly string[];
  readonly keywords: readonly string[];
  readonly intendedUse: string;
  readonly discouragedUse: string;
  readonly userCategory: IconUserCategory;
  readonly visualStyle: IconVisualStyle;
  readonly variantFamily: string;
}
