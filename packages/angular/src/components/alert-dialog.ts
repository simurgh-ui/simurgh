import { CommonModule } from '@angular/common';
import {
  Component,
  Directive,
  EventEmitter,
  HostListener,
  inject,
  Output,
} from '@angular/core';
import { DialogComponent } from './dialog.js';

@Component({
  selector: 'simurgh-alert-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content select="[trigger]" />
    <div *ngIf="open" class="simurgh-overlay" (click)="close()"></div>
    <section
      #content
      *ngIf="open"
      class="simurgh-content simurgh-dialog"
      data-slot="alert-dialog-content"
      role="alertdialog"
      aria-modal="true"
      [attr.aria-labelledby]="labelledBy"
      [attr.aria-describedby]="describedBy"
      tabindex="-1"
      (keydown)="onKeydown($event)"
    >
      <ng-content />
    </section>`,
})
export class AlertDialogComponent extends DialogComponent {
  override show() {
    super.show();
    setTimeout(() =>
      this.content?.nativeElement
        .querySelector<HTMLElement>('[simurghAlertDialogCancel]')
        ?.focus(),
    );
  }
}

@Directive({
  selector: 'button[simurghAlertDialogAction]',
  standalone: true,
  host: { type: 'button', 'data-slot': 'alert-dialog-action' },
})
export class AlertDialogActionDirective {
  @Output() action = new EventEmitter<void>();
  private dialog = inject(AlertDialogComponent);
  @HostListener('click') choose() {
    this.action.emit();
    this.dialog.close();
  }
}

@Directive({
  selector: 'button[simurghAlertDialogCancel]',
  standalone: true,
  host: { type: 'button', 'data-slot': 'alert-dialog-cancel' },
})
export class AlertDialogCancelDirective {
  private dialog = inject(AlertDialogComponent);
  @HostListener('click') cancel() {
    this.dialog.close();
  }
}
