import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SimurghIcon } from './angular-base.js';

@Component({ selector: 'simurgh-align-bottom-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="align-bottom" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class AlignBottom { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-align-center-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="align-center" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class AlignCenter { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-align-left-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="align-left" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class AlignLeft { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-align-middle-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="align-middle" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class AlignMiddle { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-align-right-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="align-right" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class AlignRight { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-align-top-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="align-top" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class AlignTop { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-archive-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="archive" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Archive { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-arrow-down-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="arrow-down" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ArrowDown { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-arrow-left-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="arrow-left" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ArrowLeft { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-arrow-right-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="arrow-right" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ArrowRight { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-arrow-up-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="arrow-up" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ArrowUp { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-attachment-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="attachment" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Attachment { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-available-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="available" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Available { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-check-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="check" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Check { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-chevron-down-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="chevron-down" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ChevronDown { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-chevron-left-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="chevron-left" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ChevronLeft { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-chevron-right-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="chevron-right" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ChevronRight { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-chevron-up-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="chevron-up" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ChevronUp { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-chevrons-down-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="chevrons-down" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ChevronsDown { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-chevrons-left-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="chevrons-left" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ChevronsLeft { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-chevrons-right-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="chevrons-right" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ChevronsRight { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-chevrons-up-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="chevrons-up" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ChevronsUp { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-clipboard-text-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="clipboard-text" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ClipboardText { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-clipboard-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="clipboard" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Clipboard { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-close-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="close" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Close { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-cloud-file-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="cloud-file" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CloudFile { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-collapse-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="collapse" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Collapse { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-columns-2-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="columns-2" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Columns2 { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-columns-3-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="columns-3" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Columns3 { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-compass-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="compass" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Compass { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-copy-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="copy" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Copy { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-corner-down-left-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="corner-down-left" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CornerDownLeft { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-corner-down-right-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="corner-down-right" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CornerDownRight { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-corner-up-left-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="corner-up-left" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CornerUpLeft { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-corner-up-right-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="corner-up-right" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CornerUpRight { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-cut-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="cut" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Cut { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-dashboard-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="dashboard" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Dashboard { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-deselect-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="deselect" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Deselect { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-download-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="download" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Download { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-duplicate-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="duplicate" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Duplicate { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-edit-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="edit" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Edit { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-enter-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="enter" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Enter { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-error-circle-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="error-circle" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ErrorCircle { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-error-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="error" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Error { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-exit-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="exit" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Exit { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-expand-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="expand" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Expand { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-external-link-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="external-link" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ExternalLink { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-favorite-filled-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="favorite-filled" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class FavoriteFilled { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-favorite-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="favorite" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Favorite { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-file-audio-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="file-audio" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class FileAudio { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-file-check-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="file-check" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class FileCheck { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-file-code-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="file-code" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class FileCode { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-file-download-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="file-download" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class FileDownload { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-file-error-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="file-error" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class FileError { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-file-image-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="file-image" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class FileImage { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-file-lock-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="file-lock" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class FileLock { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-file-minus-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="file-minus" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class FileMinus { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-file-pdf-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="file-pdf" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class FilePdf { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-file-plus-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="file-plus" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class FilePlus { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-file-search-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="file-search" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class FileSearch { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-file-text-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="file-text" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class FileText { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-file-upload-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="file-upload" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class FileUpload { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-file-video-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="file-video" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class FileVideo { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-file-zip-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="file-zip" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class FileZip { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-file-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="file" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class File { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-files-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="files" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Files { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-filter-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="filter" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Filter { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-focus-mode-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="focus-mode" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class FocusMode { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-folder-check-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="folder-check" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class FolderCheck { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-folder-download-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="folder-download" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class FolderDownload { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-folder-error-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="folder-error" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class FolderError { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-folder-lock-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="folder-lock" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class FolderLock { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-folder-minus-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="folder-minus" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class FolderMinus { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-folder-open-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="folder-open" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class FolderOpen { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-folder-plus-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="folder-plus" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class FolderPlus { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-folder-search-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="folder-search" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class FolderSearch { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-folder-upload-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="folder-upload" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class FolderUpload { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-folder-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="folder" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Folder { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-folders-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="folders" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Folders { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-fullscreen-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="fullscreen" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Fullscreen { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-grid-2x2-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="grid-2x2" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Grid2x2 { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-grid-3x3-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="grid-3x3" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Grid3x3 { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-help-circle-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="help-circle" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class HelpCircle { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-help-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="help" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Help { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-home-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="home" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Home { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-info-circle-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="info-circle" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class InfoCircle { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-info-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="info" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Info { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-insecure-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="insecure" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Insecure { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-layout-columns-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="layout-columns" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class LayoutColumns { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-layout-dashboard-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="layout-dashboard" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class LayoutDashboard { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-layout-footer-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="layout-footer" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class LayoutFooter { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-layout-grid-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="layout-grid" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class LayoutGrid { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-layout-header-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="layout-header" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class LayoutHeader { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-layout-list-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="layout-list" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class LayoutList { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-layout-navbar-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="layout-navbar" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class LayoutNavbar { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-layout-rows-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="layout-rows" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class LayoutRows { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-layout-sidebar-left-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="layout-sidebar-left" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class LayoutSidebarLeft { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-layout-sidebar-right-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="layout-sidebar-right" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class LayoutSidebarRight { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-layout-toolbar-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="layout-toolbar" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class LayoutToolbar { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-layout-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="layout" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Layout { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-link-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="link" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Link { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-loading-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="loading" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Loading { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-maximize-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="maximize" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Maximize { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-menu-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="menu" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Menu { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-minimize-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="minimize" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Minimize { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-minus-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="minus" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Minus { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-more-horizontal-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="more-horizontal" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class MoreHorizontal { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-more-vertical-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="more-vertical" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class MoreVertical { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-notification-active-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="notification-active" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class NotificationActive { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-notification-off-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="notification-off" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class NotificationOff { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-notification-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="notification" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Notification { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-offline-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="offline" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Offline { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-online-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="online" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Online { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-panel-bottom-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="panel-bottom" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class PanelBottom { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-panel-left-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="panel-left" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class PanelLeft { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-panel-right-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="panel-right" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class PanelRight { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-panel-top-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="panel-top" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class PanelTop { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-paste-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="paste" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Paste { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-pencil-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="pencil" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Pencil { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-pending-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="pending" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Pending { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-plus-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="plus" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Plus { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-print-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="print" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Print { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-progress-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="progress" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Progress { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-redo-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="redo" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Redo { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-refresh-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="refresh" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Refresh { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-rotate-clockwise-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="rotate-clockwise" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class RotateClockwise { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-route-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="route" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Route { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-rows-2-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="rows-2" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Rows2 { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-rows-3-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="rows-3" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Rows3 { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-save-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="save" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Save { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-secure-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="secure" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Secure { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-select-all-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="select-all" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class SelectAll { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-send-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="send" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Send { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-settings-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="settings" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Settings { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-share-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="share" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Share { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-shuffle-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="shuffle" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Shuffle { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-sort-ascending-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="sort-ascending" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class SortAscending { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-sort-descending-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="sort-descending" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class SortDescending { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-split-horizontal-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="split-horizontal" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class SplitHorizontal { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-split-vertical-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="split-vertical" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class SplitVertical { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-star-filled-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="star-filled" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class StarFilled { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-star-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="star" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Star { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-success-circle-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="success-circle" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class SuccessCircle { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-success-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="success" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Success { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-swap-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="swap" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Swap { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-sync-error-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="sync-error" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class SyncError { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-sync-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="sync" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Sync { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-trash-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="trash" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Trash { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-unavailable-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="unavailable" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Unavailable { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-undo-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="undo" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Undo { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-unlink-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="unlink" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Unlink { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-unverified-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="unverified" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Unverified { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-upload-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="upload" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Upload { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-verified-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="verified" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Verified { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-visibility-off-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="visibility-off" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class VisibilityOff { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-visibility-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="visibility" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Visibility { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-warning-circle-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="warning-circle" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class WarningCircle { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-warning-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="warning" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Warning { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-zoom-in-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="zoom-in" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ZoomIn { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-zoom-out-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="zoom-out" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ZoomOut { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }
