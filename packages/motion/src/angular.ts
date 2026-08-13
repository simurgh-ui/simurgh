import {
  Directive,
  ElementRef,
  Injectable,
  Input,
  Component,
  HostBinding,
  inject,
} from '@angular/core';
import type { AfterViewInit, OnChanges, OnDestroy } from '@angular/core';
import {
  animate,
  bindMotion,
  runMotion,
  type MotionDefinition,
  type MotionTarget,
  type MotionTransition,
} from './index.js';

@Injectable({ providedIn: 'root' })
export class MotionController {
  animate(
    element: Element,
    target: MotionTarget,
    transition?: MotionTransition,
  ) {
    return animate(element, target, transition);
  }
  run(
    element: Element,
    definition: MotionDefinition,
    state: keyof MotionDefinition = 'animate',
  ) {
    return runMotion(element, definition, state);
  }
}

@Directive({ selector: '[simurghMotion]', standalone: true })
export class SimurghMotionDirective
  implements AfterViewInit, OnChanges, OnDestroy
{
  @Input({ required: true }) simurghMotion!: MotionDefinition;
  private readonly element = inject(ElementRef<Element>);
  private cleanup?: () => void;
  ngAfterViewInit() {
    this.attach();
  }
  ngOnChanges() {
    if (this.cleanup) this.attach();
  }
  ngOnDestroy() {
    this.cleanup?.();
  }
  private attach() {
    this.cleanup?.();
    this.cleanup = bindMotion(this.element.nativeElement, this.simurghMotion);
  }
}

@Component({
  selector: 'simurgh-presence',
  standalone: true,
  template: '<ng-content />',
})
export class SimurghPresence implements AfterViewInit, OnChanges, OnDestroy {
  @Input() present = true;
  @Input({ required: true }) motion!: MotionDefinition;
  @HostBinding('style.display') display = '';
  private readonly element = inject(ElementRef<Element>);
  private initialized = false;
  private controls?: ReturnType<typeof runMotion>;
  ngAfterViewInit() {
    this.initialized = true;
    this.update();
  }
  ngOnChanges() {
    if (this.initialized) this.update();
  }
  ngOnDestroy() {
    this.controls?.cancel();
  }
  private update() {
    this.controls?.cancel();
    if (this.present) {
      this.display = '';
      this.controls = runMotion(
        this.element.nativeElement,
        this.motion,
        'animate',
      );
    } else {
      this.controls = runMotion(
        this.element.nativeElement,
        this.motion,
        'exit',
      );
      this.controls.finished.then(() => {
        if (!this.present) this.display = 'none';
      });
    }
  }
}

export * from './index.js';
