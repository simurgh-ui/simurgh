<script lang="ts">
  let { disabled = false, external = false, href, rel, target, children, ...props }: { disabled?: boolean; external?: boolean; href?: string; rel?: string; target?: string; children?: import('svelte').Snippet; [key: string]: unknown } = $props();
</script>
<a {...props} href={disabled ? undefined : href} aria-disabled={disabled || undefined} data-slot="link"
  data-external={external || undefined} rel={external ? (rel ?? 'noopener noreferrer') : rel}
  target={external ? (target ?? '_blank') : target} tabindex={disabled ? -1 : undefined}
  onclick={(event) => { if (disabled) event.preventDefault(); }}>{@render children?.()}</a>
