import { listenFormReset } from '@simurgh-ui/core';
import {
  Component,
  booleanAttribute,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import type { AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'simurgh-input',
  standalone: true,
  template: `<input
    #control
    data-slot="input"
    [type]="type"
    [name]="name || ''"
    [value]="value"
    [required]="required"
    [disabled]="disabled"
    [attr.aria-invalid]="invalid || null"
    (input)="onInput($event)"
  />`,
})
export class InputComponent implements AfterViewInit, OnDestroy {
  @Input() type = 'text';
  @Input() name?: string;
  @Input() value = '';
  @Input({ transform: booleanAttribute }) required = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) invalid = false;
  @Output() valueChange = new EventEmitter<string>();
  @ViewChild('control', { static: true })
  control!: ElementRef<HTMLInputElement>;
  private initialValue = '';
  private removeResetListener?: () => void;
  ngAfterViewInit() {
    this.initialValue = this.value;
    this.control.nativeElement.defaultValue = this.initialValue;
    this.removeResetListener = listenFormReset(
      this.control.nativeElement,
      () => {
        this.value = this.initialValue;
        this.valueChange.emit(this.initialValue);
        this.control.nativeElement.value = this.initialValue;
      },
    );
  }
  onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(this.value);
  }
  ngOnDestroy() {
    this.removeResetListener?.();
  }
}
