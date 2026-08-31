<script lang="ts">
  import Icon from '../svelte-icon.svelte';
  import { definition } from '../dist/definitions/fullscreen.js';
  let { ...props }: Record<string, unknown> = $props();
</script>
<Icon {definition} {...props} />
