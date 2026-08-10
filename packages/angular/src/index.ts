import { CommonModule } from '@angular/common';
import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import type { OnDestroy } from '@angular/core';
import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from '@floating-ui/dom';
import {
  createId,
  nextIndex,
  trapFocus,
  type Direction,
  type Orientation,
} from '@simurgh-ui/core';

@Directive({
  selector: '[simurghTrigger]',
  standalone: true,
  exportAs: 'simurghTrigger',
})
export class SimurghTrigger {
  @Input() disabled = false;
  @Output() activate = new EventEmitter<void>();
  @HostListener('click') click() {
    if (!this.disabled) this.activate.emit();
  }
}

function compositeKeydown(event: KeyboardEvent, selector: string) {
  const root = event.currentTarget as HTMLElement;
  const items = Array.from(root.querySelectorAll<HTMLElement>(selector)).filter(
    (item) =>
      item.getAttribute('aria-disabled') !== 'true' &&
      !item.hasAttribute('disabled'),
  );
  const current = items.indexOf(document.activeElement as HTMLElement);
  const target = nextIndex(current < 0 ? 0 : current, items.length, event.key, {
    orientation: 'vertical',
  });
  if (
    target !== current &&
    ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)
  ) {
    event.preventDefault();
    items[target]?.focus();
  } else if ((event.key === 'Enter' || event.key === ' ') && current >= 0) {
    event.preventDefault();
    items[current]?.click();
  }
}

