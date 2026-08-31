<script lang="ts">
  import { icons, type IconName } from './dist/icons.generated.js';
  import Icon, { type SvelteIconProps } from './svelte-icon.svelte';
  let { name, ...props }: Omit<SvelteIconProps, 'definition'> & { name: IconName } = $props();
</script>

<Icon definition={icons[name]} {...props} />
