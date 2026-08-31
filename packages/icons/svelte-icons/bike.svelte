<script lang="ts">
  import Icon from '../svelte-icon.svelte';
  import { definition } from '../dist/definitions/bike.js';
  let { ...props }: Record<string, unknown> = $props();
</script>
<Icon {definition} {...props} />
