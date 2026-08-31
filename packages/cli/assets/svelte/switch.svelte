<script lang="ts">
  let { checked = $bindable(false), disabled = false, name, value = 'on', children, ...rest }: { checked?: boolean; disabled?: boolean; name?: string; value?: string; children?: import('svelte').Snippet; [key: string]: unknown } = $props();
</script>
<label data-slot="switch" data-state={checked ? 'checked' : 'unchecked'} data-disabled={disabled || undefined}>
  <input {...rest} type="checkbox" role="switch" bind:checked {disabled} {name} {value} />
  <span aria-hidden="true" data-part="thumb">{@render children?.()}</span>
</label>
