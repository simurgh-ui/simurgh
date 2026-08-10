// @vitest-environment jsdom
import '@angular/compiler';
import 'zone.js';
import 'zone.js/testing';
import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import axe from 'axe-core';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import {
  CheckboxComponent,
  AvatarComponent,
  AlertComponent,
  AspectRatioComponent,
  SkeletonComponent,
  SpinnerComponent,
  ButtonComponent,
  LinkComponent,
  InputComponent,
  SliderComponent,
  MeterComponent,
  ToolbarButtonDirective,
  ToolbarComponent,
  ToggleGroupComponent,
  ToggleGroupItemDirective,
  ScrollAreaComponent,
  TextareaComponent,
  BadgeComponent,
  BreadcrumbComponent,
  NavigationMenuComponent,
  NavigationMenuListDirective,
  NavigationMenuItemDirective,
  NavigationMenuLinkDirective,
  MenubarComponent,
  MenubarItemDirective,
  CardComponent,
  CardDescriptionComponent,
  CardTitleComponent,
  KbdComponent,
  FieldComponent,
  FieldErrorComponent,
  FieldLegendComponent,
  FormDirective,
  FormErrorSummaryComponent,
  TableBodyDirective,
  TableCaptionDirective,
  TableCellDirective,
  TableDirective,
  TableHeadDirective,
  TableHeaderDirective,
  TableRowDirective,
  PaginationComponent,
  PaginationContentDirective,
  PaginationItemDirective,
  PaginationLinkDirective,
  CollapsibleComponent,
  ComboboxComponent,
  DialogComponent,
  SheetComponent,
  AlertDialogActionDirective,
  AlertDialogCancelDirective,
  AlertDialogComponent,
  DropdownMenuComponent,
  DropdownMenuItemDirective,
  ContextMenuComponent,
  ContextMenuItemDirective,
  HoverCardComponent,
  LabelComponent,
  ProgressComponent,
  RadioGroupComponent,
  RadioGroupItemDirective,
  SelectComponent,
  SeparatorComponent,
  TabDirective,
  TabPanelDirective,
  TabsComponent,
  ToggleComponent,
  VisuallyHiddenComponent,
  type SelectOption,
} from '../src/index.js';

beforeAll(() =>
  TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(),
  ),
);

@Component({
  standalone: true,
  imports: [CheckboxComponent],
  template: `<simurgh-checkbox
    name="updates"
    value="yes"
    (checkedChange)="changed($event)"
    >Updates</simurgh-checkbox
  >`,
})
class CheckboxHost {
  changed = vi.fn();
}

@Component({
  standalone: true,
  imports: [DialogComponent],
  template: `<simurgh-dialog #dialog labelledBy="dialog-title"
    ><button trigger (click)="dialog.show()">Open</button>
    <h2 id="dialog-title">Settings</h2>
    <button>Save</button></simurgh-dialog
  >`,
})
class DialogHost {}

@Component({
  standalone: true,
  imports: [SheetComponent],
  template: `<simurgh-sheet
    #sheet
    side="left"
    labelledBy="sheet-title"
    describedBy="sheet-description"
    ><button trigger (click)="sheet.show()">Open filters</button>
    <h2 id="sheet-title">Filters</h2>
    <p id="sheet-description">Narrow the results.</p>
    <button (click)="sheet.close()">Done</button></simurgh-sheet
  >`,
})
class SheetHost {}

@Component({
  standalone: true,
  imports: [
    AlertDialogComponent,
    AlertDialogActionDirective,
    AlertDialogCancelDirective,
  ],
  template: `<simurgh-alert-dialog
    #dialog
    labelledBy="delete-title"
    describedBy="delete-description"
    ><button trigger (click)="dialog.show()">Delete project</button>
    <h2 id="delete-title">Delete project?</h2>
    <p id="delete-description">This cannot be undone.</p>
    <button simurghAlertDialogCancel>Cancel</button>
    <button simurghAlertDialogAction (action)="confirmed()">Delete</button>
  </simurgh-alert-dialog>`,
})
class AlertDialogHost {
  confirmed = vi.fn();
}

@Component({
  standalone: true,
  imports: [HoverCardComponent],
  template: `<simurgh-hover-card label="Simurgh profile">
    <button trigger>Simurgh</button>
    <p>Cross-framework components</p>
  </simurgh-hover-card>`,
})
class HoverCardHost {}

@Component({
  standalone: true,
  imports: [ContextMenuComponent, ContextMenuItemDirective],
  template: `<simurgh-context-menu>
    <span trigger>Canvas</span>
    <button simurghContextMenuItem [disabled]="true">Cut</button>
    <button simurghContextMenuItem (select)="selected()">Copy</button>
  </simurgh-context-menu>`,
})
class ContextMenuHost {
  selected = vi.fn();
}

