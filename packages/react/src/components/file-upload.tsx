import {
  useId,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';

function acceptedFiles(files: File[], accept?: string) {
  if (!accept) return files;
  const rules = accept
    .split(',')
    .map((rule) => rule.trim().toLowerCase())
    .filter(Boolean);
  return files.filter((file) => {
    const name = file.name.toLowerCase();
    const type = file.type.toLowerCase();
    return rules.some((rule) =>
      rule.startsWith('.')
        ? name.endsWith(rule)
        : rule.endsWith('/*')
          ? type.startsWith(rule.slice(0, -1))
          : type === rule,
    );
  });
}
type FileUploadProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange'
> & {
  label: ReactNode;
  description?: ReactNode;
  onFilesChange?: (files: File[]) => void;
};
export function FileUpload({
  label,
  description = 'Drop files here or browse',
  onFilesChange,
  accept,
  disabled,
  multiple,
  ...props
}: FileUploadProps) {
  const id = props.id ?? `simurgh-file-${useId().replace(/:/g, '')}`;
  const [names, setNames] = useState<string[]>([]);
  const update = (files: File[]) => {
    if (disabled) return;
    const accepted = acceptedFiles(files, accept);
    const next = multiple ? accepted : accepted.slice(0, 1);
    setNames(next.map((file) => file.name));
    onFilesChange?.(next);
  };
  return (
    <label
      htmlFor={id}
      data-slot="file-upload"
      data-disabled={disabled || undefined}
      onDragOver={(event) => {
        if (!disabled) event.preventDefault();
      }}
      onDrop={(event) => {
        if (disabled) return;
        event.preventDefault();
        update(Array.from(event.dataTransfer.files));
      }}
    >
      <input
        {...props}
        id={id}
        type="file"
        data-slot="file-upload-input"
        accept={accept}
        disabled={disabled}
        multiple={multiple}
        onChange={(event) =>
          update(Array.from(event.currentTarget.files ?? []))
        }
      />
      <strong data-slot="file-upload-label">{label}</strong>
      {description && (
        <span data-slot="file-upload-description">{description}</span>
      )}
      <span data-slot="file-upload-status" aria-live="polite">
        {names.length ? names.join(', ') : 'No files selected'}
      </span>
    </label>
  );
}
