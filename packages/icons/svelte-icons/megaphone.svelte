<script lang="ts">
  import Icon from '../svelte-icon.svelte';
  import { definition } from '../dist/definitions/megaphone.js';
  let { ...props }: Record<string, unknown> = $props();
</script>
<Icon {definition} {...props} />
