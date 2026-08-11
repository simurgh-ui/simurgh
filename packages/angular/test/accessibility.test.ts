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
  ButtonGroupComponent,
  ButtonGroupSeparatorComponent,
  ButtonGroupTextComponent,
  LinkComponent,
  InputComponent,
  InputGroupAddonComponent,
  InputGroupComponent,
  InputGroupTextComponent,
  InputOtpComponent,
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
  EmptyComponent,
  EmptyContentComponent,
  EmptyDescriptionComponent,
  EmptyHeaderComponent,
  EmptyMediaComponent,
  EmptyTitleComponent,
  ItemActionsComponent,
  ItemComponent,
  ItemContentComponent,
  ItemDescriptionComponent,
  ItemGroupComponent,
  ItemMediaComponent,
  ItemTitleComponent,
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
  CommandComponent,
  CalendarComponent,
  DatePickerComponent,
  CarouselComponent,
  CarouselContentComponent,
  CarouselItemComponent,
  CarouselPreviousComponent,
  CarouselNextComponent,
  ResizablePanelGroupComponent,
  ResizablePanelComponent,
  ResizableHandleComponent,
  DialogComponent,
  SheetComponent,
  DrawerComponent,
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
  NativeSelectComponent,
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
  imports: [DrawerComponent],
  template: `<simurgh-drawer
    #drawer
    labelledBy="drawer-title"
    describedBy="drawer-description"
    ><button trigger (click)="drawer.show()">Edit profile</button>
    <h2 id="drawer-title">Edit profile</h2>
    <p id="drawer-description">Update your details.</p>
    <button (click)="drawer.close()">Done</button></simurgh-drawer
  >`,
})
class DrawerHost {}

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
  imports: [
    ButtonComponent,
    EmptyComponent,
    EmptyContentComponent,
    EmptyDescriptionComponent,
    EmptyHeaderComponent,
    EmptyMediaComponent,
    EmptyTitleComponent,
  ],
  template: `<simurgh-empty [status]="status">
    <simurgh-empty-media>+</simurgh-empty-media>
    <simurgh-empty-header>
      <simurgh-empty-title>No projects yet</simurgh-empty-title>
      <simurgh-empty-description
        >Create a project to begin.</simurgh-empty-description
      >
    </simurgh-empty-header>
    <simurgh-empty-content
      ><simurgh-button>Create project</simurgh-button></simurgh-empty-content
    >
  </simurgh-empty>`,
})
class EmptyHost {
  status = false;
}

@Component({
  standalone: true,
  imports: [
    ButtonComponent,
    ItemActionsComponent,
    ItemComponent,
    ItemContentComponent,
    ItemDescriptionComponent,
    ItemGroupComponent,
    ItemMediaComponent,
    ItemTitleComponent,
  ],
  template: `<simurgh-item-group aria-label="Projects">
    <simurgh-item>
      <simurgh-item-media>D</simurgh-item-media>
      <simurgh-item-content>
        <simurgh-item-title>Design system</simurgh-item-title>
        <simurgh-item-description>Updated recently</simurgh-item-description>
      </simurgh-item-content>
      <simurgh-item-actions
        ><simurgh-button>Open</simurgh-button></simurgh-item-actions
      >
    </simurgh-item>
  </simurgh-item-group>`,
})
class ItemHost {}

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
  imports: [CommandComponent],
  template: `<simurgh-command
    placeholder="Search commands"
    [options]="options"
    (valueChange)="selected($event)"
  />`,
})
class CommandHost {
  options: SelectOption[] = [
    { value: 'locked', label: 'Locked action', disabled: true },
    { value: 'settings', label: 'Open settings' },
  ];
  selected = vi.fn();
}

@Component({
  standalone: true,
  imports: [CalendarComponent],
  template: `<form>
    <simurgh-calendar
      [value]="date"
      month="2026-08"
      name="appointment"
      label="Appointment calendar"
      [disabledDates]="disabledDates"
      (valueChange)="select($event)"
    />
  </form>`,
})
class CalendarHost {
  date = '2026-08-12';
  disabledDates = ['2026-08-14'];
  selected = vi.fn();
  select(value: string) {
    this.date = value;
    this.selected(value);
  }
}

@Component({
  standalone: true,
  imports: [DatePickerComponent],
  template: `<form>
    <simurgh-date-picker
      [value]="date"
      month="2026-08"
      name="appointment"
      label="Appointment date"
      (valueChange)="select($event)"
    />
  </form>`,
})
class DatePickerHost {
  date = '2026-08-12';
  selected = vi.fn();
  select(value: string) {
    this.date = value;
    this.selected(value);
  }
}

