import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { trapFocus } from '@simurgh-ui/core';

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
