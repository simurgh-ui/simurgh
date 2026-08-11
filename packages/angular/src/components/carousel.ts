import type { Direction } from '@simurgh-ui/core';
import type { OnDestroy } from '@angular/core';
import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'simurgh-carousel',
  standalone: true,
  template: `<ng-content />`,
  host: {
    'data-slot': 'carousel',
    role: 'region',
    'aria-roledescription': 'carousel',
    '[attr.aria-label]': 'label',
    '[attr.dir]': 'direction',
    tabindex: '0',
  },
})
export class CarouselComponent {
  @Input() label = 'Carousel';
  @Input() direction: Direction = 'ltr';
  @Input() loop = false;
  @Output() indexChange = new EventEmitter<number>();
  index = 0;
  readonly items: CarouselItemComponent[] = [];

  @Input() set defaultIndex(value: number) {
    this.index = Math.max(0, value);
  }
  get count() {
    return this.items.length;
  }
  register(item: CarouselItemComponent) {
    this.items.push(item);
  }
  unregister(item: CarouselItemComponent) {
    const index = this.items.indexOf(item);
    if (index >= 0) this.items.splice(index, 1);
    this.index = Math.min(this.index, Math.max(0, this.count - 1));
  }
  itemIndex(item: CarouselItemComponent) {
    return this.items.indexOf(item);
  }
  goTo(next: number) {
    if (!this.count) return;
    const resolved = this.loop
      ? (next + this.count) % this.count
      : Math.max(0, Math.min(this.count - 1, next));
    if (resolved !== this.index) {
      this.index = resolved;
      this.indexChange.emit(resolved);
    }
  }
  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
    const previous = this.direction === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
    const next = this.direction === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
    if (event.key === previous || event.key === next) {
      event.preventDefault();
      this.goTo(this.index + (event.key === next ? 1 : -1));
    }
  }
}

@Component({
  selector: 'simurgh-carousel-content',
  standalone: true,
  template: `<ng-content />`,
  host: { 'data-slot': 'carousel-content', 'aria-live': 'polite' },
})
export class CarouselContentComponent {}

@Component({
  selector: 'simurgh-carousel-item',
  standalone: true,
  template: `<ng-content />`,
  host: {
    'data-slot': 'carousel-item',
    role: 'group',
    'aria-roledescription': 'slide',
  },
})
export class CarouselItemComponent implements OnDestroy {
  private carousel = inject(CarouselComponent);
  constructor() {
    this.carousel.register(this);
  }
  get position() {
    return this.carousel.itemIndex(this);
  }
  @HostBinding('attr.aria-label') get label() {
    return `${this.position + 1} of ${this.carousel.count}`;
  }
  @HostBinding('attr.aria-hidden') get ariaHidden() {
    return this.carousel.index !== this.position;
  }
  @HostBinding('attr.hidden') get hidden() {
    return this.carousel.index === this.position ? null : '';
  }
  ngOnDestroy() {
    this.carousel.unregister(this);
  }
}

function carouselUnavailable(carousel: CarouselComponent, step: -1 | 1) {
  return (
    !carousel.loop &&
    (step < 0 ? carousel.index <= 0 : carousel.index >= carousel.count - 1)
  );
}

@Component({
  selector: 'simurgh-carousel-previous',
  standalone: true,
  template: `<button
    type="button"
    data-slot="carousel-previous"
    aria-label="Previous slide"
    [disabled]="unavailable"
    (click)="carousel.goTo(carousel.index - 1)"
  >
    <ng-content />
  </button>`,
})
export class CarouselPreviousComponent {
  readonly carousel = inject(CarouselComponent);
  get unavailable() {
    return carouselUnavailable(this.carousel, -1);
  }
}

@Component({
  selector: 'simurgh-carousel-next',
  standalone: true,
  template: `<button
    type="button"
    data-slot="carousel-next"
    aria-label="Next slide"
    [disabled]="unavailable"
    (click)="carousel.goTo(carousel.index + 1)"
  >
    <ng-content />
  </button>`,
})
export class CarouselNextComponent {
  readonly carousel = inject(CarouselComponent);
  get unavailable() {
    return carouselUnavailable(this.carousel, 1);
  }
}