@Component({
  standalone: true,
  imports: [
    CarouselComponent,
    CarouselContentComponent,
    CarouselItemComponent,
    CarouselPreviousComponent,
    CarouselNextComponent,
  ],
  template: `<simurgh-carousel
    label="Featured projects"
    (indexChange)="changed($event)"
  >
    <simurgh-carousel-content>
      <simurgh-carousel-item>Design system</simurgh-carousel-item>
      <simurgh-carousel-item>Documentation</simurgh-carousel-item>
    </simurgh-carousel-content>
    <simurgh-carousel-previous>‹</simurgh-carousel-previous>
    <simurgh-carousel-next>›</simurgh-carousel-next>
  </simurgh-carousel>`,
})
class CarouselHost {
  changed = vi.fn();
}

@Component({
  standalone: true,
  imports: [
    ResizablePanelGroupComponent,
    ResizablePanelComponent,
    ResizableHandleComponent,
  ],
  template: `<simurgh-resizable-panel-group aria-label="Workspace panels">
    <simurgh-resizable-panel [defaultSize]="35" [minSize]="20" [maxSize]="80"
      >Navigation</simurgh-resizable-panel
    >
    <simurgh-resizable-handle aria-label="Resize panels" />
    <simurgh-resizable-panel [defaultSize]="65" [minSize]="30"
      >Content</simurgh-resizable-panel
    >
  </simurgh-resizable-panel-group>`,
})
class ResizableHost {}

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
  imports: [
    ButtonComponent,
    ButtonGroupComponent,
    ButtonGroupSeparatorComponent,
    ButtonGroupTextComponent,
  ],
  template: `<simurgh-button-group aria-label="Text alignment"
    ><simurgh-button-group-text>Align</simurgh-button-group-text
    ><simurgh-button>Left</simurgh-button
    ><simurgh-button-group-separator /><simurgh-button
      >Right</simurgh-button
    ></simurgh-button-group
  >`,
})
class ButtonGroupHost {}

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
  imports: [
    InputComponent,
    InputGroupAddonComponent,
    InputGroupComponent,
    InputGroupTextComponent,
  ],
  template: `<form>
    <label id="website-label" for="website">Website</label>
    <simurgh-input-group aria-labelledby="website-label">
      <simurgh-input-group-addon [decorative]="true">
        <simurgh-input-group-text>https://</simurgh-input-group-text>
      </simurgh-input-group-addon>
      <simurgh-input id="website" name="website" value="example.com" />
    </simurgh-input-group>
  </form>`,
})
class InputGroupHost {}

@Component({
  standalone: true,
  imports: [InputOtpComponent],
  template: `<form>
    <label for="code">Verification code</label>
    <simurgh-input-otp
      id="code"
      name="code"
      [length]="4"
      [required]="true"
      (valueChange)="changed($event)"
    />
  </form>`,
})
class InputOtpHost {
  changed = vi.fn();
}