@Component({
  selector: 'simurgh-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content select="[trigger]" />
    <div *ngIf="open" class="simurgh-overlay" (click)="close()"></div>
    <section
      #content
      *ngIf="open"
      class="simurgh-content simurgh-dialog"
      role="dialog"
      aria-modal="true"
      [attr.aria-labelledby]="labelledBy"
      [attr.aria-describedby]="describedBy"
      tabindex="-1"
      (keydown)="onKeydown($event)"
    >
      <ng-content />
    </section>`,
})
export class DialogComponent {
  @Input() open = false;
  @Input() labelledBy?: string;
  @Input() describedBy?: string;
  @Output() openChange = new EventEmitter<boolean>();
  @ViewChild('content') content?: ElementRef<HTMLElement>;
  private previous: HTMLElement | null = null;
  show() {
    this.previous = document.activeElement as HTMLElement | null;
    this.open = true;
    this.openChange.emit(true);
    setTimeout(() => this.content?.nativeElement.focus());
  }
  close() {
    this.open = false;
    this.openChange.emit(false);
    setTimeout(() => this.previous?.isConnected && this.previous.focus());
  }
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') this.close();
    else if (this.content) trapFocus(event, this.content.nativeElement);
  }
}

@Directive()
abstract class FloatingBase implements OnDestroy {
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();
  @ViewChild('reference') reference?: ElementRef<HTMLElement>;
  @ViewChild('floating') floating?: ElementRef<HTMLElement>;
  private cleanup: (() => void) | undefined;
  toggle() {
    this.setOpen(!this.open);
  }
  close() {
    this.setOpen(false);
  }
  protected setOpen(value: boolean) {
    this.open = value;
    this.openChange.emit(value);
    if (value) queueMicrotask(() => this.position());
    else {
      this.cleanup?.();
      this.cleanup = undefined;
    }
  }
  private position() {
    const reference = this.reference?.nativeElement,
      floating = this.floating?.nativeElement;
    if (!reference || !floating) return;
    this.cleanup?.();
    this.cleanup = autoUpdate(reference, floating, async () => {
      const result = await computePosition(reference, floating, {
        middleware: [offset(8), flip(), shift({ padding: 8 })],
      });
      Object.assign(floating.style, {
        left: `${result.x}px`,
        top: `${result.y}px`,
      });
    });
  }
  ngOnDestroy() {
    this.cleanup?.();
  }
}
const floatingTemplate = `<button #reference type="button" class="simurgh-trigger" [attr.aria-expanded]="open" (click)="toggle()"><ng-content select="[trigger]"/></button><div #floating *ngIf="open" class="simurgh-content" style="position:fixed"><ng-content/></div>`;
@Component({
  selector: 'simurgh-popover',
  standalone: true,
  imports: [CommonModule],
  template: floatingTemplate,
})
export class PopoverComponent extends FloatingBase {}
@Component({
  selector: 'simurgh-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `<span
      #reference
      (mouseenter)="setOpen(true)"
      (mouseleave)="setOpen(false)"
      (focusin)="setOpen(true)"
      (focusout)="setOpen(false)"
      ><ng-content select="[trigger]"
    /></span>
    <div
      #floating
      *ngIf="open"
      role="tooltip"
      class="simurgh-content"
      style="position:fixed"
    >
      <ng-content />
    </div>`,
})
export class TooltipComponent extends FloatingBase {
  override setOpen(value: boolean) {
    super.setOpen(value);
  }
}
@Component({
  selector: 'simurgh-hover-card',
  standalone: true,
  imports: [CommonModule],
  template: `<span
      #reference
      data-slot="hover-card-trigger"
      [attr.aria-expanded]="open"
      (mouseenter)="setOpen(true)"
      (mouseleave)="setOpen(false)"
      (focusin)="setOpen(true)"
      (focusout)="setOpen(false)"
      ><ng-content select="[trigger]"
    /></span>
    <div
      #floating
      *ngIf="open"
      role="dialog"
      data-slot="hover-card-content"
      [attr.aria-label]="label"
      class="simurgh-content"
      style="position:fixed"
    >
      <ng-content />
    </div>`,
})
export class HoverCardComponent extends FloatingBase {
  @Input() label = 'Additional information';
  override setOpen(value: boolean) {
    super.setOpen(value);
  }
}
@Component({
  selector: 'simurgh-dropdown-menu',
  standalone: true,
  imports: [CommonModule],
  template: `<button
      #reference
      type="button"
      class="simurgh-trigger"
      aria-haspopup="menu"
      [attr.aria-expanded]="open"
      (click)="toggle()"
    >
      <ng-content select="[trigger]" />
    </button>
    <div
      #floating
      *ngIf="open"
      role="menu"
      class="simurgh-content"
      style="position:fixed"
      (keydown)="onKeydown($event)"
    >
      <ng-content />
    </div>`,
})
export class DropdownMenuComponent extends FloatingBase {
  override toggle() {
    super.toggle();
    if (this.open)
      setTimeout(() =>
        this.floating?.nativeElement
          .querySelector<HTMLElement>(
            '[role=menuitem]:not([aria-disabled=true])',
          )
          ?.focus(),
      );
  }
  onKeydown(event: KeyboardEvent) {
    compositeKeydown(event, '[role=menuitem]');
  }
}
@Directive({
  selector: '[simurghMenuItem]',
  standalone: true,
  host: { role: 'menuitem', class: 'simurgh-item' },
})
export class DropdownMenuItemDirective {
  @Input() disabled = false;
  @Output() select = new EventEmitter<void>();
  @HostBinding('attr.aria-disabled') get ariaDisabled() {
    return this.disabled || null;
  }
  @HostBinding('attr.tabindex') get tabIndex() {
    return this.disabled ? null : -1;
  }
  @HostListener('click') onClick() {
    if (!this.disabled) this.select.emit();
  }
}

@Component({
  selector: 'simurgh-context-menu',
  standalone: true,
  imports: [CommonModule],
  template: `<div
      #trigger
      tabindex="0"
      aria-haspopup="menu"
      data-slot="context-menu-trigger"
      [attr.aria-expanded]="open"
      (contextmenu)="openPointer($event)"
      (keydown)="openKeyboard($event, trigger)"
    >
      <ng-content select="[trigger]" />
    </div>
    <div
      #content
      *ngIf="open"
      role="menu"
      data-slot="context-menu-content"
      class="simurgh-content"
      style="position:fixed"
      [style.left.px]="x"
      [style.top.px]="y"
      (keydown)="onKeydown($event)"
    >
      <ng-content />
    </div>`,
})
export class ContextMenuComponent {
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();
  @ViewChild('content') content?: ElementRef<HTMLElement>;
  x = 0;
  y = 0;
  private setOpen(value: boolean) {
    this.open = value;
    this.openChange.emit(value);
    if (value)
      setTimeout(() =>
        this.content?.nativeElement
          .querySelector<HTMLElement>(
            '[role=menuitem]:not([aria-disabled=true])',
          )
          ?.focus(),
      );
  }
  openPointer(event: MouseEvent) {
    event.preventDefault();
    this.x = event.clientX;
    this.y = event.clientY;
    this.setOpen(true);
  }
  openKeyboard(event: KeyboardEvent, trigger: HTMLElement) {
    if (event.key !== 'ContextMenu' && !(event.shiftKey && event.key === 'F10'))
      return;
    event.preventDefault();
    const rect = trigger.getBoundingClientRect();
    this.x = rect.left;
    this.y = rect.bottom;
    this.setOpen(true);
  }
  close() {
    this.setOpen(false);
  }
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
    } else compositeKeydown(event, '[role=menuitem]');
  }
}
@Directive({
  selector: '[simurghContextMenuItem]',
  standalone: true,
  host: { role: 'menuitem', class: 'simurgh-item' },
})
export class ContextMenuItemDirective {
  @Input() disabled = false;
  @Output() select = new EventEmitter<void>();
  private menu = inject(ContextMenuComponent);
  @HostBinding('attr.aria-disabled') get ariaDisabled() {
    return this.disabled || null;
  }
  @HostBinding('attr.tabindex') get tabIndex() {
    return this.disabled ? null : -1;
  }
  @HostListener('click') choose() {
    if (!this.disabled) {
      this.select.emit();
      this.menu.close();
    }
  }
}

@Component({
  selector: 'simurgh-tabs',
  standalone: true,
  template: `<div
      role="tablist"
      [attr.aria-orientation]="orientation"
      (keydown)="navigate($event)"
    >
      <ng-content select="[tab]" />
    </div>
    <ng-content />`,
})
export class TabsComponent {
  @Input() value = '';
  @Input() orientation: Orientation = 'horizontal';
  @Input() direction: Direction = 'ltr';
  @Output() valueChange = new EventEmitter<string>();
  private element = inject<ElementRef<HTMLElement>>(ElementRef);
  select(value: string) {
    this.value = value;
    this.valueChange.emit(value);
  }
  navigate(event: KeyboardEvent) {
    const tabs = Array.from(
      this.element.nativeElement.querySelectorAll<HTMLElement>('[role=tab]'),
    );
    const i = tabs.indexOf(document.activeElement as HTMLElement);
    const n = nextIndex(i, tabs.length, event.key, {
      orientation: this.orientation,
      direction: this.direction,
    });
    if (n !== i) {
      event.preventDefault();
      tabs[n]?.focus();
      tabs[n]?.click();
    }
  }
}
@Directive({
  selector: '[simurghTab]',
  standalone: true,
  host: { role: 'tab' },
})
export class TabDirective {
  @Input({ alias: 'simurghTab', required: true }) value = '';
  private tabs = inject(TabsComponent);
  @HostListener('click') select() {
    this.tabs.select(this.value);
  }
  @HostBinding('attr.aria-selected') get selected() {
    return this.tabs.value === this.value;
  }
  @HostBinding('attr.tabindex') get tabIndex() {
    return this.selected ? 0 : -1;
  }
}
@Directive({
  selector: '[simurghTabPanel]',
  standalone: true,
  host: { role: 'tabpanel' },
})
export class TabPanelDirective {
  @Input({ alias: 'simurghTabPanel', required: true }) value = '';
  private tabs = inject(TabsComponent);
  @HostBinding('hidden') get hidden() {
    return this.tabs.value !== this.value;
  }
  @HostBinding('attr.tabindex') tabIndex = 0;
}

@Component({
  selector: 'simurgh-accordion',
  standalone: true,
  template: `<ng-content />`,
})
export class AccordionComponent {
  @Input() multiple = false;
  readonly open = signal<string[]>([]);
  toggle(value: string) {
    this.open.update((items) =>
      items.includes(value)
        ? items.filter((x) => x !== value)
        : this.multiple
          ? [...items, value]
          : [value],
    );
  }
}
@Component({
  selector: 'simurgh-accordion-item',
  standalone: true,
  imports: [CommonModule],
  template: `<h3>
      <button type="button" [attr.aria-expanded]="expanded" (click)="toggle()">
        <ng-content select="[trigger]" />
      </button>
    </h3>
    <div *ngIf="expanded" role="region"><ng-content /></div>`,
})
export class AccordionItemComponent {
  @Input({ required: true }) value = '';
  constructor(private accordion: AccordionComponent) {}
  get expanded() {
    return this.accordion.open().includes(this.value);
  }
  toggle() {
    this.accordion.toggle(this.value);
  }
}
@Component({
  selector: 'simurgh-collapsible',
  standalone: true,
  template: `<button
      type="button"
      [disabled]="disabled"
      [attr.aria-expanded]="open"
      [attr.aria-controls]="contentId"
      (click)="toggle()"
    >
      <ng-content select="[trigger]" />
    </button>
    <div
      [id]="contentId"
      [hidden]="!open"
      [attr.data-state]="open ? 'open' : 'closed'"
    >
      <ng-content />
    </div>`,
})
export class CollapsibleComponent {
  @Input() open = false;
  @Input() disabled = false;
  @Output() openChange = new EventEmitter<boolean>();
  readonly contentId = createId('collapsible-content');
  toggle() {
    if (!this.disabled) {
      this.open = !this.open;
      this.openChange.emit(this.open);
    }
  }
}

abstract class CheckBase {
  @Input() checked = false;
  @Input() disabled = false;
  @Input() required = false;
  @Input() name?: string;
  @Input() value = 'on';
  @Output() checkedChange = new EventEmitter<boolean>();
  toggle() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.checkedChange.emit(this.checked);
    }
  }
}
@Component({
  selector: 'simurgh-checkbox',
  standalone: true,
  imports: [CommonModule],
  template: `<button
      type="button"
      role="checkbox"
      [attr.aria-checked]="checked"
      [disabled]="disabled"
      (click)="toggle()"
    >
      <ng-content /></button
    ><input
      *ngIf="name"
      hidden
      type="checkbox"
      [name]="name"
      [value]="value"
      [checked]="checked"
      [required]="required"
      [disabled]="disabled"
    />`,
})
export class CheckboxComponent extends CheckBase {}

@Component({
  selector: 'simurgh-label',
  standalone: true,
  template: `<label [attr.for]="for"><ng-content /></label>`,
})
export class LabelComponent {
  @Input() for?: string;
}

@Component({
  selector: 'simurgh-separator',
  standalone: true,
  template: '',
  host: {
    '[attr.role]': "decorative ? 'none' : 'separator'",
    '[attr.aria-hidden]': 'decorative || null',
    '[attr.aria-orientation]': 'decorative ? null : orientation',
    '[attr.data-orientation]': 'orientation',
  },
})
export class SeparatorComponent {
  @Input() orientation: Orientation = 'horizontal';
  @Input() decorative = false;
}

@Component({
  selector: 'simurgh-progress',
  standalone: true,
  template: `<span
    data-part="indicator"
    [style.inline-size.%]="percentage"
  ></span>`,
  host: {
    role: 'progressbar',
    '[attr.aria-valuemin]': '0',
    '[attr.aria-valuemax]': 'safeMax',
    '[attr.aria-valuenow]': 'safeValue',
    '[attr.aria-valuetext]': 'valueText',
    '[attr.data-state]': "safeValue === null ? 'indeterminate' : 'determinate'",
    '[attr.data-value]': 'safeValue',
    '[attr.data-max]': 'safeMax',
  },
})
export class ProgressComponent {
  @Input() value: number | null = null;
  @Input() max = 100;
  @Input() getValueLabel?: (value: number, max: number) => string;
  get safeMax() {
    return Number.isFinite(this.max) && this.max > 0 ? this.max : 100;
  }
  get safeValue() {
    return this.value == null || !Number.isFinite(this.value)
      ? null
      : Math.min(this.safeMax, Math.max(0, this.value));
  }
  get percentage() {
    return this.safeValue == null
      ? null
      : (this.safeValue / this.safeMax) * 100;
  }
  get valueText() {
    return this.safeValue == null
      ? null
      : this.getValueLabel?.(this.safeValue, this.safeMax);
  }
}

@Component({
  selector: 'simurgh-toggle',
  standalone: true,
  template: `<button
    type="button"
    [attr.aria-pressed]="pressed"
    [attr.data-state]="pressed ? 'on' : 'off'"
    [disabled]="disabled"
    (click)="toggle()"
  >
    <ng-content />
  </button>`,
})
export class ToggleComponent {
  @Input() pressed = false;
  @Input() disabled = false;
  @Output() pressedChange = new EventEmitter<boolean>();
  toggle() {
    if (this.disabled) return;
    this.pressed = !this.pressed;
    this.pressedChange.emit(this.pressed);
  }
}
@Component({
  selector: 'simurgh-toggle-group',
  standalone: true,
  template: `<ng-content />`,
  host: {
    role: 'group',
    'data-slot': 'toggle-group',
    '[attr.aria-orientation]': 'orientation',
    '[attr.dir]': 'direction',
  },
})
export class ToggleGroupComponent {
  @Input() type: 'single' | 'multiple' = 'single';
  @Input() value: string[] = [];
  @Input() orientation: Orientation = 'horizontal';
  @Input() direction: Direction = 'ltr';
  @Output() valueChange = new EventEmitter<string[]>();
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  toggle(item: string) {
    this.value = this.value.includes(item)
      ? this.value.filter((entry) => entry !== item)
      : this.type === 'single'
        ? [item]
        : [...this.value, item];
    this.valueChange.emit(this.value);
  }
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const items = Array.from(
      this.element.nativeElement.querySelectorAll<HTMLElement>(
        '[data-toggle-group-item]:not(:disabled)',
      ),
    );
    const index = items.indexOf(document.activeElement as HTMLElement);
    const target = nextIndex(index, items.length, event.key, {
      orientation: this.orientation,
      direction: this.direction,
    });
    if (target !== index) {
      event.preventDefault();
      items[target]?.focus();
    }
  }
}
@Directive({
  selector: 'button[simurghToggleGroupItem]',
  standalone: true,
  host: {
    type: 'button',
    'data-toggle-group-item': '',
    'data-slot': 'toggle-group-item',
    '[attr.aria-pressed]': 'pressed',
    '[attr.data-state]': "pressed ? 'on' : 'off'",
    '(click)': 'activate()',
  },
})
export class ToggleGroupItemDirective {
  @Input({ alias: 'simurghToggleGroupItem', required: true }) value = '';
  @Input() disabled = false;
  private readonly group = inject(ToggleGroupComponent);
  get pressed() {
    return this.group.value.includes(this.value);
  }
  activate() {
    if (!this.disabled) this.group.toggle(this.value);
  }
}

@Component({
  selector: 'simurgh-visually-hidden',
  standalone: true,
  template: `<ng-content />`,
  host: {
    style:
      'position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0',
  },
})
export class VisuallyHiddenComponent {}

@Component({
  selector: 'simurgh-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `<img
      *ngIf="src"
      [src]="src"
      [alt]="alt"
      [hidden]="!loaded"
      (load)="loaded = true"
      (error)="loaded = false"
    /><span *ngIf="!loaded" data-part="fallback">{{ fallback }}</span>`,
  host: { '[attr.data-state]': "loaded ? 'loaded' : 'fallback'" },
})
export class AvatarComponent {
  private source: string | undefined;
  @Input() set src(value: string | undefined) {
    this.source = value;
    this.loaded = false;
  }
  get src() {
    return this.source;
  }
  @Input({ required: true }) alt = '';
  @Input({ required: true }) fallback = '';
  loaded = false;
}

@Component({
  selector: 'simurgh-alert',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[attr.role]': "urgent ? 'alert' : 'status'",
    '[attr.aria-live]': "urgent ? 'assertive' : 'polite'",
    '[attr.aria-atomic]': "'true'",
    '[attr.data-urgent]': 'urgent || null',
  },
})
export class AlertComponent {
  @Input() urgent = false;
}

@Component({
  selector: 'simurgh-aspect-ratio',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[style.aspect-ratio]': "'' + safeRatio",
    '[attr.data-ratio]': 'safeRatio',
  },
})
export class AspectRatioComponent {
  @Input() ratio = 1;
  get safeRatio() {
    return Number.isFinite(this.ratio) && this.ratio > 0 ? this.ratio : 1;
  }
}

@Component({
  selector: 'simurgh-skeleton',
  standalone: true,
  template: '',
  host: {
    '[attr.role]': "label ? 'status' : null",
    '[attr.aria-label]': 'label || null',
    '[attr.aria-busy]': "label ? 'true' : null",
    '[attr.aria-hidden]': "label ? null : 'true'",
    '[attr.data-state]': "'loading'",
  },
})
export class SkeletonComponent {
  @Input() label?: string;
}

@Component({
  selector: 'simurgh-spinner',
  standalone: true,
  template: `<span aria-hidden="true" data-part="indicator"
    ><ng-content>◌</ng-content></span
  >`,
  host: {
    role: 'status',
    '[attr.aria-label]': 'label',
    '[attr.aria-live]': "'polite'",
    '[attr.aria-busy]': "'true'",
    '[attr.data-state]': "'loading'",
  },
})
export class SpinnerComponent {
  @Input() label = 'Loading';
}

@Component({
  selector: 'simurgh-button',
  standalone: true,
  template: `<button
    [attr.type]="type"
    [disabled]="disabled || loading"
    [attr.aria-busy]="loading || null"
    [attr.data-state]="loading ? 'loading' : 'idle'"
  >
    <ng-content />
  </button>`,
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() loading = false;
  @Input() disabled = false;
}

@Component({
  selector: 'simurgh-link',
  standalone: true,
  template: `<a
    data-slot="link"
    [attr.href]="disabled ? null : href"
    [attr.aria-disabled]="disabled || null"
    [attr.data-external]="external || null"
    [attr.rel]="external ? rel || 'noopener noreferrer' : rel || null"
    [attr.target]="external ? target || '_blank' : target || null"
    [attr.tabindex]="disabled ? -1 : null"
    (click)="activate($event)"
  >
    <ng-content />
  </a>`,
})
export class LinkComponent {
  @Input() href?: string;
  @Input() disabled = false;
  @Input() external = false;
  @Input() rel?: string;
  @Input() target?: string;

  activate(event: MouseEvent) {
    if (this.disabled) event.preventDefault();
  }
}

@Component({
  selector: 'simurgh-input',
  standalone: true,
  template: `<input
    [type]="type"
    [name]="name || ''"
    [value]="value"
    [required]="required"
    [disabled]="disabled"
    [attr.aria-invalid]="invalid || null"
    (input)="onInput($event)"
  />`,
})
export class InputComponent {
  @Input() type = 'text';
  @Input() name?: string;
  @Input() value = '';
  @Input() required = false;
  @Input() disabled = false;
  @Input() invalid = false;
  @Output() valueChange = new EventEmitter<string>();
  onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(this.value);
  }
}
@Component({
  selector: 'simurgh-slider',
  standalone: true,
  template: `<input
    type="range"
    data-slot="slider"
    [value]="value"
    [min]="min"
    [max]="max"
    [step]="step"
    [name]="name"
    [disabled]="disabled"
    [required]="required"
    [attr.aria-invalid]="invalid || null"
    [attr.aria-label]="label || null"
    (input)="update($event)"
  />`,
})
export class SliderComponent {
  @Input() value = 0;
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() name?: string;
  @Input() label?: string;
  @Input() disabled = false;
  @Input() required = false;
  @Input() invalid = false;
  @Output() valueChange = new EventEmitter<number>();
  update(event: Event) {
    this.value = (event.target as HTMLInputElement).valueAsNumber;
    this.valueChange.emit(this.value);
  }
}
@Component({
  selector: 'simurgh-meter',
  standalone: true,
  template: `<meter
    data-slot="meter"
    role="meter"
    [value]="safeValue"
    [min]="min"
    [max]="max"
    [attr.low]="low ?? null"
    [attr.high]="high ?? null"
    [attr.optimum]="optimum ?? null"
    [attr.aria-label]="label || null"
  >
    <ng-content />{{ safeValue }}
  </meter>`,
})
export class MeterComponent {
  @Input() value = 0;
  @Input() min = 0;
  @Input() max = 100;
  @Input() low?: number;
  @Input() high?: number;
  @Input() optimum?: number;
  @Input() label?: string;
  get safeValue() {
    return Math.min(this.max, Math.max(this.min, this.value));
  }
}
@Component({
  selector: 'simurgh-toolbar',
  standalone: true,
  template: `<ng-content />`,
  host: {
    role: 'toolbar',
    'data-slot': 'toolbar',
    '[attr.aria-label]': 'label',
    '[attr.aria-orientation]': 'orientation',
    '[attr.dir]': 'direction',
  },
})
export class ToolbarComponent {
  @Input() label = 'Toolbar';
  @Input() orientation: Orientation = 'horizontal';
  @Input() direction: Direction = 'ltr';
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const items = Array.from(
      this.element.nativeElement.querySelectorAll<HTMLElement>(
        '[data-toolbar-item]:not(:disabled)',
      ),
    );
    const index = items.indexOf(document.activeElement as HTMLElement);
    const target = nextIndex(index, items.length, event.key, {
      orientation: this.orientation,
      direction: this.direction,
    });
    if (target !== index) {
      event.preventDefault();
      items[target]?.focus();
    }
  }
}
@Directive({
  selector: 'button[simurghToolbarButton]',
  standalone: true,
  host: {
    type: 'button',
    'data-toolbar-item': '',
    'data-slot': 'toolbar-button',
  },
})
export class ToolbarButtonDirective {}
@Component({
  selector: 'simurgh-scroll-area',
  standalone: true,
  template: `<div
    data-slot="scroll-area"
    [attr.data-orientation]="orientation"
    [attr.role]="label ? 'region' : null"
    [attr.aria-label]="label || null"
    [tabIndex]="tabIndex"
  >
    <ng-content />
  </div>`,
})
export class ScrollAreaComponent {
  @Input() orientation: 'vertical' | 'horizontal' | 'both' = 'vertical';
  @Input() label?: string;
  @Input() tabIndex = 0;
}

@Component({
  selector: 'simurgh-textarea',
  standalone: true,
  template: `<textarea
    [name]="name || ''"
    [value]="value"
    [required]="required"
    [disabled]="disabled"
    [attr.aria-invalid]="invalid || null"
    (input)="onInput($event)"
  ></textarea>`,
})
export class TextareaComponent {
  @Input() name?: string;
  @Input() value = '';
  @Input() required = false;
  @Input() disabled = false;
  @Input() invalid = false;
  @Output() valueChange = new EventEmitter<string>();
  onInput(event: Event) {
    this.value = (event.target as HTMLTextAreaElement).value;
    this.valueChange.emit(this.value);
  }
}

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';
@Component({
  selector: 'simurgh-badge',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[attr.data-tone]': 'tone',
    '[attr.role]': "status ? 'status' : null",
    '[attr.aria-live]': "status ? 'polite' : null",
  },
})
export class BadgeComponent {
  @Input() tone: BadgeTone = 'neutral';
  @Input() status = false;
}

@Component({
  selector: 'simurgh-breadcrumb',
  standalone: true,
  template: `<nav [attr.aria-label]="label"><ng-content /></nav>`,
})
export class BreadcrumbComponent {
  @Input() label = 'Breadcrumb';
}
@Component({
  selector: 'simurgh-navigation-menu',
  standalone: true,
  template: `<nav data-slot="navigation-menu" [attr.aria-label]="label">
    <ng-content />
  </nav>`,
})
export class NavigationMenuComponent {
  @Input() label = 'Main navigation';
}
@Directive({
  selector: 'ul[simurghNavigationMenuList]',
  standalone: true,
  host: { 'data-slot': 'navigation-menu-list' },
})
export class NavigationMenuListDirective {}
@Directive({
  selector: 'li[simurghNavigationMenuItem]',
  standalone: true,
  host: { 'data-slot': 'navigation-menu-item' },
})
export class NavigationMenuItemDirective {}
@Directive({
  selector: 'a[simurghNavigationMenuLink]',
  standalone: true,
  host: {
    'data-slot': 'navigation-menu-link',
    '[attr.aria-current]': "current ? 'page' : null",
  },
})
export class NavigationMenuLinkDirective {
  @Input() current = false;
}
@Component({
  selector: 'simurgh-menubar',
  standalone: true,
  template: `<div
    role="menubar"
    data-slot="menubar"
    [attr.aria-label]="label"
    [attr.dir]="direction"
    (keydown)="navigate($event)"
  >
    <ng-content />
  </div>`,
})
export class MenubarComponent {
  @Input() label = 'Application menu';
  @Input() direction: Direction = 'ltr';
  private element = inject<ElementRef<HTMLElement>>(ElementRef);
  ngAfterViewInit() {
    const first = this.element.nativeElement.querySelector<HTMLElement>(
      '[role=menuitem]:not([aria-disabled=true])',
    );
    if (first) first.tabIndex = 0;
  }
  navigate(event: KeyboardEvent) {
    const items = Array.from(
      this.element.nativeElement.querySelectorAll<HTMLElement>(
        '[role=menuitem]:not([aria-disabled=true])',
      ),
    );
    const current = items.indexOf(document.activeElement as HTMLElement);
    const target = nextIndex(current, items.length, event.key, {
      orientation: 'horizontal',
      direction: this.direction,
    });
    if (target !== current) {
      event.preventDefault();
      items.forEach(
        (item, index) => (item.tabIndex = index === target ? 0 : -1),
      );
      items[target]?.focus();
    }
  }
}
@Directive({
  selector: 'button[simurghMenubarItem]',
  standalone: true,
  host: {
    role: 'menuitem',
    type: 'button',
    'data-slot': 'menubar-item',
    '[attr.aria-disabled]': 'disabled || null',
    '[attr.disabled]': "disabled ? '' : null",
  },
})
export class MenubarItemDirective {
  @Input() disabled = false;
  @Output() select = new EventEmitter<void>();
  @HostBinding('attr.tabindex') tabIndex = -1;
  @HostListener('click') choose() {
    if (!this.disabled) this.select.emit();
  }
}
@Component({
  selector: 'simurgh-card',
  standalone: true,
  template: `<ng-content />`,
  host: { 'data-slot': 'card' },
})
export class CardComponent {}
@Component({
  selector: 'simurgh-card-header',
  standalone: true,
  template: `<ng-content />`,
  host: { 'data-slot': 'card-header' },
})
export class CardHeaderComponent {}
@Component({
  selector: 'simurgh-card-title',
  standalone: true,
  template: `<h3 data-slot="card-title"><ng-content /></h3>`,
})
export class CardTitleComponent {}
@Component({
  selector: 'simurgh-card-description',
  standalone: true,
  template: `<p data-slot="card-description"><ng-content /></p>`,
})
export class CardDescriptionComponent {}
@Component({
  selector: 'simurgh-card-content',
  standalone: true,
  template: `<ng-content />`,
  host: { 'data-slot': 'card-content' },
})
export class CardContentComponent {}
@Component({
  selector: 'simurgh-card-footer',
  standalone: true,
  template: `<ng-content />`,
  host: { 'data-slot': 'card-footer' },
})
export class CardFooterComponent {}
@Component({
  selector: 'simurgh-kbd',
  standalone: true,
  template: `<kbd data-slot="kbd"><ng-content /></kbd>`,
})
export class KbdComponent {}
@Component({
  selector: 'simurgh-field',
  standalone: true,
  template: `<fieldset data-slot="field" [disabled]="disabled">
    <ng-content />
  </fieldset>`,
})
export class FieldComponent {
  @Input() disabled = false;
}
@Component({
  selector: 'simurgh-field-legend',
  standalone: true,
  template: `<legend data-slot="field-legend"><ng-content /></legend>`,
})
export class FieldLegendComponent {}
@Component({
  selector: 'simurgh-field-description',
  standalone: true,
  template: `<p data-slot="field-description"><ng-content /></p>`,
})
export class FieldDescriptionComponent {}
@Component({
  selector: 'simurgh-field-error',
  standalone: true,
  template: `<p data-slot="field-error" role="alert"><ng-content /></p>`,
})
export class FieldErrorComponent {}
@Directive({
  selector: 'table[simurghTable]',
  standalone: true,
  host: { 'data-slot': 'table' },
})
export class TableDirective {}
@Directive({
  selector: 'thead[simurghTableHeader]',
  standalone: true,
  host: { 'data-slot': 'table-header' },
})
export class TableHeaderDirective {}
@Directive({
  selector: 'tbody[simurghTableBody]',
  standalone: true,
  host: { 'data-slot': 'table-body' },
})
export class TableBodyDirective {}
@Directive({
  selector: 'tfoot[simurghTableFooter]',
  standalone: true,
  host: { 'data-slot': 'table-footer' },
})
export class TableFooterDirective {}
@Directive({
  selector: 'tr[simurghTableRow]',
  standalone: true,
  host: { 'data-slot': 'table-row' },
})
export class TableRowDirective {}
@Directive({
  selector: 'th[simurghTableHead]',
  standalone: true,
  host: { 'data-slot': 'table-head', scope: 'col' },
})
export class TableHeadDirective {}
@Directive({
  selector: 'td[simurghTableCell]',
  standalone: true,
  host: { 'data-slot': 'table-cell' },
})
export class TableCellDirective {}
@Directive({
  selector: 'caption[simurghTableCaption]',
  standalone: true,
  host: { 'data-slot': 'table-caption' },
})
export class TableCaptionDirective {}
@Component({
  selector: 'simurgh-pagination',
  standalone: true,
  template: `<nav [attr.aria-label]="label" data-slot="pagination">
    <ng-content />
  </nav>`,
})
export class PaginationComponent {
  @Input() label = 'Pagination';
}
@Directive({
  selector: 'ul[simurghPaginationContent]',
  standalone: true,
  host: { 'data-slot': 'pagination-content' },
})
export class PaginationContentDirective {}
@Directive({
  selector: 'li[simurghPaginationItem]',
  standalone: true,
  host: { 'data-slot': 'pagination-item' },
})
export class PaginationItemDirective {}
@Directive({
  selector: 'a[simurghPaginationLink]',
  standalone: true,
  host: {
    'data-slot': 'pagination-link',
    '[attr.aria-current]': "current ? 'page' : null",
  },
})
export class PaginationLinkDirective {
  @Input() current = false;
}
@Component({
  selector: 'simurgh-switch',
  standalone: true,
  imports: [CommonModule],
  template: `<button
      type="button"
      role="switch"
      [attr.aria-checked]="checked"
      [disabled]="disabled"
      (click)="toggle()"
    >
      <ng-content /></button
    ><input
      *ngIf="name"
      hidden
      type="checkbox"
      [name]="name"
      [value]="value"
      [checked]="checked"
      [required]="required"
      [disabled]="disabled"
    />`,
})
export class SwitchComponent extends CheckBase {}

export type SelectOption = { value: string; label: string; disabled?: boolean };
@Component({
  selector: 'simurgh-select',
  standalone: true,
  imports: [CommonModule],
  template: `<button
      type="button"
      role="combobox"
      class="simurgh-trigger"
      [attr.aria-expanded]="open"
      [attr.aria-controls]="listId"
      [disabled]="disabled"
      (click)="toggle()"
      (keydown)="onTriggerKeydown($event)"
    >
      {{ label }}
    </button>
    <div
      #list
      *ngIf="open"
      [id]="listId"
      role="listbox"
      class="simurgh-content"
      (keydown)="onListKeydown($event)"
    >
      <button
        *ngFor="let option of options"
        type="button"
        role="option"
        class="simurgh-item"
        tabindex="-1"
        [attr.aria-selected]="option.value === value"
        [attr.aria-disabled]="option.disabled || null"
        [disabled]="option.disabled"
        (click)="select(option.value)"
      >
        {{ option.label }}
      </button>
    </div>
    <input
      *ngIf="name"
      type="hidden"
      [name]="name"
      [value]="value"
      [disabled]="disabled"
    />`,
})
export class SelectComponent {
  @Input() options: SelectOption[] = [];
  @Input() value = '';
  @Input() placeholder = 'Select…';
  @Input() name?: string;
  @Input() required = false;
  @Input() disabled = false;
  @Output() valueChange = new EventEmitter<string>();
  @ViewChild('list') list?: ElementRef<HTMLElement>;
  readonly listId = createId('select-list');
  open = false;
  get label() {
    return (
      this.options.find((o) => o.value === this.value)?.label ??
      this.placeholder
    );
  }
  toggle() {
    if (this.open) this.open = false;
    else this.show();
  }
  show() {
    this.open = true;
    setTimeout(() =>
      this.list?.nativeElement
        .querySelector<HTMLElement>('[role=option]:not([disabled])')
        ?.focus(),
    );
  }
  onTriggerKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.show();
    }
  }
  onListKeydown(event: KeyboardEvent) {
    compositeKeydown(event, '[role=option]');
  }
  select(value: string) {
    this.value = value;
    this.open = false;
    this.valueChange.emit(value);
  }
}

@Component({
  selector: 'simurgh-combobox',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="simurgh-combobox">
    <input
      role="combobox"
      [attr.aria-label]="ariaLabel || placeholder"
      aria-autocomplete="list"
      [attr.aria-expanded]="open"
      [attr.aria-controls]="listId"
      [attr.aria-activedescendant]="activeId"
      [disabled]="disabled"
      [placeholder]="placeholder"
      [value]="query"
      (focus)="show()"
      (input)="onInput($event)"
      (keydown)="onKeydown($event)"
    />
    <div *ngIf="open" [id]="listId" role="listbox" class="simurgh-content">
      <div
        *ngFor="let option of filteredOptions; let index = index"
        [id]="optionId(index)"
        role="option"
        class="simurgh-item"
        [attr.aria-selected]="option.value === value"
        [attr.aria-disabled]="option.disabled || null"
        (mousedown)="chooseFromPointer($event, option)"
      >
        {{ option.label }}
      </div>
      <div *ngIf="filteredOptions.length === 0" role="status">
        {{ noResults }}
      </div>
    </div>
    <input
      *ngIf="name"
      type="hidden"
      [name]="name"
      [value]="value"
      [disabled]="disabled"
    />
    <input
      *ngIf="required"
      aria-hidden="true"
      tabindex="-1"
      required
      [value]="value"
      style="position:absolute;opacity:0;pointer-events:none"
    />
  </div>`,
})
export class ComboboxComponent {
  @Input() options: SelectOption[] = [];
  @Input() value = '';
  @Input() name?: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() placeholder = 'Search options';
  @Input() noResults = 'No results';
  @Input() ariaLabel?: string;
  @Output() valueChange = new EventEmitter<string>();
  readonly listId = createId('combobox-list');
  query = '';
  open = false;
  activeIndex = -1;

  get filteredOptions() {
    const needle = this.query.trim().toLocaleLowerCase();
    return needle
      ? this.options.filter((option) =>
          option.label.toLocaleLowerCase().includes(needle),
        )
      : this.options;
  }
  get activeId() {
    return this.open && this.activeIndex >= 0
      ? this.optionId(this.activeIndex)
      : null;
  }
  optionId(index: number) {
    return `${this.listId}-option-${index}`;
  }
  show() {
    if (!this.disabled) this.open = true;
  }
  onInput(event: Event) {
    this.query = (event.target as HTMLInputElement).value;
    this.open = true;
    this.activeIndex = -1;
  }
  move(step: 1 | -1) {
    const options = this.filteredOptions;
    if (!options.some((option) => !option.disabled)) return;
    let index = this.activeIndex;
    do {
      index = (index + step + options.length) % options.length;
    } while (options[index]?.disabled);
    this.activeIndex = index;
  }
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.open = true;
      this.move(event.key === 'ArrowDown' ? 1 : -1);
    } else if (event.key === 'Home' && this.open) {
      event.preventDefault();
      this.activeIndex = -1;
      this.move(1);
    } else if (event.key === 'End' && this.open) {
      event.preventDefault();
      this.activeIndex = 0;
      this.move(-1);
    } else if (event.key === 'Enter' && this.activeIndex >= 0) {
      event.preventDefault();
      const option = this.filteredOptions[this.activeIndex];
      if (option) this.choose(option);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.query =
        this.options.find((option) => option.value === this.value)?.label ?? '';
      this.open = false;
      this.activeIndex = -1;
    }
  }
  chooseFromPointer(event: MouseEvent, option: SelectOption) {
    event.preventDefault();
    this.choose(option);
  }
  choose(option: SelectOption) {
    if (option.disabled) return;
    this.value = option.value;
    this.query = option.label;
    this.open = false;
    this.activeIndex = -1;
    this.valueChange.emit(option.value);
  }
}

