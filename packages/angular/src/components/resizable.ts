import type { Direction, Orientation } from '@simurgh-ui/core';
import type { OnDestroy, OnInit } from '@angular/core';
import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  Input,
} from '@angular/core';

@Component({
  selector: 'simurgh-resizable-panel-group',
  standalone: true,
  template: `<ng-content />`,
  host: {
    'data-slot': 'resizable-panel-group',
    '[attr.data-orientation]': 'orientation',
    '[attr.dir]': 'direction',
  },
})
export class ResizablePanelGroupComponent {
  @Input() orientation: Orientation = 'horizontal';
  @Input() direction: Direction = 'ltr';
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly panels: ResizablePanelComponent[] = [];
  sizes: number[] = [];
  minimums: number[] = [];
  maximums: number[] = [];
  defaults: number[] = [];

  get count() {
    return this.panels.length;
  }
  register(panel: ResizablePanelComponent) {
    this.panels.push(panel);
    this.defaults.push(1);
    this.minimums.push(10);
    this.maximums.push(90);
    this.normalize();
  }
  configure(
    panel: ResizablePanelComponent,
    defaultSize: number,
    minSize: number,
    maxSize: number,
  ) {
    const index = this.panels.indexOf(panel);
    if (index < 0) return;
    this.defaults[index] = defaultSize;
    this.minimums[index] = minSize;
    this.maximums[index] = maxSize;
    this.normalize();
  }
  unregister(panel: ResizablePanelComponent) {
    const index = this.panels.indexOf(panel);
    if (index < 0) return;
    this.panels.splice(index, 1);
    this.defaults.splice(index, 1);
    this.minimums.splice(index, 1);
    this.maximums.splice(index, 1);
    this.normalize();
  }
  panelIndex(panel: ResizablePanelComponent) {
    return this.panels.indexOf(panel);
  }
  normalize() {
    const total = this.defaults.reduce(
      (sum, value) => sum + Math.max(0, value),
      0,
    );
    this.sizes = this.defaults.map((value) =>
      total ? (Math.max(0, value) / total) * 100 : 100 / this.count,
    );
  }
  adjust(boundary: number, delta: number) {
    if (boundary < 0 || boundary >= this.sizes.length - 1) return;
    const total = this.sizes[boundary]! + this.sizes[boundary + 1]!;
    const low = Math.max(
      this.minimums[boundary]!,
      total - this.maximums[boundary + 1]!,
    );
    const high = Math.min(
      this.maximums[boundary]!,
      total - this.minimums[boundary + 1]!,
    );
    const before = Math.max(low, Math.min(high, this.sizes[boundary]! + delta));
    this.sizes[boundary] = before;
    this.sizes[boundary + 1] = total - before;
  }
}

@Component({
  selector: 'simurgh-resizable-panel',
  standalone: true,
  template: `<ng-content />`,
  host: { 'data-slot': 'resizable-panel' },
})
export class ResizablePanelComponent implements OnInit, OnDestroy {
  @Input() defaultSize = 1;
  @Input() minSize = 10;
  @Input() maxSize = 90;
  private group = inject(ResizablePanelGroupComponent);
  constructor() {
    this.group.register(this);
  }
  @HostBinding('style.flex-basis') get basis() {
    return `${this.group.sizes[this.group.panelIndex(this)] ?? 100}%`;
  }
  ngOnInit() {
    this.group.configure(this, this.defaultSize, this.minSize, this.maxSize);
  }
  ngOnDestroy() {
    this.group.unregister(this);
  }
}

@Component({
  selector: 'simurgh-resizable-handle',
  standalone: true,
  template: `<ng-content />`,
  host: {
    'data-slot': 'resizable-handle',
    role: 'separator',
    tabindex: '0',
  },
})
export class ResizableHandleComponent {
  private group = inject(ResizablePanelGroupComponent);
  readonly boundary = this.group.count - 1;
  @HostBinding('attr.aria-orientation') get ariaOrientation() {
    return this.group.orientation === 'horizontal' ? 'vertical' : 'horizontal';
  }
  @HostBinding('attr.aria-valuemin') get minimum() {
    return Math.max(
      this.group.minimums[this.boundary]!,
      (this.group.sizes[this.boundary] ?? 0) +
        (this.group.sizes[this.boundary + 1] ?? 0) -
        this.group.maximums[this.boundary + 1]!,
    );
  }
  @HostBinding('attr.aria-valuemax') get maximum() {
    return Math.min(
      this.group.maximums[this.boundary]!,
      (this.group.sizes[this.boundary] ?? 0) +
        (this.group.sizes[this.boundary + 1] ?? 0) -
        this.group.minimums[this.boundary + 1]!,
    );
  }
  @HostBinding('attr.aria-valuenow') get value() {
    return Math.round(this.group.sizes[this.boundary] ?? 0);
  }
  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
    const current = this.group.sizes[this.boundary] ?? 0;
    if (event.key === 'Home')
      this.group.adjust(this.boundary, this.minimum - current);
    else if (event.key === 'End')
      this.group.adjust(this.boundary, this.maximum - current);
    else {
      const previous =
        this.group.orientation === 'vertical'
          ? 'ArrowUp'
          : this.group.direction === 'rtl'
            ? 'ArrowRight'
            : 'ArrowLeft';
      const next =
        this.group.orientation === 'vertical'
          ? 'ArrowDown'
          : this.group.direction === 'rtl'
            ? 'ArrowLeft'
            : 'ArrowRight';
      if (event.key === previous) this.group.adjust(this.boundary, -5);
      else if (event.key === next) this.group.adjust(this.boundary, 5);
      else return;
    }
    event.preventDefault();
  }
  @HostListener('pointerdown', ['$event']) onPointerdown(event: PointerEvent) {
    let previous =
      this.group.orientation === 'horizontal' ? event.clientX : event.clientY;
    const root = this.group.element.nativeElement;
    const size =
      this.group.orientation === 'horizontal'
        ? root.clientWidth
        : root.clientHeight;
    if (!size) return;
    const onMove = (next: PointerEvent) => {
      const coordinate =
        this.group.orientation === 'horizontal' ? next.clientX : next.clientY;
      let delta = ((coordinate - previous) / size) * 100;
      previous = coordinate;
      if (
        this.group.orientation === 'horizontal' &&
        this.group.direction === 'rtl'
      )
        delta *= -1;
      this.group.adjust(this.boundary, delta);
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp, { once: true });
  }
}
