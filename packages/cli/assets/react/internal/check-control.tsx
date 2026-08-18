import {
  useState,
  type ButtonHTMLAttributes,
  type PropsWithChildren,
} from 'react';

export type CheckProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'value' | 'onChange'
> & {
  name?: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  required?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};
export function CheckControl({
  role,
  name,
  value = 'on',
  checked,
  defaultChecked,
  required,
  onCheckedChange,
  children,
  ...props
}: PropsWithChildren<CheckProps & { role: 'checkbox' | 'switch' }>) {
  const [local, setLocal] = useState(defaultChecked ?? false);
  const active = checked ?? local;
  const set = (next: boolean) => {
    if (checked === undefined) setLocal(next);
    onCheckedChange?.(next);
  };
  return (
    <>
      <button
        type="button"
        {...props}
        role={role}
        data-slot={role}
        aria-checked={active}
        onClick={(e) => {
          props.onClick?.(e);
          if (!props.disabled) set(!active);
        }}
      >
        {children}
      </button>
      {name && (
        <input
          tabIndex={-1}
          aria-hidden="true"
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
          type="checkbox"
          name={name}
          value={value}
          checked={active}
          required={required}
          disabled={props.disabled}
          onChange={() => undefined}
        />
      )}
    </>
  );
}
