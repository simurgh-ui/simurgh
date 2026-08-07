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
  RadioGroup,
  RadioGroupItem,
  Select,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
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
});
