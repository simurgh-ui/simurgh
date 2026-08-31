<script lang="ts">
  import Icon from '../svelte-icon.svelte';
  import { definition } from '../dist/definitions/radar-chart.js';
  let { ...props }: Record<string, unknown> = $props();
</script>
<Icon {definition} {...props} />
