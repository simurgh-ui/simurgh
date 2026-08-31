<script lang="ts">
  import Icon from '../svelte-icon.svelte';
  import { definition } from '../dist/definitions/music-note.js';
  let { ...props }: Record<string, unknown> = $props();
</script>
<Icon {definition} {...props} />
