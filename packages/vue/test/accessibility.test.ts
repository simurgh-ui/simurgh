// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/vue';
import axe from 'axe-core';
import { afterEach, describe, expect, it } from 'vitest';
import { Checkbox, Dialog, DialogContent, DialogTrigger, Tabs, TabsContent, TabsList, TabsTrigger, Tooltip, TooltipContent, TooltipTrigger } from '../src/index.js';

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
});
