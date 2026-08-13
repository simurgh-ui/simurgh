import { computed, defineComponent, h, ref } from 'vue';

export function checkControl(role: 'checkbox' | 'switch', name: string) {
  return defineComponent({
    name,
    inheritAttrs: false,
    props: {
      modelValue: Boolean,
      defaultChecked: Boolean,
      name: String,
      value: { type: String, default: 'on' },
      required: Boolean,
      disabled: Boolean,
    },
    emits: ['update:modelValue'],
    setup(props, { slots, attrs, emit }) {
      const local = ref(props.defaultChecked);
      const checked = computed(() => props.modelValue || local.value);
      const toggle = () => {
        if (!props.disabled) {
          local.value = !checked.value;
          emit('update:modelValue', local.value);
        }
      };
      return () => [
        h(
          'button',
          {
            ...attrs,
            type: 'button',
            role,
            'data-slot': role,
            'aria-checked': checked.value,
            disabled: props.disabled,
            onClick: toggle,
          },
          slots.default?.(),
        ),
        props.name
          ? h('input', {
              type: 'checkbox',
              hidden: true,
              name: props.name,
              value: props.value,
              checked: checked.value,
              required: props.required,
              disabled: props.disabled,
            })
          : null,
      ];
    },
  });
}
