import { Combobox, type ComboboxProps } from './combobox.js';

export function Command(props: ComboboxProps) {
  return (
    <div data-slot="command">
      <Combobox {...props} />
    </div>
  );
}
