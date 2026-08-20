import { createApp, defineComponent, h } from 'vue';
import { Button } from '@simurgh-ui/vue/button';
import { Checkbox } from '@simurgh-ui/vue/checkbox';
import { Input } from '@simurgh-ui/vue/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@simurgh-ui/vue/popover';
import '../theme.css';

export const App = defineComponent({
  name: 'ReferenceApp',
  setup: () => () =>
    h('main', { class: 'reference-app' }, [
      h('h1', 'Vue reference'),
      h('form', [
        h(Input, {
          name: 'email',
          type: 'email',
          required: true,
          placeholder: 'Email',
        }),
        h(Checkbox, { name: 'updates' }, () => 'Product updates'),
        h(Button, { type: 'submit' }, () => 'Join'),
      ]),
      h(Popover, null, {
        default: () => [
          h(PopoverTrigger, null, () => 'Account help'),
          h(PopoverContent, null, () => 'Contact support@example.com.'),
        ],
      }),
    ]),
});

const root =
  typeof document === 'undefined' ? null : document.querySelector('#app');
if (root) createApp(App).mount(root);
