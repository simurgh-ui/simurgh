import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SimurghIcon } from './angular-base.js';

@Component({ selector: 'simurgh-access-key-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="access-key" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class AccessKey { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-accessibility-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="accessibility" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Accessibility { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-account-circle-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="account-circle" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class AccountCircle { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-account-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="account" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Account { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-activity-chart-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="activity-chart" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ActivityChart { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-admin-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="admin" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Admin { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-airplane-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="airplane" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Airplane { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-alarm-off-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="alarm-off" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class AlarmOff { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-alarm-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="alarm" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Alarm { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

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

@Component({ selector: 'simurgh-analytics-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="analytics" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Analytics { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-announcement-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="announcement" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Announcement { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-antivirus-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="antivirus" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Antivirus { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-api-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="api" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Api { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-appointment-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="appointment" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Appointment { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-archive-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="archive" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Archive { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-area-chart-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="area-chart" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class AreaChart { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

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

@Component({ selector: 'simurgh-at-sign-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="at-sign" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class AtSign { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-attachment-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="attachment" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Attachment { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-authentication-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="authentication" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Authentication { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-available-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="available" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Available { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-badge-check-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="badge-check" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class BadgeCheck { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-banknote-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="banknote" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Banknote { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-bar-chart-horizontal-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="bar-chart-horizontal" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class BarChartHorizontal { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-bar-chart-stacked-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="bar-chart-stacked" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class BarChartStacked { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-bar-chart-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="bar-chart" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class BarChart { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-barcode-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="barcode" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Barcode { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-basket-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="basket" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Basket { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-battery-charging-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="battery-charging" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class BatteryCharging { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-battery-low-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="battery-low" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class BatteryLow { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-battery-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="battery" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Battery { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-bike-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="bike" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Bike { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-binary-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="binary" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Binary { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-bluetooth-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="bluetooth" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Bluetooth { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-braces-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="braces" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Braces { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-brackets-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="brackets" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Brackets { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-breakpoint-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="breakpoint" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Breakpoint { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-broadcast-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="broadcast" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Broadcast { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-bubble-chart-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="bubble-chart" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class BubbleChart { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-bug-shield-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="bug-shield" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class BugShield { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-bug-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="bug" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Bug { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-build-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="build" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Build { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-building-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="building" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Building { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-buildings-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="buildings" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Buildings { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-bus-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="bus" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Bus { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-calendar-check-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="calendar-check" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CalendarCheck { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-calendar-clock-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="calendar-clock" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CalendarClock { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-calendar-days-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="calendar-days" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CalendarDays { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-calendar-edit-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="calendar-edit" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CalendarEdit { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-calendar-event-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="calendar-event" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CalendarEvent { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-calendar-lock-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="calendar-lock" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CalendarLock { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-calendar-minus-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="calendar-minus" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CalendarMinus { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-calendar-month-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="calendar-month" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CalendarMonth { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-calendar-plus-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="calendar-plus" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CalendarPlus { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-calendar-range-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="calendar-range" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CalendarRange { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-calendar-search-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="calendar-search" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CalendarSearch { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-calendar-settings-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="calendar-settings" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CalendarSettings { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-calendar-star-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="calendar-star" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CalendarStar { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-calendar-week-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="calendar-week" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CalendarWeek { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-calendar-x-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="calendar-x" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CalendarX { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-calendar-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="calendar" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Calendar { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-camera-off-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="camera-off" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CameraOff { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-camera-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="camera" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Camera { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-captions-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="captions" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Captions { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-car-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="car" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Car { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-card-check-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="card-check" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CardCheck { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-cart-check-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="cart-check" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CartCheck { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-cart-minus-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="cart-minus" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CartMinus { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-cart-plus-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="cart-plus" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CartPlus { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-cart-x-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="cart-x" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CartX { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-cash-register-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="cash-register" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CashRegister { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-cash-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="cash" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Cash { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-cast-device-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="cast-device" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CastDevice { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-cast-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="cast" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Cast { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-certificate-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="certificate" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Certificate { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-chart-axis-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="chart-axis" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ChartAxis { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-chart-grid-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="chart-grid" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ChartGrid { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-chart-label-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="chart-label" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ChartLabel { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-chart-legend-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="chart-legend" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ChartLegend { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-chart-plus-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="chart-plus" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ChartPlus { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-chart-settings-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="chart-settings" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ChartSettings { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-chart-tooltip-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="chart-tooltip" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ChartTooltip { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-check-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="check" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Check { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-checkout-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="checkout" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Checkout { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

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

@Component({ selector: 'simurgh-child-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="child" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Child { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-clapperboard-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="clapperboard" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Clapperboard { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-clipboard-text-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="clipboard-text" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ClipboardText { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-clipboard-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="clipboard" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Clipboard { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-clock-check-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="clock-check" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ClockCheck { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-clock-plus-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="clock-plus" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ClockPlus { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-clock-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="clock" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Clock { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-close-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="close" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Close { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-cloud-code-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="cloud-code" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CloudCode { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-cloud-file-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="cloud-file" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CloudFile { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-code-alt-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="code-alt" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CodeAlt { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-code-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="code" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Code { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-coins-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="coins" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Coins { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-collapse-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="collapse" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Collapse { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-column-chart-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="column-chart" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ColumnChart { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-columns-2-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="columns-2" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Columns2 { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-columns-3-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="columns-3" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Columns3 { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-command-line-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="command-line" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CommandLine { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-community-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="community" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Community { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-comparison-chart-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="comparison-chart" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ComparisonChart { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-compass-map-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="compass-map" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CompassMap { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-compass-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="compass" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Compass { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-contact-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="contact" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Contact { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-contacts-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="contacts" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Contacts { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-container-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="container" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Container { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

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

@Component({ selector: 'simurgh-coupon-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="coupon" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Coupon { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-cpu-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="cpu" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Cpu { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-credit-card-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="credit-card" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CreditCard { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-crosshair-location-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="crosshair-location" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CrosshairLocation { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-current-location-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="current-location" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class CurrentLocation { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-customer-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="customer" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Customer { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-cut-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="cut" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Cut { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-dashboard-chart-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="dashboard-chart" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class DashboardChart { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-dashboard-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="dashboard" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Dashboard { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-data-table-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="data-table" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class DataTable { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-database-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="database" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Database { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-date-today-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="date-today" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class DateToday { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-date-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="date" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Date { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-day-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="day" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Day { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-debug-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="debug" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Debug { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-delivery-truck-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="delivery-truck" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class DeliveryTruck { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-deploy-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="deploy" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Deploy { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-deselect-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="deselect" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Deselect { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-desktop-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="desktop" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Desktop { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-device-desktop-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="device-desktop" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class DeviceDesktop { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-device-mobile-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="device-mobile" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class DeviceMobile { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-devices-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="devices" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Devices { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-directions-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="directions" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Directions { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-disc-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="disc" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Disc { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-donut-chart-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="donut-chart" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class DonutChart { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-download-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="download" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Download { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-duplicate-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="duplicate" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Duplicate { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-earth-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="earth" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Earth { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-edit-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="edit" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Edit { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-eject-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="eject" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Eject { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-employee-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="employee" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Employee { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-enter-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="enter" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Enter { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-equalizer-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="equalizer" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Equalizer { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

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

@Component({ selector: 'simurgh-face-id-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="face-id" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class FaceId { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-fast-forward-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="fast-forward" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class FastForward { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

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

@Component({ selector: 'simurgh-film-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="film" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Film { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-filter-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="filter" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Filter { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-fingerprint-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="fingerprint" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Fingerprint { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-firewall-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="firewall" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Firewall { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-flag-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="flag" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Flag { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

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

@Component({ selector: 'simurgh-forward-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="forward" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Forward { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-fullscreen-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="fullscreen" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Fullscreen { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-gallery-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="gallery" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Gallery { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-gamepad-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="gamepad" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Gamepad { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-gauge-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="gauge" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Gauge { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-gift-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="gift" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Gift { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-git-branch-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="git-branch" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class GitBranch { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-git-commit-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="git-commit" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class GitCommit { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-git-fork-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="git-fork" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class GitFork { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-git-merge-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="git-merge" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class GitMerge { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-git-pull-request-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="git-pull-request" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class GitPullRequest { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-globe-alt-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="globe-alt" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class GlobeAlt { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-globe-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="globe" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Globe { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-gps-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="gps" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Gps { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-grid-2x2-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="grid-2x2" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Grid2x2 { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-grid-3x3-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="grid-3x3" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Grid3x3 { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-guest-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="guest" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Guest { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-hard-drive-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="hard-drive" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class HardDrive { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-headphones-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="headphones" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Headphones { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-headset-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="headset" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Headset { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-help-circle-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="help-circle" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class HelpCircle { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-help-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="help" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Help { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-hidden-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="hidden" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Hidden { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-histogram-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="histogram" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Histogram { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-history-clock-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="history-clock" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class HistoryClock { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-home-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="home" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Home { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-id-card-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="id-card" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class IdCard { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-image-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="image" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Image { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-images-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="images" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Images { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-inbox-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="inbox" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Inbox { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-incognito-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="incognito" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Incognito { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-info-circle-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="info-circle" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class InfoCircle { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-info-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="info" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Info { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-insecure-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="insecure" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Insecure { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-integration-test-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="integration-test" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class IntegrationTest { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-invoice-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="invoice" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Invoice { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-key-round-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="key-round" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class KeyRound { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-key-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="key" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Key { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-keyboard-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="keyboard" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Keyboard { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-landmark-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="landmark" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Landmark { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-laptop-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="laptop" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Laptop { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

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

@Component({ selector: 'simurgh-line-chart-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="line-chart" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class LineChart { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-link-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="link" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Link { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-loading-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="loading" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Loading { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-location-check-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="location-check" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class LocationCheck { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-location-plus-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="location-plus" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class LocationPlus { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-location-x-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="location-x" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class LocationX { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-location-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="location" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Location { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-lock-keyhole-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="lock-keyhole" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class LockKeyhole { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-lock-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="lock" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Lock { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-mail-notification-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="mail-notification" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class MailNotification { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-mail-open-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="mail-open" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class MailOpen { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-mail-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="mail" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Mail { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-map-pin-filled-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="map-pin-filled" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class MapPinFilled { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-map-pin-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="map-pin" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class MapPin { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-map-pinned-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="map-pinned" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class MapPinned { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-map-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="map" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Map { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-maximize-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="maximize" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Maximize { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-megaphone-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="megaphone" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Megaphone { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-memory-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="memory" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Memory { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-menu-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="menu" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Menu { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-message-dots-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="message-dots" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class MessageDots { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-message-square-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="message-square" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class MessageSquare { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-message-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="message" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Message { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-messages-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="messages" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Messages { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-microphone-off-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="microphone-off" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class MicrophoneOff { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-microphone-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="microphone" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Microphone { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-minimize-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="minimize" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Minimize { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-minus-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="minus" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Minus { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-moderator-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="moderator" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Moderator { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-monitor-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="monitor" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Monitor { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-month-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="month" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Month { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-more-horizontal-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="more-horizontal" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class MoreHorizontal { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-more-vertical-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="more-vertical" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class MoreVertical { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-mouse-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="mouse" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Mouse { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-music-note-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="music-note" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class MusicNote { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-music-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="music" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Music { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-navigation-arrow-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="navigation-arrow" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class NavigationArrow { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

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

@Component({ selector: 'simurgh-outbox-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="outbox" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Outbox { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-package-check-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="package-check" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class PackageCheck { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-package-code-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="package-code" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class PackageCode { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-package-open-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="package-open" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class PackageOpen { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-package-x-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="package-x" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class PackageX { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-package-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="package" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Package { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

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

@Component({ selector: 'simurgh-passkey-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="passkey" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Passkey { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-password-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="password" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Password { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-paste-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="paste" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Paste { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-pause-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="pause" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Pause { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-pencil-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="pencil" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Pencil { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-pending-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="pending" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Pending { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-percent-chart-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="percent-chart" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class PercentChart { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-percent-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="percent" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Percent { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-phone-incoming-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="phone-incoming" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class PhoneIncoming { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-phone-missed-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="phone-missed" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class PhoneMissed { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-phone-outgoing-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="phone-outgoing" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class PhoneOutgoing { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-phone-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="phone" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Phone { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-picture-in-picture-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="picture-in-picture" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class PictureInPicture { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-pie-chart-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="pie-chart" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class PieChart { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-pin-code-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="pin-code" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class PinCode { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-play-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="play" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Play { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-playlist-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="playlist" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Playlist { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-plug-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="plug" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Plug { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-plus-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="plus" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Plus { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-podcast-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="podcast" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Podcast { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-power-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="power" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Power { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-presentation-chart-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="presentation-chart" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class PresentationChart { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-print-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="print" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Print { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-printer-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="printer" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Printer { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-privacy-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="privacy" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Privacy { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-profile-card-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="profile-card" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ProfileCard { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-profile-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="profile" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Profile { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-progress-chart-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="progress-chart" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ProgressChart { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-progress-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="progress" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Progress { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-radar-chart-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="radar-chart" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class RadarChart { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-radio-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="radio" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Radio { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-receipt-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="receipt" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Receipt { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-redo-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="redo" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Redo { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-refresh-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="refresh" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Refresh { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-refund-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="refund" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Refund { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-regex-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="regex" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Regex { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-reminder-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="reminder" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Reminder { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-repeat-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="repeat" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Repeat { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-reply-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="reply" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Reply { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-report-chart-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="report-chart" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ReportChart { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-repository-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="repository" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Repository { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-rewind-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="rewind" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Rewind { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-road-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="road" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Road { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-rocket-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="rocket" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Rocket { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-rotate-clockwise-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="rotate-clockwise" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class RotateClockwise { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-route-map-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="route-map" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class RouteMap { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-route-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="route" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Route { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-router-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="router" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Router { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-rows-2-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="rows-2" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Rows2 { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-rows-3-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="rows-3" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Rows3 { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-rss-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="rss" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Rss { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-satellite-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="satellite" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Satellite { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-save-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="save" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Save { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-scan-face-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="scan-face" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ScanFace { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-scanner-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="scanner" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Scanner { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-scatter-chart-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="scatter-chart" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ScatterChart { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-schedule-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="schedule" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Schedule { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-screen-off-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="screen-off" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ScreenOff { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-screen-share-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="screen-share" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ScreenShare { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-secure-cloud-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="secure-cloud" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class SecureCloud { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-secure-server-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="secure-server" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class SecureServer { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-secure-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="secure" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Secure { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-security-scan-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="security-scan" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class SecurityScan { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-security-warning-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="security-warning" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class SecurityWarning { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-select-all-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="select-all" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class SelectAll { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-send-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="send" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Send { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-server-code-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="server-code" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ServerCode { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-server-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="server" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Server { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-settings-code-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="settings-code" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class SettingsCode { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-settings-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="settings" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Settings { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-share-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="share" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Share { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-shield-alert-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="shield-alert" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ShieldAlert { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-shield-check-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="shield-check" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ShieldCheck { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-shield-lock-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="shield-lock" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ShieldLock { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-shield-x-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="shield-x" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ShieldX { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-shield-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="shield" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Shield { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-ship-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="ship" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Ship { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-shipping-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="shipping" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Shipping { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-shopping-bag-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="shopping-bag" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ShoppingBag { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-shopping-cart-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="shopping-cart" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ShoppingCart { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-shuffle-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="shuffle" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Shuffle { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-signpost-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="signpost" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Signpost { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-skip-next-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="skip-next" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class SkipNext { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-skip-previous-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="skip-previous" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class SkipPrevious { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-smartphone-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="smartphone" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Smartphone { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

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

@Component({ selector: 'simurgh-stop-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="stop" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Stop { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-stopwatch-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="stopwatch" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Stopwatch { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-store-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="store" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Store { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-subtitles-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="subtitles" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Subtitles { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

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

@Component({ selector: 'simurgh-tablet-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="tablet" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Tablet { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-tag-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="tag" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Tag { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-tags-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="tags" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Tags { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-target-chart-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="target-chart" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class TargetChart { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-terminal-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="terminal" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Terminal { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-timer-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="timer" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Timer { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-tools-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="tools" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Tools { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-train-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="train" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Train { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-trash-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="trash" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Trash { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-trend-down-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="trend-down" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class TrendDown { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-trend-up-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="trend-up" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class TrendUp { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-two-factor-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="two-factor" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class TwoFactor { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-unavailable-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="unavailable" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Unavailable { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-undo-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="undo" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Undo { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-unit-test-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="unit-test" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class UnitTest { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-unlink-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="unlink" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Unlink { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-unlock-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="unlock" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Unlock { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-unverified-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="unverified" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Unverified { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-upload-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="upload" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Upload { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-usb-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="usb" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Usb { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-user-blocked-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="user-blocked" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class UserBlocked { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-user-card-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="user-card" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class UserCard { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-user-check-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="user-check" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class UserCheck { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-user-circle-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="user-circle" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class UserCircle { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-user-edit-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="user-edit" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class UserEdit { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-user-heart-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="user-heart" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class UserHeart { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-user-lock-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="user-lock" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class UserLock { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-user-minus-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="user-minus" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class UserMinus { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-user-plus-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="user-plus" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class UserPlus { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-user-search-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="user-search" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class UserSearch { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-user-settings-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="user-settings" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class UserSettings { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-user-shield-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="user-shield" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class UserShield { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-user-star-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="user-star" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class UserStar { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-user-x-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="user-x" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class UserX { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-user-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="user" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class User { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-users-group-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="users-group" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class UsersGroup { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-users-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="users" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Users { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-verified-user-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="verified-user" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class VerifiedUser { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-verified-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="verified" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Verified { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-version-control-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="version-control" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class VersionControl { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-video-off-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="video-off" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class VideoOff { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-video-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="video" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Video { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-visibility-off-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="visibility-off" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class VisibilityOff { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-visibility-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="visibility" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Visibility { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-volume-high-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="volume-high" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class VolumeHigh { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-volume-low-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="volume-low" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class VolumeLow { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-volume-off-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="volume-off" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class VolumeOff { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-volume-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="volume" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Volume { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-walking-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="walking" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Walking { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-wallet-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="wallet" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Wallet { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-warehouse-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="warehouse" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Warehouse { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-warning-circle-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="warning-circle" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class WarningCircle { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-warning-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="warning" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Warning { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-watch-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="watch" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Watch { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-waveform-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="waveform" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Waveform { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-webcam-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="webcam" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Webcam { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-webhook-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="webhook" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Webhook { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-week-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="week" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Week { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-wifi-off-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="wifi-off" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class WifiOff { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-wifi-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="wifi" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class Wifi { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-zoom-in-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="zoom-in" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ZoomIn { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }

@Component({ selector: 'simurgh-zoom-out-icon', standalone: true, imports: [SimurghIcon], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<simurgh-icon name="zoom-out" [size]="size()" [title]="title()" [direction]="direction()" [mirrorInRtl]="mirrorInRtl()" />` })
export class ZoomOut { readonly size = input<number | string>(24); readonly title = input<string>(); readonly direction = input<'ltr' | 'rtl'>('ltr'); readonly mirrorInRtl = input(true); }
