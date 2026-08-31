<script lang="ts">
  type Option = { value: string; label: string; disabled?: boolean };
  let { value = $bindable(''), options = [], name, required = false, disabled = false, orientation = 'vertical', ...rest }: { value?: string; options?: Option[]; name?: string; required?: boolean; disabled?: boolean; orientation?: 'horizontal' | 'vertical'; [key: string]: unknown } = $props();
</script>
<div {...rest} role="radiogroup" data-slot="radio-group" data-orientation={orientation}>{#each options as option}<label data-slot="radio-group-item" data-state={value === option.value ? 'checked' : 'unchecked'}><input type="radio" bind:group={value} value={option.value} {name} {required} disabled={disabled || option.disabled} /><span>{option.label}</span></label>{/each}</div>
