<script lang="ts">
  type Props = {
    loading?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'destructive' | 'quiet';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    iconOnly?: boolean;
    children?: import('svelte').Snippet;
  };

  let {
    loading = false, disabled = false, type = 'button', variant = 'primary',
    size = 'md', fullWidth = false, iconOnly = false, children, ...rest
  }: Props = $props();
</script>

<button {...rest} {type} disabled={disabled || loading} aria-busy={loading || undefined}
  data-slot="button" data-state={loading ? 'loading' : 'idle'}
  data-variant={variant} data-size={size}
  data-full-width={fullWidth || undefined} data-icon-only={iconOnly || undefined}>
  {@render children?.()}
</button>
