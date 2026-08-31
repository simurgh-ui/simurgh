<script lang="ts">
  let { pressed = $bindable(false), disabled = false, children, ...rest }: { pressed?: boolean; disabled?: boolean; children?: import('svelte').Snippet; [key: string]: unknown } = $props();
</script>
<button {...rest} type="button" aria-pressed={pressed} data-slot="toggle" data-state={pressed ? 'on' : 'off'} {disabled} onclick={() => { if (!disabled) pressed = !pressed; }}>{@render children?.()}</button>
