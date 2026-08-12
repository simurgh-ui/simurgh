// @vitest-environment jsdom
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import axe from 'axe-core';
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
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
  FieldDescription,
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
  Disclosure,
  DisclosureContent,
  DisclosureSummary,
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
  Rating,
  TagsInput,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
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
  Toggle,
  VisuallyHidden,
} from '../src/index.js';

afterEach(cleanup);

describe('React accessibility contract', () => {
  it('opens a named modal and passes an axe audit', async () => {
    render(
      <Dialog>
        <DialogTrigger>Open profile</DialogTrigger>
        <DialogContent>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Update your public details.</DialogDescription>
          <button>Save</button>
        </DialogContent>
      </Dialog>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Open profile' }));
    expect(screen.getByRole('dialog', { name: 'Edit profile' })).toBeTruthy();
    expect((await axe.run(document.body)).violations).toEqual([]);
  });

  it('opens a side-anchored sheet and restores trigger focus', async () => {
    render(
      <Sheet>
        <SheetTrigger>Open filters</SheetTrigger>
        <SheetContent side="left">
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Narrow the results.</SheetDescription>
          <SheetClose>Done</SheetClose>
        </SheetContent>
      </Sheet>,
    );
    const trigger = screen.getByRole('button', { name: 'Open filters' });
    trigger.focus();
    fireEvent.click(trigger);
    const sheet = screen.getByRole('dialog', { name: 'Filters' });
    expect(sheet.getAttribute('data-side')).toBe('left');
    await act(() => new Promise((resolve) => requestAnimationFrame(resolve)));
    expect(document.activeElement).toBe(sheet);
    fireEvent.click(screen.getByRole('button', { name: 'Done' }));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it('opens a bottom drawer and restores trigger focus', async () => {
    render(
      <Drawer>
        <DrawerTrigger>Edit profile</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>Update your details.</DrawerDescription>
          <DrawerClose>Done</DrawerClose>
        </DrawerContent>
      </Drawer>,
    );
    const trigger = screen.getByRole('button', { name: 'Edit profile' });
    trigger.focus();
    fireEvent.click(trigger);
    const drawer = screen.getByRole('dialog', { name: 'Edit profile' });
    expect(drawer.getAttribute('data-side')).toBe('bottom');
    expect(drawer.hasAttribute('data-drawer')).toBe(true);
    await act(() => new Promise((resolve) => requestAnimationFrame(resolve)));
    expect(document.activeElement).toBe(drawer);
    fireEvent.click(screen.getByRole('button', { name: 'Done' }));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it('focuses the safe action in a destructive alert dialog', async () => {
    const confirmed = vi.fn();
    render(
      <AlertDialog>
        <AlertDialogTrigger>Delete project</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>
            This cannot be undone.
          </AlertDialogDescription>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={confirmed}>Delete</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>,
    );
    const trigger = screen.getByRole('button', { name: 'Delete project' });
    trigger.focus();
    fireEvent.click(trigger);
    expect(
      screen.getByRole('alertdialog', { name: 'Delete project?' }),
    ).toBeTruthy();
    await act(() => new Promise((resolve) => requestAnimationFrame(resolve)));
    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: 'Cancel' }),
    );
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(confirmed).toHaveBeenCalledOnce();
    expect(screen.queryByRole('alertdialog')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it('opens a labelled hover card with pointer and keyboard focus', () => {
    render(
      <HoverCard>
        <HoverCardTrigger>Simurgh</HoverCardTrigger>
        <HoverCardContent label="Simurgh profile">
          Cross-framework components
        </HoverCardContent>
      </HoverCard>,
    );
    const trigger = screen.getByRole('button', { name: 'Simurgh' });
    fireEvent.mouseEnter(trigger);
    expect(
      screen.getByRole('dialog', { name: 'Simurgh profile' }),
    ).toBeTruthy();
    fireEvent.mouseLeave(trigger);
    expect(screen.queryByRole('dialog')).toBeNull();
    fireEvent.focus(trigger);
    expect(
      screen.getByRole('dialog', { name: 'Simurgh profile' }),
    ).toBeTruthy();
  });

  it('opens a context menu at the pointer and supports keyboard selection', async () => {
    const selected = vi.fn();
    render(
      <ContextMenu>
        <ContextMenuTrigger>Canvas</ContextMenuTrigger>
        <ContextMenuContent aria-label="Canvas actions">
          <ContextMenuItem disabled>Cut</ContextMenuItem>
          <ContextMenuItem onSelect={selected}>Copy</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );
    fireEvent.contextMenu(screen.getByText('Canvas'), {
      clientX: 24,
      clientY: 36,
    });
    const menu = screen.getByRole('menu', { name: 'Canvas actions' });
    await act(() => new Promise((resolve) => requestAnimationFrame(resolve)));
    expect(document.activeElement).toBe(
      screen.getByRole('menuitem', { name: 'Copy' }),
    );
    fireEvent.keyDown(menu, { key: 'Enter' });
    expect(selected).toHaveBeenCalledOnce();
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('serializes checkbox state and emits changes', () => {
    const change = vi.fn();
    render(
      <form>
        <Checkbox name="newsletter" value="yes" onCheckedChange={change}>
          Newsletter
        </Checkbox>
      </form>,
    );
    fireEvent.click(screen.getByRole('checkbox', { name: 'Newsletter' }));
    expect(change).toHaveBeenCalledWith(true);
    const data = new FormData(document.querySelector('form')!);
    expect(data.get('newsletter')).toBe('yes');
  });

  it('uses RTL-aware tab navigation', () => {
    render(
      <Tabs defaultValue="one" direction="rtl">
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">First</TabsContent>
        <TabsContent value="two">Second</TabsContent>
      </Tabs>,
    );
    const one = screen.getByRole('tab', { name: 'One' });
    one.focus();
    fireEvent.keyDown(one.parentElement!, { key: 'ArrowLeft' });
    expect(
      screen.getByRole('tab', { name: 'Two' }).getAttribute('aria-selected'),
    ).toBe('true');
  });

  it('moves menu focus and selects with the keyboard', async () => {
    const second = vi.fn();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>First</DropdownMenuItem>
          <DropdownMenuItem onSelect={second}>Second</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
    await act(() => new Promise(requestAnimationFrame));
    expect(document.activeElement?.textContent).toBe('First');
    fireEvent.keyDown(screen.getByRole('menu'), { key: 'ArrowDown' });
    expect(document.activeElement?.textContent).toBe('Second');
    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Enter' });
    expect(second).toHaveBeenCalledOnce();
  });

  it('selects and serializes listbox options from the keyboard', async () => {
    render(
      <form>
        <Select
          name="city"
          placeholder="Choose city"
          options={[
            { value: 'tehran', label: 'Tehran' },
            { value: 'isfahan', label: 'Isfahan' },
          ]}
        />
      </form>,
    );
    const trigger = screen.getByRole('combobox', { name: 'Choose city' });
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    await act(() => new Promise(requestAnimationFrame));
    const listbox = screen.getByRole('listbox');
    expect(document.activeElement?.textContent).toBe('Tehran');
    fireEvent.keyDown(listbox, { key: 'ArrowDown' });
    fireEvent.keyDown(listbox, { key: 'Enter' });
    expect(trigger.textContent).toBe('Isfahan');
    expect(new FormData(document.querySelector('form')!).get('city')).toBe(
      'isfahan',
    );
  });
  it('serializes native select values and preserves invalid semantics', () => {
    render(
      <form>
        <label htmlFor="timezone">Timezone</label>
        <NativeSelect id="timezone" name="timezone" defaultValue="utc" invalid>
          <option value="utc">UTC</option>
          <option value="tehran">Tehran</option>
        </NativeSelect>
      </form>,
    );
    const select = screen.getByRole('combobox', { name: 'Timezone' });
    expect(select.getAttribute('aria-invalid')).toBe('true');
    expect(
      new FormData((select as HTMLSelectElement).form!).get('timezone'),
    ).toBe('utc');
  });
  it('navigates and serializes a radio group', () => {
    render(
      <form>
        <RadioGroup name="plan" defaultValue="basic">
          <RadioGroupItem value="basic">Basic</RadioGroupItem>
          <RadioGroupItem value="pro">Pro</RadioGroupItem>
        </RadioGroup>
      </form>,
    );
    const basic = screen.getByRole('radio', { name: 'Basic' });
    basic.focus();
    fireEvent.keyDown(basic.parentElement!, { key: 'ArrowRight' });
    expect(
      screen.getByRole('radio', { name: 'Pro' }).getAttribute('aria-checked'),
    ).toBe('true');
    expect(new FormData(document.querySelector('form')!).get('plan')).toBe(
      'pro',
    );
  });
  it('filters and commits a combobox option without moving input focus', async () => {
    render(
      <main>
        <form>
          <Combobox
            name="city"
            placeholder="Search cities"
            options={[
              { value: 'tehran', label: 'Tehran' },
              { value: 'isfahan', label: 'Isfahan' },
              { value: 'shiraz', label: 'Shiraz', disabled: true },
            ]}
          />
        </form>
      </main>,
    );
    const input = screen.getByRole('combobox', { name: 'Search cities' });
    input.focus();
    fireEvent.change(input, { target: { value: 'isf' } });
    expect(screen.getByRole('option', { name: 'Isfahan' })).toBeTruthy();
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input.getAttribute('aria-activedescendant')).toBe(
      screen.getByRole('option').id,
    );
    expect(document.activeElement).toBe(input);
    fireEvent.keyDown(input, { key: 'Enter' });
    expect((input as HTMLInputElement).value).toBe('Isfahan');
    expect(new FormData(document.querySelector('form')!).get('city')).toBe(
      'isfahan',
    );
    expect((await axe.run(document.body)).violations).toEqual([]);
  });
  it('runs an enabled command while skipping disabled results', () => {
    const selected = vi.fn();
    render(
      <Command
        placeholder="Search commands"
        options={[
          { value: 'locked', label: 'Locked action', disabled: true },
          { value: 'settings', label: 'Open settings' },
        ]}
        onValueChange={selected}
      />,
    );
    const input = screen.getByRole('combobox', { name: 'Search commands' });
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input.getAttribute('aria-activedescendant')).toBe(
      screen.getByRole('option', { name: 'Open settings' }).id,
    );
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(selected).toHaveBeenCalledWith('settings');
    expect((input as HTMLInputElement).value).toBe('Open settings');
  });
  it('selects and keyboard-navigates a labelled calendar grid', async () => {
    const selected = vi.fn();
    const view = render(
      <form>
        <Calendar
          defaultValue="2026-08-12"
          defaultMonth="2026-08"
          name="appointment"
          label="Appointment calendar"
          disabledDates={['2026-08-14']}
          onValueChange={selected}
        />
      </form>,
    );
    expect(screen.getByRole('grid', { name: 'August 2026' })).toBeTruthy();
    const twelfth = screen.getByRole('button', {
      name: 'Wednesday, August 12, 2026',
    });
    twelfth.focus();
    fireEvent.keyDown(twelfth, { key: 'ArrowRight' });
    await act(() => new Promise((resolve) => requestAnimationFrame(resolve)));
    const thirteenth = screen.getByRole('button', {
      name: 'Thursday, August 13, 2026',
    });
    expect(document.activeElement).toBe(thirteenth);
    fireEvent.click(thirteenth);
    expect(selected).toHaveBeenCalledWith('2026-08-13');
    const fourteenth = screen.getByRole('button', {
      name: 'Friday, August 14, 2026',
    });
    expect(fourteenth.getAttribute('aria-disabled')).toBe('true');
    fireEvent.click(fourteenth);
    expect(selected).toHaveBeenCalledOnce();
    expect(
      new FormData(view.container.querySelector('form')!).get('appointment'),
    ).toBe('2026-08-13');
    expect((await axe.run(view.container)).violations).toEqual([]);
  });
  it('selects a date from a popup and restores trigger focus', async () => {
    const selected = vi.fn();
    const view = render(
      <form>
        <DatePicker
          defaultValue="2026-08-12"
          defaultMonth="2026-08"
          name="appointment"
          label="Appointment date"
          onValueChange={selected}
        />
      </form>,
    );
    const trigger = screen.getByRole('button', { name: 'Aug 12, 2026' });
    await act(async () => fireEvent.click(trigger));
    expect(screen.getByRole('grid', { name: 'August 2026' })).toBeTruthy();
    await act(async () =>
      fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' }),
    );
    expect(screen.queryByRole('grid')).toBeNull();
    await act(async () => fireEvent.click(trigger));
    await act(async () => {
      expect((await axe.run(document.body)).violations).toEqual([]);
    });
    await act(async () =>
      fireEvent.click(
        screen.getByRole('button', { name: 'Thursday, August 13, 2026' }),
      ),
    );
    await act(() => new Promise((resolve) => requestAnimationFrame(resolve)));
    expect(selected).toHaveBeenCalledWith('2026-08-13');
    expect(document.activeElement).toBe(trigger);
    expect(screen.queryByRole('grid')).toBeNull();
    expect(
      new FormData(view.container.querySelector('form')!).get('appointment'),
    ).toBe('2026-08-13');
  });
  it('labels slides and bounds carousel navigation', async () => {
    const changed = vi.fn();
    render(
      <Carousel label="Featured projects" onIndexChange={changed}>
        <CarouselContent>
          <CarouselItem>Design system</CarouselItem>
          <CarouselItem>Documentation</CarouselItem>
        </CarouselContent>
        <CarouselPrevious>‹</CarouselPrevious>
        <CarouselNext>›</CarouselNext>
      </Carousel>,
    );
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
    fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));
    expect(screen.getByRole('group', { name: '2 of 2' }).textContent).toBe(
      'Documentation',
    );
    expect(
      (screen.getByRole('button', { name: 'Next slide' }) as HTMLButtonElement)
        .disabled,
    ).toBe(true);
    fireEvent.keyDown(region, { key: 'ArrowLeft' });
    expect(changed).toHaveBeenLastCalledWith(0);
    expect((await axe.run(region)).violations).toEqual([]);
  });
  it('resizes adjacent panels with a constrained keyboard separator', async () => {
    render(
      <ResizablePanelGroup aria-label="Workspace panels">
        <ResizablePanel defaultSize={35} minSize={20} maxSize={80}>
          Navigation
        </ResizablePanel>
        <ResizableHandle aria-label="Resize panels" />
        <ResizablePanel defaultSize={65} minSize={30}>
          Content
        </ResizablePanel>
      </ResizablePanelGroup>,
    );
    const handle = screen.getByRole('separator', { name: 'Resize panels' });
    expect(handle.getAttribute('aria-valuenow')).toBe('35');
    expect(handle.getAttribute('aria-valuemax')).toBe('70');
    fireEvent.keyDown(handle, { key: 'ArrowRight' });
    expect(handle.getAttribute('aria-valuenow')).toBe('40');
    fireEvent.keyDown(handle, { key: 'End' });
    expect(handle.getAttribute('aria-valuenow')).toBe('70');
    expect((screen.getByText('Content') as HTMLElement).style.flexBasis).toBe(
      '30%',
    );
    expect((await axe.run(handle.parentElement!)).violations).toEqual([]);
  });
  it('toggles a labelled navigation sidebar without exposing hidden links', async () => {
    const changed = vi.fn();
    render(
      <SidebarProvider onOpenChange={changed}>
        <SidebarTrigger>Toggle navigation</SidebarTrigger>
        <Sidebar aria-label="Workspace navigation">
          <SidebarContent>
            <SidebarMenu>
              <li>
                <a href="/projects">Projects</a>
              </li>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );
    const trigger = screen.getByRole('button', { name: 'Toggle navigation' });
    const sidebar = screen.getByRole('complementary', {
      name: 'Workspace navigation',
    });
    expect(trigger.getAttribute('aria-controls')).toBe(sidebar.id);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect((await axe.run(sidebar.parentElement!)).violations).toEqual([]);
    fireEvent.click(trigger);
    expect(changed).toHaveBeenLastCalledWith(false);
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(sidebar.hidden).toBe(true);
    expect(screen.queryByRole('link', { name: 'Projects' })).toBeNull();
  });
  it('navigates and collapses a hierarchical tree with roving focus', async () => {
    render(
      <Tree aria-label="Files">
        <TreeItem label="Documents" defaultExpanded>
          <TreeItem label="Guide" />
          <TreeItem label="Locked" disabled />
        </TreeItem>
        <TreeItem label="Images" />
      </Tree>,
    );
    const tree = screen.getByRole('tree', { name: 'Files' });
    const documents = screen.getByRole('treeitem', { name: 'Documents' });
    const guide = screen.getByRole('treeitem', { name: 'Guide' });
    const images = screen.getByRole('treeitem', { name: 'Images' });
    expect(documents.tabIndex).toBe(0);
    expect(guide.tabIndex).toBe(-1);
    documents.focus();
    fireEvent.keyDown(documents, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(guide);
    fireEvent.keyDown(guide, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(images);
    fireEvent.keyDown(images, { key: 'Home' });
    expect(document.activeElement).toBe(documents);
    fireEvent.keyDown(documents, { key: 'ArrowLeft' });
    expect(documents.getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByRole('treeitem', { name: 'Guide' })).toBeNull();
    expect((await axe.run(tree)).violations).toEqual([]);
  });
  it('filters and announces files selected through the native upload input', async () => {
    const changed = vi.fn();
    render(
      <FileUpload
        label="Upload documents"
        description="PDF files only"
        accept=".pdf"
        multiple
        onFilesChange={changed}
      />,
    );
    const input = screen.getByLabelText(/Upload documents/) as HTMLInputElement;
    expect(input.type).toBe('file');
    expect(input.accept).toBe('.pdf');
    expect(input.multiple).toBe(true);
    const pdf = new File(['pdf'], 'guide.pdf', { type: 'application/pdf' });
    const text = new File(['text'], 'notes.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [pdf, text] } });
    expect(changed).toHaveBeenLastCalledWith([pdf]);
    expect(screen.getByText('guide.pdf')).toBeTruthy();
    expect((await axe.run(input.parentElement!)).violations).toEqual([]);
  });
  it('reveals a password without replacing its native form control', async () => {
    render(
      <PasswordInput
        aria-label="Account password"
        name="password"
        autoComplete="current-password"
        defaultValue="secret"
      />,
    );
    const input = screen.getByLabelText('Account password') as HTMLInputElement;
    const toggle = screen.getByRole('button', { name: 'Show password' });
    expect(input.type).toBe('password');
    expect(input.value).toBe('secret');
    expect(toggle.getAttribute('aria-controls')).toBe(input.id);
    expect(toggle.getAttribute('aria-pressed')).toBe('false');
    fireEvent.click(toggle);
    expect(input.type).toBe('text');
    expect(input.value).toBe('secret');
    expect(screen.getByRole('button', { name: 'Hide password' })).toBe(toggle);
    expect(toggle.getAttribute('aria-pressed')).toBe('true');
    expect((await axe.run(input.parentElement!)).violations).toEqual([]);
  });
  it('steps and clamps a native number input', async () => {
    const changed = vi.fn();
    render(
      <NumberInput
        aria-label="Quantity"
        defaultValue={2}
        min={0}
        max={3}
        onValueChange={changed}
      />,
    );
    const input = screen.getByRole('spinbutton', {
      name: 'Quantity',
    }) as HTMLInputElement;
    const increment = screen.getByRole('button', { name: 'Increase value' });
    expect(increment.getAttribute('aria-controls')).toBe(input.id);
    fireEvent.click(increment);
    expect(input.valueAsNumber).toBe(3);
    expect(changed).toHaveBeenLastCalledWith(3);
    expect((increment as HTMLButtonElement).disabled).toBe(true);
    expect((await axe.run(input.parentElement!)).violations).toEqual([]);
  });
  it('selects and submits an accessible native rating', async () => {
    const changed = vi.fn();
    render(
      <form data-testid="rating-form">
        <Rating
          aria-label="Product rating"
          name="rating"
          defaultValue={2}
          onValueChange={changed}
        />
      </form>,
    );
    const four = screen.getByRole('radio', { name: '4 of 5' });
    fireEvent.click(four);
    expect((four as HTMLInputElement).checked).toBe(true);
    expect(changed).toHaveBeenLastCalledWith(4);
    const form = screen.getByTestId('rating-form') as HTMLFormElement;
    expect(new FormData(form).get('rating')).toBe('4');
    expect((await axe.run(form)).violations).toEqual([]);
  });
  it('adds, submits, and removes tags with the keyboard', async () => {
    const changed = vi.fn();
    render(
      <form data-testid="tags-form">
        <TagsInput
          aria-label="Skills"
          inputLabel="Add skill"
          name="skills"
          defaultValue={['TypeScript']}
          onValueChange={changed}
        />
      </form>,
    );
    const input = screen.getByRole('textbox', { name: 'Add skill' });
    fireEvent.change(input, { target: { value: 'Accessibility' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.getByText('Accessibility')).toBeTruthy();
    expect(changed).toHaveBeenLastCalledWith(['TypeScript', 'Accessibility']);
    const form = screen.getByTestId('tags-form') as HTMLFormElement;
    expect(new FormData(form).getAll('skills')).toEqual([
      'TypeScript',
      'Accessibility',
    ]);
    fireEvent.click(
      screen.getByRole('button', { name: 'Remove Accessibility' }),
    );
    expect(screen.queryByText('Accessibility')).toBeNull();
    expect((await axe.run(form)).violations).toEqual([]);
  });
  it('associates a native label with its form control', async () => {
    render(
      <main>
        <Label htmlFor="email">Email address</Label>
        <input id="email" />
      </main>,
    );
    expect(screen.getByLabelText('Email address').id).toBe('email');
    expect((await axe.run(document.body)).violations).toEqual([]);
  });
  it('exposes separator orientation and decorative mode', () => {
    const { rerender } = render(<Separator orientation="vertical" />);
    expect(screen.getByRole('separator').getAttribute('aria-orientation')).toBe(
      'vertical',
    );
    rerender(<Separator decorative data-testid="separator" />);
    expect(screen.getByTestId('separator').getAttribute('aria-hidden')).toBe(
      'true',
    );
    expect(screen.queryByRole('separator')).toBeNull();
  });
  it('clamps determinate progress and omits value when indeterminate', () => {
    const { rerender } = render(
      <Progress aria-label="Upload" value={120} max={80} />,
    );
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe(
      '80',
    );
    rerender(<Progress aria-label="Upload" />);
    expect(screen.getByRole('progressbar').hasAttribute('aria-valuenow')).toBe(
      false,
    );
  });
  it('toggles native pressed state and emits changes', () => {
    const changed = vi.fn();
    render(<Toggle onPressedChange={changed}>Bold</Toggle>);
    const toggle = screen.getByRole('button', { name: 'Bold' });
    fireEvent.click(toggle);
    expect(toggle.getAttribute('aria-pressed')).toBe('true');
    expect(changed).toHaveBeenCalledWith(true);
  });
  it('keeps visually hidden text in an accessible name', () => {
    render(
      <button type="button">
        <span aria-hidden="true">×</span>
        <VisuallyHidden>Close dialog</VisuallyHidden>
      </button>,
    );
    const button = screen.getByRole('button', { name: 'Close dialog' });
    expect((button.lastElementChild as HTMLElement).style.position).toBe(
      'absolute',
    );
  });
  it('shows avatar fallback until its image loads', () => {
    render(<Avatar src="avatar.jpg" alt="Ada Lovelace" fallback="AL" />);
    expect(screen.getByText('AL')).toBeTruthy();
    const image = screen.getByAltText('Ada Lovelace');
    fireEvent.load(image);
    expect(image.hasAttribute('hidden')).toBe(false);
    expect(screen.queryByText('AL')).toBeNull();
  });
  it('uses polite status by default and assertive semantics when urgent', () => {
    const { rerender } = render(<Alert>Profile saved</Alert>);
    expect(screen.getByRole('status').getAttribute('aria-live')).toBe('polite');
    rerender(<Alert urgent>Connection lost</Alert>);
    expect(screen.getByRole('alert').getAttribute('aria-live')).toBe(
      'assertive',
    );
  });
  it('applies a safe aspect ratio while preserving consumer styles', () => {
    render(<AspectRatio ratio={0} style={{ overflow: 'hidden' }} />);
    const ratio = document.querySelector('[data-ratio]') as HTMLElement;
    expect(ratio.dataset['ratio']).toBe('1');
    expect(ratio.style.aspectRatio).toBe('1');
    expect(ratio.style.overflow).toBe('hidden');
  });
  it('keeps skeletons decorative unless a loading label is supplied', () => {
    const { rerender } = render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton').getAttribute('aria-hidden')).toBe(
      'true',
    );
    rerender(<Skeleton label="Loading profile" />);
    expect(
      screen.getByRole('status', { name: 'Loading profile' }),
    ).toBeTruthy();
  });
  it('provides a named busy status for spinners', () => {
    render(<Spinner label="Loading results" />);
    const spinner = screen.getByRole('status', { name: 'Loading results' });
    expect(spinner.getAttribute('aria-busy')).toBe('true');
    expect(spinner.firstElementChild?.getAttribute('aria-hidden')).toBe('true');
  });
  it('defaults buttons safely and blocks activation while loading', () => {
    const clicked = vi.fn();
    render(
      <Button loading onClick={clicked}>
        Save
      </Button>,
    );
    const button = screen.getByRole('button', {
      name: 'Save',
    }) as HTMLButtonElement;
    expect(button.type).toBe('button');
    expect(button.disabled).toBe(true);
    fireEvent.click(button);
    expect(clicked).not.toHaveBeenCalled();
  });
  it('groups related buttons with a name and orientation', () => {
    render(
      <ButtonGroup aria-label="Text alignment">
        <ButtonGroupText>Align</ButtonGroupText>
        <Button>Left</Button>
        <ButtonGroupSeparator />
        <Button>Right</Button>
      </ButtonGroup>,
    );
    const group = screen.getByRole('group', { name: 'Text alignment' });
    expect(group.getAttribute('aria-orientation')).toBe('horizontal');
    expect(screen.getByRole('separator').getAttribute('aria-orientation')).toBe(
      'vertical',
    );
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });
  it('preserves native link semantics and safely disables navigation', () => {
    const clicked = vi.fn();
    const { rerender } = render(
      <Link href="/docs" external onClick={clicked}>
        Documentation
      </Link>,
    );
    const link = screen.getByRole('link', { name: 'Documentation' });
    expect(link.getAttribute('href')).toBe('/docs');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    rerender(
      <Link href="/docs" disabled onClick={clicked}>
        Documentation
      </Link>,
    );
    const disabled = screen.getByText('Documentation');
    expect(disabled.getAttribute('href')).toBeNull();
    expect(disabled.getAttribute('aria-disabled')).toBe('true');
    expect(disabled.getAttribute('tabindex')).toBe('-1');
    fireEvent.click(disabled);
    expect(clicked).not.toHaveBeenCalled();
  });
  it('provides a named navigation landmark with current-page semantics', () => {
    render(
      <NavigationMenu label="Primary">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/" current>
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/docs">Docs</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeTruthy();
    expect(screen.getByRole('list').children).toHaveLength(2);
    expect(
      screen.getByRole('link', { name: 'Home' }).getAttribute('aria-current'),
    ).toBe('page');
    expect(screen.getByRole('link', { name: 'Docs' }).tabIndex).toBe(0);
  });
  it('provides RTL-aware roving focus in a named menubar', () => {
    render(
      <Menubar label="Editor" direction="rtl">
        <MenubarItem>File</MenubarItem>
        <MenubarItem disabled>Edit</MenubarItem>
        <MenubarItem>View</MenubarItem>
      </Menubar>,
    );
    const file = screen.getByRole('menuitem', { name: 'File' });
    file.focus();
    fireEvent.keyDown(file, { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(
      screen.getByRole('menuitem', { name: 'View' }),
    );
    expect(screen.getByRole('menubar', { name: 'Editor' })).toBeTruthy();
  });
  it('preserves native input form and invalid semantics', () => {
    render(
      <form>
        <Input name="email" defaultValue="ada@example.com" required invalid />
      </form>,
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.required).toBe(true);
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(new FormData(input.form!).get('email')).toBe('ada@example.com');
  });
  it('groups an input with a decorative addon without changing its form value', () => {
    render(
      <form>
        <label id="website-label" htmlFor="website">
          Website
        </label>
        <InputGroup aria-labelledby="website-label">
          <InputGroupAddon decorative>
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <Input id="website" name="website" defaultValue="example.com" />
        </InputGroup>
      </form>,
    );
    const group = screen.getByRole('group', { name: 'Website' });
    const input = screen.getByRole('textbox', { name: 'Website' });
    expect(
      group
        .querySelector('[data-slot=input-group-addon]')
        ?.getAttribute('aria-hidden'),
    ).toBe('true');
    expect(new FormData((input as HTMLInputElement).form!).get('website')).toBe(
      'example.com',
    );
  });
  it('filters, limits, and serializes one-time codes in one native input', () => {
    render(
      <form>
        <label htmlFor="code">Verification code</label>
        <InputOtp id="code" name="code" length={4} required />
      </form>,
    );
    const input = screen.getByRole('textbox', {
      name: 'Verification code',
    }) as HTMLInputElement;
    fireEvent.input(input, { target: { value: 'a1b2c3d4' } });
    expect(input.value).toBe('1234');
    expect(input.maxLength).toBe(4);
    expect(input.autocomplete).toBe('one-time-code');
    expect(new FormData(input.form!).get('code')).toBe('1234');
  });
  it('uses native slider constraints and form serialization', () => {
    render(
      <form>
        <Slider
          aria-label="Volume"
          name="volume"
          defaultValue={40}
          min={0}
          max={80}
          step={10}
        />
      </form>,
    );
    const slider = screen.getByRole('slider', {
      name: 'Volume',
    }) as HTMLInputElement;
    expect(slider.value).toBe('40');
    expect(slider.max).toBe('80');
    expect(new FormData(slider.form!).get('volume')).toBe('40');
  });
  it('clamps a named native meter and preserves thresholds', () => {
    render(
      <Meter
        label="Storage used"
        value={120}
        max={100}
        low={40}
        high={80}
        optimum={20}
      />,
    );
    const meter = screen.getByRole('meter', {
      name: 'Storage used',
    }) as HTMLMeterElement;
    expect(meter.value).toBe(100);
    expect(meter.high).toBe(80);
    expect(meter.optimum).toBe(20);
  });
  it('moves toolbar focus logically and skips disabled items', () => {
    render(
      <Toolbar label="Editor">
        <ToolbarButton>Bold</ToolbarButton>
        <ToolbarButton disabled>Italic</ToolbarButton>
        <ToolbarButton>Link</ToolbarButton>
      </Toolbar>,
    );
    const bold = screen.getByRole('button', { name: 'Bold' });
    bold.focus();
    fireEvent.keyDown(bold, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: 'Link' }),
    );
    expect(screen.getByRole('toolbar', { name: 'Editor' })).toBeTruthy();
  });
  it('selects one toggle-group item and moves focus', () => {
    render(
      <ToggleGroup aria-label="Alignment">
        <ToggleGroupItem value="start">Start</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
      </ToggleGroup>,
    );
    const start = screen.getByRole('button', { name: 'Start' });
    fireEvent.click(start);
    expect(start.getAttribute('aria-pressed')).toBe('true');
    start.focus();
    fireEvent.keyDown(start, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: 'Center' }),
    );
  });
  it('creates a focusable named native scroll region', () => {
    render(
      <ScrollArea label="Activity" orientation="both">
        Updates
      </ScrollArea>,
    );
    const area = screen.getByRole('region', { name: 'Activity' });
    expect(area.getAttribute('tabindex')).toBe('0');
    expect(area.getAttribute('data-orientation')).toBe('both');
  });
  it('serializes native textarea values', () => {
    render(
      <form>
        <Textarea name="bio" defaultValue="Poet" required />
      </form>,
    );
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(new FormData(textarea.form!).get('bio')).toBe('Poet');
  });
  it('keeps badges neutral unless dynamic status is requested', () => {
    const { rerender } = render(<Badge tone="success">Published</Badge>);
    expect(screen.getByText('Published').getAttribute('data-tone')).toBe(
      'success',
    );
    expect(screen.queryByRole('status')).toBeNull();
    rerender(<Badge status>Published</Badge>);
    expect(screen.getByRole('status').getAttribute('aria-live')).toBe('polite');
  });
  it('provides a named breadcrumb landmark with a current page', () => {
    render(
      <Breadcrumb>
        <ol>
          <li>
            <a href="/docs">Docs</a>
          </li>
          <li>
            <span aria-current="page">Button</span>
          </li>
        </ol>
      </Breadcrumb>,
    );
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeTruthy();
    expect(screen.getByText('Button').getAttribute('aria-current')).toBe(
      'page',
    );
  });
  it('composes card anatomy with native heading semantics', () => {
    render(
      <Card>
        <CardTitle>Release</CardTitle>
        <CardDescription>Ready to publish</CardDescription>
      </Card>,
    );
    expect(
      screen.getByRole('heading', { name: 'Release', level: 3 }),
    ).toBeTruthy();
    expect(screen.getByText('Ready to publish').getAttribute('data-slot')).toBe(
      'card-description',
    );
  });
  it('keeps static empty content neutral and supports polite updates', () => {
    const { rerender } = render(
      <Empty>
        <EmptyMedia>+</EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>No projects yet</EmptyTitle>
          <EmptyDescription>Create a project to begin.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Create project</Button>
        </EmptyContent>
      </Empty>,
    );
    expect(screen.queryByRole('status')).toBeNull();
    expect(
      screen.getByRole('heading', { name: 'No projects yet', level: 3 }),
    ).toBeTruthy();
    expect(screen.getByText('+').getAttribute('aria-hidden')).toBe('true');
    rerender(
      <Empty status>
        <EmptyTitle>No results</EmptyTitle>
      </Empty>,
    );
    expect(screen.getByRole('status').getAttribute('aria-live')).toBe('polite');
  });
  it('composes named lists with structured item content and actions', () => {
    render(
      <ItemGroup aria-label="Projects">
        <Item>
          <ItemMedia>D</ItemMedia>
          <ItemContent>
            <ItemTitle>Design system</ItemTitle>
            <ItemDescription>Updated recently</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button>Open</Button>
          </ItemActions>
        </Item>
      </ItemGroup>,
    );
    expect(screen.getByRole('list', { name: 'Projects' })).toBeTruthy();
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(
      screen.getByRole('heading', { name: 'Design system', level: 3 }),
    ).toBeTruthy();
    expect(screen.getByText('D').getAttribute('aria-hidden')).toBe('true');
    expect(screen.getByRole('button', { name: 'Open' })).toBeTruthy();
  });
  it('renders keyboard input with native semantics', () => {
    render(<Kbd>Ctrl K</Kbd>);
    expect(screen.getByText('Ctrl K').tagName).toBe('KBD');
  });
  it('groups controls with native field semantics', () => {
    render(
      <Field>
        <FieldLegend>Notifications</FieldLegend>
        <FieldDescription id="notice-help">
          Choose delivery channels.
        </FieldDescription>
        <label>
          <input type="checkbox" aria-describedby="notice-help" /> Email
        </label>
        <FieldError>Choose at least one.</FieldError>
      </Field>,
    );
    expect(screen.getByRole('group', { name: 'Notifications' })).toBeTruthy();
    expect(screen.getByRole('alert').textContent).toBe('Choose at least one.');
  });
  it('focuses the first invalid form control and announces summary errors', async () => {
    const invalid = vi.fn();
    render(
      <Form onInvalid={invalid}>
        <label>
          Email <input name="email" required />
        </label>
        <FormErrorSummary>Correct the highlighted fields.</FormErrorSummary>
      </Form>,
    );
    const input = screen.getByRole('textbox', { name: 'Email' });
    fireEvent.invalid(input);
    await act(() => new Promise((resolve) => requestAnimationFrame(resolve)));
    expect(invalid).toHaveBeenCalledOnce();
    expect(document.activeElement).toBe(input);
    expect(screen.getByRole('alert').textContent).toContain('Correct');
  });
  it('renders a captioned native table', () => {
    render(
      <Table>
        <TableCaption>Recent releases</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Version</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>0.1.0</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.getByRole('table', { name: 'Recent releases' })).toBeTruthy();
    expect(
      screen
        .getByRole('columnheader', { name: 'Version' })
        .getAttribute('scope'),
    ).toBe('col');
  });
  it('names pagination and identifies the current page', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="?page=1">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="?page=2" current>
              2
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeTruthy();
    expect(
      screen.getByRole('link', { name: '2' }).getAttribute('aria-current'),
    ).toBe('page');
  });
  it('toggles collapsible content with linked semantics', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Details</CollapsibleTrigger>
        <CollapsibleContent>Hidden details</CollapsibleContent>
      </Collapsible>,
    );
    const trigger = screen.getByRole('button', { name: 'Details' });
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    fireEvent.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByText('Hidden details').hasAttribute('hidden')).toBe(
      false,
    );
  });
  it('uses native disclosure semantics and reports open changes', () => {
    const changed = vi.fn();
    render(
      <Disclosure onOpenChange={changed}>
        <DisclosureSummary>What is Simurgh?</DisclosureSummary>
        <DisclosureContent>A framework-neutral UI toolkit.</DisclosureContent>
      </Disclosure>,
    );
    const summary = screen.getByText('What is Simurgh?');
    const details = summary.closest('details') as HTMLDetailsElement;
    expect(details.open).toBe(false);
    details.open = true;
    fireEvent(details, new Event('toggle', { bubbles: true }));
    expect(details.open).toBe(true);
    expect(changed).toHaveBeenLastCalledWith(true);
  });
});
