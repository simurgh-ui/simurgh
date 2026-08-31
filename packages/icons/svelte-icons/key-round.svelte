<script lang="ts">
  import Icon from '../svelte-icon.svelte';
  import { definition } from '../dist/definitions/key-round.js';
  let { ...props }: Record<string, unknown> = $props();
</script>
<Icon {definition} {...props} />