@Component({
  standalone: true,
  imports: [CardComponent, CardTitleComponent, CardDescriptionComponent],
  template: `<simurgh-card
    ><simurgh-card-title>Release</simurgh-card-title
    ><simurgh-card-description
      >Ready to publish</simurgh-card-description
    ></simurgh-card
  >`,
})
class CardHost {}

@Component({
  standalone: true,
  imports: [KbdComponent],
  template: `<simurgh-kbd>Ctrl K</simurgh-kbd>`,
})
class KbdHost {}

@Component({
  standalone: true,
  imports: [FieldComponent, FieldLegendComponent, FieldErrorComponent],
  template: `<simurgh-field
    ><simurgh-field-legend>Notifications</simurgh-field-legend
    ><label><input type="checkbox" /> Email</label
    ><simurgh-field-error
      >Choose at least one.</simurgh-field-error
    ></simurgh-field
  >`,
})
class FieldHost {}

@Component({
  standalone: true,
  imports: [FormDirective, FormErrorSummaryComponent],
  template: `<form simurghForm (invalidControl)="invalid($event)">
    <label>Email <input name="email" required /></label>
    <simurgh-form-error-summary
      >Correct the highlighted fields.</simurgh-form-error-summary
    >
  </form>`,
})
class FormHost {
  invalid = vi.fn();
}

@Component({
  standalone: true,
  imports: [
    TableDirective,
    TableCaptionDirective,
    TableHeaderDirective,
    TableRowDirective,
    TableHeadDirective,
    TableBodyDirective,
    TableCellDirective,
  ],
  template: `<table simurghTable>
    <caption simurghTableCaption>
      Recent releases
    </caption>
    <thead simurghTableHeader>
      <tr simurghTableRow>
        <th simurghTableHead>Version</th>
      </tr>
    </thead>
    <tbody simurghTableBody>
      <tr simurghTableRow>
        <td simurghTableCell>0.1.0</td>
      </tr>
    </tbody>
  </table>`,
})
class TableHost {}

@Component({
  standalone: true,
  imports: [
    PaginationComponent,
    PaginationContentDirective,
    PaginationItemDirective,
    PaginationLinkDirective,
  ],
  template: `<simurgh-pagination
    ><ul simurghPaginationContent>
      <li simurghPaginationItem>
        <a simurghPaginationLink href="?page=1">1</a>
      </li>
      <li simurghPaginationItem>
        <a simurghPaginationLink href="?page=2" [current]="true">2</a>
      </li>
    </ul></simurgh-pagination
  >`,
})
class PaginationHost {}
@Component({
  standalone: true,
  imports: [CollapsibleComponent],
  template: `<simurgh-collapsible
    ><span trigger>Details</span>
    <p>Hidden details</p></simurgh-collapsible
  >`,
})
class CollapsibleHost {}

@Component({
  standalone: true,
  imports: [TabsComponent, TabDirective, TabPanelDirective],
  template: `<simurgh-tabs value="one"
    ><button tab simurghTab="one">One</button
    ><button tab simurghTab="two">Two</button>
    <section simurghTabPanel="one">First</section>
    <section simurghTabPanel="two">Second</section></simurgh-tabs
  >`,
})
class TabsHost {}

@Component({
  standalone: true,
  imports: [DropdownMenuComponent, DropdownMenuItemDirective],
  template: `<simurgh-dropdown-menu
    ><span trigger>Actions</span><button simurghMenuItem>First</button
    ><button simurghMenuItem (select)="selected()">
      Second
    </button></simurgh-dropdown-menu
  >`,
})
class MenuHost {
  selected = vi.fn();
}
@Component({
  standalone: true,
  imports: [RadioGroupComponent, RadioGroupItemDirective],
  template: `<simurgh-radio-group name="plan" value="basic"
    ><button simurghRadio="basic">Basic</button
    ><button simurghRadio="pro">Pro</button></simurgh-radio-group
  >`,
})
class RadioHost {}

@Component({
  standalone: true,
  imports: [ComboboxComponent],
  template: `<main>
    <form>
      <simurgh-combobox
        name="city"
        placeholder="Search cities"
        [options]="options"
      />
    </form>
  </main>`,
})
class ComboboxHost {
  options: SelectOption[] = [
    { value: 'tehran', label: 'Tehran' },
    { value: 'isfahan', label: 'Isfahan' },
    { value: 'shiraz', label: 'Shiraz', disabled: true },
  ];
}

@Component({
  standalone: true,
  imports: [LabelComponent],
  template: `<main>
    <simurgh-label for="email">Email address</simurgh-label><input id="email" />
  </main>`,
})
class LabelHost {}