@Component({
  selector: 'simurgh-radio-group',
  standalone: true,
  imports: [CommonModule],
  template: `<div role="radiogroup" (keydown)="navigate($event)">
    <ng-content /><input
      *ngIf="name"
      type="hidden"
      [name]="name"
      [value]="value"
    /><input
      *ngIf="required"
      aria-hidden="true"
      tabindex="-1"
      required
      [value]="value"
      style="position:absolute;opacity:0;pointer-events:none"
    />
  </div>`,
})
export class RadioGroupComponent {
  @Input() value = '';
  @Input() name?: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() direction: Direction = 'ltr';
  @Output() valueChange = new EventEmitter<string>();
  private element = inject<ElementRef<HTMLElement>>(ElementRef);
  select(value: string) {
    if (!this.disabled) {
      this.value = value;
      this.valueChange.emit(value);
    }
  }
  navigate(event: KeyboardEvent) {
    const items = Array.from(
      this.element.nativeElement.querySelectorAll<HTMLElement>(
        '[role=radio]:not([aria-disabled=true])',
      ),
    );
    const current = items.indexOf(document.activeElement as HTMLElement);
    const target = nextIndex(current, items.length, event.key, {
      direction: this.direction,
    });
    if (target !== current) {
      event.preventDefault();
      items[target]?.focus();
      items[target]?.click();
    }
  }
}
@Directive({
  selector: '[simurghRadio]',
  standalone: true,
  host: { role: 'radio' },
})
export class RadioGroupItemDirective {
  @Input({ alias: 'simurghRadio', required: true }) value = '';
  @Input() disabled = false;
  private group = inject(RadioGroupComponent);
  @HostBinding('attr.aria-checked') get checked() {
    return this.group.value === this.value;
  }
  @HostBinding('attr.aria-disabled') get unavailable() {
    return this.group.disabled || this.disabled || null;
  }
  @HostBinding('attr.tabindex') get tabIndex() {
    return this.checked ? 0 : -1;
  }
  @HostListener('click') select() {
    if (!this.unavailable) this.group.select(this.value);
  }
}

