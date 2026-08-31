<script lang="ts">let { value = $bindable(''), name, min, max, disabled = false, label = 'Choose date', ...rest }: { value?: string; name?: string; min?: string; max?: string; disabled?: boolean; label?: string; [key: string]: unknown } = $props();</script>
<input {...rest} type="date" bind:value {name} {min} {max} {disabled} aria-label={label} data-slot="date-picker" />
