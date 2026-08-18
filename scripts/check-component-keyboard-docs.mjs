import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const docsRoot = resolve(root, 'apps/docs/src/content/docs/components');
const registry = JSON.parse(await readFile(resolve(root, 'packages/registry/registry.json'), 'utf8'));
const start = '{/* component-keyboard:start */}';
const end = '{/* component-keyboard:end */}';
const failures = [];

const contracts = {
  accordion: ['Tab enters and leaves through native summary controls.', 'Enter or Space toggles the focused item.', 'Not handled by the component.', 'No RTL-specific key mapping.', 'Not supported.'],
  'alert-dialog': ['Tab enters the open dialog and cycles within it; closing restores the trigger.', 'Enter or Space activates the focused action or cancel button.', 'Closes the dialog and restores trigger focus.', 'No RTL-specific key mapping.', 'Not supported.'],
  calendar: ['Tab enters the grid at the roving-tabindex day; Tab leaves the grid.', 'Arrow Up/Down moves one week; Home/End moves to week edges; Enter or Space selects.', 'Not handled; focus remains in the calendar.', 'Arrow Left/Right date movement reverses in RTL.', 'Not supported.'],
  carousel: ['Tab reaches the viewport and controls in DOM order.', 'Arrow Left/Right moves to the previous/next item.', 'Not handled by the component.', 'Previous/next Arrow Left/Right mapping reverses in RTL.', 'Not supported.'],
  collapsible: ['Tab focuses the trigger; subsequent Tab follows visible content order.', 'Enter or Space toggles the trigger.', 'Not handled by the component.', 'No RTL-specific key mapping.', 'Not supported.'],
  combobox: ['Tab enters through the text input and leaves normally.', 'Arrow Down/Up opens and moves the active option; Home/End moves to first/last; Enter selects.', 'Closes the list without selecting.', 'No RTL-specific key mapping.', 'Not supported; text input filters options instead.'],
  'context-menu': ['Shift+F10 or the Context Menu key opens from the trigger; Tab follows browser focus order.', 'Arrow Down/Up and Home/End move among enabled menu items; Enter or Space activates.', 'Closes the menu and restores trigger focus.', 'No RTL-specific key mapping.', 'Not supported.'],
  'date-picker': ['Tab reaches the trigger/input, then the open calendar grid.', 'Calendar arrows move days; Home/End moves to week edges; Enter or Space selects.', 'Escape closes the popover when focus is inside it.', 'Calendar Arrow Left/Right movement reverses in RTL.', 'Not supported.'],
  dialog: ['Tab enters the open dialog and cycles within it; closing restores the trigger.', 'Enter or Space activates the focused control.', 'Closes the dialog and restores trigger focus.', 'No RTL-specific key mapping.', 'Not supported.'],
  'dropdown-menu': ['Tab reaches the trigger; open-menu focus follows the rendered menu items.', 'Arrow Down/Up and Home/End move among enabled items; Enter or Space activates.', 'Closes when handled by the surrounding overlay interaction.', 'No RTL-specific key mapping.', 'Not supported.'],
  menubar: ['Tab enters the menubar at its roving-tabindex item and leaves with Tab.', 'Arrow keys move by orientation; Home/End move to first/last; Enter or Space activates.', 'Not handled by the component.', 'Horizontal previous/next arrows reverse in RTL.', 'Not supported.'],
  popover: ['Tab reaches the trigger and then focusable popover content in DOM order.', 'Enter or Space toggles the trigger and activates focused content controls.', 'Closes the popover when focus is inside its content.', 'No RTL-specific key mapping.', 'Not supported.'],
  'radio-group': ['Tab enters at the checked radio, or the first enabled radio when none is checked.', 'Arrow keys move focus and selection; Home/End move to first/last.', 'Not handled by the component.', 'Horizontal previous/next arrows reverse in RTL.', 'Not supported.'],
  resizable: ['Tab focuses each separator handle; Tab leaves after the final handle.', 'Arrows resize by step; Home/End move to minimum/maximum.', 'Not handled by the component.', 'Horizontal decrement/increment arrows reverse in RTL.', 'Not supported.'],
  select: ['Tab reaches the trigger and leaves normally.', 'Arrow Down/Up opens and moves options; Home/End moves to first/last; Enter or Space selects.', 'Closes the option list without changing focus.', 'No RTL-specific key mapping.', 'Not supported.'],
  sheet: ['Tab enters the open sheet and cycles within it; closing restores the trigger.', 'Enter or Space activates the focused control.', 'Closes the sheet and restores trigger focus.', 'No RTL-specific key mapping.', 'Not supported.'],
  tabs: ['Tab enters at the active tab; Tab then moves into the active panel or next focusable element.', 'Arrow keys move and activate tabs; Home/End selects first/last.', 'Not handled by the component.', 'Horizontal previous/next arrows reverse in RTL.', 'Not supported.'],
  'tags-input': ['Tab enters the text input and leaves normally; remove buttons remain in DOM order.', 'Enter commits input; Backspace removes the last tag when input is empty.', 'Not handled by the component.', 'No RTL-specific key mapping.', 'Not supported.'],
  'toggle-group': ['Tab enters at the roving-tabindex item and leaves after the group.', 'Arrow keys move focus; Home/End move to first/last; Enter or Space toggles.', 'Not handled by the component.', 'Horizontal previous/next arrows reverse in RTL.', 'Not supported.'],
  toolbar: ['Tab enters at the roving-tabindex control and leaves after the toolbar.', 'Arrow keys move focus; Home/End move to first/last; Enter or Space activates.', 'Not handled by the component.', 'Horizontal previous/next arrows reverse in RTL.', 'Not supported.'],
  tree: ['Tab enters at the current tree item and leaves after the tree.', 'Arrow Up/Down moves visible items; Right expands/enters; Left collapses/returns; Home/End moves to edges.', 'Not handled by the component.', 'Tree expand/collapse arrows remain semantic Right/Left in both directions.', 'Not supported.'],
};

