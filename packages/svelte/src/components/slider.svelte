<script lang="ts">let { value = $bindable(0), min = 0, max = 100, step = 1, disabled = false, ...rest }: { value?: number; min?: number; max?: number; step?: number; disabled?: boolean; [key: string]: unknown } = $props();</script>
<input {...rest} type="range" bind:value {min} {max} {step} {disabled} data-slot="slider" data-state={disabled ? 'disabled' : 'enabled'} />
