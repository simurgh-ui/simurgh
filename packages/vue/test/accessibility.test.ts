// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/vue';
import axe from 'axe-core';
import { afterEach, describe, expect, it } from 'vitest';
import { Checkbox, Dialog, DialogContent, DialogTrigger, Tabs, TabsContent, TabsList, TabsTrigger } from '../src/index.js';

afterEach(cleanup);

describe('Vue accessibility contract', () => {
  it('opens a modal and passes an axe audit', async () => {
    render({ components: { Dialog, DialogTrigger, DialogContent }, template: `<Dialog><DialogTrigger>Open settings</DialogTrigger><DialogContent aria-label="Settings"><button>Save</button></DialogContent></Dialog>` });
    await fireEvent.click(screen.getByRole('button', { name: 'Open settings' }));
    expect(screen.getByRole('dialog', { name: 'Settings' })).toBeTruthy();
    expect((await axe.run(document.body)).violations).toEqual([]);
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
});
