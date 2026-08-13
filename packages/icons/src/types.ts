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
  | 'display-modes';

export type IconDirection = 'neutral' | 'directional';

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
}
