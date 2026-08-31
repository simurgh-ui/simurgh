<script lang="ts">
  let { value = null, max = 100, getValueLabel }: { value?: number | null; max?: number; getValueLabel?: (value: number, max: number) => string } = $props();
  let safeMax = $derived(Number.isFinite(max) && max > 0 ? max : 100);
  let safeValue = $derived(value == null || !Number.isFinite(value) ? null : Math.min(safeMax, Math.max(0, value)));
  let percentage = $derived(safeValue == null ? null : (safeValue / safeMax) * 100);
</script>
<div role="progressbar" aria-valuemin="0" aria-valuemax={safeMax} aria-valuenow={safeValue ?? undefined}
  aria-valuetext={safeValue == null ? undefined : getValueLabel?.(safeValue, safeMax)}
  data-state={safeValue == null ? 'indeterminate' : 'determinate'} data-value={safeValue ?? undefined} data-max={safeMax}>
  <span data-part="indicator" style:width={percentage == null ? undefined : `${percentage}%`}></span>
</div>
