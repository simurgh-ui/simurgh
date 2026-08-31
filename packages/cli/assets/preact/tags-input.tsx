// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import { forwardRef, useRef, useState, type HTMLAttributes } from 'preact/compat';
import { useFormReset } from '../internal/forms.js';

export type TagsInputProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange'
> & {
  value?: string[];
  defaultValue?: string[];
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  maxTags?: number;
  placeholder?: string;
  inputLabel?: string;
  getRemoveLabel?: (tag: string) => string;
  onValueChange?: (value: string[]) => void;
};
export const TagsInput = /* @__PURE__ */ forwardRef<
  HTMLInputElement,
  TagsInputProps
>(function TagsInput(
  {
    value,
    defaultValue = [],
    name,
    disabled,
    readOnly,
    required,
    maxTags = 20,
    placeholder = 'Add a tag',
    inputLabel = 'Add a tag',
    getRemoveLabel = (tag) => `Remove ${tag}`,
    onValueChange,
    onClick,
    'aria-label': ariaLabel = 'Tags',
    ...props
  },
  forwardedRef,
) {
  const [localValue, setLocalValue] = useState(defaultValue);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const resetRef = useFormReset<HTMLInputElement>(() => {
    if (value === undefined) setLocalValue(defaultValue);
    setDraft('');
  });
  const tags = (value ?? localValue).slice(0, 100);
  const limit = Number.isFinite(maxTags)
    ? Math.min(100, Math.max(1, Math.floor(maxTags)))
    : 20;
  const commit = (next: string[]) => {
    if (value === undefined) setLocalValue(next);
    onValueChange?.(next);
  };
  const add = () => {
    const tag = draft.trim();
    if (
      disabled ||
      readOnly ||
      !tag ||
      tags.includes(tag) ||
      tags.length >= limit
    )
      return;
    commit([...tags, tag]);
    setDraft('');
  };
  const remove = (index: number) => {
    if (disabled || readOnly) return;
    commit(tags.filter((_, itemIndex) => itemIndex !== index));
    inputRef.current?.focus();
  };
  return (
    <div
      {...props}
      role="group"
      aria-label={ariaLabel}
      data-slot="tags-input"
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      onClick={(event) => {
        onClick?.(event);
        inputRef.current?.focus();
      }}
    >
      {tags.map((tag, index) => (
        <span key={`${tag}-${index}`} data-slot="tags-input-tag">
          <span data-slot="tags-input-tag-text">{tag}</span>
          {!readOnly && (
            <button
              type="button"
              data-slot="tags-input-remove"
              aria-label={getRemoveLabel(tag)}
              disabled={disabled}
              onClick={(event) => {
                event.stopPropagation();
                remove(index);
              }}
            >
              {'\u00d7'}
            </button>
          )}
          {name && <input type="hidden" name={name} value={tag} />}
        </span>
      ))}
      <input
        ref={(node) => {
          inputRef.current = node;
          resetRef.current = node;
          if (typeof forwardedRef === 'function') forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        type="text"
        data-slot="tags-input-control"
        value={draft}
        aria-label={inputLabel}
        placeholder={tags.length ? undefined : placeholder}
        disabled={disabled || tags.length >= limit}
        readOnly={readOnly}
        required={required && tags.length === 0}
        onChange={(event) => setDraft(event.currentTarget.value)}
        onKeyDown={(event) => {
          if (
            (event.key === 'Enter' || event.key === ',') &&
            !event.nativeEvent.isComposing
          ) {
            event.preventDefault();
            add();
          } else if (event.key === 'Backspace' && !draft && tags.length) {
            event.preventDefault();
            remove(tags.length - 1);
          }
        }}
      />
    </div>
  );
});
