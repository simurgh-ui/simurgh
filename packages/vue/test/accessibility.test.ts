// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/vue';
import axe from 'axe-core';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import {
  Checkbox,
  Avatar,
  Alert,
  AspectRatio,
  Skeleton,
  Spinner,
  Button,
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  Link,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputOtp,
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
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
  Kbd,
  Field,
  FieldError,
  FieldLegend,
  Form,
  FormErrorSummary,
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
  Command,
  Calendar,
  DatePicker,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  Tree,
  TreeItem,
  FileUpload,
  PasswordInput,
  NumberInput,
  Dialog,
  DialogContent,
  DialogTrigger,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
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
  NativeSelect,
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

  it('opens a bottom drawer and restores trigger focus', async () => {
    render({
      components: {
        Drawer,
        DrawerTrigger,
        DrawerContent,
        DrawerTitle,
        DrawerDescription,
        DrawerClose,
      },
      template: `<Drawer><DrawerTrigger>Edit profile</DrawerTrigger><DrawerContent><DrawerTitle>Edit profile</DrawerTitle><DrawerDescription>Update your details.</DrawerDescription><DrawerClose>Done</DrawerClose></DrawerContent></Drawer>`,
    });
    const trigger = screen.getByRole('button', { name: 'Edit profile' });
    trigger.focus();
    await fireEvent.click(trigger);
    const drawer = screen.getByRole('dialog', { name: 'Edit profile' });
    expect(drawer.getAttribute('data-side')).toBe('bottom');
    expect(drawer.hasAttribute('data-drawer')).toBe(true);
    expect(document.activeElement).toBe(drawer);
    await fireEvent.click(screen.getByRole('button', { name: 'Done' }));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it('focuses the safe action in a destructive alert dialog', async () => {
    const confirmed = vi.fn();
    render({
      components: {
        AlertDialog,
        AlertDialogTrigger,
        AlertDialogContent,
        AlertDialogTitle,
        AlertDialogDescription,
        AlertDialogCancel,
        AlertDialogAction,
      },
      setup: () => ({ confirmed }),
      template: `<AlertDialog><AlertDialogTrigger>Delete project</AlertDialogTrigger><AlertDialogContent><AlertDialogTitle>Delete project?</AlertDialogTitle><AlertDialogDescription>This cannot be undone.</AlertDialogDescription><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction @select="confirmed">Delete</AlertDialogAction></AlertDialogContent></AlertDialog>`,
    });
    const trigger = screen.getByRole('button', { name: 'Delete project' });
    trigger.focus();
    await fireEvent.click(trigger);
    expect(
      screen.getByRole('alertdialog', { name: 'Delete project?' }),
    ).toBeTruthy();
    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: 'Cancel' }),
    );
    await fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(confirmed).toHaveBeenCalledOnce();
    expect(screen.queryByRole('alertdialog')).toBeNull();
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
  it('keeps static empty content neutral and supports polite updates', async () => {
    const view = render({
      components: {
        Button,
        Empty,
        EmptyContent,
        EmptyDescription,
        EmptyHeader,
        EmptyMedia,
        EmptyTitle,
      },
      props: ['status'],
      template: `<Empty :status="status"><EmptyMedia>+</EmptyMedia><EmptyHeader><EmptyTitle>No projects yet</EmptyTitle><EmptyDescription>Create a project to begin.</EmptyDescription></EmptyHeader><EmptyContent><Button>Create project</Button></EmptyContent></Empty>`,
    });
    expect(screen.queryByRole('status')).toBeNull();
    expect(
      screen.getByRole('heading', { name: 'No projects yet', level: 3 }),
    ).toBeTruthy();
    expect(screen.getByText('+').getAttribute('aria-hidden')).toBe('true');
    await view.rerender({ status: true });
    expect(screen.getByRole('status').getAttribute('aria-live')).toBe('polite');
  });
  it('composes named lists with structured item content and actions', () => {
    render({
      components: {
        Button,
        Item,
        ItemActions,
        ItemContent,
        ItemDescription,
        ItemGroup,
        ItemMedia,
        ItemTitle,
      },
      template: `<ItemGroup aria-label="Projects"><Item><ItemMedia>D</ItemMedia><ItemContent><ItemTitle>Design system</ItemTitle><ItemDescription>Updated recently</ItemDescription></ItemContent><ItemActions><Button>Open</Button></ItemActions></Item></ItemGroup>`,
    });
    expect(screen.getByRole('list', { name: 'Projects' })).toBeTruthy();
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(
      screen.getByRole('heading', { name: 'Design system', level: 3 }),
    ).toBeTruthy();
    expect(screen.getByText('D').getAttribute('aria-hidden')).toBe('true');
    expect(screen.getByRole('button', { name: 'Open' })).toBeTruthy();
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
  it('focuses the first invalid form control and announces summary errors', async () => {
    const invalid = vi.fn();
    render({
      components: { Form, FormErrorSummary },
      setup: () => ({ invalid }),
      template: `<Form @invalid="invalid"><label>Email <input name="email" required /></label><FormErrorSummary>Correct the highlighted fields.</FormErrorSummary></Form>`,
    });
    const input = screen.getByRole('textbox', { name: 'Email' });
    await fireEvent.invalid(input);
    await new Promise((resolve) => requestAnimationFrame(resolve));
    expect(invalid).toHaveBeenCalledOnce();
    expect(document.activeElement).toBe(input);
    expect(screen.getByRole('alert').textContent).toContain('Correct');
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
  it('updates and serializes native select values', async () => {
    const view = render({
      components: { NativeSelect },
      data: () => ({ timezone: 'utc' }),
      template: `<form><label for="timezone">Timezone</label><NativeSelect id="timezone" name="timezone" v-model="timezone" invalid><option value="utc">UTC</option><option value="tehran">Tehran</option></NativeSelect></form>`,
    });
    const select = screen.getByRole('combobox', {
      name: 'Timezone',
    }) as HTMLSelectElement;
    await fireEvent.update(select, 'tehran');
    expect(select.getAttribute('aria-invalid')).toBe('true');
    expect(
      new FormData(view.container.querySelector('form')!).get('timezone'),
    ).toBe('tehran');
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
  it('runs an enabled command while skipping disabled results', async () => {
    const selected = vi.fn();
    render(Command, {
      props: {
        placeholder: 'Search commands',
        options: [
          { value: 'locked', label: 'Locked action', disabled: true },
          { value: 'settings', label: 'Open settings' },
        ],
        'onUpdate:modelValue': selected,
      },
    });
    const input = screen.getByRole('combobox', { name: 'Search commands' });
    await fireEvent.focus(input);
    await fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input.getAttribute('aria-activedescendant')).toBe(
      screen.getByRole('option', { name: 'Open settings' }).id,
    );
    await fireEvent.keyDown(input, { key: 'Enter' });
    expect(selected).toHaveBeenCalledWith('settings');
    expect((input as HTMLInputElement).value).toBe('Open settings');
  });
  it('selects and keyboard-navigates a labelled calendar grid', async () => {
    const selected = vi.fn();
    const view = render(Calendar, {
      props: {
        defaultValue: '2026-08-12',
        defaultMonth: '2026-08',
        name: 'appointment',
        label: 'Appointment calendar',
        disabledDates: ['2026-08-14'],
        'onUpdate:modelValue': selected,
      },
    });
    expect(screen.getByRole('grid', { name: 'August 2026' })).toBeTruthy();
    const twelfth = screen.getByRole('button', {
      name: 'Wednesday, August 12, 2026',
    });
    twelfth.focus();
    await fireEvent.keyDown(twelfth, { key: 'ArrowRight' });
    await new Promise((resolve) => requestAnimationFrame(resolve));
    const thirteenth = screen.getByRole('button', {
      name: 'Thursday, August 13, 2026',
    });
    expect(document.activeElement).toBe(thirteenth);
    await fireEvent.click(thirteenth);
    expect(selected).toHaveBeenCalledWith('2026-08-13');
    const fourteenth = screen.getByRole('button', {
      name: 'Friday, August 14, 2026',
    });
    expect(fourteenth.getAttribute('aria-disabled')).toBe('true');
    await fireEvent.click(fourteenth);
    expect(selected).toHaveBeenCalledOnce();
    expect(
      (view.container.querySelector('[name=appointment]') as HTMLInputElement)
        .value,
    ).toBe('2026-08-13');
    expect((await axe.run(view.container)).violations).toEqual([]);
  });
  it('selects a date from a popup and restores trigger focus', async () => {
    const selected = vi.fn();
    const view = render(DatePicker, {
      props: {
        defaultValue: '2026-08-12',
        defaultMonth: '2026-08',
        name: 'appointment',
        label: 'Appointment date',
        'onUpdate:modelValue': selected,
      },
    });
    const trigger = screen.getByRole('button', { name: 'Aug 12, 2026' });
    await fireEvent.click(trigger);
    expect(screen.getByRole('grid', { name: 'August 2026' })).toBeTruthy();
    await fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(screen.queryByRole('grid')).toBeNull();
    await fireEvent.click(trigger);
    expect((await axe.run(document.body)).violations).toEqual([]);
    await fireEvent.click(
      screen.getByRole('button', { name: 'Thursday, August 13, 2026' }),
    );
    await new Promise((resolve) => requestAnimationFrame(resolve));
    expect(selected).toHaveBeenCalledWith('2026-08-13');
    expect(document.activeElement).toBe(trigger);
    expect(screen.queryByRole('grid')).toBeNull();
    expect(
      (view.container.querySelector('[name=appointment]') as HTMLInputElement)
        .value,
    ).toBe('2026-08-13');
  });
  it('labels slides and bounds carousel navigation', async () => {
    const changed = vi.fn();
    render({
      components: {
        Carousel,
        CarouselContent,
        CarouselItem,
        CarouselPrevious,
        CarouselNext,
      },
      template: `<Carousel label="Featured projects" @update:index="changed"><CarouselContent><CarouselItem>Design system</CarouselItem><CarouselItem>Documentation</CarouselItem></CarouselContent><CarouselPrevious>‹</CarouselPrevious><CarouselNext>›</CarouselNext></Carousel>`,
      setup: () => ({ changed }),
    });
    const region = screen.getByRole('region', { name: 'Featured projects' });
    expect(region.getAttribute('aria-roledescription')).toBe('carousel');
    expect(screen.getByRole('group', { name: '1 of 2' }).textContent).toBe(
      'Design system',
    );
    expect(
      (
        screen.getByRole('button', {
          name: 'Previous slide',
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
    await fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));
    expect(screen.getByRole('group', { name: '2 of 2' }).textContent).toBe(
      'Documentation',
    );
    await fireEvent.keyDown(region, { key: 'ArrowLeft' });
    expect(changed).toHaveBeenLastCalledWith(0);
    expect((await axe.run(region)).violations).toEqual([]);
  });
  it('resizes adjacent panels with a constrained keyboard separator', async () => {
    render({
      components: { ResizablePanelGroup, ResizablePanel, ResizableHandle },
      template: `<ResizablePanelGroup aria-label="Workspace panels"><ResizablePanel :default-size="35" :min-size="20" :max-size="80">Navigation</ResizablePanel><ResizableHandle aria-label="Resize panels" /><ResizablePanel :default-size="65" :min-size="30">Content</ResizablePanel></ResizablePanelGroup>`,
    });
    await nextTick();
    const handle = screen.getByRole('separator', { name: 'Resize panels' });
    expect(handle.getAttribute('aria-valuenow')).toBe('35');
    expect(handle.getAttribute('aria-valuemax')).toBe('70');
    await fireEvent.keyDown(handle, { key: 'ArrowRight' });
    expect(handle.getAttribute('aria-valuenow')).toBe('40');
    await fireEvent.keyDown(handle, { key: 'End' });
    expect(handle.getAttribute('aria-valuenow')).toBe('70');
    expect((screen.getByText('Content') as HTMLElement).style.flexBasis).toBe(
      '30%',
    );
    expect((await axe.run(handle.parentElement!)).violations).toEqual([]);
  });
  it('toggles a labelled navigation sidebar without exposing hidden links', async () => {
    const changed = vi.fn();
    render({
      components: {
        SidebarProvider,
        Sidebar,
        SidebarTrigger,
        SidebarContent,
        SidebarMenu,
      },
      setup: () => ({ changed }),
      template: `<SidebarProvider @update:open="changed"><SidebarTrigger>Toggle navigation</SidebarTrigger><Sidebar aria-label="Workspace navigation"><SidebarContent><SidebarMenu><li><a href="/projects">Projects</a></li></SidebarMenu></SidebarContent></Sidebar></SidebarProvider>`,
    });
    const trigger = screen.getByRole('button', { name: 'Toggle navigation' });
    const sidebar = screen.getByRole('complementary', {
      name: 'Workspace navigation',
    });
    expect(trigger.getAttribute('aria-controls')).toBe(sidebar.id);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect((await axe.run(sidebar.parentElement!)).violations).toEqual([]);
    await fireEvent.click(trigger);
    expect(changed).toHaveBeenLastCalledWith(false);
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(sidebar.hidden).toBe(true);
    expect(screen.queryByRole('link', { name: 'Projects' })).toBeNull();
  });
  it('navigates and collapses a hierarchical tree with roving focus', async () => {
    render({
      components: { Tree, TreeItem },
      template: `<Tree aria-label="Files"><TreeItem label="Documents" default-expanded><TreeItem label="Guide" /><TreeItem label="Locked" disabled /></TreeItem><TreeItem label="Images" /></Tree>`,
    });
    const tree = screen.getByRole('tree', { name: 'Files' });
    const documents = screen.getByRole('treeitem', { name: 'Documents' });
    const guide = screen.getByRole('treeitem', { name: 'Guide' });
    const images = screen.getByRole('treeitem', { name: 'Images' });
    expect(documents.tabIndex).toBe(0);
    expect(guide.tabIndex).toBe(-1);
    documents.focus();
    await fireEvent.keyDown(documents, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(guide);
    await fireEvent.keyDown(guide, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(images);
    await fireEvent.keyDown(images, { key: 'Home' });
    expect(document.activeElement).toBe(documents);
    await fireEvent.keyDown(documents, { key: 'ArrowLeft' });
    expect(documents.getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByRole('treeitem', { name: 'Guide' })).toBeNull();
    expect((await axe.run(tree)).violations).toEqual([]);
  });
  it('filters and announces files selected through the native upload input', async () => {
    const changed = vi.fn();
    render(FileUpload, {
      props: {
        label: 'Upload documents',
        description: 'PDF files only',
        accept: '.pdf',
        multiple: true,
        onFilesChange: changed,
      },
    });
    const input = screen.getByLabelText(/Upload documents/) as HTMLInputElement;
    expect(input.type).toBe('file');
    expect(input.accept).toBe('.pdf');
    expect(input.multiple).toBe(true);
    const pdf = new File(['pdf'], 'guide.pdf', { type: 'application/pdf' });
    const text = new File(['text'], 'notes.txt', { type: 'text/plain' });
    await fireEvent.change(input, { target: { files: [pdf, text] } });
    expect(changed).toHaveBeenLastCalledWith([pdf]);
    expect(screen.getByText('guide.pdf')).toBeTruthy();
    expect((await axe.run(input.parentElement!)).violations).toEqual([]);
  });
  it('reveals a password without replacing its native form control', async () => {
    render(PasswordInput, {
      props: { modelValue: 'secret' },
      attrs: {
        'aria-label': 'Account password',
        name: 'password',
        autocomplete: 'current-password',
      },
    });
    const input = screen.getByLabelText('Account password') as HTMLInputElement;
    const toggle = screen.getByRole('button', { name: 'Show password' });
    expect(input.type).toBe('password');
    expect(input.value).toBe('secret');
    expect(toggle.getAttribute('aria-controls')).toBe(input.id);
    expect(toggle.getAttribute('aria-pressed')).toBe('false');
    await fireEvent.click(toggle);
    expect(input.type).toBe('text');
    expect(input.value).toBe('secret');
    expect(screen.getByRole('button', { name: 'Hide password' })).toBe(toggle);
    expect(toggle.getAttribute('aria-pressed')).toBe('true');
    expect((await axe.run(input.parentElement!)).violations).toEqual([]);
  });
  it('steps and clamps a native number input', async () => {
    const changed = vi.fn();
    render(NumberInput, {
      props: {
        defaultValue: 2,
        min: 0,
        max: 3,
        'onUpdate:modelValue': changed,
      },
      attrs: { 'aria-label': 'Quantity' },
    });
    const input = screen.getByRole('spinbutton', {
      name: 'Quantity',
    }) as HTMLInputElement;
    const increment = screen.getByRole('button', { name: 'Increase value' });
    expect(increment.getAttribute('aria-controls')).toBe(input.id);
    await fireEvent.click(increment);
    expect(input.valueAsNumber).toBe(3);
    expect(changed).toHaveBeenLastCalledWith(3);
    expect((increment as HTMLButtonElement).disabled).toBe(true);
    expect((await axe.run(input.parentElement!)).violations).toEqual([]);
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
  it('groups related buttons with a name and orientation', () => {
    render({
      components: {
        Button,
        ButtonGroup,
        ButtonGroupSeparator,
        ButtonGroupText,
      },
      template: `<ButtonGroup aria-label="Text alignment"><ButtonGroupText>Align</ButtonGroupText><Button>Left</Button><ButtonGroupSeparator /><Button>Right</Button></ButtonGroup>`,
    });
    const group = screen.getByRole('group', { name: 'Text alignment' });
    expect(group.getAttribute('aria-orientation')).toBe('horizontal');
    expect(screen.getByRole('separator').getAttribute('aria-orientation')).toBe(
      'vertical',
    );
    expect(screen.getAllByRole('button')).toHaveLength(2);
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
  it('groups an input with a decorative addon without changing its form value', () => {
    const view = render({
      components: { Input, InputGroup, InputGroupAddon, InputGroupText },
      template: `<form><label id="website-label" for="website">Website</label><InputGroup aria-labelledby="website-label"><InputGroupAddon decorative><InputGroupText>https://</InputGroupText></InputGroupAddon><Input id="website" name="website" model-value="example.com" /></InputGroup></form>`,
    });
    const group = screen.getByRole('group', { name: 'Website' });
    const input = screen.getByRole('textbox', { name: 'Website' });
    expect(
      group
        .querySelector('[data-slot=input-group-addon]')
        ?.getAttribute('aria-hidden'),
    ).toBe('true');
    expect(
      new FormData(view.container.querySelector('form')!).get('website'),
    ).toBe('example.com');
    expect(input).toBeTruthy();
  });
  it('filters, limits, and serializes one-time codes in one native input', async () => {
    const view = render({
      components: { InputOtp },
      data: () => ({ code: '' }),
      template: `<form><label for="code">Verification code</label><InputOtp id="code" name="code" :length="4" v-model="code" required /></form>`,
    });
    const input = screen.getByRole('textbox', {
      name: 'Verification code',
    }) as HTMLInputElement;
    await fireEvent.update(input, 'a1b2c3d4');
    expect(input.value).toBe('1234');
    expect(input.maxLength).toBe(4);
    expect(input.autocomplete).toBe('one-time-code');
    expect(
      new FormData(view.container.querySelector('form')!).get('code'),
    ).toBe('1234');
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
