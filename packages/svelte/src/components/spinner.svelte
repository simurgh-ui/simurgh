<script lang="ts">let { label = 'Loading' }: { label?: string } = $props();</script>
<span role="status" aria-label={label} data-slot="spinner"></span>