@Component({
  standalone: true,
  imports: [SeparatorComponent],
  template: `<simurgh-separator orientation="vertical" />`,
})
class SeparatorHost {}

@Component({
  standalone: true,
  imports: [ProgressComponent],
  template: `<simurgh-progress aria-label="Upload" [value]="120" [max]="80" />`,
})
class ProgressHost {}

@Component({
  standalone: true,
  imports: [ToggleComponent],
  template: `<simurgh-toggle (pressedChange)="changed($event)"
    >Bold</simurgh-toggle
  >`,
})
class ToggleHost {
  changed = vi.fn();
}

@Component({
  standalone: true,
  imports: [VisuallyHiddenComponent],
  template: `<button type="button">
    <span aria-hidden="true">×</span
    ><simurgh-visually-hidden>Close dialog</simurgh-visually-hidden>
  </button>`,
})
class VisuallyHiddenHost {}

@Component({
  standalone: true,
  imports: [AvatarComponent],
  template: `<simurgh-avatar
    src="avatar.jpg"
    alt="Ada Lovelace"
    fallback="AL"
  />`,
})
class AvatarHost {}

@Component({
  standalone: true,
  imports: [AlertComponent],
  template: `<simurgh-alert [urgent]="urgent"
    >Connection state changed</simurgh-alert
  >`,
})
class AlertHost {
  urgent = false;
}

@Component({
  standalone: true,
  imports: [AspectRatioComponent],
  template: `<simurgh-aspect-ratio [ratio]="0">Media</simurgh-aspect-ratio>`,
})
class AspectRatioHost {}

@Component({
  standalone: true,
  imports: [SkeletonComponent],
  template: `<simurgh-skeleton label="Loading profile" />`,
})
class SkeletonHost {}

@Component({
  standalone: true,
  imports: [SpinnerComponent],
  template: `<simurgh-spinner label="Loading results" />`,
})
class SpinnerHost {}

@Component({
  standalone: true,
  imports: [ButtonComponent],
  template: `<simurgh-button [loading]="true">Save</simurgh-button>`,
})
class ButtonHost {}

@Component({
  standalone: true,
  imports: [LinkComponent],
  template: `<simurgh-link
    href="/docs"
    [external]="external"
    [disabled]="disabled"
    >Documentation</simurgh-link
  >`,
})
class LinkHost {
  external = true;
  disabled = false;
}

@Component({
  standalone: true,
  imports: [
    NavigationMenuComponent,
    NavigationMenuListDirective,
    NavigationMenuItemDirective,
    NavigationMenuLinkDirective,
  ],
  template: `<simurgh-navigation-menu label="Primary"
    ><ul simurghNavigationMenuList>
      <li simurghNavigationMenuItem>
        <a simurghNavigationMenuLink href="/" [current]="true">Home</a>
      </li>
      <li simurghNavigationMenuItem>
        <a simurghNavigationMenuLink href="/docs">Docs</a>
      </li>
    </ul></simurgh-navigation-menu
  >`,
})
class NavigationMenuHost {}

@Component({
  standalone: true,
  imports: [MenubarComponent, MenubarItemDirective],
  template: `<simurgh-menubar label="Editor" direction="rtl">
    <button simurghMenubarItem>File</button>
    <button simurghMenubarItem [disabled]="true">Edit</button>
    <button simurghMenubarItem>View</button>
  </simurgh-menubar>`,
})
class MenubarHost {}

@Component({
  standalone: true,
  imports: [InputComponent],
  template: `<form>
    <simurgh-input
      name="email"
      value="ada@example.com"
      [required]="true"
      [invalid]="true"
    />
  </form>`,
})
class InputHost {}

@Component({
  standalone: true,
  imports: [SliderComponent],
  template: `<form>
    <simurgh-slider
      name="volume"
      label="Volume"
      [value]="40"
      [max]="80"
      [step]="10"
    />
  </form>`,
})
class SliderHost {}
@Component({
  standalone: true,
  imports: [MeterComponent],
  template: `<simurgh-meter
    label="Storage used"
    [value]="120"
    [max]="100"
    [low]="40"
    [high]="80"
    [optimum]="20"
  />`,
})
class MeterHost {}
@Component({
  standalone: true,
  imports: [ToolbarComponent, ToolbarButtonDirective],
  template: `<simurgh-toolbar label="Editor"
    ><button simurghToolbarButton>Bold</button
    ><button simurghToolbarButton disabled>Italic</button
    ><button simurghToolbarButton>Link</button></simurgh-toolbar
  >`,
})
class ToolbarHost {}
@Component({
  standalone: true,
  imports: [ToggleGroupComponent, ToggleGroupItemDirective],
  template: `<simurgh-toggle-group aria-label="Alignment"
    ><button simurghToggleGroupItem="start">Start</button
    ><button simurghToggleGroupItem="center">
      Center
    </button></simurgh-toggle-group
  >`,
})
class ToggleGroupHost {}
@Component({
  standalone: true,
  imports: [ScrollAreaComponent],
  template: `<simurgh-scroll-area label="Activity" orientation="both"
    >Updates</simurgh-scroll-area
  >`,
})
class ScrollAreaHost {}

