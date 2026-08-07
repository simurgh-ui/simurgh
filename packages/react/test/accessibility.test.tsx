// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import axe from 'axe-core';
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Checkbox, Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, Tabs, TabsContent, TabsList, TabsTrigger } from '../src/index.js';

afterEach(cleanup);

describe('React accessibility contract', () => {
  it('opens a named modal and passes an axe audit', async () => {
    render(<Dialog><DialogTrigger>Open profile</DialogTrigger><DialogContent><DialogTitle>Edit profile</DialogTitle><DialogDescription>Update your public details.</DialogDescription><button>Save</button></DialogContent></Dialog>);
    fireEvent.click(screen.getByRole('button', { name: 'Open profile' }));
    expect(screen.getByRole('dialog', { name: 'Edit profile' })).toBeTruthy();
    expect((await axe.run(document.body)).violations).toEqual([]);
  });

  it('serializes checkbox state and emits changes', () => {
    const change = vi.fn();
    render(<form><Checkbox name="newsletter" value="yes" onCheckedChange={change}>Newsletter</Checkbox></form>);
    fireEvent.click(screen.getByRole('checkbox', { name: 'Newsletter' }));
    expect(change).toHaveBeenCalledWith(true);
    const data = new FormData(document.querySelector('form')!);
    expect(data.get('newsletter')).toBe('yes');
  });

  it('uses RTL-aware tab navigation', () => {
    render(<Tabs defaultValue="one" direction="rtl"><TabsList><TabsTrigger value="one">One</TabsTrigger><TabsTrigger value="two">Two</TabsTrigger></TabsList><TabsContent value="one">First</TabsContent><TabsContent value="two">Second</TabsContent></Tabs>);
    const one = screen.getByRole('tab', { name: 'One' }); one.focus();
    fireEvent.keyDown(one.parentElement!, { key: 'ArrowLeft' });
    expect(screen.getByRole('tab', { name: 'Two' }).getAttribute('aria-selected')).toBe('true');
  });
});
