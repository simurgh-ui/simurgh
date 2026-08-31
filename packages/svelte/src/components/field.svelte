<script lang="ts">
  let { invalid = false, disabled = false, legend, description, error, children, ...rest }: { invalid?: boolean; disabled?: boolean; legend?: import('svelte').Snippet; description?: import('svelte').Snippet; error?: import('svelte').Snippet; children?: import('svelte').Snippet; [key: string]: unknown } = $props();
</script>
<fieldset {...rest} {disabled} data-slot="field" data-invalid={invalid || undefined}>
  {#if legend}<legend data-slot="field-legend">{@render legend()}</legend>{/if}
  {@render children?.()}
  {#if description}<div data-slot="field-description">{@render description()}</div>{/if}
  {#if error}<div role="alert" data-slot="field-error">{@render error()}</div>{/if}
</fieldset>
