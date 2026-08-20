import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { createId } from '@simurgh-ui/core';

export type ToastMessage = { id: string; title: string; description?: string };

@Component({
  selector: 'simurgh-toast-viewport',
  standalone: true,
  imports: [CommonModule],
  template: `<div
    class="simurgh-toast-region"
    role="region"
    aria-label="Notifications"
  >
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
