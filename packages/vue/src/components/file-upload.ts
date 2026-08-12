import { createId } from '@simurgh-ui/core';
import { defineComponent, h, ref } from 'vue';

function acceptedUploadFiles(files: File[], accept?: string) {
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

export const FileUpload = /* @__PURE__ */ defineComponent({
  name: 'SimurghFileUpload',
  inheritAttrs: false,
  props: {
    label: { type: String, required: true },
    description: { type: String, default: 'Drop files here or browse' },
    accept: String,
    multiple: Boolean,
    disabled: Boolean,
    required: Boolean,
    name: String,
  },
  emits: ['files-change'],
  setup(props, { attrs, emit }) {
    const id = (attrs.id as string | undefined) ?? createId('file');
    const names = ref<string[]>([]);
    const update = (files: File[]) => {
      if (props.disabled) return;
      const accepted = acceptedUploadFiles(files, props.accept);
      const next = props.multiple ? accepted : accepted.slice(0, 1);
      names.value = next.map((file) => file.name);
      emit('files-change', next);
    };
    return () =>
      h(
        'label',
        {
          for: id,
          'data-slot': 'file-upload',
          'data-disabled': props.disabled || undefined,
          onDragover: (event: DragEvent) => {
            if (!props.disabled) event.preventDefault();
          },
          onDrop: (event: DragEvent) => {
            if (props.disabled) return;
            event.preventDefault();
            update(Array.from(event.dataTransfer?.files ?? []));
          },
        },
        [
          h('input', {
            ...attrs,
            id,
            type: 'file',
            'data-slot': 'file-upload-input',
            accept: props.accept,
            multiple: props.multiple,
            disabled: props.disabled,
            required: props.required,
            name: props.name,
            onChange: (event: Event) =>
              update(
                Array.from(
                  (event.currentTarget as HTMLInputElement).files ?? [],
                ),
              ),
          }),
          h('strong', { 'data-slot': 'file-upload-label' }, props.label),
          props.description
            ? h(
                'span',
                { 'data-slot': 'file-upload-description' },
                props.description,
              )
            : undefined,
          h(
            'span',
            { 'data-slot': 'file-upload-status', 'aria-live': 'polite' },
            names.value.length ? names.value.join(', ') : 'No files selected',
          ),
        ],
      );
  },
});
