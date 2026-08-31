<script lang="ts">let { orientation = 'horizontal' }: { orientation?: 'horizontal' | 'vertical' } = $props();</script>
<div role="separator" aria-orientation={orientation} data-slot="separator" data-orientation={orientation}></div>
