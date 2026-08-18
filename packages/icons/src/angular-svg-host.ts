import {
  ElementRef,
  inject,
  type AfterViewInit,
  type OnDestroy,
} from '@angular/core';

const forwardedAttribute = (name: string) =>
  name === 'class' ||
  name === 'style' ||
  name === 'role' ||
  name === 'tabindex' ||
  name.startsWith('aria-') ||
  name.startsWith('data-');

export abstract class IconSvgHost implements AfterViewInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly baseline = new Map<string, string | null>();
  private readonly mirrored = new Set<string>();
  private observer?: MutationObserver;

  ngAfterViewInit(): void {
    this.syncHostAttributes();
    if (typeof MutationObserver === 'undefined') return;
    this.observer = new MutationObserver(() => this.syncHostAttributes());
    this.observer.observe(this.host.nativeElement, { attributes: true });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private syncHostAttributes(): void {
    const svg = this.host.nativeElement.querySelector('svg');
    if (!svg) return;
    const next = new Map(
      [...this.host.nativeElement.attributes]
        .filter(({ name }) => forwardedAttribute(name))
        .map(({ name, value }) => [name, value]),
    );
    for (const name of new Set([...this.mirrored, ...next.keys()])) {
      if (!this.baseline.has(name)) {
        this.baseline.set(name, svg.getAttribute(name));
      }
      const value = next.get(name);
      if (value !== undefined) {
        if (name === 'class') {
          const baseline = this.baseline.get(name);
          svg.setAttribute(name, [baseline, value].filter(Boolean).join(' '));
        } else {
          svg.setAttribute(name, value);
        }
        this.mirrored.add(name);
        continue;
      }
      const baseline = this.baseline.get(name);
      if (baseline === null || baseline === undefined)
        svg.removeAttribute(name);
      else svg.setAttribute(name, baseline);
      this.mirrored.delete(name);
    }
  }
}