@Component({
  standalone: true,
  imports: [TextareaComponent],
  template: `<form>
    <simurgh-textarea name="bio" value="Poet" [required]="true" />
  </form>`,
})
class TextareaHost {}

@Component({
  standalone: true,
  imports: [BadgeComponent],
  template: `<simurgh-badge tone="success" [status]="true"
    >Published</simurgh-badge
  >`,
})
class BadgeHost {}

@Component({
  standalone: true,
  imports: [BreadcrumbComponent],
  template: `<simurgh-breadcrumb
    ><ol>
      <li><a href="/docs">Docs</a></li>
      <li><span aria-current="page">Button</span></li>
    </ol></simurgh-breadcrumb
  >`,
})
class BreadcrumbHost {}

describe('Angular accessibility contract', () => {
  it('focuses the safe action in a destructive alert dialog', async () => {
    const fixture = TestBed.createComponent(AlertDialogHost);
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector(
      '[trigger]',
    ) as HTMLButtonElement;
    trigger.focus();
    trigger.click();
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve));
    expect(
      fixture.nativeElement.querySelector('[role=alertdialog]'),
    ).toBeTruthy();
    expect(document.activeElement).toBe(
      fixture.nativeElement.querySelector('[simurghAlertDialogCancel]'),
    );
    (
      fixture.nativeElement.querySelector(
        '[simurghAlertDialogAction]',
      ) as HTMLButtonElement
    ).click();
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve));
    expect(fixture.componentInstance.confirmed).toHaveBeenCalledOnce();
    expect(
      fixture.nativeElement.querySelector('[role=alertdialog]'),
    ).toBeNull();
    expect(document.activeElement).toBe(trigger);
    fixture.destroy();
  });

  it('opens a side-anchored sheet and restores trigger focus', async () => {
    const fixture = TestBed.createComponent(SheetHost);
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector(
      '[trigger]',
    ) as HTMLButtonElement;
    trigger.focus();
    trigger.click();
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve));
    const sheet = fixture.nativeElement.querySelector(
      '[role=dialog]',
    ) as HTMLElement;
    expect(sheet.getAttribute('data-side')).toBe('left');
    expect(sheet.getAttribute('aria-labelledby')).toBe('sheet-title');
    expect(document.activeElement).toBe(sheet);
    (
      fixture.nativeElement.querySelectorAll('button')[1] as HTMLButtonElement
    ).click();
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve));
    expect(fixture.nativeElement.querySelector('[role=dialog]')).toBeNull();
    expect(document.activeElement).toBe(trigger);
    fixture.destroy();
  });

  it('toggles a checkbox, emits, and passes an axe audit', async () => {
    const fixture = TestBed.createComponent(CheckboxHost);
    fixture.detectChanges();
    const checkbox = fixture.nativeElement.querySelector(
      '[role=checkbox]',
    ) as HTMLButtonElement;
    checkbox.click();
    fixture.detectChanges();
    expect(checkbox.getAttribute('aria-checked')).toBe('true');
    expect(fixture.componentInstance.changed).toHaveBeenCalledWith(true);
    expect((await axe.run(fixture.nativeElement)).violations).toEqual([]);
    fixture.destroy();
  });

  it('opens a labelled hover card with pointer and keyboard focus', () => {
    const fixture = TestBed.createComponent(HoverCardHost);
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector(
      '[data-slot=hover-card-trigger]',
    ) as HTMLElement;
    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector(
      '[role=dialog]',
    ) as HTMLElement;
    expect(card.getAttribute('aria-label')).toBe('Simurgh profile');
    trigger.dispatchEvent(new MouseEvent('mouseleave'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role=dialog]')).toBeNull();
    trigger.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role=dialog]')).toBeTruthy();
    fixture.destroy();
  });

  it('opens a context menu at the pointer and supports keyboard selection', async () => {
    const fixture = TestBed.createComponent(ContextMenuHost);
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector(
      '[data-slot=context-menu-trigger]',
    ) as HTMLElement;
    trigger.dispatchEvent(
      new MouseEvent('contextmenu', {
        clientX: 24,
        clientY: 36,
        bubbles: true,
      }),
    );
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve));
    const menu = fixture.nativeElement.querySelector(
      '[role=menu]',
    ) as HTMLElement;
    const items = menu.querySelectorAll(
      '[role=menuitem]',
    ) as NodeListOf<HTMLButtonElement>;
    expect(document.activeElement).toBe(items[1]);
    menu.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }),
    );
    fixture.detectChanges();
    expect(fixture.componentInstance.selected).toHaveBeenCalledOnce();
    expect(fixture.nativeElement.querySelector('[role=menu]')).toBeNull();
    fixture.destroy();
  });

  it('selects enabled listbox options', async () => {
    const options: SelectOption[] = [
      { value: 'tehran', label: 'Tehran' },
      { value: 'isfahan', label: 'Isfahan' },
    ];
    const fixture = TestBed.createComponent(SelectComponent);
    fixture.componentInstance.options = options;
    fixture.componentInstance.placeholder = 'Choose city';
    fixture.detectChanges();
    const combobox = fixture.nativeElement.querySelector(
      '[role=combobox]',
    ) as HTMLButtonElement;
    combobox.click();
    fixture.detectChanges();
    const optionsDom = fixture.nativeElement.querySelectorAll(
      '[role=option]',
    ) as NodeListOf<HTMLButtonElement>;
    optionsDom[1]!.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe('isfahan');
    fixture.destroy();
  });

  it('navigates menu items and selects with the keyboard', async () => {
    const fixture = TestBed.createComponent(MenuHost);
    fixture.detectChanges();
    (
      fixture.nativeElement.querySelector(
        '[aria-haspopup=menu]',
      ) as HTMLButtonElement
    ).click();
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve));
    const menu = fixture.nativeElement.querySelector(
      '[role=menu]',
    ) as HTMLElement;
    const items = menu.querySelectorAll(
      '[role=menuitem]',
    ) as NodeListOf<HTMLButtonElement>;
    expect(document.activeElement).toBe(items[0]);
    menu.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }),
    );
    expect(document.activeElement).toBe(items[1]);
    menu.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }),
    );
    expect(fixture.componentInstance.selected).toHaveBeenCalledOnce();
    fixture.destroy();
  });

  it('selects and serializes listbox options from the keyboard', async () => {
    const fixture = TestBed.createComponent(SelectComponent);
    fixture.componentInstance.name = 'city';
    fixture.componentInstance.options = [
      { value: 'tehran', label: 'Tehran' },
      { value: 'isfahan', label: 'Isfahan' },
    ];
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector(
      '[role=combobox]',
    ) as HTMLButtonElement;
    trigger.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }),
    );
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve));
    const list = fixture.nativeElement.querySelector(
      '[role=listbox]',
    ) as HTMLElement;
    list.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }),
    );
    list.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }),
    );
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe('isfahan');
    const hidden = fixture.nativeElement.querySelector(
      'input[type=hidden]',
    ) as HTMLInputElement;
    expect(hidden.value).toBe('isfahan');
    fixture.destroy();
  });

  it('contains dialog focus and restores it to the trigger', async () => {
    const fixture = TestBed.createComponent(DialogHost);
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector(
      '[trigger]',
    ) as HTMLButtonElement;
    trigger.focus();
    trigger.click();
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve));
    const dialog = fixture.nativeElement.querySelector(
      '[role=dialog]',
    ) as HTMLElement;
    expect(document.activeElement).toBe(dialog);
    dialog.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
    );
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve));
    expect(document.activeElement).toBe(trigger);
    fixture.destroy();
  });

  it('binds active tab and panel state', () => {
    const fixture = TestBed.createComponent(TabsHost);
    fixture.detectChanges();
    const tabs = fixture.nativeElement.querySelectorAll(
      '[role=tab]',
    ) as NodeListOf<HTMLButtonElement>;
    expect(tabs[0]!.getAttribute('aria-selected')).toBe('true');
    expect(tabs[1]!.tabIndex).toBe(-1);
    tabs[1]!.click();
    fixture.detectChanges();
    expect(tabs[1]!.getAttribute('aria-selected')).toBe('true');
    const panels = fixture.nativeElement.querySelectorAll(
      '[role=tabpanel]',
    ) as NodeListOf<HTMLElement>;
    expect(panels[0]!.hidden).toBe(true);
    expect(panels[1]!.hidden).toBe(false);
    fixture.destroy();
  });
  it('navigates and serializes a radio group', () => {
    const fixture = TestBed.createComponent(RadioHost);
    fixture.detectChanges();
    const radios = fixture.nativeElement.querySelectorAll(
      '[role=radio]',
    ) as NodeListOf<HTMLButtonElement>;
    radios[0]!.focus();
    radios[0]!.parentElement!.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
    );
    fixture.detectChanges();
    expect(radios[1]!.getAttribute('aria-checked')).toBe('true');
    expect(
      (
        fixture.nativeElement.querySelector(
          'input[type=hidden]',
        ) as HTMLInputElement
      ).value,
    ).toBe('pro');
    fixture.destroy();
  });
  it('filters and commits a combobox option without moving input focus', async () => {
    const fixture = TestBed.createComponent(ComboboxHost);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector(
      '[role=combobox]',
    ) as HTMLInputElement;
    input.focus();
    input.value = 'isf';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    const option = fixture.nativeElement.querySelector(
      '[role=option]',
    ) as HTMLElement;
    expect(option.textContent?.trim()).toBe('Isfahan');
    input.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }),
    );
    fixture.detectChanges();
    expect(input.getAttribute('aria-activedescendant')).toBe(option.id);
    expect(document.activeElement).toBe(input);
    input.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }),
    );
    fixture.detectChanges();
    expect(input.value).toBe('Isfahan');
    expect(
      new FormData(fixture.nativeElement.querySelector('form')).get('city'),
    ).toBe('isfahan');
    expect((await axe.run(fixture.nativeElement)).violations).toEqual([]);
    fixture.destroy();
  });
  it('associates a native label with its form control', async () => {
    const fixture = TestBed.createComponent(LabelHost);
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector(
      'label',
    ) as HTMLLabelElement;
    expect(label.htmlFor).toBe('email');
    expect((await axe.run(fixture.nativeElement)).violations).toEqual([]);
    fixture.destroy();
  });
  it('exposes semantic separator orientation', () => {
    const fixture = TestBed.createComponent(SeparatorHost);
    fixture.detectChanges();
    const separator = fixture.nativeElement.querySelector(
      '[role=separator]',
    ) as HTMLElement;
    expect(separator.getAttribute('aria-orientation')).toBe('vertical');
    expect(separator.dataset['orientation']).toBe('vertical');
    fixture.destroy();
  });
  it('clamps determinate progress to its maximum', () => {
    const fixture = TestBed.createComponent(ProgressHost);
    fixture.detectChanges();
    const progress = fixture.nativeElement.querySelector(
      '[role=progressbar]',
    ) as HTMLElement;
    expect(progress.getAttribute('aria-valuenow')).toBe('80');
    expect(progress.getAttribute('aria-valuemax')).toBe('80');
    expect(
      (progress.querySelector('[data-part=indicator]') as HTMLElement).style
        .inlineSize,
    ).toBe('100%');
    fixture.destroy();
  });
  it('toggles native pressed state and emits changes', () => {
    const fixture = TestBed.createComponent(ToggleHost);
    fixture.detectChanges();
    const toggle = fixture.nativeElement.querySelector(
      'button',
    ) as HTMLButtonElement;
    toggle.click();
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-pressed')).toBe('true');
    expect(fixture.componentInstance.changed).toHaveBeenCalledWith(true);
    fixture.destroy();
  });
  it('keeps visually hidden text in an accessible name', () => {
    const fixture = TestBed.createComponent(VisuallyHiddenHost);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector(
      'button',
    ) as HTMLButtonElement;
    expect(button.textContent?.trim()).toContain('Close dialog');
    expect((button.lastElementChild as HTMLElement).style.position).toBe(
      'absolute',
    );
    fixture.destroy();
  });
  it('shows avatar fallback until its image loads', () => {
    const fixture = TestBed.createComponent(AvatarHost);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent.trim()).toBe('AL');
    const image = fixture.nativeElement.querySelector(
      'img',
    ) as HTMLImageElement;
    image.dispatchEvent(new Event('load'));
    fixture.detectChanges();
    expect(image.hidden).toBe(false);
    expect(fixture.nativeElement.textContent.trim()).toBe('');
    fixture.destroy();
  });
  it('switches between polite and urgent alert semantics', () => {
    const fixture = TestBed.createComponent(AlertHost);
    fixture.detectChanges();
    const alert = fixture.nativeElement.querySelector(
      'simurgh-alert',
    ) as HTMLElement;
    expect(alert.getAttribute('role')).toBe('status');
    fixture.componentInstance.urgent = true;
    fixture.detectChanges();
    expect(alert.getAttribute('role')).toBe('alert');
    expect(alert.getAttribute('aria-live')).toBe('assertive');
    fixture.destroy();
  });
  it('falls back to a safe aspect ratio', () => {
    const fixture = TestBed.createComponent(AspectRatioHost);
    fixture.detectChanges();
    const ratio = fixture.nativeElement.querySelector(
      'simurgh-aspect-ratio',
    ) as HTMLElement;
    expect(ratio.dataset['ratio']).toBe('1');
    expect(ratio.style.aspectRatio).toBe('1');
    fixture.destroy();
  });
  it('exposes a named busy status for meaningful skeletons', () => {
    const fixture = TestBed.createComponent(SkeletonHost);
    fixture.detectChanges();
    const skeleton = fixture.nativeElement.querySelector(
      '[role=status]',
    ) as HTMLElement;
    expect(skeleton.getAttribute('aria-label')).toBe('Loading profile');
    expect(skeleton.getAttribute('aria-busy')).toBe('true');
    fixture.destroy();
  });
  it('provides a named busy status for spinners', () => {
    const fixture = TestBed.createComponent(SpinnerHost);
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector(
      '[role=status]',
    ) as HTMLElement;
    expect(spinner.getAttribute('aria-label')).toBe('Loading results');
    expect(spinner.getAttribute('aria-busy')).toBe('true');
    fixture.destroy();
  });
  it('defaults buttons safely and disables them while loading', () => {
    const fixture = TestBed.createComponent(ButtonHost);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector(
      'button',
    ) as HTMLButtonElement;
    expect(button.type).toBe('button');
    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-busy')).toBe('true');
    fixture.destroy();
  });
  it('preserves native link semantics and safely disables navigation', () => {
    const fixture = TestBed.createComponent(LinkHost);
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe('/docs');
    expect(link.target).toBe('_blank');
    expect(link.rel).toBe('noopener noreferrer');
    fixture.componentInstance.disabled = true;
    fixture.detectChanges();
    expect(link.getAttribute('href')).toBeNull();
    expect(link.getAttribute('aria-disabled')).toBe('true');
    expect(link.tabIndex).toBe(-1);
    fixture.destroy();
  });
  it('provides a named navigation landmark with current-page semantics', () => {
    const fixture = TestBed.createComponent(NavigationMenuHost);
    fixture.detectChanges();
    const navigation = fixture.nativeElement.querySelector(
      'nav',
    ) as HTMLElement;
    const links = fixture.nativeElement.querySelectorAll(
      'a',
    ) as NodeListOf<HTMLAnchorElement>;
    expect(navigation.getAttribute('aria-label')).toBe('Primary');
    expect(links).toHaveLength(2);
    expect(links[0]?.getAttribute('aria-current')).toBe('page');
    expect(links[1]?.tabIndex).toBe(0);
    fixture.destroy();
  });
  it('provides RTL-aware roving focus in a named menubar', () => {
    const fixture = TestBed.createComponent(MenubarHost);
    fixture.detectChanges();
    const items = fixture.nativeElement.querySelectorAll(
      '[role=menuitem]',
    ) as NodeListOf<HTMLButtonElement>;
    items[0]!.focus();
    items[0]!.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }),
    );
    expect(document.activeElement).toBe(items[2]);
    expect(
      fixture.nativeElement
        .querySelector('[role=menubar]')
        .getAttribute('aria-label'),
    ).toBe('Editor');
    fixture.destroy();
  });
  it('preserves native input form and invalid semantics', () => {
    const fixture = TestBed.createComponent(InputHost);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector(
      'input',
    ) as HTMLInputElement;
    expect(input.required).toBe(true);
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(new FormData(input.form!).get('email')).toBe('ada@example.com');
    fixture.destroy();
  });
  it('uses native slider constraints and form serialization', () => {
    const fixture = TestBed.createComponent(SliderHost);
    fixture.detectChanges();
    const slider = fixture.nativeElement.querySelector(
      'input',
    ) as HTMLInputElement;
    expect(slider.value).toBe('40');
    expect(slider.max).toBe('80');
    expect(new FormData(slider.form!).get('volume')).toBe('40');
    fixture.destroy();
  });
  it('clamps a named native meter and preserves thresholds', () => {
    const fixture = TestBed.createComponent(MeterHost);
    fixture.detectChanges();
    const meter = fixture.nativeElement.querySelector(
      'meter',
    ) as HTMLMeterElement;
    expect(meter.value).toBe(100);
    expect(meter.high).toBe(80);
    expect(meter.optimum).toBe(20);
    fixture.destroy();
  });
  it('moves toolbar focus logically and skips disabled items', () => {
    const fixture = TestBed.createComponent(ToolbarHost);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll(
      'button',
    ) as NodeListOf<HTMLButtonElement>;
    buttons[0]!.focus();
    buttons[0]!.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
    );
    expect(document.activeElement).toBe(buttons[2]);
    expect(
      fixture.nativeElement
        .querySelector('[role=toolbar]')
        .getAttribute('aria-label'),
    ).toBe('Editor');
    fixture.destroy();
  });
  it('selects one toggle-group item and moves focus', () => {
    const fixture = TestBed.createComponent(ToggleGroupHost);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll(
      'button',
    ) as NodeListOf<HTMLButtonElement>;
    buttons[0]!.click();
    fixture.detectChanges();
    expect(buttons[0]!.getAttribute('aria-pressed')).toBe('true');
    buttons[0]!.focus();
    buttons[0]!.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
    );
    expect(document.activeElement).toBe(buttons[1]);
    fixture.destroy();
  });
  it('creates a focusable named native scroll region', () => {
    const fixture = TestBed.createComponent(ScrollAreaHost);
    fixture.detectChanges();
    const area = fixture.nativeElement.querySelector(
      '[role=region]',
    ) as HTMLElement;
    expect(area.getAttribute('aria-label')).toBe('Activity');
    expect(area.tabIndex).toBe(0);
    expect(area.dataset['orientation']).toBe('both');
    fixture.destroy();
  });
  it('serializes native textarea values', () => {
    const fixture = TestBed.createComponent(TextareaHost);
    fixture.detectChanges();
    const textarea = fixture.nativeElement.querySelector(
      'textarea',
    ) as HTMLTextAreaElement;
    expect(new FormData(textarea.form!).get('bio')).toBe('Poet');
    fixture.destroy();
  });
  it('exposes badge tone and optional polite status', () => {
    const fixture = TestBed.createComponent(BadgeHost);
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector(
      'simurgh-badge',
    ) as HTMLElement;
    expect(badge.dataset['tone']).toBe('success');
    expect(badge.getAttribute('role')).toBe('status');
    expect(badge.getAttribute('aria-live')).toBe('polite');
    fixture.destroy();
  });
  it('provides a named breadcrumb landmark with a current page', () => {
    const fixture = TestBed.createComponent(BreadcrumbHost);
    fixture.detectChanges();
    const nav = fixture.nativeElement.querySelector('nav') as HTMLElement;
    expect(nav.getAttribute('aria-label')).toBe('Breadcrumb');
    expect(nav.querySelector('[aria-current=page]')?.textContent).toBe(
      'Button',
    );
    fixture.destroy();
  });
  it('composes card anatomy with native heading semantics', () => {
    const fixture = TestBed.createComponent(CardHost);
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('h3') as HTMLElement;
    const description = fixture.nativeElement.querySelector(
      '[data-slot=card-description]',
    ) as HTMLElement;
    expect(title.textContent).toBe('Release');
    expect(description.textContent).toBe('Ready to publish');
    fixture.destroy();
  });
  it('renders keyboard input with native semantics', () => {
    const fixture = TestBed.createComponent(KbdHost);
    fixture.detectChanges();
    const kbd = fixture.nativeElement.querySelector('kbd') as HTMLElement;
    expect(kbd.textContent).toBe('Ctrl K');
    fixture.destroy();
  });
  it('groups controls with native field semantics', () => {
    const fixture = TestBed.createComponent(FieldHost);
    fixture.detectChanges();
    const fieldset = fixture.nativeElement.querySelector(
      'fieldset',
    ) as HTMLFieldSetElement;
    expect(fieldset.querySelector('legend')?.textContent).toBe('Notifications');
    expect(fieldset.querySelector('[role=alert]')?.textContent).toBe(
      'Choose at least one.',
    );
    fixture.destroy();
  });
  it('focuses the first invalid form control and announces summary errors', async () => {
    const fixture = TestBed.createComponent(FormHost);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector(
      'input',
    ) as HTMLInputElement;
    input.dispatchEvent(new Event('invalid'));
    await Promise.resolve();
    expect(fixture.componentInstance.invalid).toHaveBeenCalledWith(input);
    expect(document.activeElement).toBe(input);
    expect(
      fixture.nativeElement.querySelector('[role=alert]').textContent,
    ).toContain('Correct');
    fixture.destroy();
  });
  it('renders a captioned native table', () => {
    const fixture = TestBed.createComponent(TableHost);
    fixture.detectChanges();
    const table = fixture.nativeElement.querySelector(
      'table',
    ) as HTMLTableElement;
    expect(table.caption?.textContent?.trim()).toBe('Recent releases');
    expect(table.querySelector('th')?.getAttribute('scope')).toBe('col');
    fixture.destroy();
  });
  it('names pagination and identifies the current page', () => {
    const fixture = TestBed.createComponent(PaginationHost);
    fixture.detectChanges();
    const nav = fixture.nativeElement.querySelector('nav') as HTMLElement;
    expect(nav.getAttribute('aria-label')).toBe('Pagination');
    expect(nav.querySelector('[aria-current=page]')?.textContent?.trim()).toBe(
      '2',
    );
    fixture.destroy();
  });
  it('toggles collapsible content with linked semantics', () => {
    const fixture = TestBed.createComponent(CollapsibleHost);
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector(
      'button',
    ) as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(
      (fixture.nativeElement.querySelector('[data-state]') as HTMLElement)
        .hidden,
    ).toBe(false);
    fixture.destroy();
  });
});
