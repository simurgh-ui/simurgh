import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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
