<script lang="ts">
  import Icon from '../svelte-icon.svelte';
  import { definition } from '../dist/definitions/grid-3x3.js';
  let { ...props }: Record<string, unknown> = $props();
</script>
<Icon {definition} {...props} />