@Component({
  standalone: true,
  imports: [NativeSelectComponent],
  template: `<form>
    <label for="timezone">Timezone</label>
    <simurgh-native-select
      id="timezone"
      name="timezone"
      value="utc"
      [invalid]="true"
      (valueChange)="changed($event)"
      ><option value="utc">UTC</option>
      <option value="tehran">Tehran</option></simurgh-native-select
    >
  </form>`,
})
class NativeSelectHost {
  changed = vi.fn();
}

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

  it('opens a bottom drawer and restores trigger focus', async () => {
    const fixture = TestBed.createComponent(DrawerHost);
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector(
      '[trigger]',
    ) as HTMLButtonElement;
    trigger.focus();
    trigger.click();
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve));
    const drawer = fixture.nativeElement.querySelector(
      '[role=dialog]',
    ) as HTMLElement;
    expect(drawer.getAttribute('data-side')).toBe('bottom');
    expect(drawer.hasAttribute('data-drawer')).toBe(true);
    expect(drawer.getAttribute('aria-labelledby')).toBe('drawer-title');
    expect(document.activeElement).toBe(drawer);
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
  it('runs an enabled command while skipping disabled results', () => {
    const fixture = TestBed.createComponent(CommandHost);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector(
      '[role=combobox]',
    ) as HTMLInputElement;
    input.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    input.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }),
    );
    fixture.detectChanges();
    const active = fixture.nativeElement.querySelector(
      `#${input.getAttribute('aria-activedescendant')}`,
    ) as HTMLElement;
    expect(active.textContent?.trim()).toBe('Open settings');
    input.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }),
    );
    fixture.detectChanges();
    expect(fixture.componentInstance.selected).toHaveBeenCalledWith('settings');
    expect(input.value).toBe('Open settings');
    fixture.destroy();
  });
  it('selects and keyboard-navigates a labelled calendar grid', async () => {
    const fixture = TestBed.createComponent(CalendarHost);
    fixture.detectChanges();
    const grid = fixture.nativeElement.querySelector(
      '[role=grid]',
    ) as HTMLElement;
    expect(grid.getAttribute('aria-labelledby')).toBeTruthy();
    const twelfth = fixture.nativeElement.querySelector(
      '[data-date="2026-08-12"]',
    ) as HTMLButtonElement;
    twelfth.focus();
    twelfth.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
    );
    await new Promise((resolve) => requestAnimationFrame(resolve));
    const thirteenth = fixture.nativeElement.querySelector(
      '[data-date="2026-08-13"]',
    ) as HTMLButtonElement;
    expect(document.activeElement).toBe(thirteenth);
    thirteenth.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.selected).toHaveBeenCalledWith(
      '2026-08-13',
    );
    const fourteenth = fixture.nativeElement.querySelector(
      '[data-date="2026-08-14"]',
    ) as HTMLButtonElement;
    expect(fourteenth.getAttribute('aria-disabled')).toBe('true');
    fourteenth.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.selected).toHaveBeenCalledOnce();
    expect(
      new FormData(fixture.nativeElement.querySelector('form')).get(
        'appointment',
      ),
    ).toBe('2026-08-13');
    expect((await axe.run(fixture.nativeElement)).violations).toEqual([]);
    fixture.destroy();
  });
  it('selects a date from a popup and restores trigger focus', async () => {
    const fixture = TestBed.createComponent(DatePickerHost);
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector(
      'simurgh-popover > button',
    ) as HTMLButtonElement;
    expect(trigger.textContent?.trim()).toBe('Aug 12, 2026');
    trigger.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role=grid]')).toBeTruthy();
    const popup = fixture.nativeElement.querySelector(
      '[role=dialog]',
    ) as HTMLElement;
    popup.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
    );
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role=grid]')).toBeNull();
    trigger.click();
    fixture.detectChanges();
    expect((await axe.run(fixture.nativeElement)).violations).toEqual([]);
    const thirteenth = fixture.nativeElement.querySelector(
      '[data-date="2026-08-13"]',
    ) as HTMLButtonElement;
    thirteenth.click();
    fixture.detectChanges();
    await new Promise((resolve) => requestAnimationFrame(resolve));
    expect(fixture.componentInstance.selected).toHaveBeenCalledWith(
      '2026-08-13',
    );
    expect(document.activeElement).toBe(trigger);
    expect(fixture.nativeElement.querySelector('[role=grid]')).toBeNull();
    expect(
      new FormData(fixture.nativeElement.querySelector('form')).get(
        'appointment',
      ),
    ).toBe('2026-08-13');
    fixture.destroy();
  });
  it('labels slides and bounds carousel navigation', async () => {
    const fixture = TestBed.createComponent(CarouselHost);
    fixture.detectChanges();
    const region = fixture.nativeElement.querySelector(
      '[role=region]',
    ) as HTMLElement;
    expect(region.getAttribute('aria-label')).toBe('Featured projects');
    const previous = fixture.nativeElement.querySelector(
      '[data-slot=carousel-previous]',
    ) as HTMLButtonElement;
    const next = fixture.nativeElement.querySelector(
      '[data-slot=carousel-next]',
    ) as HTMLButtonElement;
    expect(previous.disabled).toBe(true);
    next.click();
    fixture.detectChanges();
    const visible = fixture.nativeElement.querySelector(
      'simurgh-carousel-item:not([hidden])',
    ) as HTMLElement;
    expect(visible.textContent?.trim()).toBe('Documentation');
    expect(visible.getAttribute('aria-label')).toBe('2 of 2');
    expect(next.disabled).toBe(true);
    region.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }),
    );
    fixture.detectChanges();
    expect(fixture.componentInstance.changed).toHaveBeenLastCalledWith(0);
    expect((await axe.run(fixture.nativeElement)).violations).toEqual([]);
    fixture.destroy();
  });
  it('resizes adjacent panels with a constrained keyboard separator', async () => {
    const fixture = TestBed.createComponent(ResizableHost);
    fixture.detectChanges();
    const handle = fixture.nativeElement.querySelector(
      '[role=separator]',
    ) as HTMLElement;
    expect(handle.getAttribute('aria-valuenow')).toBe('35');
    expect(handle.getAttribute('aria-valuemax')).toBe('70');
    handle.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
    );
    fixture.detectChanges();
    expect(handle.getAttribute('aria-valuenow')).toBe('40');
    handle.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'End', bubbles: true }),
    );
    fixture.detectChanges();
    expect(handle.getAttribute('aria-valuenow')).toBe('70');
    const panels = fixture.nativeElement.querySelectorAll(
      'simurgh-resizable-panel',
    ) as NodeListOf<HTMLElement>;
    expect(panels[1]?.style.flexBasis).toBe('30%');
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
  it('groups related buttons with a name and orientation', () => {
    const fixture = TestBed.createComponent(ButtonGroupHost);
    fixture.detectChanges();
    const group = fixture.nativeElement.querySelector(
      'simurgh-button-group',
    ) as HTMLElement;
    const separator = fixture.nativeElement.querySelector(
      'simurgh-button-group-separator',
    ) as HTMLElement;
    expect(group.getAttribute('role')).toBe('group');
    expect(group.getAttribute('aria-label')).toBe('Text alignment');
    expect(group.getAttribute('aria-orientation')).toBe('horizontal');
    expect(separator.getAttribute('aria-orientation')).toBe('vertical');
    expect(group.querySelectorAll('button')).toHaveLength(2);
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
  it('groups an input with a decorative addon without changing its form value', () => {
    const fixture = TestBed.createComponent(InputGroupHost);
    fixture.detectChanges();
    const group = fixture.nativeElement.querySelector(
      'simurgh-input-group',
    ) as HTMLElement;
    const addon = fixture.nativeElement.querySelector(
      'simurgh-input-group-addon',
    ) as HTMLElement;
    const input = fixture.nativeElement.querySelector(
      'input',
    ) as HTMLInputElement;
    expect(group.getAttribute('role')).toBe('group');
    expect(group.getAttribute('aria-labelledby')).toBe('website-label');
    expect(addon.getAttribute('aria-hidden')).toBe('true');
    expect(new FormData(input.form!).get('website')).toBe('example.com');
    fixture.destroy();
  });
  it('filters, limits, and serializes one-time codes in one native input', () => {
    const fixture = TestBed.createComponent(InputOtpHost);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector(
      'input',
    ) as HTMLInputElement;
    input.value = 'a1b2c3d4';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(input.value).toBe('1234');
    expect(input.maxLength).toBe(4);
    expect(input.autocomplete).toBe('one-time-code');
    expect(fixture.componentInstance.changed).toHaveBeenCalledWith('1234');
    expect(new FormData(input.form!).get('code')).toBe('1234');
    fixture.destroy();
  });
  it('updates and serializes native select values', () => {
    const fixture = TestBed.createComponent(NativeSelectHost);
    fixture.detectChanges();
    const select = fixture.nativeElement.querySelector(
      'select',
    ) as HTMLSelectElement;
    select.value = 'tehran';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(fixture.componentInstance.changed).toHaveBeenCalledWith('tehran');
    expect(select.getAttribute('aria-invalid')).toBe('true');
    expect(new FormData(select.form!).get('timezone')).toBe('tehran');
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
  it('keeps static empty content neutral and supports polite updates', () => {
    const fixture = TestBed.createComponent(EmptyHost);
    fixture.detectChanges();
    const empty = fixture.nativeElement.querySelector(
      'simurgh-empty',
    ) as HTMLElement;
    const media = fixture.nativeElement.querySelector(
      'simurgh-empty-media',
    ) as HTMLElement;
    expect(empty.getAttribute('role')).toBeNull();
    expect(empty.querySelector('h3')?.textContent).toBe('No projects yet');
    expect(media.getAttribute('aria-hidden')).toBe('true');
    fixture.componentInstance.status = true;
    fixture.detectChanges();
    expect(empty.getAttribute('role')).toBe('status');
    expect(empty.getAttribute('aria-live')).toBe('polite');
    fixture.destroy();
  });
  it('composes named lists with structured item content and actions', () => {
    const fixture = TestBed.createComponent(ItemHost);
    fixture.detectChanges();
    const list = fixture.nativeElement.querySelector(
      'simurgh-item-group',
    ) as HTMLElement;
    const item = fixture.nativeElement.querySelector(
      'simurgh-item',
    ) as HTMLElement;
    const media = fixture.nativeElement.querySelector(
      'simurgh-item-media',
    ) as HTMLElement;
    expect(list.getAttribute('role')).toBe('list');
    expect(list.getAttribute('aria-label')).toBe('Projects');
    expect(item.getAttribute('role')).toBe('listitem');
    expect(item.querySelector('h3')?.textContent).toBe('Design system');
    expect(media.getAttribute('aria-hidden')).toBe('true');
    expect(item.querySelector('button')?.textContent?.trim()).toBe('Open');
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
