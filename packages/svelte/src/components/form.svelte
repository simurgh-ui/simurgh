<script lang="ts">
  let { focusInvalid = true, errors, children, ...rest }: { focusInvalid?: boolean; errors?: import('svelte').Snippet; children?: import('svelte').Snippet; [key: string]: unknown } = $props();
  function invalid(event: Event) { if (focusInvalid) queueMicrotask(() => (event.target as HTMLElement).focus()); }
</script>
<form {...rest} data-slot="form" oninvalid={invalid}>
  {@render children?.()}
  {#if errors}<div role="alert" aria-live="assertive" tabindex="-1" data-slot="form-error-summary">{@render errors()}</div>{/if}
</form>
