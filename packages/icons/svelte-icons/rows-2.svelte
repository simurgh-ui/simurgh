<script lang="ts">
  import Icon from '../svelte-icon.svelte';
  import { definition } from '../dist/definitions/rows-2.js';
  let { ...props }: Record<string, unknown> = $props();
</script>
<Icon {definition} {...props} />
