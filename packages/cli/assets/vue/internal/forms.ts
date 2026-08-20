import { listenFormReset } from '@simurgh-ui/core';
import { onBeforeUnmount, onMounted, type Ref } from 'vue';

export function useFormReset(
  control: Ref<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
  >,
  reset: () => void,
) {
  let removeListener: (() => void) | undefined;
  onMounted(() => {
    if (control.value) removeListener = listenFormReset(control.value, reset);
  });
  onBeforeUnmount(() => removeListener?.());
}
