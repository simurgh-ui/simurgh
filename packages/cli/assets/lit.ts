export { Button } from './components/button.js';
export { Badge } from './components/badge.js';
export { Separator } from './components/separator.js';
export { Skeleton } from './components/skeleton.js';
export { Spinner } from './components/spinner.js';
export { VisuallyHidden } from './components/visually-hidden.js';
export { Input } from './components/input.js';
export { Textarea } from './components/textarea.js';
export { Label } from './components/label.js';
export { NativeSelect } from './components/native-select.js';
export { Progress } from './components/progress.js';
export { Meter } from './components/meter.js';
export { Link } from './components/link.js';
export { Alert } from './components/alert.js';
export { AspectRatio } from './components/aspect-ratio.js';
export { Avatar } from './components/avatar.js';
export { Checkbox } from './components/checkbox.js';
export { Switch } from './components/switch.js';
export { Toggle } from './components/toggle.js';
export { Disclosure } from './components/disclosure.js';
export { Collapsible } from './components/collapsible.js';
export { Form } from './components/form.js';
export { Field } from './components/field.js';
export { Card } from './components/card.js';
export { Empty } from './components/empty.js';
export { Item } from './components/item.js';
export { Kbd } from './components/kbd.js';
export { Table } from './components/table.js';
export { Breadcrumb } from './components/breadcrumb.js';
export { ButtonGroup } from './components/button-group.js';
export { Toolbar } from './components/toolbar.js';
export { RadioGroup } from './components/radio-group.js';
export { Slider } from './components/slider.js';
export { Rating } from './components/rating.js';
export { NumberInput } from './components/number-input.js';
export { PasswordInput } from './components/password-input.js';
export { TagsInput } from './components/tags-input.js';
export { FileUpload } from './components/file-upload.js';
export { InputOtp } from './components/input-otp.js';
export { Tabs } from './components/tabs.js';
export { Accordion } from './components/accordion.js';
export { ToggleGroup } from './components/toggle-group.js';
export { ScrollArea } from './components/scroll-area.js';
export { InputGroup } from './components/input-group.js';
export { DescriptionList } from './components/description-list.js';
export { Pagination } from './components/pagination.js';
export { Resizable } from './components/resizable.js';
export { Carousel } from './components/carousel.js';
export { Dialog } from './components/dialog.js';
export { AlertDialog } from './components/alert-dialog.js';
export { Sheet } from './components/sheet.js';
export { Drawer } from './components/drawer.js';
export { Popover } from './components/popover.js';
export { Tooltip } from './components/tooltip.js';
export { HoverCard } from './components/hover-card.js';
export { DropdownMenu } from './components/dropdown-menu.js';
export { ContextMenu } from './components/context-menu.js';
export { Select } from './components/select.js';
export { Combobox } from './components/combobox.js';
export { Command } from './components/command.js';
export { Calendar } from './components/calendar.js';
export { DatePicker } from './components/date-picker.js';
export { Sidebar } from './components/sidebar.js';
export { Tree } from './components/tree.js';
export { Chart } from './components/chart.js';
export { NavigationMenu } from './components/navigation-menu.js';
export { Menubar } from './components/menubar.js';
export { Toast } from './components/toast.js';

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type AccordionItem = {
  value: string;
  title: string;
  content?: string;
  disabled?: boolean;
};
@customElement('simurgh-accordion')
export class Accordion extends LitElement {
  @property({ attribute: false }) value: string[] = [];
  @property({ attribute: false }) items: AccordionItem[] = [];
  @property({ type: Boolean }) multiple = false;
  private toggle(item: AccordionItem) {
    if (item.disabled) return;
    this.value = this.value.includes(item.value)
      ? this.value.filter((v) => v !== item.value)
      : this.multiple
        ? [...this.value, item.value]
        : [item.value];
  }
  render() {
    return html`<div part="root" data-slot="accordion">
      ${this.items.map(
        (item) =>
          html`<div
            part="item"
            data-slot="accordion-item"
            data-state=${this.value.includes(item.value) ? 'open' : 'closed'}
          >
            <h3>
              <button
                type="button"
                aria-expanded=${this.value.includes(item.value)}
                ?disabled=${item.disabled}
                @click=${() => this.toggle(item)}
              >
                ${item.title}
              </button>
            </h3>
            <div part="content" ?hidden=${!this.value.includes(item.value)}>
              ${item.content ?? ''}
            </div>
          </div>`,
      )}
    </div>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
@customElement('simurgh-alert-dialog')
export class AlertDialog extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property() title = 'Are you sure?';
  @property() description = '';
  @query('dialog') private dialog?: HTMLDialogElement;
  protected updated() {
    if (!this.dialog) return;
    if (this.open && !this.dialog.open) this.dialog.showModal();
    else if (!this.open && this.dialog.open) this.dialog.close();
  }
  render() {
    return html`<button
        part="trigger"
        type="button"
        data-slot="alert-dialog-trigger"
        @click=${() => (this.open = true)}
      >
        <slot name="trigger"></slot>
      </button>
      <dialog
        part="content"
        data-slot="alert-dialog-content"
        aria-labelledby="alert-title"
        @close=${() => (this.open = false)}
      >
        <h2 id="alert-title" data-slot="alert-dialog-title">${this.title}</h2>
        ${this.description ? html`<p data-slot="alert-dialog-description">${this.description}</p>` : null}<slot
        ></slot
        ><button
          type="button"
          data-slot="alert-dialog-cancel"
          @click=${() => (this.open = false)}
        >
          Cancel</button
        ><button
          type="button"
          data-slot="alert-dialog-action"
          @click=${() => {
            this.dispatchEvent(new CustomEvent('action'));
            this.open = false;
          }}
        >
          Continue
        </button>
      </dialog>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-alert')
export class Alert extends LitElement {
  @property({ type: Boolean }) urgent = false;
  render() {
    return html`<div
      part="alert"
      role=${this.urgent ? 'alert' : 'status'}
      aria-live=${this.urgent ? 'assertive' : 'polite'}
      aria-atomic="true"
      data-urgent=${this.urgent ? 'true' : 'false'}
    >
      <slot></slot>
    </div>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-aspect-ratio')
export class AspectRatio extends LitElement {
  @property({ type: Number }) ratio = 1;
  render() {
    const ratio =
      Number.isFinite(this.ratio) && this.ratio > 0 ? this.ratio : 1;
    return html`<div
      part="root"
      data-ratio=${ratio}
      style=${`aspect-ratio:${ratio}`}
    >
      <slot></slot>
    </div>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-avatar')
export class Avatar extends LitElement {
  @property() src = '';
  @property() alt = '';
  @property({ type: Boolean, state: true }) private loaded = false;
  updated(changed: Map<string, unknown>) {
    if (changed.has('src')) this.loaded = false;
  }
  render() {
    return html`<span
      part="root"
      data-state=${this.loaded ? 'loaded' : 'fallback'}
    >
      ${
      this.src
        ? html`<img
            part="image"
            src=${this.src}
            alt=${this.alt}
            ?hidden=${!this.loaded}
            @load=${() => (this.loaded = true)}
            @error=${() => (this.loaded = false)}
          />`
        : null
    }
      ${!this.loaded ? html`<span part="fallback" data-part="fallback"><slot name="fallback"></slot></span>` : null}</span
    >`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';
@customElement('simurgh-badge')
export class Badge extends LitElement {
  @property() tone: BadgeTone = 'neutral';
  @property({ type: Boolean }) status = false;
  render() {
    return html`<span
      part="badge"
      data-slot="badge"
      data-tone=${this.tone}
      role=${this.status ? 'status' : 'presentation'}
      aria-live=${this.status ? 'polite' : 'off'}
      ><slot></slot
    ></span>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-breadcrumb')
export class Breadcrumb extends LitElement {
  @property() label = 'Breadcrumb';
  render() {
    return html`<nav part="nav" aria-label=${this.label} data-slot="breadcrumb">
      <ol part="list">
        <slot></slot>
      </ol>
    </nav>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-button-group')
export class ButtonGroup extends LitElement {
  @property() orientation: 'horizontal' | 'vertical' = 'horizontal';
  render() {
    return html`<div
      part="group"
      role="group"
      data-slot="button-group"
      data-orientation=${this.orientation}
      aria-orientation=${this.orientation}
    >
      <slot></slot>
    </div>`;
  }
}

import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormControlElement } from '../internal/form-control.js';

@customElement('simurgh-button')
export class Button extends FormControlElement {
  @property({ type: Boolean }) loading = false;
  @property() type: 'button' | 'submit' | 'reset' = 'button';
  @property() variant: 'primary' | 'secondary' | 'destructive' | 'quiet' =
    'primary';
  @property() size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean, attribute: 'full-width' }) fullWidth = false;
  @property({ type: Boolean, attribute: 'icon-only' }) iconOnly = false;
  formResetCallback() {}
  private activate() {
    if (this.disabled || this.loading) return;
    if (this.type === 'submit') this.internals?.form?.requestSubmit();
    if (this.type === 'reset') this.internals?.form?.reset();
  }

  render() {
    return html`<button
      part="button"
      type=${this.type}
      ?disabled=${this.disabled || this.loading}
      aria-busy=${this.loading ? 'true' : 'false'}
      data-slot="button"
      data-state=${this.loading ? 'loading' : 'idle'}
      data-variant=${this.variant}
      data-size=${this.size}
      ?data-full-width=${this.fullWidth}
      ?data-icon-only=${this.iconOnly}
      @click=${this.activate}
    >
      <slot></slot>
    </button>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
@customElement('simurgh-calendar')
export class Calendar extends LitElement {
  @property() value = '';
  @property() label = 'Calendar';
  @state() private shown = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1,
  );
  private move(delta: number) {
    this.shown = new Date(
      this.shown.getFullYear(),
      this.shown.getMonth() + delta,
      1,
    );
  }
  private iso(day: number) {
    return `${this.shown.getFullYear()}-${String(this.shown.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }
  render() {
    const days = new Date(
      this.shown.getFullYear(),
      this.shown.getMonth() + 1,
      0,
    ).getDate();
    return html`<div part="root" aria-label=${this.label} data-slot="calendar">
      <header>
        <button
          type="button"
          aria-label="Previous month"
          @click=${() => this.move(-1)}
        >
          ‹</button
        ><span aria-live="polite"
          >${this.shown.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</span
        ><button
          type="button"
          aria-label="Next month"
          @click=${() => this.move(1)}
        >
          ›
        </button>
      </header>
      <div part="grid" role="grid">
        ${Array.from({ length: days }, (_, index) => html`<button type="button" role="gridcell" aria-selected=${this.value === this.iso(index + 1)} @click=${() => (this.value = this.iso(index + 1))}>${index + 1}</button>`)}
      </div>
    </div>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
@customElement('simurgh-card')
export class Card extends LitElement {
  render() {
    return html`<div part="card" data-slot="card">
      <div part="header" data-slot="card-header">
        <slot name="header"></slot>
        <h3 part="title" data-slot="card-title"><slot name="title"></slot></h3>
        <p part="description" data-slot="card-description">
          <slot name="description"></slot>
        </p>
      </div>
      <div part="content" data-slot="card-content"><slot></slot></div>
      <div part="footer" data-slot="card-footer">
        <slot name="footer"></slot>
      </div>
    </div>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-carousel')
export class Carousel extends LitElement {
  @property({ type: Number }) index = 0;
  @property({ attribute: false }) items: string[] = [];
  @property() label = 'Carousel';
  private move(delta: number) {
    if (this.items.length)
      this.index = (this.index + delta + this.items.length) % this.items.length;
  }
  render() {
    return html`<section
      part="root"
      aria-roledescription="carousel"
      aria-label=${this.label}
      data-slot="carousel"
    >
      <div part="content" aria-live="polite" data-slot="carousel-content">
        ${this.items.map((item, index) => html`<div part="item" role="group" aria-roledescription="slide" aria-label=${`${index + 1} of ${this.items.length}`} ?hidden=${this.index !== index} data-slot="carousel-item">${item}</div>`)}
      </div>
      <button
        type="button"
        aria-label="Previous slide"
        ?disabled=${this.items.length < 2}
        @click=${() => this.move(-1)}
      >
        Previous</button
      ><button
        type="button"
        aria-label="Next slide"
        ?disabled=${this.items.length < 2}
        @click=${() => this.move(1)}
      >
        Next
      </button>
    </section>`;
  }
}

import { LitElement, html, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type ChartDatum = { label: string; value: number; color?: string };
@customElement('simurgh-chart')
export class Chart extends LitElement {
  @property({ attribute: false }) data: ChartDatum[] = [];
  @property() label = 'Chart';
  @property({ type: Number }) width = 400;
  @property({ type: Number }) height = 200;
  render() {
    const maximum = Math.max(1, ...this.data.map((item) => item.value));
    return html`<figure part="figure" data-slot="chart">
      <svg
        role="img"
        aria-label=${this.label}
        viewBox=${`0 0 ${this.width} ${this.height}`}
      >
        ${this.data.map((item, index) => svg`<rect x=${index * (this.width / Math.max(this.data.length, 1))} y=${this.height - (item.value / maximum) * this.height} width=${this.width / Math.max(this.data.length, 1) - 4} height=${(item.value / maximum) * this.height} fill=${item.color ?? 'currentColor'}><title>${item.label}: ${item.value}</title></rect>`)}
      </svg>
      <figcaption>${this.label}</figcaption>
    </figure>`;
  }
}

import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormControlElement } from '../internal/form-control.js';
@customElement('simurgh-checkbox')
export class Checkbox extends FormControlElement {
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) indeterminate = false;
  @property() value = 'on';
  protected updated() {
    this.updateFormValue(this.checked ? this.value : null);
  }
  formResetCallback() {
    this.checked = false;
  }
  render() {
    return html`<label
      part="root"
      data-slot="checkbox"
      data-state=${this.indeterminate ? 'indeterminate' : this.checked ? 'checked' : 'unchecked'}
      ><input
        part="input"
        type="checkbox"
        .checked=${this.checked}
        .indeterminate=${this.indeterminate}
        ?disabled=${this.disabled}
        @change=${(e: Event) => (this.checked = (e.target as HTMLInputElement).checked)} /><span
        part="indicator"
        aria-hidden="true"
        ><slot></slot></span
    ></label>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-collapsible')
export class Collapsible extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  render() {
    return html`<div
      part="root"
      data-slot="collapsible"
      data-state=${this.open ? 'open' : 'closed'}
    >
      <button
        part="trigger"
        type="button"
        data-slot="collapsible-trigger"
        aria-expanded=${this.open}
        ?disabled=${this.disabled}
        @click=${() => (this.open = !this.open)}
      >
        <slot name="trigger"></slot>
      </button>
      <div part="content" data-slot="collapsible-content" ?hidden=${!this.open}>
        <slot></slot>
      </div>
    </div>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { SelectItem } from './select.js';
@customElement('simurgh-combobox')
export class Combobox extends LitElement {
  @property() value = '';
  @property({ attribute: false }) options: SelectItem[] = [];
  @property() label = 'Choose an option';
  @property() placeholder = '';
  @property({ type: Boolean }) disabled = false;
  @state() private query = '';
  @state() private open = false;
  render() {
    const filtered = this.options.filter((option) =>
      option.label.toLowerCase().includes(this.query.toLowerCase()),
    );
    return html`<div part="root" data-slot="combobox">
      <input
        part="input"
        role="combobox"
        aria-label=${this.label}
        aria-expanded=${this.open}
        aria-controls="combobox-list"
        autocomplete="off"
        .value=${this.query}
        placeholder=${this.placeholder}
        ?disabled=${this.disabled}
        @focus=${() => (this.open = true)}
        @input=${(e: Event) => {
          this.query = (e.target as HTMLInputElement).value;
          this.open = true;
        }}
      />
      <div part="list" id="combobox-list" role="listbox" ?hidden=${!this.open}>
        ${filtered.map(
          (option) =>
            html`<button
              type="button"
              role="option"
              aria-selected=${this.value === option.value}
              ?disabled=${option.disabled}
              @click=${() => {
                this.value = option.value;
                this.query = option.label;
                this.open = false;
              }}
            >
              ${option.label}
            </button>`,
        )}
      </div>
    </div>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { SelectItem } from './select.js';
@customElement('simurgh-command')
export class Command extends LitElement {
  @property({ attribute: false }) items: SelectItem[] = [];
  @property() label = 'Command menu';
  @property() placeholder = 'Search commands';
  @state() private query = '';
  render() {
    const filtered = this.items.filter((item) =>
      item.label.toLowerCase().includes(this.query.toLowerCase()),
    );
    return html`<div
      part="root"
      role="dialog"
      aria-label=${this.label}
      data-slot="command"
    >
      <input
        part="input"
        aria-label="Search commands"
        placeholder=${this.placeholder}
        .value=${this.query}
        @input=${(e: Event) => (this.query = (e.target as HTMLInputElement).value)}
      />
      <div part="list" role="listbox">
        ${filtered.map((item) => html`<button type="button" role="option" aria-selected="false" ?disabled=${item.disabled} @click=${() => this.dispatchEvent(new CustomEvent('select', { detail: item.value }))}>${item.label}</button>`)}${filtered.length ? null : html`<div data-slot="command-empty">No results</div>`}
      </div>
    </div>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { MenuItem } from './dropdown-menu.js';
@customElement('simurgh-context-menu')
export class ContextMenu extends LitElement {
  @property({ attribute: false }) items: MenuItem[] = [];
  @state() private open = false;
  @state() private x = 0;
  @state() private y = 0;
  render() {
    return html`<div
      part="root"
      data-slot="context-menu"
      @contextmenu=${(e: MouseEvent) => {
        e.preventDefault();
        this.x = e.clientX;
        this.y = e.clientY;
        this.open = true;
      }}
    >
      <slot></slot>
      <div
        part="content"
        role="menu"
        ?hidden=${!this.open}
        style=${`position:fixed;left:${this.x}px;top:${this.y}px`}
      >
        ${this.items.map(
          (item) =>
            html`<button
              type="button"
              role="menuitem"
              ?disabled=${item.disabled}
              @click=${() => {
                this.dispatchEvent(
                  new CustomEvent('select', { detail: item.value }),
                );
                this.open = false;
              }}
            >
              ${item.label}
            </button>`,
        )}
      </div>
    </div>`;
  }
}

import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormControlElement } from '../internal/form-control.js';
@customElement('simurgh-date-picker')
export class DatePicker extends FormControlElement {
  @property() value = '';
  @property() min = '';
  @property() max = '';
  @property() label = 'Choose date';
  protected updated() {
    this.updateFormValue(this.value);
  }
  formResetCallback() {
    this.value = '';
  }
  render() {
    return html`<input
      part="input"
      type="date"
      .value=${this.value}
      min=${this.min}
      max=${this.max}
      ?disabled=${this.disabled}
      ?required=${this.required}
      aria-label=${this.label}
      data-slot="date-picker"
      @input=${(e: Event) => (this.value = (e.target as HTMLInputElement).value)}
    />`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type DescriptionItem = { term: string; details: string };
@customElement('simurgh-description-list')
export class DescriptionList extends LitElement {
  @property({ attribute: false }) items: DescriptionItem[] = [];
  render() {
    return html`<dl part="list" data-slot="description-list">
      ${this.items.map(
        (item) =>
          html`<div part="group" data-slot="description-list-group">
            <dt part="term" data-slot="description-list-term">${item.term}</dt>
            <dd part="details" data-slot="description-list-details">
              ${item.details}
            </dd>
          </div>`,
      )}<slot></slot>
    </dl>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
@customElement('simurgh-dialog')
export class Dialog extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property() title = '';
  @property() description = '';
  @query('dialog') private dialog?: HTMLDialogElement;
  protected updated() {
    if (!this.dialog) return;
    if (this.open && !this.dialog.open) this.dialog.showModal();
    else if (!this.open && this.dialog.open) this.dialog.close();
  }
  render() {
    return html`<button
        part="trigger"
        type="button"
        data-slot="dialog-trigger"
        @click=${() => (this.open = true)}
      >
        <slot name="trigger"></slot>
      </button>
      <dialog
        part="content"
        data-slot="dialog-content"
        @close=${() => (this.open = false)}
      >
        ${this.title ? html`<h2 data-slot="dialog-title">${this.title}</h2>` : null}${this.description ? html`<p data-slot="dialog-description">${this.description}</p>` : null}<slot
        ></slot
        ><button
          part="close"
          type="button"
          data-slot="dialog-close"
          @click=${() => (this.open = false)}
        >
          Close
        </button>
      </dialog>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-disclosure')
export class Disclosure extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  render() {
    return html`<details
      part="root"
      .open=${this.open}
      data-slot="disclosure"
      data-state=${this.open ? 'open' : 'closed'}
      @toggle=${(e: Event) => (this.open = (e.target as HTMLDetailsElement).open)}
    >
      <summary part="summary" data-slot="disclosure-summary">
        <slot name="summary"></slot>
      </summary>
      <div part="content" data-slot="disclosure-content"><slot></slot></div>
    </details>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
@customElement('simurgh-drawer')
export class Drawer extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property() title = '';
  @query('dialog') private dialog?: HTMLDialogElement;
  protected updated() {
    if (!this.dialog) return;
    if (this.open && !this.dialog.open) this.dialog.showModal();
    else if (!this.open && this.dialog.open) this.dialog.close();
  }
  render() {
    return html`<button
        type="button"
        data-slot="drawer-trigger"
        @click=${() => (this.open = true)}
      >
        <slot name="trigger"></slot>
      </button>
      <dialog
        part="content"
        data-slot="drawer-content"
        data-side="bottom"
        @close=${() => (this.open = false)}
      >
        ${this.title ? html`<h2 data-slot="drawer-title">${this.title}</h2>` : null}<slot
        ></slot
        ><button
          type="button"
          aria-label="Close"
          data-slot="drawer-close"
          @click=${() => (this.open = false)}
        >
          ×
        </button>
      </dialog>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type MenuItem = { value: string; label: string; disabled?: boolean };
@customElement('simurgh-dropdown-menu')
export class DropdownMenu extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ attribute: false }) items: MenuItem[] = [];
  @property() label = 'Menu';
  render() {
    return html`<button
        part="trigger"
        type="button"
        aria-haspopup="menu"
        aria-expanded=${this.open}
        @click=${() => (this.open = !this.open)}
      >
        ${this.label}<slot name="trigger"></slot>
      </button>
      <div part="content" role="menu" ?hidden=${!this.open}>
        ${this.items.map(
          (item) =>
            html`<button
              type="button"
              role="menuitem"
              ?disabled=${item.disabled}
              @click=${() => {
                this.dispatchEvent(
                  new CustomEvent('select', { detail: item.value }),
                );
                this.open = false;
              }}
            >
              ${item.label}
            </button>`,
        )}
      </div>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
@customElement('simurgh-empty')
export class Empty extends LitElement {
  render() {
    return html`<div part="root" data-slot="empty">
      <div part="header" data-slot="empty-header">
        <div part="media" data-slot="empty-media">
          <slot name="media"></slot>
        </div>
        <h3 part="title" data-slot="empty-title"><slot name="title"></slot></h3>
        <p part="description" data-slot="empty-description">
          <slot name="description"></slot>
        </p>
      </div>
      <div part="content" data-slot="empty-content"><slot></slot></div>
    </div>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-field')
export class Field extends LitElement {
  @property({ type: Boolean, reflect: true }) invalid = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  render() {
    return html`<fieldset
      part="field"
      ?disabled=${this.disabled}
      data-slot="field"
      ?data-invalid=${this.invalid}
    >
      <legend part="legend" data-slot="field-legend">
        <slot name="legend"></slot>
      </legend>
      <slot></slot>
      <div part="description" data-slot="field-description">
        <slot name="description"></slot>
      </div>
      <div part="error" role="alert" data-slot="field-error">
        <slot name="error"></slot>
      </div>
    </fieldset>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
@customElement('simurgh-file-upload')
export class FileUpload extends LitElement {
  @property() accept = '';
  @property({ type: Boolean }) multiple = false;
  @property({ type: Boolean }) disabled = false;
  @property() label = 'Choose file';
  @state() files: File[] = [];
  render() {
    return html`<label
      part="root"
      data-slot="file-upload"
      data-state=${this.files.length ? 'selected' : 'empty'}
      ><span>${this.label}</span
      ><input
        type="file"
        accept=${this.accept}
        ?multiple=${this.multiple}
        ?disabled=${this.disabled}
        @change=${(e: Event) => (this.files = Array.from((e.target as HTMLInputElement).files ?? []))}
      /><span aria-live="polite"
        >${this.files.map((file) => file.name).join(', ')}</span
      ></label
    >`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-form')
export class Form extends LitElement {
  @property({ type: Boolean, attribute: 'focus-invalid' }) focusInvalid = true;
  private invalid(event: Event) {
    if (this.focusInvalid)
      queueMicrotask(() => (event.target as HTMLElement).focus());
  }
  render() {
    return html`<form part="form" data-slot="form" @invalid=${this.invalid}>
        <slot></slot>
      </form>
      <div
        part="errors"
        role="alert"
        aria-live="assertive"
        tabindex="-1"
        data-slot="form-error-summary"
      >
        <slot name="errors"></slot>
      </div>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
@customElement('simurgh-hover-card')
export class HoverCard extends LitElement {
  @state() private open = false;
  render() {
    return html`<span
      part="root"
      data-slot="hover-card"
      @mouseenter=${() => (this.open = true)}
      @mouseleave=${() => (this.open = false)}
      @focusin=${() => (this.open = true)}
      @focusout=${() => (this.open = false)}
      ><span part="trigger"><slot name="trigger"></slot></span
      ><span
        part="content"
        data-state=${this.open ? 'open' : 'closed'}
        ?hidden=${!this.open}
        ><slot></slot></span
    ></span>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
@customElement('simurgh-input-group')
export class InputGroup extends LitElement {
  render() {
    return html`<div part="group" data-slot="input-group">
      <span part="addon start" data-slot="input-group-addon" data-align="start"
        ><slot name="prefix"></slot></span
      ><slot></slot
      ><span part="addon end" data-slot="input-group-addon" data-align="end"
        ><slot name="suffix"></slot
      ></span>
    </div>`;
  }
}

import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormControlElement } from '../internal/form-control.js';
@customElement('simurgh-input-otp')
export class InputOtp extends FormControlElement {
  @property() value = '';
  @property({ type: Number }) length = 6;
  @property() label = 'One-time code';
  protected updated() {
    this.updateFormValue(this.value);
  }
  formResetCallback() {
    this.value = '';
  }
  render() {
    return html`<div part="root" data-slot="input-otp">
      <input
        inputmode="numeric"
        autocomplete="one-time-code"
        maxlength=${this.length}
        .value=${this.value}
        ?disabled=${this.disabled}
        aria-label=${this.label}
        @input=${(e: Event) => (this.value = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, this.length))}
      />
      <div part="slots" aria-hidden="true">
        ${Array.from({ length: this.length }, (_, index) => html`<span part="slot" data-slot="input-otp-slot" data-state=${index === this.value.length ? 'active' : 'idle'}>${this.value[index] ?? ''}</span>`)}
      </div>
    </div>`;
  }
}

import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormControlElement } from '../internal/form-control.js';

@customElement('simurgh-input')
export class Input extends FormControlElement {
  @property() value = '';
  @property() type = 'text';
  @property() placeholder = '';
  @property({ type: Boolean }) invalid = false;
  private initialValue = '';
  connectedCallback() {
    super.connectedCallback();
    this.initialValue = this.value;
    this.updateFormValue(this.value);
  }
  formResetCallback() {
    this.value = this.initialValue;
    this.updateFormValue(this.value);
  }
  private onInput(event: Event) {
    this.value = (event.currentTarget as HTMLInputElement).value;
    this.updateFormValue(this.value);
  }
  render() {
    return html`<input
      part="control"
      data-slot="input"
      .value=${this.value}
      type=${this.type}
      placeholder=${this.placeholder}
      ?disabled=${this.disabled}
      ?required=${this.required}
      aria-invalid=${this.invalid ? 'true' : 'false'}
      @input=${this.onInput}
    />`;
  }
}

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
@customElement('simurgh-item')
export class Item extends LitElement {
  render() {
    return html`<div part="item" data-slot="item">
      <div part="media" data-slot="item-media"><slot name="media"></slot></div>
      <div part="content" data-slot="item-content">
        <div part="title" data-slot="item-title">
          <slot name="title"></slot>
        </div>
        <p part="description" data-slot="item-description">
          <slot name="description"></slot>
        </p>
        <slot></slot>
      </div>
      <div part="actions" data-slot="item-actions">
        <slot name="actions"></slot>
      </div>
    </div>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
@customElement('simurgh-kbd')
export class Kbd extends LitElement {
  render() {
    return html`<kbd part="kbd" data-slot="kbd"><slot></slot></kbd>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-label')
export class Label extends LitElement {
  @property({ attribute: 'for' }) htmlFor = '';
  render() {
    return html`<label part="label" for=${this.htmlFor}><slot></slot></label>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-link')
export class Link extends LitElement {
  @property() href = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) external = false;
  render() {
    return html`<a
      part="link"
      href=${this.disabled ? '' : this.href}
      aria-disabled=${this.disabled ? 'true' : 'false'}
      data-slot="link"
      data-external=${this.external ? 'true' : 'false'}
      rel=${this.external ? 'noopener noreferrer' : ''}
      target=${this.external ? '_blank' : ''}
      tabindex=${this.disabled ? -1 : 0}
      @click=${(event: Event) => {
      if (this.disabled) event.preventDefault();
    }}
      ><slot></slot
    ></a>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
export type MenubarMenu = {
  label: string;
  items: { value: string; label: string; disabled?: boolean }[];
};
@customElement('simurgh-menubar')
export class Menubar extends LitElement {
  @property({ attribute: false }) menus: MenubarMenu[] = [];
  @property() label = 'Menu bar';
  @state() private open = -1;
  render() {
    return html`<div
      part="menubar"
      role="menubar"
      aria-label=${this.label}
      data-slot="menubar"
    >
      ${this.menus.map(
        (menu, index) =>
          html`<div>
            <button
              type="button"
              role="menuitem"
              aria-haspopup="menu"
              aria-expanded=${this.open === index}
              @click=${() => (this.open = this.open === index ? -1 : index)}
            >
              ${menu.label}
            </button>
            <div role="menu" ?hidden=${this.open !== index}>
              ${menu.items.map(
                (item) =>
                  html`<button
                    type="button"
                    role="menuitem"
                    ?disabled=${item.disabled}
                    @click=${() => {
                      this.dispatchEvent(
                        new CustomEvent('select', { detail: item.value }),
                      );
                      this.open = -1;
                    }}
                  >
                    ${item.label}
                  </button>`,
              )}
            </div>
          </div>`,
      )}
    </div>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-meter')
export class Meter extends LitElement {
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) value = 0;
  @property() label = '';
  render() {
    const safe = Math.min(this.max, Math.max(this.min, this.value));
    return html`<meter
      part="meter"
      min=${this.min}
      max=${this.max}
      value=${safe}
      role="meter"
      aria-valuenow=${safe}
      aria-valuemin=${this.min}
      aria-valuemax=${this.max}
      aria-label=${this.label}
      data-slot="meter"
    >
      ${safe}
    </meter>`;
  }
}

import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormControlElement } from '../internal/form-control.js';
@customElement('simurgh-native-select')
export class NativeSelect extends FormControlElement {
  @property() value = '';
  @property({ type: Boolean }) invalid = false;
  private initialValue = '';
  connectedCallback() {
    super.connectedCallback();
    this.initialValue = this.value;
    this.updateFormValue(this.value);
  }
  formResetCallback() {
    this.value = this.initialValue;
    this.updateFormValue(this.value);
  }
  private onChange(event: Event) {
    this.value = (event.currentTarget as HTMLSelectElement).value;
    this.updateFormValue(this.value);
  }
  render() {
    return html`<select
      part="control"
      data-slot="native-select"
      .value=${this.value}
      ?disabled=${this.disabled}
      ?required=${this.required}
      aria-invalid=${this.invalid ? 'true' : 'false'}
      @change=${this.onChange}
    >
      <slot></slot>
    </select>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type NavigationItem = { href: string; label: string; current?: boolean };
@customElement('simurgh-navigation-menu')
export class NavigationMenu extends LitElement {
  @property({ attribute: false }) items: NavigationItem[] = [];
  @property() label = 'Main navigation';
  render() {
    return html`<nav
      part="nav"
      aria-label=${this.label}
      data-slot="navigation-menu"
    >
      <ul>
        ${this.items.map((item) => html`<li><a href=${item.href} aria-current=${item.current ? 'page' : 'false'} data-slot="navigation-menu-link">${item.label}</a></li>`)}
      </ul>
    </nav>`;
  }
}

import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormControlElement } from '../internal/form-control.js';
@customElement('simurgh-number-input')
export class NumberInput extends FormControlElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min?: number;
  @property({ type: Number }) max?: number;
  @property({ type: Number }) step = 1;
  @property() label = 'Number';
  private set(next: number) {
    this.value = Math.min(
      this.max ?? Infinity,
      Math.max(this.min ?? -Infinity, next),
    );
  }
  protected updated() {
    this.updateFormValue(String(this.value));
  }
  formResetCallback() {
    this.value = 0;
  }
  render() {
    return html`<div part="root" data-slot="number-input">
      <button
        type="button"
        aria-label=${`Decrease ${this.label}`}
        ?disabled=${this.disabled}
        @click=${() => this.set(this.value - this.step)}
      >
        −</button
      ><input
        type="number"
        .value=${String(this.value)}
        min=${this.min ?? ''}
        max=${this.max ?? ''}
        step=${this.step}
        ?disabled=${this.disabled}
        aria-label=${this.label}
        @input=${(e: Event) => this.set((e.target as HTMLInputElement).valueAsNumber)}
      /><button
        type="button"
        aria-label=${`Increase ${this.label}`}
        ?disabled=${this.disabled}
        @click=${() => this.set(this.value + this.step)}
      >
        +
      </button>
    </div>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-pagination')
export class Pagination extends LitElement {
  @property({ type: Number }) page = 1;
  @property({ type: Number }) count = 1;
  @property() label = 'Pagination';
  render() {
    return html`<nav part="nav" aria-label=${this.label} data-slot="pagination">
      <button
        type="button"
        aria-label="Previous page"
        ?disabled=${this.page <= 1}
        @click=${() => this.page--}
      >
        Previous</button
      >${Array.from({ length: this.count }, (_, index) => html`<button type="button" aria-current=${this.page === index + 1 ? 'page' : 'false'} @click=${() => (this.page = index + 1)}>${index + 1}</button>`)}<button
        type="button"
        aria-label="Next page"
        ?disabled=${this.page >= this.count}
        @click=${() => this.page++}
      >
        Next
      </button>
    </nav>`;
  }
}

import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormControlElement } from '../internal/form-control.js';
@customElement('simurgh-password-input')
export class PasswordInput extends FormControlElement {
  @property() value = '';
  @property({ type: Boolean }) visible = false;
  @property() label = 'Password';
  protected updated() {
    this.updateFormValue(this.value);
  }
  formResetCallback() {
    this.value = '';
  }
  render() {
    return html`<div part="root" data-slot="password-input">
      <input
        part="input"
        type=${this.visible ? 'text' : 'password'}
        .value=${this.value}
        ?disabled=${this.disabled}
        aria-label=${this.label}
        @input=${(e: Event) => (this.value = (e.target as HTMLInputElement).value)}
      /><button
        type="button"
        aria-label=${this.visible ? 'Hide password' : 'Show password'}
        aria-pressed=${this.visible}
        ?disabled=${this.disabled}
        @click=${() => (this.visible = !this.visible)}
      >
        ${this.visible ? 'Hide' : 'Show'}
      </button>
    </div>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-popover')
export class Popover extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property() label = 'Toggle popover';
  render() {
    return html`<button
        part="trigger"
        type="button"
        aria-label=${this.label}
        aria-expanded=${this.open}
        data-slot="popover-trigger"
        @click=${() => (this.open = !this.open)}
      >
        <slot name="trigger"></slot>
      </button>
      <div
        part="content"
        data-slot="popover-content"
        data-state=${this.open ? 'open' : 'closed'}
        ?hidden=${!this.open}
      >
        <slot></slot>
      </div>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-progress')
export class Progress extends LitElement {
  @property({ type: Number }) value: number | null = null;
  @property({ type: Number }) max = 100;
  render() {
    const safeMax = Number.isFinite(this.max) && this.max > 0 ? this.max : 100;
    const safeValue =
      this.value == null || !Number.isFinite(this.value)
        ? null
        : Math.min(safeMax, Math.max(0, this.value));
    const percentage = safeValue == null ? null : (safeValue / safeMax) * 100;
    return html`<div
      part="root"
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax=${safeMax}
      aria-valuenow=${safeValue ?? ''}
      data-state=${safeValue == null ? 'indeterminate' : 'determinate'}
      data-value=${safeValue ?? ''}
      data-max=${safeMax}
    >
      <span
        part="indicator"
        data-part="indicator"
        style=${percentage == null ? '' : `inline-size:${percentage}%`}
      ></span>
    </div>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type RadioOption = { value: string; label: string; disabled?: boolean };
@customElement('simurgh-radio-group')
export class RadioGroup extends LitElement {
  @property() value = '';
  @property({ attribute: false }) options: RadioOption[] = [];
  @property() name = '';
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) disabled = false;
  render() {
    return html`<div role="radiogroup" data-slot="radio-group">
      ${this.options.map(
        (option) =>
          html`<label
            data-slot="radio-group-item"
            data-state=${this.value === option.value ? 'checked' : 'unchecked'}
            ><input
              type="radio"
              name=${this.name}
              value=${option.value}
              .checked=${this.value === option.value}
              ?required=${this.required}
              ?disabled=${this.disabled || option.disabled}
              @change=${() => {
                this.value = option.value;
                this.dispatchEvent(new Event('change', { bubbles: true }));
              }}
            /><span>${option.label}</span></label
          >`,
      )}
    </div>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-rating')
export class Rating extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 5;
  @property() label = 'Rating';
  @property({ type: Boolean }) disabled = false;
  render() {
    return html`<div
      part="root"
      role="radiogroup"
      aria-label=${this.label}
      data-slot="rating"
    >
      ${Array.from({ length: this.max }, (_, index) => html`<button type="button" role="radio" aria-checked=${this.value === index + 1} aria-label=${`${index + 1} of ${this.max}`} ?disabled=${this.disabled} data-state=${this.value >= index + 1 ? 'on' : 'off'} @click=${() => (this.value = index + 1)}>★</button>`)}
    </div>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-resizable')
export class Resizable extends LitElement {
  @property({ type: Number }) size = 50;
  @property() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @property({ type: Number }) min = 10;
  @property({ type: Number }) max = 90;
  render() {
    return html`<div
      part="group"
      data-slot="resizable-panel-group"
      data-orientation=${this.orientation}
    >
      <div
        part="panel first"
        data-slot="resizable-panel"
        style=${`flex-basis:${this.size}%`}
      >
        <slot name="first"></slot>
      </div>
      <input
        part="handle"
        type="range"
        aria-label="Resize panels"
        .value=${String(this.size)}
        min=${this.min}
        max=${this.max}
        data-slot="resizable-handle"
        @input=${(e: Event) => (this.size = (e.target as HTMLInputElement).valueAsNumber)}
      />
      <div
        part="panel second"
        data-slot="resizable-panel"
        style=${`flex-basis:${100 - this.size}%`}
      >
        <slot name="second"></slot>
      </div>
    </div>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-scroll-area')
export class ScrollArea extends LitElement {
  @property() orientation: 'vertical' | 'horizontal' | 'both' = 'vertical';
  render() {
    return html`<div
      part="root"
      data-slot="scroll-area"
      data-orientation=${this.orientation}
      tabindex="0"
    >
      <div part="viewport" data-slot="scroll-area-viewport"><slot></slot></div>
    </div>`;
  }
}

import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormControlElement } from '../internal/form-control.js';
export type SelectItem = { value: string; label: string; disabled?: boolean };
@customElement('simurgh-select')
export class Select extends FormControlElement {
  @property() value = '';
  @property({ attribute: false }) options: SelectItem[] = [];
  @property() placeholder = 'Select an option';
  @property() label = 'Select';
  protected updated() {
    this.updateFormValue(this.value);
  }
  formResetCallback() {
    this.value = '';
  }
  render() {
    return html`<select
      part="select"
      .value=${this.value}
      ?required=${this.required}
      ?disabled=${this.disabled}
      aria-label=${this.label}
      data-slot="select"
      @change=${(e: Event) => (this.value = (e.target as HTMLSelectElement).value)}
    >
      <option value="" disabled>${this.placeholder}</option>
      ${this.options.map((option) => html`<option value=${option.value} ?disabled=${option.disabled}>${option.label}</option>`)}
    </select>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-separator')
export class Separator extends LitElement {
  @property() orientation: 'horizontal' | 'vertical' = 'horizontal';
  render() {
    return html`<div
      role="separator"
      aria-orientation=${this.orientation}
      data-slot="separator"
      data-orientation=${this.orientation}
    ></div>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
@customElement('simurgh-sheet')
export class Sheet extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property() side: 'top' | 'right' | 'bottom' | 'left' = 'right';
  @property() title = '';
  @query('dialog') private dialog?: HTMLDialogElement;
  protected updated() {
    if (!this.dialog) return;
    if (this.open && !this.dialog.open) this.dialog.showModal();
    else if (!this.open && this.dialog.open) this.dialog.close();
  }
  render() {
    return html`<button
        type="button"
        data-slot="sheet-trigger"
        @click=${() => (this.open = true)}
      >
        <slot name="trigger"></slot>
      </button>
      <dialog
        part="content"
        data-slot="sheet-content"
        data-side=${this.side}
        @close=${() => (this.open = false)}
      >
        ${this.title ? html`<h2 data-slot="sheet-title">${this.title}</h2>` : null}<slot
        ></slot
        ><button
          type="button"
          aria-label="Close"
          data-slot="sheet-close"
          @click=${() => (this.open = false)}
        >
          ×
        </button>
      </dialog>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-sidebar')
export class Sidebar extends LitElement {
  @property({ type: Boolean, reflect: true }) open = true;
  @property() label = 'Sidebar';
  @property({ attribute: 'trigger-label' }) triggerLabel = 'Toggle sidebar';
  render() {
    return html`<div
      part="provider"
      data-slot="sidebar-provider"
      data-state=${this.open ? 'expanded' : 'collapsed'}
    >
      <button
        part="trigger"
        type="button"
        aria-label=${this.triggerLabel}
        aria-expanded=${this.open}
        @click=${() => (this.open = !this.open)}
      >
        ☰
      </button>
      <aside part="sidebar" aria-label=${this.label} ?hidden=${!this.open}>
        <slot></slot>
      </aside>
    </div>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-skeleton')
export class Skeleton extends LitElement {
  @property() label = '';
  render() {
    return html`<div
      part="skeleton"
      role=${this.label ? 'status' : 'presentation'}
      aria-label=${this.label}
      aria-busy=${this.label ? 'true' : 'false'}
      aria-hidden=${this.label ? 'false' : 'true'}
      data-state="loading"
    >
      <slot></slot>
    </div>`;
  }
}

import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormControlElement } from '../internal/form-control.js';
@customElement('simurgh-slider')
export class Slider extends FormControlElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step = 1;
  protected updated() {
    this.updateFormValue(String(this.value));
  }
  formResetCallback() {
    this.value = 0;
  }
  render() {
    return html`<input
      part="input"
      type="range"
      .value=${String(this.value)}
      min=${this.min}
      max=${this.max}
      step=${this.step}
      ?disabled=${this.disabled}
      data-slot="slider"
      @input=${(e: Event) => (this.value = (e.target as HTMLInputElement).valueAsNumber)}
    />`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-spinner')
export class Spinner extends LitElement {
  @property() label = 'Loading';
  render() {
    return html`<span
      part="spinner"
      role="status"
      aria-label=${this.label}
      aria-live="polite"
      aria-busy="true"
      data-state="loading"
      ><span aria-hidden="true" data-part="indicator"
        ><slot>◌</slot></span
      ></span
    >`;
  }
}

import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormControlElement } from '../internal/form-control.js';
@customElement('simurgh-switch')
export class Switch extends FormControlElement {
  @property({ type: Boolean, reflect: true }) checked = false;
  @property() value = 'on';
  protected updated() {
    this.updateFormValue(this.checked ? this.value : null);
  }
  formResetCallback() {
    this.checked = false;
  }
  render() {
    return html`<label
      part="root"
      data-slot="switch"
      data-state=${this.checked ? 'checked' : 'unchecked'}
      ><input
        part="input"
        type="checkbox"
        role="switch"
        .checked=${this.checked}
        ?disabled=${this.disabled}
        @change=${(e: Event) => (this.checked = (e.target as HTMLInputElement).checked)} /><span
        part="thumb"
        aria-hidden="true"
        ><slot></slot></span
    ></label>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
@customElement('simurgh-table')
export class Table extends LitElement {
  render() {
    return html`<div part="container" data-slot="table-container">
      <table part="table" data-slot="table">
        <caption data-slot="table-caption">
          <slot name="caption"></slot>
        </caption>
        <thead data-slot="table-header">
          <slot name="head"></slot>
        </thead>
        <tbody data-slot="table-body">
          <slot></slot>
        </tbody>
        <tfoot data-slot="table-footer">
          <slot name="foot"></slot>
        </tfoot>
      </table>
    </div>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type TabItem = {
  value: string;
  label: string;
  disabled?: boolean;
  content?: string;
};
@customElement('simurgh-tabs')
export class Tabs extends LitElement {
  @property() value = '';
  @property({ attribute: false }) tabs: TabItem[] = [];
  @property() label = 'Tabs';
  protected willUpdate() {
    if (!this.value && this.tabs[0]) this.value = this.tabs[0].value;
  }
  render() {
    return html`<div part="root" data-slot="tabs">
      <div part="list" role="tablist" aria-label=${this.label}>
        ${this.tabs.map((tab) => html`<button type="button" role="tab" aria-selected=${this.value === tab.value} aria-controls=${`panel-${tab.value}`} id=${`tab-${tab.value}`} ?disabled=${tab.disabled} tabindex=${this.value === tab.value ? 0 : -1} @click=${() => (this.value = tab.value)}>${tab.label}</button>`)}
      </div>
      ${this.tabs.map((tab) => html`<div part="panel" role="tabpanel" id=${`panel-${tab.value}`} aria-labelledby=${`tab-${tab.value}`} ?hidden=${this.value !== tab.value}>${tab.content ?? ''}</div>`)}
    </div>`;
  }
}

import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { FormControlElement } from '../internal/form-control.js';
@customElement('simurgh-tags-input')
export class TagsInput extends FormControlElement {
  @property({ attribute: false }) value: string[] = [];
  @property() label = 'Tags';
  @state() private draft = '';
  private commit() {
    const tag = this.draft.trim();
    if (tag && !this.value.includes(tag)) this.value = [...this.value, tag];
    this.draft = '';
  }
  protected updated() {
    this.updateFormValue(this.value.join(','));
  }
  formResetCallback() {
    this.value = [];
    this.draft = '';
  }
  render() {
    return html`<div part="root" data-slot="tags-input">
      ${this.value.map((tag, index) => html`<span part="tag" data-slot="tag">${tag}<button type="button" aria-label=${`Remove ${tag}`} ?disabled=${this.disabled} @click=${() => (this.value = this.value.filter((_, i) => i !== index))}>×</button></span>`)}<input
        .value=${this.draft}
        aria-label=${this.label}
        ?disabled=${this.disabled}
        @input=${(e: Event) => (this.draft = (e.target as HTMLInputElement).value)}
        @blur=${this.commit}
        @keydown=${(e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            this.commit();
          }
        }}
      />
    </div>`;
  }
}

import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormControlElement } from '../internal/form-control.js';

@customElement('simurgh-textarea')
export class Textarea extends FormControlElement {
  @property() value = '';
  @property() placeholder = '';
  @property({ type: Boolean }) invalid = false;
  private initialValue = '';
  connectedCallback() {
    super.connectedCallback();
    this.initialValue = this.value;
    this.updateFormValue(this.value);
  }
  formResetCallback() {
    this.value = this.initialValue;
    this.updateFormValue(this.value);
  }
  private onInput(event: Event) {
    this.value = (event.currentTarget as HTMLTextAreaElement).value;
    this.updateFormValue(this.value);
  }
  render() {
    return html`<textarea
      part="control"
      .value=${this.value}
      placeholder=${this.placeholder}
      ?disabled=${this.disabled}
      ?required=${this.required}
      aria-invalid=${this.invalid ? 'true' : 'false'}
      @input=${this.onInput}
    ></textarea>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type ToastMessage = {
  id: string;
  title: string;
  description?: string;
  tone?: 'neutral' | 'success' | 'warning' | 'danger';
};
@customElement('simurgh-toast')
export class Toast extends LitElement {
  @property({ attribute: false }) messages: ToastMessage[] = [];
  @property() label = 'Notifications';
  render() {
    return html`<div
      part="viewport"
      aria-label=${this.label}
      data-slot="toast-viewport"
    >
      ${this.messages.map((message) => html`<div part="toast" role=${message.tone === 'danger' ? 'alert' : 'status'} aria-live=${message.tone === 'danger' ? 'assertive' : 'polite'} data-slot="toast" data-tone=${message.tone ?? 'neutral'}><strong>${message.title}</strong>${message.description ? html`<p>${message.description}</p>` : null}<button type="button" aria-label="Dismiss notification" @click=${() => (this.messages = this.messages.filter((item) => item.id !== message.id))}>×</button></div>`)}
    </div>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type ToggleOption = { value: string; label: string; disabled?: boolean };
@customElement('simurgh-toggle-group')
export class ToggleGroup extends LitElement {
  @property({ attribute: false }) value: string[] = [];
  @property({ attribute: false }) options: ToggleOption[] = [];
  @property({ type: Boolean }) multiple = false;
  @property({ type: Boolean }) disabled = false;
  @property() label = 'Toggle group';
  private toggle(option: ToggleOption) {
    if (this.disabled || option.disabled) return;
    this.value = this.value.includes(option.value)
      ? this.value.filter((v) => v !== option.value)
      : this.multiple
        ? [...this.value, option.value]
        : [option.value];
  }
  render() {
    return html`<div
      part="group"
      role="group"
      aria-label=${this.label}
      data-slot="toggle-group"
    >
      ${this.options.map((option) => html`<button type="button" aria-pressed=${this.value.includes(option.value)} ?disabled=${this.disabled || option.disabled} data-state=${this.value.includes(option.value) ? 'on' : 'off'} @click=${() => this.toggle(option)}>${option.label}</button>`)}
    </div>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-toggle')
export class Toggle extends LitElement {
  @property({ type: Boolean, reflect: true }) pressed = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  render() {
    return html`<button
      part="button"
      type="button"
      aria-pressed=${this.pressed}
      ?disabled=${this.disabled}
      data-slot="toggle"
      data-state=${this.pressed ? 'on' : 'off'}
      @click=${() => {
        if (!this.disabled) this.pressed = !this.pressed;
      }}
    >
      <slot></slot>
    </button>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('simurgh-toolbar')
export class Toolbar extends LitElement {
  @property() label = 'Toolbar';
  @property() orientation: 'horizontal' | 'vertical' = 'horizontal';
  render() {
    return html`<div
      part="toolbar"
      role="toolbar"
      aria-label=${this.label}
      aria-orientation=${this.orientation}
      data-slot="toolbar"
      data-orientation=${this.orientation}
    >
      <slot></slot>
    </div>`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
@customElement('simurgh-tooltip')
export class Tooltip extends LitElement {
  @property() content = '';
  @state() private open = false;
  render() {
    return html`<span
      part="root"
      data-slot="tooltip"
      @mouseenter=${() => (this.open = true)}
      @mouseleave=${() => (this.open = false)}
      @focusin=${() => (this.open = true)}
      @focusout=${() => (this.open = false)}
      ><span part="trigger" aria-describedby="tooltip-content"
        ><slot></slot></span
      ><span
        part="content"
        id="tooltip-content"
        role="tooltip"
        ?hidden=${!this.open}
        >${this.content}</span
      ></span
    >`;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export type TreeItem = {
  value: string;
  label: string;
  level?: number;
  disabled?: boolean;
};
@customElement('simurgh-tree')
export class Tree extends LitElement {
  @property() value = '';
  @property({ attribute: false }) items: TreeItem[] = [];
  @property() label = 'Tree';
  render() {
    return html`<div
      part="tree"
      role="tree"
      aria-label=${this.label}
      data-slot="tree"
    >
      ${this.items.map((item) => html`<button type="button" role="treeitem" aria-level=${(item.level ?? 0) + 1} aria-selected=${this.value === item.value} ?disabled=${item.disabled} style=${`padding-inline-start:${(item.level ?? 0) * 1.25}rem`} @click=${() => (this.value = item.value)}>${item.label}</button>`)}
    </div>`;
  }
}

import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
@customElement('simurgh-visually-hidden')
export class VisuallyHidden extends LitElement {
  static styles = css`
    :host {
      position: absolute;
      inline-size: 1px;
      block-size: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `;
  render() {
    return html`<slot></slot>`;
  }
}
