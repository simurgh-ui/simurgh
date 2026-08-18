import { Component } from '@angular/core';
import {
  ComboboxComponent,
  ContextMenuComponent,
  DatePickerComponent,
  DropdownMenuComponent,
  HoverCardComponent,
  PopoverComponent,
  SelectComponent,
  TooltipComponent,
} from '../src/index.js';

@Component({
  selector: 'simurgh-overlay-ssr-host',
  standalone: true,
  imports: [
    PopoverComponent,
    TooltipComponent,
    HoverCardComponent,
    DropdownMenuComponent,
    ContextMenuComponent,
    SelectComponent,
    ComboboxComponent,
    DatePickerComponent,
  ],
  template: `<main>
    <simurgh-popover contentLabel="Popover"
      ><span trigger>Open</span></simurgh-popover
    >
    <simurgh-tooltip><span trigger>Help</span></simurgh-tooltip>
    <simurgh-hover-card label="Profile"
      ><span trigger>Profile</span></simurgh-hover-card
    >
    <simurgh-dropdown-menu><span trigger>Actions</span></simurgh-dropdown-menu>
    <simurgh-context-menu><span trigger>Canvas</span></simurgh-context-menu>
    <simurgh-select [options]="options" />
    <simurgh-combobox [options]="options" />
    <simurgh-date-picker />
  </main>`,
})
export class OverlaySsrHostComponent {
  options = [{ value: 'one', label: 'One' }];
}
