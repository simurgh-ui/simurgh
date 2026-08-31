<script lang="ts">let { orientation = 'horizontal', children, ...rest }: { orientation?: 'horizontal' | 'vertical'; children?: import('svelte').Snippet; [key: string]: unknown } = $props();</script>
<div {...rest} role="group" data-slot="button-group" data-orientation={orientation}>{@render children?.()}</div>
