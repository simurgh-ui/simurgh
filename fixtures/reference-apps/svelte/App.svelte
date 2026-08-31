<script lang="ts">
  import Button from '@simurgh-ui/svelte/button';
  import Checkbox from '@simurgh-ui/svelte/checkbox';
  import Input from '@simurgh-ui/svelte/input';
  import Popover from '@simurgh-ui/svelte/popover';
  let checked = $state(false);
</script>
<main class="reference-app"><h1>Svelte reference</h1><form><Input name="email" type="email" required placeholder="Email" /><Checkbox name="updates" bind:checked>Product updates</Checkbox><Button type="submit">Join</Button></form><Popover label="Account help">Contact support@example.com.</Popover></main>
