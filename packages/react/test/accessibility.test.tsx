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
  Input,
  Slider,
  Meter,
  Toolbar,
  ToolbarButton,
  ToggleGroup,
  ToggleGroupItem,
  Textarea,
  Badge,
  Breadcrumb,
  Card,
  CardDescription,
  CardTitle,
  Kbd,
  Field,
  FieldDescription,
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
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
});
