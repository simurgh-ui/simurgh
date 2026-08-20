import { listenFormReset } from '@simurgh-ui/core';
import { Directive, ElementRef, inject } from '@angular/core';
import type { AfterViewInit, OnDestroy } from '@angular/core';

@Directive()
export abstract class FormResetBase implements AfterViewInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private cleanup?: () => void;

  protected abstract createFormReset(): () => void;

  ngAfterViewInit() {
    this.cleanup = listenFormReset(
      this.host.nativeElement,
      this.createFormReset(),
    );
  }

  ngOnDestroy() {
    this.cleanup?.();
  }
}