const sourceHints = {
  calendar: ['ArrowLeft', 'ArrowRight', 'Home', 'End'],
  carousel: ['ArrowLeft', 'ArrowRight'],
  combobox: ['ArrowDown', 'Escape', 'Home', 'End'],
  'context-menu': ['Escape', 'compositeKeydown'],
  'dropdown-menu': ['compositeKeydown'],
  menubar: ['onKeyDown', 'direction'],
  'radio-group': ['onKeyDown'],
  resizable: ['ArrowLeft', 'Home', 'End'],
  select: ['ArrowDown', 'compositeKeydown'],
  tabs: ['onKeyDown', 'orientation'],
  'tags-input': ['onKeyDown'],
  'toggle-group': ['onKeyDown'],
  toolbar: ['onKeyDown'],
  tree: ['ArrowDown', 'ArrowRight', 'ArrowLeft'],
};

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
}

function section(component) {
  const [focus, activation, escape, rtl, typeahead] = contracts[component];
  return `${start}\n### Keyboard interactions\n\nThese keys describe behavior implemented by the adapters. Native Tab, Enter, and Space behavior still\napplies to descendant links, buttons, and form controls unless the component overrides it.\n\n| Concern / keys | Behavior |\n| --- | --- |\n| Focus entry and exit (Tab / Shift+Tab) | ${focus} |\n| Navigation and activation | ${activation} |\n| Escape | ${escape} |\n| RTL differences | ${rtl} |\n| Typeahead | ${typeahead} |\n${end}`;
}

for (const component of registry.components) {
  const path = resolve(docsRoot, `${component}.mdx`);
  const source = await readFile(path, 'utf8');
  const marked = new RegExp(`${escapeRegExp(start)}[\\s\\S]*?${escapeRegExp(end)}\\n*`, 'u');
  const without = source.replace(marked, '');
  const expected = contracts[component]
    ? without.replace('## Accessibility', `${section(component)}\n\n## Accessibility`)
    : without;
  if (process.argv.includes('--update')) await writeFile(path, expected);
  else if (source !== expected) failures.push(component);
}

for (const [component, hints] of Object.entries(sourceHints)) {
  const frameworkSources = await Promise.all([
    readFile(resolve(root, `packages/react/src/components/${component}.tsx`), 'utf8'),
    readFile(resolve(root, `packages/vue/src/components/${component}.ts`), 'utf8'),
    readFile(resolve(root, `packages/angular/src/components/${component}.ts`), 'utf8'),
  ]);
  for (const hint of hints) {
    if (!frameworkSources.some((source) => source.includes(hint)))
      failures.push(`${component}: source hint ${hint} disappeared`);
  }
}

if (failures.length) {
  process.stderr.write(`Component keyboard documentation is missing or stale:\n${failures.join('\n')}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(`${process.argv.includes('--update') ? 'Updated' : 'Validated'} keyboard contracts for ${Object.keys(contracts).length} composite component pages.\n`);
}
