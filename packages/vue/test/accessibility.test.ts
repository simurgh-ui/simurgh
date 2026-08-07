// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/vue';
import axe from 'axe-core';
import { afterEach, describe, expect, it } from 'vitest';
import {
  Checkbox,
  Avatar,
  Alert,
  AspectRatio,
  Skeleton,
  Spinner,
  Button,
  Input,
  Textarea,
  Badge,
  Breadcrumb,
  Combobox,
  Dialog,
  DialogContent,
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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  Toggle,
  VisuallyHidden,
} from '../src/index.js';

afterEach(cleanup);

describe('Vue accessibility contract', () => {
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