export type ToastMessage = { id: string; title: string; description?: string };
@Component({
  selector: 'simurgh-toast-viewport',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="simurgh-toast-region" aria-label="Notifications">
    <article
      *ngFor="let item of messages()"
      role="status"
      class="simurgh-content simurgh-toast"
    >
      <strong>{{ item.title }}</strong>
      <p *ngIf="item.description">{{ item.description }}</p>
      <button
        type="button"
        aria-label="Dismiss notification"
        (click)="dismiss(item.id)"
      >
        ×
      </button>
    </article>
  </div>`,
})
export class ToastViewportComponent {
  readonly messages = signal<ToastMessage[]>([]);
  toast(message: Omit<ToastMessage, 'id'>, duration = 5000) {
    const id = createId('toast');
    this.messages.update((items) => [...items, { ...message, id }]);
    if (duration) setTimeout(() => this.dismiss(id), duration);
    return id;
  }
  dismiss(id: string) {
    this.messages.update((items) => items.filter((x) => x.id !== id));
  }
}

export const SIMURGH_COMPONENTS = [
  DialogComponent,
  PopoverComponent,
  TooltipComponent,
  HoverCardComponent,
  DropdownMenuComponent,
  ContextMenuComponent,
  ContextMenuItemDirective,
  TabsComponent,
  AccordionComponent,
  AccordionItemComponent,
  CollapsibleComponent,
  CheckboxComponent,
  LabelComponent,
  SeparatorComponent,
  ProgressComponent,
  ToggleComponent,
  ToggleGroupComponent,
  ToggleGroupItemDirective,
  VisuallyHiddenComponent,
  AvatarComponent,
  AlertComponent,
  AspectRatioComponent,
  SkeletonComponent,
  SpinnerComponent,
  ButtonComponent,
  LinkComponent,
  InputComponent,
  SliderComponent,
  MeterComponent,
  ToolbarComponent,
  ToolbarButtonDirective,
  ScrollAreaComponent,
  TextareaComponent,
  BadgeComponent,
  BreadcrumbComponent,
  NavigationMenuComponent,
  NavigationMenuListDirective,
  NavigationMenuItemDirective,
  NavigationMenuLinkDirective,
  MenubarComponent,
  MenubarItemDirective,
  CardComponent,
  CardHeaderComponent,
  CardTitleComponent,
  CardDescriptionComponent,
  CardContentComponent,
  CardFooterComponent,
  KbdComponent,
  FieldComponent,
  FieldLegendComponent,
  FieldDescriptionComponent,
  FieldErrorComponent,
  TableDirective,
  TableHeaderDirective,
  TableBodyDirective,
  TableFooterDirective,
  TableRowDirective,
  TableHeadDirective,
  TableCellDirective,
  TableCaptionDirective,
  PaginationComponent,
  PaginationContentDirective,
  PaginationItemDirective,
  PaginationLinkDirective,
  SwitchComponent,
  SelectComponent,
  ComboboxComponent,
  RadioGroupComponent,
  ToastViewportComponent,
] as const;
