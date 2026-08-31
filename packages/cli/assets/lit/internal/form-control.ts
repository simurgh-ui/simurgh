import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export abstract class FormControlElement extends LitElement {
  static formAssociated = true;
  protected readonly internals: ElementInternals | undefined;
  @property({ reflect: true }) name = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;

  constructor() {
    super();
    this.internals =
      typeof this.attachInternals === 'function'
        ? this.attachInternals()
        : undefined;
  }
  protected updateFormValue(value: string | File | FormData | null) {
    this.internals?.setFormValue(this.disabled ? null : value);
  }
  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }
  abstract formResetCallback(): void;
}
