<script lang="ts">let { orientation = 'vertical', children, ...rest }: { orientation?: 'vertical' | 'horizontal' | 'both'; children?: import('svelte').Snippet; [key: string]: unknown } = $props();</script>
<div {...rest} data-slot="scroll-area" data-orientation={orientation}><div data-slot="scroll-area-viewport">{@render children?.()}</div></div>
