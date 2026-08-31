<script lang="ts">
  let { value = $bindable<string[]>([]), name, disabled = false, label = 'Tags', ...rest }: { value?: string[]; name?: string; disabled?: boolean; label?: string; [key: string]: unknown } = $props(); let draft = $state('');
  function commit() { const tag = draft.trim(); if (tag && !value.includes(tag)) value = [...value, tag]; draft = ''; }
  function keydown(event: KeyboardEvent) { if (event.key === 'Enter' || event.key === ',') { event.preventDefault(); commit(); } else if (event.key === 'Backspace' && !draft) value = value.slice(0, -1); }
</script>
<div {...rest} data-slot="tags-input">{#each value as tag, index}<span data-slot="tag">{tag}<button type="button" aria-label={`Remove ${tag}`} {disabled} onclick={() => value = value.filter((_, i) => i !== index)}>×</button></span>{/each}<input bind:value={draft} aria-label={label} {disabled} onkeydown={keydown} onblur={commit} />{#if name}<input type="hidden" {name} value={value.join(',')} />{/if}</div>
