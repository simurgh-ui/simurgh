// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/vue';
import axe from 'axe-core';
import { afterEach, describe, expect, it } from 'vitest';
import { Checkbox, Dialog, DialogContent, DialogTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, RadioGroup, RadioGroupItem, Select, Tabs, TabsContent, TabsList, TabsTrigger, Tooltip, TooltipContent, TooltipTrigger } from '../src/index.js';

afterEach(cleanup);

describe('Vue accessibility contract', () => {
  it('opens a modal and passes an axe audit', async () => {
    render({ components: { Dialog, DialogTrigger, DialogContent }, template: `<Dialog><DialogTrigger>Open settings</DialogTrigger><DialogContent aria-label="Settings"><button>Save</button></DialogContent></Dialog>` });
    const opener = screen.getByRole('button', { name: 'Open settings' }); opener.focus();
    await fireEvent.click(opener);
    const dialog = screen.getByRole('dialog', { name: 'Settings' });
    expect(document.activeElement).toBe(dialog);
    expect((await axe.run(document.body)).violations).toEqual([]);
    await fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(document.activeElement).toBe(opener);
  });

  it('supports checkbox model and native form state', async () => {
    const view = render({ components: { Checkbox }, data: () => ({ checked: false }), template: `<form><Checkbox v-model="checked" name="alerts" value="yes">Alerts</Checkbox></form>` });
    await fireEvent.click(screen.getByRole('checkbox', { name: 'Alerts' }));
    expect((view.getByRole('checkbox') as HTMLButtonElement).getAttribute('aria-checked')).toBe('true');
    expect(new FormData(view.container.querySelector('form')!).get('alerts')).toBe('yes');
  });

  it('activates tabs with keyboard input', async () => {
    render({ components: { Tabs, TabsList, TabsTrigger, TabsContent }, template: `<Tabs default-value="one"><TabsList><TabsTrigger value="one">One</TabsTrigger><TabsTrigger value="two">Two</TabsTrigger></TabsList><TabsContent value="one">First</TabsContent><TabsContent value="two">Second</TabsContent></Tabs>` });
    const one = screen.getByRole('tab', { name: 'One' }); one.focus();
    await fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowRight' });
    expect(screen.getByRole('tab', { name: 'Two' }).getAttribute('aria-selected')).toBe('true');
  });

  it('opens tooltips for hover and keyboard focus without click state', async () => {
    render({ components: { Tooltip, TooltipTrigger, TooltipContent }, template: `<Tooltip><TooltipTrigger>Information</TooltipTrigger><TooltipContent>Helpful context</TooltipContent></Tooltip>` });
    const trigger = screen.getByRole('button', { name: 'Information' });
    expect(screen.queryByRole('tooltip')).toBeNull();
    await fireEvent.mouseEnter(trigger);
    expect(screen.getByRole('tooltip').textContent).toContain('Helpful context');
    expect(trigger.getAttribute('aria-describedby')).toBe(screen.getByRole('tooltip').id);
    await fireEvent.mouseLeave(trigger); expect(screen.queryByRole('tooltip')).toBeNull();
    await fireEvent.focus(trigger); expect(screen.getByRole('tooltip')).toBeTruthy();
    await fireEvent.blur(trigger); expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('navigates and selects menu items from the keyboard', async () => {
    const selected = vi.fn();
    render({ components: { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem }, setup: () => ({ selected }), template: `<DropdownMenu><DropdownMenuTrigger>Actions</DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem>First</DropdownMenuItem><DropdownMenuItem @select="selected">Second</DropdownMenuItem></DropdownMenuContent></DropdownMenu>` });
    await fireEvent.click(screen.getByRole('button', { name: 'Actions' })); const items = screen.getAllByRole('menuitem'); items[0]!.focus();
    await fireEvent.keyDown(screen.getByRole('menu'), { key: 'ArrowDown' }); expect(document.activeElement).toBe(items[1]);
    await fireEvent.keyDown(screen.getByRole('menu'), { key: 'Enter' }); expect(selected).toHaveBeenCalledOnce();
  });

  it('selects listbox options with arrows and serializes the form', async () => {
    const view = render({ components: { Select }, data: () => ({ city: '' }), template: `<form><Select v-model="city" name="city" placeholder="Choose city" :options="[{value:'tehran',label:'Tehran'},{value:'isfahan',label:'Isfahan'}]" /></form>` });
    await fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' }); const list = screen.getByRole('listbox');
    await fireEvent.keyDown(list, { key: 'ArrowDown' }); await fireEvent.keyDown(list, { key: 'Enter' });
    expect(screen.getByRole('combobox').textContent).toBe('Isfahan'); expect(new FormData(view.container.querySelector('form')!).get('city')).toBe('isfahan');
  });
  it('navigates and serializes a radio group', async () => { const view = render({ components: { RadioGroup, RadioGroupItem }, data: () => ({ plan: 'basic' }), template: `<form><RadioGroup v-model="plan" name="plan"><RadioGroupItem value="basic">Basic</RadioGroupItem><RadioGroupItem value="pro">Pro</RadioGroupItem></RadioGroup></form>` }); const basic = screen.getByRole('radio', { name: 'Basic' }); basic.focus(); await fireEvent.keyDown(basic.parentElement!, { key: 'ArrowRight' }); expect(screen.getByRole('radio', { name: 'Pro' }).getAttribute('aria-checked')).toBe('true'); expect(new FormData(view.container.querySelector('form')!).get('plan')).toBe('pro'); });
});
