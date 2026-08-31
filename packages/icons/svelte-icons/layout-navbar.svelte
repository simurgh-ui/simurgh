<script lang="ts">
  import Icon from '../svelte-icon.svelte';
  import { definition } from '../dist/definitions/layout-navbar.js';
  let { ...props }: Record<string, unknown> = $props();
</script>
<Icon {definition} {...props} />
