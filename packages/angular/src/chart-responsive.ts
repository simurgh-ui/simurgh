import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

export type ChartResponsiveSize = { width: number; height: number };

@Component({ selector: 'simurgh-chart-responsive-container', standalone: true, template: '<div #container data-part="responsive-container" style="width:100%;height:100%"><ng-content /></div>' })
export class ChartResponsiveContainerComponent {
  @Output() readonly sizeChange = new EventEmitter<ChartResponsiveSize>();
  @ViewChild('container') set container(value: ElementRef<HTMLElement> | undefined) {
    this.observer?.disconnect();
    if (!value || typeof ResizeObserver === 'undefined') return;
    const update = (width: number, height: number) => this.sizeChange.emit({ width, height });
    this.observer = new ResizeObserver((entries) => { const rect = entries[0]?.contentRect; if (rect) update(rect.width, rect.height); });
    this.observer.observe(value.nativeElement);
  }
  private observer?: ResizeObserver;
  ngOnDestroy() { this.observer?.disconnect(); }
}
