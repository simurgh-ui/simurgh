// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/vue';
import axe from 'axe-core';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  Checkbox,
  Avatar,
  Alert,
  AspectRatio,
  Skeleton,
  Spinner,
  Button,
  Link,
  Input,
  Slider,
  Meter,
  Toolbar,
  ToolbarButton,
  ToggleGroup,
  ToggleGroupItem,
  ScrollArea,
  Textarea,
  Badge,
  Breadcrumb,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  Menubar,
  MenubarItem,
  Card,
  CardDescription,
  CardTitle,
  Kbd,
  Field,
  FieldError,
  FieldLegend,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Combobox,
  Dialog,
  DialogContent,
  DialogTrigger,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Label,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Select,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  Toggle,
  VisuallyHidden,
} from '../src/index.js';

afterEach(cleanup);

describe('Vue accessibility contract', () => {
  it('opens a side-anchored sheet and restores trigger focus', async () => {
    render({
      components: {
        Sheet,
        SheetTrigger,
        SheetContent,
        SheetTitle,
        SheetDescription,
        SheetClose,
      },
      template: `<Sheet><SheetTrigger>Open filters</SheetTrigger><SheetContent side="left"><SheetTitle>Filters</SheetTitle><SheetDescription>Narrow the results.</SheetDescription><SheetClose>Done</SheetClose></SheetContent></Sheet>`,
    });
    const trigger = screen.getByRole('button', { name: 'Open filters' });
    trigger.focus();
    await fireEvent.click(trigger);
    const sheet = screen.getByRole('dialog', { name: 'Filters' });
    expect(sheet.getAttribute('data-side')).toBe('left');
    expect(document.activeElement).toBe(sheet);
    await fireEvent.click(screen.getByRole('button', { name: 'Done' }));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it('composes card anatomy with native heading semantics', () => {
    render({
      components: { Card, CardTitle, CardDescription },
      template: `<Card><CardTitle>Release</CardTitle><CardDescription>Ready to publish</CardDescription></Card>`,
    });
    expect(
      screen.getByRole('heading', { name: 'Release', level: 3 }),
    ).toBeTruthy();
    expect(screen.getByText('Ready to publish').getAttribute('data-slot')).toBe(
      'card-description',
    );
  });
  it('renders keyboard input with native semantics', () => {
    render({ components: { Kbd }, template: `<Kbd>Ctrl K</Kbd>` });
    expect(screen.getByText('Ctrl K').tagName).toBe('KBD');
  });
  it('groups controls with native field semantics', () => {
    render({
      components: { Field, FieldLegend, FieldError },
      template: `<Field><FieldLegend>Notifications</FieldLegend><label><input type="checkbox" /> Email</label><FieldError>Choose at least one.</FieldError></Field>`,
    });
    expect(screen.getByRole('group', { name: 'Notifications' })).toBeTruthy();
    expect(screen.getByRole('alert').textContent).toBe('Choose at least one.');
  });
  it('renders a captioned native table', () => {
    render({
      components: {
        Table,
        TableCaption,
        TableHeader,
        TableRow,
        TableHead,
        TableBody,
        TableCell,
      },
      template: `<Table><TableCaption>Recent releases</TableCaption><TableHeader><TableRow><TableHead>Version</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>0.1.0</TableCell></TableRow></TableBody></Table>`,
    });
    expect(screen.getByRole('table', { name: 'Recent releases' })).toBeTruthy();
    expect(
      screen
        .getByRole('columnheader', { name: 'Version' })
        .getAttribute('scope'),
    ).toBe('col');
  });
  it('names pagination and identifies the current page', () => {
    render({
      components: {
        Pagination,
        PaginationContent,
        PaginationItem,
        PaginationLink,
      },
      template: `<Pagination><PaginationContent><PaginationItem><PaginationLink href="?page=1">1</PaginationLink></PaginationItem><PaginationItem><PaginationLink href="?page=2" current>2</PaginationLink></PaginationItem></PaginationContent></Pagination>`,
    });
    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeTruthy();
    expect(
      screen.getByRole('link', { name: '2' }).getAttribute('aria-current'),
    ).toBe('page');
  });
  it('toggles collapsible content with linked semantics', async () => {
    render({
      components: { Collapsible, CollapsibleTrigger, CollapsibleContent },
      template: `<Collapsible><CollapsibleTrigger>Details</CollapsibleTrigger><CollapsibleContent>Hidden details</CollapsibleContent></Collapsible>`,
    });
    const trigger = screen.getByRole('button', { name: 'Details' });
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    await fireEvent.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByText('Hidden details').hasAttribute('hidden')).toBe(
      false,
    );
  });
  it('opens a modal and passes an axe audit', async () => {
    render({
      components: { Dialog, DialogTrigger, DialogContent },
      template: `<Dialog><DialogTrigger>Open settings</DialogTrigger><DialogContent aria-label="Settings"><button>Save</button></DialogContent></Dialog>`,
    });
    const opener = screen.getByRole('button', { name: 'Open settings' });
    opener.focus();
    await fireEvent.click(opener);
    const dialog = screen.getByRole('dialog', { name: 'Settings' });
    expect(document.activeElement).toBe(dialog);
    expect((await axe.run(document.body)).violations).toEqual([]);
    await fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(document.activeElement).toBe(opener);
  });

  it('supports checkbox model and native form state', async () => {
    const view = render({
      components: { Checkbox },
      data: () => ({ checked: false }),
      template: `<form><Checkbox v-model="checked" name="alerts" value="yes">Alerts</Checkbox></form>`,
    });
    await fireEvent.click(screen.getByRole('checkbox', { name: 'Alerts' }));
    expect(
      (view.getByRole('checkbox') as HTMLButtonElement).getAttribute(
        'aria-checked',
      ),
    ).toBe('true');
    expect(
      new FormData(view.container.querySelector('form')!).get('alerts'),
    ).toBe('yes');
  });

  it('activates tabs with keyboard input', async () => {
    render({
      components: { Tabs, TabsList, TabsTrigger, TabsContent },
      template: `<Tabs default-value="one"><TabsList><TabsTrigger value="one">One</TabsTrigger><TabsTrigger value="two">Two</TabsTrigger></TabsList><TabsContent value="one">First</TabsContent><TabsContent value="two">Second</TabsContent></Tabs>`,
    });
    const one = screen.getByRole('tab', { name: 'One' });
    one.focus();
    await fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowRight' });
    expect(
      screen.getByRole('tab', { name: 'Two' }).getAttribute('aria-selected'),
    ).toBe('true');
  });

  it('opens tooltips for hover and keyboard focus without click state', async () => {
    render({
      components: { Tooltip, TooltipTrigger, TooltipContent },
      template: `<Tooltip><TooltipTrigger>Information</TooltipTrigger><TooltipContent>Helpful context</TooltipContent></Tooltip>`,
    });
    const trigger = screen.getByRole('button', { name: 'Information' });
    expect(screen.queryByRole('tooltip')).toBeNull();
    await fireEvent.mouseEnter(trigger);
    expect(screen.getByRole('tooltip').textContent).toContain(
      'Helpful context',
    );
    expect(trigger.getAttribute('aria-describedby')).toBe(
      screen.getByRole('tooltip').id,
    );
    await fireEvent.mouseLeave(trigger);
    expect(screen.queryByRole('tooltip')).toBeNull();
    await fireEvent.focus(trigger);
    expect(screen.getByRole('tooltip')).toBeTruthy();
    await fireEvent.blur(trigger);
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('opens a labelled hover card with pointer and keyboard focus', async () => {
    render({
      components: { HoverCard, HoverCardTrigger, HoverCardContent },
      template: `<HoverCard><HoverCardTrigger>Simurgh</HoverCardTrigger><HoverCardContent label="Simurgh profile">Cross-framework components</HoverCardContent></HoverCard>`,
    });
    const trigger = screen.getByRole('button', { name: 'Simurgh' });
    await fireEvent.mouseEnter(trigger);
    expect(
      screen.getByRole('dialog', { name: 'Simurgh profile' }),
    ).toBeTruthy();
    await fireEvent.mouseLeave(trigger);
    expect(screen.queryByRole('dialog')).toBeNull();
    await fireEvent.focus(trigger);
    expect(
      screen.getByRole('dialog', { name: 'Simurgh profile' }),
    ).toBeTruthy();
  });

  it('opens a context menu at the pointer and supports keyboard selection', async () => {
    const selected = vi.fn();
    render({
      components: {
        ContextMenu,
        ContextMenuTrigger,
        ContextMenuContent,
        ContextMenuItem,
      },
      setup: () => ({ selected }),
      template: `<ContextMenu><ContextMenuTrigger>Canvas</ContextMenuTrigger><ContextMenuContent aria-label="Canvas actions"><ContextMenuItem disabled>Cut</ContextMenuItem><ContextMenuItem @select="selected">Copy</ContextMenuItem></ContextMenuContent></ContextMenu>`,
    });
    await fireEvent.contextMenu(screen.getByText('Canvas'), {
      clientX: 24,
      clientY: 36,
    });
    await new Promise((resolve) => setTimeout(resolve));
    const menu = screen.getByRole('menu', { name: 'Canvas actions' });
    expect(document.activeElement).toBe(
      screen.getByRole('menuitem', { name: 'Copy' }),
    );
    await fireEvent.keyDown(menu, { key: 'Enter' });
    expect(selected).toHaveBeenCalledOnce();
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('navigates and selects menu items from the keyboard', async () => {
    const selected = vi.fn();
    render({
      components: {
        DropdownMenu,
        DropdownMenuTrigger,
        DropdownMenuContent,
        DropdownMenuItem,
      },
      setup: () => ({ selected }),
      template: `<DropdownMenu><DropdownMenuTrigger>Actions</DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem>First</DropdownMenuItem><DropdownMenuItem @select="selected">Second</DropdownMenuItem></DropdownMenuContent></DropdownMenu>`,
    });
    await fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
    const items = screen.getAllByRole('menuitem');
    items[0]!.focus();
    await fireEvent.keyDown(screen.getByRole('menu'), { key: 'ArrowDown' });
    expect(document.activeElement).toBe(items[1]);
    await fireEvent.keyDown(screen.getByRole('menu'), { key: 'Enter' });
    expect(selected).toHaveBeenCalledOnce();
  });

  it('selects listbox options with arrows and serializes the form', async () => {
    const view = render({
      components: { Select },
      data: () => ({ city: '' }),
      template: `<form><Select v-model="city" name="city" placeholder="Choose city" :options="[{value:'tehran',label:'Tehran'},{value:'isfahan',label:'Isfahan'}]" /></form>`,
    });
    await fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
    const list = screen.getByRole('listbox');
    await fireEvent.keyDown(list, { key: 'ArrowDown' });
    await fireEvent.keyDown(list, { key: 'Enter' });
    expect(screen.getByRole('combobox').textContent).toBe('Isfahan');
    expect(
      new FormData(view.container.querySelector('form')!).get('city'),
    ).toBe('isfahan');
  });
  it('navigates and serializes a radio group', async () => {
    const view = render({
      components: { RadioGroup, RadioGroupItem },
      data: () => ({ plan: 'basic' }),
      template: `<form><RadioGroup v-model="plan" name="plan"><RadioGroupItem value="basic">Basic</RadioGroupItem><RadioGroupItem value="pro">Pro</RadioGroupItem></RadioGroup></form>`,
    });
    const basic = screen.getByRole('radio', { name: 'Basic' });
    basic.focus();
    await fireEvent.keyDown(basic.parentElement!, { key: 'ArrowRight' });
    expect(
      screen.getByRole('radio', { name: 'Pro' }).getAttribute('aria-checked'),
    ).toBe('true');
    expect(
      new FormData(view.container.querySelector('form')!).get('plan'),
    ).toBe('pro');
  });
  it('filters and commits a combobox option without moving input focus', async () => {
    const view = render({
      components: { Combobox },
      data: () => ({ city: '' }),
      template: `<main><form><Combobox v-model="city" name="city" placeholder="Search cities" :options="[{value:'tehran',label:'Tehran'},{value:'isfahan',label:'Isfahan'},{value:'shiraz',label:'Shiraz',disabled:true}]" /></form></main>`,
    });
    const input = screen.getByRole('combobox', { name: 'Search cities' });
    input.focus();
    await fireEvent.update(input, 'isf');
    expect(screen.getByRole('option', { name: 'Isfahan' })).toBeTruthy();
    await fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input.getAttribute('aria-activedescendant')).toBe(
      screen.getByRole('option').id,
    );
    expect(document.activeElement).toBe(input);
    await fireEvent.keyDown(input, { key: 'Enter' });
    expect((input as HTMLInputElement).value).toBe('Isfahan');
    expect(
      new FormData(view.container.querySelector('form')!).get('city'),
    ).toBe('isfahan');
    expect((await axe.run(document.body)).violations).toEqual([]);
  });
  it('associates a native label with its form control', async () => {
    render({
      components: { Label },
      template: `<main><Label for="email">Email address</Label><input id="email" /></main>`,
    });
    expect(screen.getByLabelText('Email address').id).toBe('email');
    expect((await axe.run(document.body)).violations).toEqual([]);
  });
  it('exposes separator orientation and decorative mode', async () => {
    const view = render(Separator, { props: { orientation: 'vertical' } });
    expect(screen.getByRole('separator').getAttribute('aria-orientation')).toBe(
      'vertical',
    );
    await view.rerender({ decorative: true });
    expect(view.container.firstElementChild?.getAttribute('aria-hidden')).toBe(
      'true',
    );
    expect(screen.queryByRole('separator')).toBeNull();
  });
  it('clamps determinate progress and omits value when indeterminate', async () => {
    const view = render(Progress, {
      props: { value: 120, max: 80 },
      attrs: { 'aria-label': 'Upload' },
    });
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe(
      '80',
    );
    await view.rerender({ value: null, max: 80 });
    expect(screen.getByRole('progressbar').hasAttribute('aria-valuenow')).toBe(
      false,
    );
  });
  it('toggles native pressed state through v-model', async () => {
    render({
      components: { Toggle },
      data: () => ({ bold: false }),
      template: `<Toggle v-model="bold">Bold</Toggle>`,
    });
    const toggle = screen.getByRole('button', { name: 'Bold' });
    await fireEvent.click(toggle);
    expect(toggle.getAttribute('aria-pressed')).toBe('true');
  });
  it('keeps visually hidden text in an accessible name', () => {
    render({
      components: { VisuallyHidden },
      template: `<button type="button"><span aria-hidden="true">×</span><VisuallyHidden>Close dialog</VisuallyHidden></button>`,
    });
    const button = screen.getByRole('button', { name: 'Close dialog' });
    expect((button.lastElementChild as HTMLElement).style.position).toBe(
      'absolute',
    );
  });
  it('shows avatar fallback until its image loads', async () => {
    render(Avatar, {
      props: { src: 'avatar.jpg', alt: 'Ada Lovelace', fallback: 'AL' },
    });
    expect(screen.getByText('AL')).toBeTruthy();
    const image = screen.getByAltText('Ada Lovelace');
    await fireEvent.load(image);
    expect(image.hasAttribute('hidden')).toBe(false);
    expect(screen.queryByText('AL')).toBeNull();
  });
  it('uses polite status by default and assertive semantics when urgent', async () => {
    const view = render(Alert, { slots: { default: 'Profile saved' } });
    expect(screen.getByRole('status').getAttribute('aria-live')).toBe('polite');
    await view.rerender({ urgent: true });
    expect(screen.getByRole('alert').getAttribute('aria-live')).toBe(
      'assertive',
    );
  });
  it('applies a safe aspect ratio while preserving consumer styles', () => {
    const view = render(AspectRatio, {
      props: { ratio: 0 },
      attrs: { style: 'overflow: hidden' },
    });
    const ratio = view.container.firstElementChild as HTMLElement;
    expect(ratio.dataset['ratio']).toBe('1');
    expect(ratio.style.aspectRatio).toBe('1');
    expect(ratio.style.overflow).toBe('hidden');
  });
  it('keeps skeletons decorative unless a loading label is supplied', async () => {
    const view = render(Skeleton);
    expect(view.container.firstElementChild?.getAttribute('aria-hidden')).toBe(
      'true',
    );
    await view.rerender({ label: 'Loading profile' });
    expect(
      screen.getByRole('status', { name: 'Loading profile' }),
    ).toBeTruthy();
  });
  it('provides a named busy status for spinners', () => {
    render(Spinner, { props: { label: 'Loading results' } });
    const spinner = screen.getByRole('status', { name: 'Loading results' });
    expect(spinner.getAttribute('aria-busy')).toBe('true');
    expect(spinner.firstElementChild?.getAttribute('aria-hidden')).toBe('true');
  });
  it('defaults buttons safely and blocks activation while loading', async () => {
    const clicked = vi.fn();
    render(Button, {
      props: { loading: true, onClick: clicked },
      slots: { default: 'Save' },
    });
    const button = screen.getByRole('button', {
      name: 'Save',
    }) as HTMLButtonElement;
    expect(button.type).toBe('button');
    expect(button.disabled).toBe(true);
    await fireEvent.click(button);
    expect(clicked).not.toHaveBeenCalled();
  });
  it('preserves native link semantics and safely disables navigation', async () => {
    const clicked = vi.fn();
    const view = render(Link, {
      props: { href: '/docs', external: true, onClick: clicked },
      slots: { default: 'Documentation' },
    });
    const link = screen.getByRole('link', { name: 'Documentation' });
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    await view.rerender({ href: '/docs', disabled: true, onClick: clicked });
    const disabled = screen.getByText('Documentation');
    expect(disabled.getAttribute('href')).toBeNull();
    expect(disabled.getAttribute('aria-disabled')).toBe('true');
    expect(disabled.getAttribute('tabindex')).toBe('-1');
    await fireEvent.click(disabled);
    expect(clicked).not.toHaveBeenCalled();
  });
  it('provides a named navigation landmark with current-page semantics', () => {
    render({
      components: {
        NavigationMenu,
        NavigationMenuList,
        NavigationMenuItem,
        NavigationMenuLink,
      },
      template: `<NavigationMenu label="Primary"><NavigationMenuList><NavigationMenuItem><NavigationMenuLink href="/" current>Home</NavigationMenuLink></NavigationMenuItem><NavigationMenuItem><NavigationMenuLink href="/docs">Docs</NavigationMenuLink></NavigationMenuItem></NavigationMenuList></NavigationMenu>`,
    });
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeTruthy();
    expect(screen.getByRole('list').children).toHaveLength(2);
    expect(
      screen.getByRole('link', { name: 'Home' }).getAttribute('aria-current'),
    ).toBe('page');
    expect(screen.getByRole('link', { name: 'Docs' }).tabIndex).toBe(0);
  });
  it('provides RTL-aware roving focus in a named menubar', async () => {
    render({
      components: { Menubar, MenubarItem },
      template: `<Menubar label="Editor" direction="rtl"><MenubarItem>File</MenubarItem><MenubarItem disabled>Edit</MenubarItem><MenubarItem>View</MenubarItem></Menubar>`,
    });
    const file = screen.getByRole('menuitem', { name: 'File' });
    file.focus();
    await fireEvent.keyDown(file, { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(
      screen.getByRole('menuitem', { name: 'View' }),
    );
    expect(screen.getByRole('menubar', { name: 'Editor' })).toBeTruthy();
  });
  it('preserves native input form and invalid semantics', () => {
    const view = render({
      components: { Input },
      template: `<form><Input name="email" model-value="ada@example.com" required invalid /></form>`,
    });
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.required).toBe(true);
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(
      new FormData(view.container.querySelector('form')!).get('email'),
    ).toBe('ada@example.com');
  });
  it('updates and serializes a native slider', async () => {
    render({
      components: { Slider },
      data: () => ({ volume: 20 }),
      template: `<form><Slider v-model="volume" aria-label="Volume" name="volume" :step="10" /></form>`,
    });
    const slider = screen.getByRole('slider', {
      name: 'Volume',
    }) as HTMLInputElement;
    await fireEvent.update(slider, '50');
    expect(slider.value).toBe('50');
    expect(new FormData(slider.form!).get('volume')).toBe('50');
  });
  it('clamps a named native meter and preserves thresholds', () => {
    render(Meter, {
      props: {
        label: 'Storage used',
        value: 120,
        max: 100,
        low: 40,
        high: 80,
        optimum: 20,
      },
    });
    const meter = screen.getByRole('meter', {
      name: 'Storage used',
    }) as HTMLMeterElement;
    expect(meter.value).toBe(100);
    expect(meter.high).toBe(80);
    expect(meter.optimum).toBe(20);
  });
  it('moves toolbar focus logically and skips disabled items', async () => {
    render({
      components: { Toolbar, ToolbarButton },
      template: `<Toolbar label="Editor"><ToolbarButton>Bold</ToolbarButton><ToolbarButton disabled>Italic</ToolbarButton><ToolbarButton>Link</ToolbarButton></Toolbar>`,
    });
    const bold = screen.getByRole('button', { name: 'Bold' });
    bold.focus();
    await fireEvent.keyDown(bold, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: 'Link' }),
    );
    expect(screen.getByRole('toolbar', { name: 'Editor' })).toBeTruthy();
  });
  it('selects one toggle-group item and moves focus', async () => {
    render({
      components: { ToggleGroup, ToggleGroupItem },
      template: `<ToggleGroup aria-label="Alignment"><ToggleGroupItem value="start">Start</ToggleGroupItem><ToggleGroupItem value="center">Center</ToggleGroupItem></ToggleGroup>`,
    });
    const start = screen.getByRole('button', { name: 'Start' });
    await fireEvent.click(start);
    expect(start.getAttribute('aria-pressed')).toBe('true');
    start.focus();
    await fireEvent.keyDown(start, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: 'Center' }),
    );
  });
  it('creates a focusable named native scroll region', () => {
    render(ScrollArea, {
      props: { label: 'Activity', orientation: 'both' },
      slots: { default: 'Updates' },
    });
    const area = screen.getByRole('region', { name: 'Activity' });
    expect(area.getAttribute('tabindex')).toBe('0');
    expect(area.getAttribute('data-orientation')).toBe('both');
  });
  it('serializes native textarea values', () => {
    const view = render({
      components: { Textarea },
      template: `<form><Textarea name="bio" model-value="Poet" required /></form>`,
    });
    expect(new FormData(view.container.querySelector('form')!).get('bio')).toBe(
      'Poet',
    );
  });
  it('keeps badges neutral unless dynamic status is requested', async () => {
    const view = render(Badge, {
      props: { tone: 'success' },
      slots: { default: 'Published' },
    });
    expect(screen.getByText('Published').getAttribute('data-tone')).toBe(
      'success',
    );
    expect(screen.queryByRole('status')).toBeNull();
    await view.rerender({ status: true });
    expect(screen.getByRole('status').getAttribute('aria-live')).toBe('polite');
  });
  it('provides a named breadcrumb landmark with a current page', () => {
    render({
      components: { Breadcrumb },
      template: `<Breadcrumb><ol><li><a href="/docs">Docs</a></li><li><span aria-current="page">Button</span></li></ol></Breadcrumb>`,
    });
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeTruthy();
    expect(screen.getByText('Button').getAttribute('aria-current')).toBe(
      'page',
    );
  });
});
