import { defineComponent, h } from 'vue';
import { Button } from '@simurgh-ui/vue/button';
import '@simurgh-ui/styles/button.css';

export const SaveButton = defineComponent({
  name: 'SaveButton',
  setup: () => () => h(Button, { type: 'button' }, () => 'Save changes'),
});
