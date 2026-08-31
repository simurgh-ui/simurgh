export { default as Button } from './components/button.svelte';
export { default as Badge } from './components/badge.svelte';
export { default as Separator } from './components/separator.svelte';
export { default as Skeleton } from './components/skeleton.svelte';
export { default as Spinner } from './components/spinner.svelte';
export { default as VisuallyHidden } from './components/visually-hidden.svelte';
export { default as Input } from './components/input.svelte';
export { default as Textarea } from './components/textarea.svelte';
export { default as Label } from './components/label.svelte';
export { default as NativeSelect } from './components/native-select.svelte';
export { default as Progress } from './components/progress.svelte';
export { default as Meter } from './components/meter.svelte';
export { default as Link } from './components/link.svelte';
export { default as Alert } from './components/alert.svelte';
export { default as AspectRatio } from './components/aspect-ratio.svelte';
export { default as Avatar } from './components/avatar.svelte';
export { default as Checkbox } from './components/checkbox.svelte';
export { default as Switch } from './components/switch.svelte';
export { default as Toggle } from './components/toggle.svelte';
export { default as Disclosure } from './components/disclosure.svelte';
export { default as Collapsible } from './components/collapsible.svelte';
export { default as Form } from './components/form.svelte';
export { default as Field } from './components/field.svelte';
export { default as Card } from './components/card.svelte';
export { default as Empty } from './components/empty.svelte';
export { default as Item } from './components/item.svelte';
export { default as Kbd } from './components/kbd.svelte';
export { default as Table } from './components/table.svelte';
export { default as Breadcrumb } from './components/breadcrumb.svelte';
export { default as ButtonGroup } from './components/button-group.svelte';
export { default as Toolbar } from './components/toolbar.svelte';
export { default as RadioGroup } from './components/radio-group.svelte';
export { default as Slider } from './components/slider.svelte';
export { default as Rating } from './components/rating.svelte';
export { default as NumberInput } from './components/number-input.svelte';
export { default as PasswordInput } from './components/password-input.svelte';
export { default as TagsInput } from './components/tags-input.svelte';
export { default as FileUpload } from './components/file-upload.svelte';
export { default as InputOtp } from './components/input-otp.svelte';
export { default as Tabs } from './components/tabs.svelte';
export { default as Accordion } from './components/accordion.svelte';
export { default as ToggleGroup } from './components/toggle-group.svelte';
export { default as ScrollArea } from './components/scroll-area.svelte';
export { default as InputGroup } from './components/input-group.svelte';
export { default as DescriptionList } from './components/description-list.svelte';
export { default as Pagination } from './components/pagination.svelte';
export { default as Resizable } from './components/resizable.svelte';
export { default as Carousel } from './components/carousel.svelte';
export { default as Dialog } from './components/dialog.svelte';
export { default as AlertDialog } from './components/alert-dialog.svelte';
export { default as Sheet } from './components/sheet.svelte';
export { default as Drawer } from './components/drawer.svelte';
export { default as Popover } from './components/popover.svelte';
export { default as Tooltip } from './components/tooltip.svelte';
export { default as HoverCard } from './components/hover-card.svelte';
export { default as DropdownMenu } from './components/dropdown-menu.svelte';
export { default as ContextMenu } from './components/context-menu.svelte';
export { default as Select } from './components/select.svelte';
export { default as Combobox } from './components/combobox.svelte';
export { default as Command } from './components/command.svelte';
export { default as Calendar } from './components/calendar.svelte';
export { default as DatePicker } from './components/date-picker.svelte';
export { default as Sidebar } from './components/sidebar.svelte';
export { default as Tree } from './components/tree.svelte';
export { default as Chart } from './components/chart.svelte';
export { default as NavigationMenu } from './components/navigation-menu.svelte';
export { default as Menubar } from './components/menubar.svelte';
export { default as Toast } from './components/toast.svelte';

<script lang="ts">type Item = { value: string; title: string; content?: string; disabled?: boolean }; let { value = $bindable<string[]>([]), items = [], multiple = false, ...rest }: { value?: string[]; items?: Item[]; multiple?: boolean; [key: string]: unknown } = $props(); function toggle(item: Item) { if (item.disabled) return; value = value.includes(item.value) ? value.filter(v => v !== item.value) : multiple ? [...value, item.value] : [item.value]; }</script>
<div {...rest} data-slot="accordion">{#each items as item}<div data-slot="accordion-item" data-state={value.includes(item.value) ? 'open' : 'closed'}><h3><button type="button" aria-expanded={value.includes(item.value)} disabled={item.disabled} onclick={() => toggle(item)}>{item.title}</button></h3><div hidden={!value.includes(item.value)}>{item.content ?? ''}</div></div>{/each}</div>

<script lang="ts">let { open = $bindable(false), title = 'Are you sure?', description, trigger, children, cancelLabel = 'Cancel', actionLabel = 'Continue', onAction, ...rest }: { open?: boolean; title?: string; description?: string; trigger?: import('svelte').Snippet; children?: import('svelte').Snippet; cancelLabel?: string; actionLabel?: string; onAction?: () => void; [key: string]: unknown } = $props(); let element: HTMLDialogElement; $effect(() => { if (!element) return; if (open && !element.open) element.showModal(); else if (!open && element.open) element.close(); });</script>
{#if trigger}<button type="button" data-slot="alert-dialog-trigger" onclick={() => open = true}>{@render trigger()}</button>{/if}<dialog {...rest} bind:this={element} data-slot="alert-dialog-content" aria-labelledby="simurgh-alert-title" aria-describedby={description ? 'simurgh-alert-description' : undefined} onclose={() => open = false}><h2 id="simurgh-alert-title" data-slot="alert-dialog-title">{title}</h2>{#if description}<p id="simurgh-alert-description" data-slot="alert-dialog-description">{description}</p>{/if}{@render children?.()}<button type="button" data-slot="alert-dialog-cancel" onclick={() => open = false}>{cancelLabel}</button><button type="button" data-slot="alert-dialog-action" onclick={() => { onAction?.(); open = false; }}>{actionLabel}</button></dialog>

<script lang="ts">
  let { urgent = false, children, ...props }: { urgent?: boolean; children?: import('svelte').Snippet; [key: string]: unknown } = $props();
</script>
<div {...props} role={urgent ? 'alert' : 'status'} aria-live={urgent ? 'assertive' : 'polite'} aria-atomic="true" data-urgent={urgent || undefined}>{@render children?.()}</div>

<script lang="ts">
  let { ratio = 1, children, ...props }: { ratio?: number; children?: import('svelte').Snippet; [key: string]: unknown } = $props();
  let safeRatio = $derived(Number.isFinite(ratio) && ratio > 0 ? ratio : 1);
</script>
<div {...props} data-ratio={safeRatio} style:aspect-ratio={String(safeRatio)}>{@render children?.()}</div>

<script lang="ts">
  let { src, alt, fallback, ...props }: { src?: string; alt: string; fallback?: import('svelte').Snippet; [key: string]: unknown } = $props();
  let loaded = $state(false);
  $effect(() => { src; loaded = false; });
</script>
<span {...props} data-state={loaded ? 'loaded' : 'fallback'}>
  {#if src}<img {src} {alt} hidden={!loaded} onload={() => loaded = true} onerror={() => loaded = false} />{/if}
  {#if !loaded}<span data-part="fallback">{@render fallback?.()}</span>{/if}
</span>

<script lang="ts">let { children }: { children?: import('svelte').Snippet } = $props();</script>
<span data-slot="badge">{@render children?.()}</span>

<script lang="ts">let { label = 'Breadcrumb', children, ...rest }: { label?: string; children?: import('svelte').Snippet; [key: string]: unknown } = $props();</script>
<nav {...rest} aria-label={label} data-slot="breadcrumb"><ol>{@render children?.()}</ol></nav>

<script lang="ts">let { orientation = 'horizontal', children, ...rest }: { orientation?: 'horizontal' | 'vertical'; children?: import('svelte').Snippet; [key: string]: unknown } = $props();</script>
<div {...rest} role="group" data-slot="button-group" data-orientation={orientation}>{@render children?.()}</div>

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

<script lang="ts">let { value = $bindable(''), month = new Date().getMonth(), year = new Date().getFullYear(), label = 'Calendar', ...rest }: { value?: string; month?: number; year?: number; label?: string; [key: string]: unknown } = $props(); let shownMonth = $state(0); let shownYear = $state(0); $effect.pre(() => { shownMonth = month; shownYear = year; }); let days = $derived(new Date(shownYear, shownMonth + 1, 0).getDate()); const iso = (day: number) => `${shownYear}-${String(shownMonth + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`; function move(delta: number) { const next = new Date(shownYear, shownMonth + delta, 1); shownYear = next.getFullYear(); shownMonth = next.getMonth(); }</script>
<div {...rest} aria-label={label} data-slot="calendar"><header><button type="button" aria-label="Previous month" onclick={() => move(-1)}>‹</button><span aria-live="polite">{new Date(shownYear, shownMonth).toLocaleString(undefined,{month:'long',year:'numeric'})}</span><button type="button" aria-label="Next month" onclick={() => move(1)}>›</button></header><div role="grid">{#each Array(days) as _, index}<button type="button" role="gridcell" aria-selected={value === iso(index + 1)} onclick={() => value = iso(index + 1)}>{index + 1}</button>{/each}</div></div>

<script lang="ts">
  let { header, title, description, children, footer, ...rest }: { header?: import('svelte').Snippet; title?: import('svelte').Snippet; description?: import('svelte').Snippet; children?: import('svelte').Snippet; footer?: import('svelte').Snippet; [key: string]: unknown } = $props();
</script>
<div {...rest} data-slot="card">
  {#if header || title || description}<div data-slot="card-header">{@render header?.()}{#if title}<h3 data-slot="card-title">{@render title()}</h3>{/if}{#if description}<p data-slot="card-description">{@render description()}</p>{/if}</div>{/if}
  <div data-slot="card-content">{@render children?.()}</div>
  {#if footer}<div data-slot="card-footer">{@render footer()}</div>{/if}
</div>

<script lang="ts">let { index = $bindable(0), items = [], label = 'Carousel', ...rest }: { index?: number; items?: string[]; label?: string; [key: string]: unknown } = $props(); const previous = () => index = (index - 1 + items.length) % items.length; const next = () => index = (index + 1) % items.length;</script>
<section {...rest} aria-roledescription="carousel" aria-label={label} data-slot="carousel"><div aria-live="polite" data-slot="carousel-content">{#each items as item, itemIndex}<div role="group" aria-roledescription="slide" aria-label={`${itemIndex + 1} of ${items.length}`} hidden={index !== itemIndex} data-slot="carousel-item">{item}</div>{/each}</div><button type="button" aria-label="Previous slide" disabled={items.length < 2} onclick={previous}>Previous</button><button type="button" aria-label="Next slide" disabled={items.length < 2} onclick={next}>Next</button></section>

<script lang="ts">type Datum = { label: string; value: number; color?: string }; let { data = [], label = 'Chart', width = 400, height = 200, ...rest }: { data?: Datum[]; label?: string; width?: number; height?: number; [key: string]: unknown } = $props(); let maximum = $derived(Math.max(1, ...data.map(item => item.value)));</script>
<figure {...rest} data-slot="chart"><svg role="img" aria-label={label} viewBox={`0 0 ${width} ${height}`}>{#each data as item, index}<rect x={index * (width / Math.max(data.length,1))} y={height - (item.value / maximum) * height} width={width / Math.max(data.length,1) - 4} height={(item.value / maximum) * height} fill={item.color ?? 'currentColor'}><title>{item.label}: {item.value}</title></rect>{/each}</svg><figcaption>{label}</figcaption></figure>

<script lang="ts">
  let { checked = $bindable(false), indeterminate = false, disabled = false, name, value = 'on', children, ...rest }: { checked?: boolean; indeterminate?: boolean; disabled?: boolean; name?: string; value?: string; children?: import('svelte').Snippet; [key: string]: unknown } = $props();
</script>
<label data-slot="checkbox" data-state={indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked'} data-disabled={disabled || undefined}>
  <input {...rest} type="checkbox" bind:checked {disabled} {name} {value} aria-checked={indeterminate ? 'mixed' : checked} />
  <span aria-hidden="true" data-part="indicator">{@render children?.()}</span>
</label>

<script lang="ts">
  let { open = $bindable(false), disabled = false, trigger, children, ...rest }: { open?: boolean; disabled?: boolean; trigger?: import('svelte').Snippet; children?: import('svelte').Snippet; [key: string]: unknown } = $props();
</script>
<div {...rest} data-slot="collapsible" data-state={open ? 'open' : 'closed'}>
  <button type="button" data-slot="collapsible-trigger" aria-expanded={open} {disabled} onclick={() => open = !open}>{@render trigger?.()}</button>
  <div data-slot="collapsible-content" hidden={!open}>{@render children?.()}</div>
</div>

<script lang="ts">type Option = { value: string; label: string; disabled?: boolean }; let { value = $bindable(''), options = [], label = 'Choose an option', placeholder = '', disabled = false, ...rest }: { value?: string; options?: Option[]; label?: string; placeholder?: string; disabled?: boolean; [key: string]: unknown } = $props(); let query = $state(''); let open = $state(false); let filtered = $derived(options.filter(option => option.label.toLowerCase().includes(query.toLowerCase()))); function choose(option: Option) { if (option.disabled) return; value = option.value; query = option.label; open = false; }</script>
<div {...rest} data-slot="combobox"><input role="combobox" aria-label={label} aria-expanded={open} aria-controls="simurgh-combobox-list" autocomplete="off" bind:value={query} {placeholder} {disabled} onfocus={() => open = true} oninput={() => open = true} /><div id="simurgh-combobox-list" role="listbox" hidden={!open}>{#each filtered as option}<button type="button" role="option" aria-selected={value === option.value} disabled={option.disabled} onclick={() => choose(option)}>{option.label}</button>{/each}</div></div>

<script lang="ts">type Item = { value: string; label: string; disabled?: boolean }; let { items = [], label = 'Command menu', placeholder = 'Search commands', onSelect, ...rest }: { items?: Item[]; label?: string; placeholder?: string; onSelect?: (value: string) => void; [key: string]: unknown } = $props(); let query = $state(''); let filtered = $derived(items.filter(item => item.label.toLowerCase().includes(query.toLowerCase())));</script>
<div {...rest} role="dialog" aria-label={label} data-slot="command"><input aria-label="Search commands" {placeholder} bind:value={query} /><div role="listbox" data-slot="command-list">{#each filtered as item}<button type="button" role="option" aria-selected="false" disabled={item.disabled} data-slot="command-item" onclick={() => onSelect?.(item.value)}>{item.label}</button>{/each}{#if !filtered.length}<div data-slot="command-empty">No results</div>{/if}</div></div>

<script lang="ts">type Item = { value: string; label: string; disabled?: boolean }; let { open = $bindable(false), items = [], children, onSelect, ...rest }: { open?: boolean; items?: Item[]; children?: import('svelte').Snippet; onSelect?: (value: string) => void; [key: string]: unknown } = $props(); let x = $state(0); let y = $state(0); function context(event: MouseEvent) { event.preventDefault(); x = event.clientX; y = event.clientY; open = true; }</script>
<div {...rest} data-slot="context-menu" oncontextmenu={context}>{@render children?.()}<div role="menu" data-slot="context-menu-content" hidden={!open} style:left={`${x}px`} style:top={`${y}px`}>{#each items as item}<button type="button" role="menuitem" disabled={item.disabled} onclick={() => { onSelect?.(item.value); open = false; }}>{item.label}</button>{/each}</div></div>

<script lang="ts">let { value = $bindable(''), name, min, max, disabled = false, label = 'Choose date', ...rest }: { value?: string; name?: string; min?: string; max?: string; disabled?: boolean; label?: string; [key: string]: unknown } = $props();</script>
<input {...rest} type="date" bind:value {name} {min} {max} {disabled} aria-label={label} data-slot="date-picker" />

<script lang="ts">type Item = { term: string; details: string }; let { items = [], children, ...rest }: { items?: Item[]; children?: import('svelte').Snippet; [key: string]: unknown } = $props();</script>
<dl {...rest} data-slot="description-list">{#each items as item}<div data-slot="description-list-group"><dt data-slot="description-list-term">{item.term}</dt><dd data-slot="description-list-details">{item.details}</dd></div>{/each}{@render children?.()}</dl>

<script lang="ts">let { open = $bindable(false), title, description, trigger, children, closeLabel = 'Close', ...rest }: { open?: boolean; title?: string; description?: string; trigger?: import('svelte').Snippet; children?: import('svelte').Snippet; closeLabel?: string; [key: string]: unknown } = $props(); let element: HTMLDialogElement; $effect(() => { if (!element) return; if (open && !element.open) element.showModal(); else if (!open && element.open) element.close(); });</script>
{#if trigger}<button type="button" data-slot="dialog-trigger" onclick={() => open = true}>{@render trigger()}</button>{/if}<dialog {...rest} bind:this={element} data-slot="dialog-content" onclose={() => open = false} onclick={(event) => { if (event.target === element) open = false; }}>{#if title}<h2 data-slot="dialog-title">{title}</h2>{/if}{#if description}<p data-slot="dialog-description">{description}</p>{/if}{@render children?.()}<button type="button" data-slot="dialog-close" onclick={() => open = false}>{closeLabel}</button></dialog>

<script lang="ts">
  let { open = $bindable(false), summary, children, ...rest }: { open?: boolean; summary?: import('svelte').Snippet; children?: import('svelte').Snippet; [key: string]: unknown } = $props();
</script>
<details {...rest} bind:open data-slot="disclosure" data-state={open ? 'open' : 'closed'}>
  <summary data-slot="disclosure-summary">{@render summary?.()}</summary>
  <div data-slot="disclosure-content">{@render children?.()}</div>
</details>

<script lang="ts">let { open = $bindable(false), title, trigger, children, ...rest }: { open?: boolean; title?: string; trigger?: import('svelte').Snippet; children?: import('svelte').Snippet; [key: string]: unknown } = $props(); let element: HTMLDialogElement; $effect(() => { if (!element) return; if (open && !element.open) element.showModal(); else if (!open && element.open) element.close(); });</script>
{#if trigger}<button type="button" data-slot="drawer-trigger" onclick={() => open = true}>{@render trigger()}</button>{/if}<dialog {...rest} bind:this={element} data-slot="drawer-content" data-side="bottom" onclose={() => open = false}>{#if title}<h2 data-slot="drawer-title">{title}</h2>{/if}{@render children?.()}<button type="button" aria-label="Close" data-slot="drawer-close" onclick={() => open = false}>×</button></dialog>

<script lang="ts">type Item = { value: string; label: string; disabled?: boolean }; let { open = $bindable(false), items = [], label = 'Menu', onSelect, ...rest }: { open?: boolean; items?: Item[]; label?: string; onSelect?: (value: string) => void; [key: string]: unknown } = $props();</script>
<div {...rest} data-slot="dropdown-menu"><button type="button" aria-haspopup="menu" aria-expanded={open} data-slot="dropdown-menu-trigger" onclick={() => open = !open}>{label}</button><div role="menu" data-slot="dropdown-menu-content" hidden={!open}>{#each items as item}<button type="button" role="menuitem" disabled={item.disabled} data-slot="dropdown-menu-item" onclick={() => { onSelect?.(item.value); open = false; }}>{item.label}</button>{/each}</div></div>

<script lang="ts">
  let { media, title, description, children, ...rest }: { media?: import('svelte').Snippet; title?: import('svelte').Snippet; description?: import('svelte').Snippet; children?: import('svelte').Snippet; [key: string]: unknown } = $props();
</script>
<div {...rest} data-slot="empty"><div data-slot="empty-header">{#if media}<div data-slot="empty-media">{@render media()}</div>{/if}{#if title}<h3 data-slot="empty-title">{@render title()}</h3>{/if}{#if description}<p data-slot="empty-description">{@render description()}</p>{/if}</div><div data-slot="empty-content">{@render children?.()}</div></div>

<script lang="ts">
  let { invalid = false, disabled = false, legend, description, error, children, ...rest }: { invalid?: boolean; disabled?: boolean; legend?: import('svelte').Snippet; description?: import('svelte').Snippet; error?: import('svelte').Snippet; children?: import('svelte').Snippet; [key: string]: unknown } = $props();
</script>
<fieldset {...rest} {disabled} data-slot="field" data-invalid={invalid || undefined}>
  {#if legend}<legend data-slot="field-legend">{@render legend()}</legend>{/if}
  {@render children?.()}
  {#if description}<div data-slot="field-description">{@render description()}</div>{/if}
  {#if error}<div role="alert" data-slot="field-error">{@render error()}</div>{/if}
</fieldset>

<script lang="ts">let { files = $bindable<File[]>([]), accept, multiple = false, disabled = false, label = 'Choose file', ...rest }: { files?: File[]; accept?: string; multiple?: boolean; disabled?: boolean; label?: string; [key: string]: unknown } = $props(); function change(event: Event) { files = Array.from((event.target as HTMLInputElement).files ?? []); }</script>
<label {...rest} data-slot="file-upload" data-state={files.length ? 'selected' : 'empty'}><span>{label}</span><input type="file" {accept} {multiple} {disabled} onchange={change} /><span aria-live="polite">{files.map((file) => file.name).join(', ')}</span></label>

<script lang="ts">
  let { focusInvalid = true, errors, children, ...rest }: { focusInvalid?: boolean; errors?: import('svelte').Snippet; children?: import('svelte').Snippet; [key: string]: unknown } = $props();
  function invalid(event: Event) { if (focusInvalid) queueMicrotask(() => (event.target as HTMLElement).focus()); }
</script>
<form {...rest} data-slot="form" oninvalid={invalid}>
  {@render children?.()}
  {#if errors}<div role="alert" aria-live="assertive" tabindex="-1" data-slot="form-error-summary">{@render errors()}</div>{/if}
</form>

<script lang="ts">let { trigger, children, ...rest }: { trigger?: import('svelte').Snippet; children?: import('svelte').Snippet; [key: string]: unknown } = $props(); let open = $state(false);</script>
<span {...rest} data-slot="hover-card" onmouseenter={() => open = true} onmouseleave={() => open = false} onfocusin={() => open = true} onfocusout={() => open = false}><span data-slot="hover-card-trigger">{@render trigger?.()}</span><span data-slot="hover-card-content" data-state={open ? 'open' : 'closed'} hidden={!open}>{@render children?.()}</span></span>

<script lang="ts">let { prefix, suffix, children, ...rest }: { prefix?: import('svelte').Snippet; suffix?: import('svelte').Snippet; children?: import('svelte').Snippet; [key: string]: unknown } = $props();</script>
<div {...rest} data-slot="input-group">{#if prefix}<span data-slot="input-group-addon" data-align="start">{@render prefix()}</span>{/if}{@render children?.()}{#if suffix}<span data-slot="input-group-addon" data-align="end">{@render suffix()}</span>{/if}</div>

<script lang="ts">let { value = $bindable(''), length = 6, name, disabled = false, label = 'One-time code', ...rest }: { value?: string; length?: number; name?: string; disabled?: boolean; label?: string; [key: string]: unknown } = $props(); function input(event: Event) { value = (event.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, length); }</script>
<div {...rest} data-slot="input-otp"><input inputmode="numeric" autocomplete="one-time-code" maxlength={length} {name} {disabled} {value} aria-label={label} oninput={input} /><div aria-hidden="true" data-part="slots">{#each Array(length) as _, index}<span data-slot="input-otp-slot" data-state={index === value.length ? 'active' : 'idle'}>{value[index] ?? ''}</span>{/each}</div></div>

<script lang="ts">
  let { invalid = false, ...props }: { invalid?: boolean; [key: string]: unknown } = $props();
</script>
<input {...props} data-slot="input" aria-invalid={invalid || undefined} />

<script lang="ts">
  let { media, title, description, actions, children, ...rest }: { media?: import('svelte').Snippet; title?: import('svelte').Snippet; description?: import('svelte').Snippet; actions?: import('svelte').Snippet; children?: import('svelte').Snippet; [key: string]: unknown } = $props();
</script>
<div {...rest} data-slot="item">{#if media}<div data-slot="item-media">{@render media()}</div>{/if}<div data-slot="item-content">{#if title}<div data-slot="item-title">{@render title()}</div>{/if}{#if description}<p data-slot="item-description">{@render description()}</p>{/if}{@render children?.()}</div>{#if actions}<div data-slot="item-actions">{@render actions()}</div>{/if}</div>

<script lang="ts">let { children, ...rest }: { children?: import('svelte').Snippet; [key: string]: unknown } = $props();</script>
<kbd {...rest} data-slot="kbd">{@render children?.()}</kbd>

<script lang="ts">
  let { children, ...props }: { children?: import('svelte').Snippet; [key: string]: unknown } = $props();
</script>
<label {...props}>{@render children?.()}</label>

<script lang="ts">
  let { disabled = false, external = false, href, rel, target, children, ...props }: { disabled?: boolean; external?: boolean; href?: string; rel?: string; target?: string; children?: import('svelte').Snippet; [key: string]: unknown } = $props();
</script>
<a {...props} href={disabled ? undefined : href} aria-disabled={disabled || undefined} data-slot="link"
  data-external={external || undefined} rel={external ? (rel ?? 'noopener noreferrer') : rel}
  target={external ? (target ?? '_blank') : target} tabindex={disabled ? -1 : undefined}
  onclick={(event) => { if (disabled) event.preventDefault(); }}>{@render children?.()}</a>

<script lang="ts">type Menu = { label: string; items: { value: string; label: string; disabled?: boolean }[] }; let { menus = [], label = 'Menu bar', onSelect, ...rest }: { menus?: Menu[]; label?: string; onSelect?: (value: string) => void; [key: string]: unknown } = $props(); let open = $state(-1);</script>
<div {...rest} role="menubar" aria-label={label} data-slot="menubar">{#each menus as menu, index}<div><button type="button" role="menuitem" aria-haspopup="menu" aria-expanded={open === index} onclick={() => open = open === index ? -1 : index}>{menu.label}</button><div role="menu" hidden={open !== index}>{#each menu.items as item}<button type="button" role="menuitem" disabled={item.disabled} onclick={() => { onSelect?.(item.value); open = -1; }}>{item.label}</button>{/each}</div></div>{/each}</div>

<script lang="ts">
  let { label, min = 0, max = 100, value = 0, children }: { label?: string; min?: number; max?: number; value?: number; children?: import('svelte').Snippet } = $props();
  let safeValue = $derived(Math.min(Number(max), Math.max(Number(min), Number(value))));
</script>
<meter {min} {max} value={safeValue} role="meter" aria-valuenow={safeValue} aria-valuemin={min} aria-valuemax={max} aria-label={label} data-slot="meter">
  {#if children}{@render children()}{:else}{safeValue}{/if}
</meter>

<script lang="ts">
  let { invalid = false, children, ...props }: { invalid?: boolean; children?: import('svelte').Snippet; [key: string]: unknown } = $props();
</script>
<select {...props} aria-invalid={invalid || undefined} data-slot="native-select">{@render children?.()}</select>

<script lang="ts">type Item = { href: string; label: string; current?: boolean }; let { items = [], label = 'Main navigation', ...rest }: { items?: Item[]; label?: string; [key: string]: unknown } = $props();</script>
<nav {...rest} aria-label={label} data-slot="navigation-menu"><ul>{#each items as item}<li><a href={item.href} aria-current={item.current ? 'page' : undefined} data-slot="navigation-menu-link">{item.label}</a></li>{/each}</ul></nav>

<script lang="ts">let { value = $bindable(0), min, max, step = 1, disabled = false, label = 'Number', ...rest }: { value?: number; min?: number; max?: number; step?: number; disabled?: boolean; label?: string; [key: string]: unknown } = $props(); const clamp = (next: number) => Math.min(max ?? Infinity, Math.max(min ?? -Infinity, next));</script>
<div {...rest} data-slot="number-input"><button type="button" aria-label={`Decrease ${label}`} {disabled} onclick={() => value = clamp(value - step)}>−</button><input type="number" bind:value {min} {max} {step} {disabled} aria-label={label} /><button type="button" aria-label={`Increase ${label}`} {disabled} onclick={() => value = clamp(value + step)}>+</button></div>

<script lang="ts">let { page = $bindable(1), count = 1, label = 'Pagination', ...rest }: { page?: number; count?: number; label?: string; [key: string]: unknown } = $props();</script>
<nav {...rest} aria-label={label} data-slot="pagination"><button type="button" aria-label="Previous page" disabled={page <= 1} onclick={() => page--}>Previous</button>{#each Array(count) as _, index}<button type="button" aria-current={page === index + 1 ? 'page' : undefined} onclick={() => page = index + 1}>{index + 1}</button>{/each}<button type="button" aria-label="Next page" disabled={page >= count} onclick={() => page++}>Next</button></nav>

<script lang="ts">let { value = $bindable(''), visible = $bindable(false), disabled = false, label = 'Password', ...rest }: { value?: string; visible?: boolean; disabled?: boolean; label?: string; [key: string]: unknown } = $props();</script>
<div {...rest} data-slot="password-input"><input type={visible ? 'text' : 'password'} bind:value {disabled} aria-label={label} /><button type="button" aria-label={visible ? 'Hide password' : 'Show password'} aria-pressed={visible} {disabled} onclick={() => visible = !visible}>{visible ? 'Hide' : 'Show'}</button></div>

<script lang="ts">let { open = $bindable(false), trigger, children, label = 'Toggle popover', ...rest }: { open?: boolean; trigger?: import('svelte').Snippet; children?: import('svelte').Snippet; label?: string; [key: string]: unknown } = $props();</script>
<div {...rest} data-slot="popover"><button type="button" aria-label={label} aria-expanded={open} data-slot="popover-trigger" onclick={() => open = !open}>{@render trigger?.()}</button><div data-slot="popover-content" data-state={open ? 'open' : 'closed'} hidden={!open}>{@render children?.()}</div></div>

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

<script lang="ts">
  type Option = { value: string; label: string; disabled?: boolean };
  let { value = $bindable(''), options = [], name, required = false, disabled = false, orientation = 'vertical', ...rest }: { value?: string; options?: Option[]; name?: string; required?: boolean; disabled?: boolean; orientation?: 'horizontal' | 'vertical'; [key: string]: unknown } = $props();
</script>
<div {...rest} role="radiogroup" data-slot="radio-group" data-orientation={orientation}>{#each options as option}<label data-slot="radio-group-item" data-state={value === option.value ? 'checked' : 'unchecked'}><input type="radio" bind:group={value} value={option.value} {name} {required} disabled={disabled || option.disabled} /><span>{option.label}</span></label>{/each}</div>

<script lang="ts">let { value = $bindable(0), max = 5, label = 'Rating', disabled = false, ...rest }: { value?: number; max?: number; label?: string; disabled?: boolean; [key: string]: unknown } = $props();</script>
<div {...rest} role="radiogroup" aria-label={label} data-slot="rating">{#each Array(max) as _, index}<button type="button" role="radio" aria-checked={value === index + 1} aria-label={`${index + 1} of ${max}`} {disabled} data-state={value >= index + 1 ? 'on' : 'off'} onclick={() => value = index + 1}>★</button>{/each}</div>

<script lang="ts">let { size = $bindable(50), orientation = 'horizontal', min = 10, max = 90, first, second, ...rest }: { size?: number; orientation?: 'horizontal' | 'vertical'; min?: number; max?: number; first?: import('svelte').Snippet; second?: import('svelte').Snippet; [key: string]: unknown } = $props();</script>
<div {...rest} data-slot="resizable-panel-group" data-orientation={orientation}><div data-slot="resizable-panel" style:flex-basis={`${size}%`}>{@render first?.()}</div><input type="range" aria-label="Resize panels" bind:value={size} {min} {max} data-slot="resizable-handle" /><div data-slot="resizable-panel" style:flex-basis={`${100-size}%`}>{@render second?.()}</div></div>

<script lang="ts">let { orientation = 'vertical', children, ...rest }: { orientation?: 'vertical' | 'horizontal' | 'both'; children?: import('svelte').Snippet; [key: string]: unknown } = $props();</script>
<div {...rest} data-slot="scroll-area" data-orientation={orientation}><div data-slot="scroll-area-viewport">{@render children?.()}</div></div>

<script lang="ts">type Option = { value: string; label: string; disabled?: boolean }; let { value = $bindable(''), options = [], placeholder = 'Select an option', name, required = false, disabled = false, label = 'Select', ...rest }: { value?: string; options?: Option[]; placeholder?: string; name?: string; required?: boolean; disabled?: boolean; label?: string; [key: string]: unknown } = $props();</script>
<select {...rest} bind:value {name} {required} {disabled} aria-label={label} data-slot="select" data-state={value ? 'selected' : 'empty'}><option value="" disabled>{placeholder}</option>{#each options as option}<option value={option.value} disabled={option.disabled}>{option.label}</option>{/each}</select>

<script lang="ts">let { orientation = 'horizontal' }: { orientation?: 'horizontal' | 'vertical' } = $props();</script>
<div role="separator" aria-orientation={orientation} data-slot="separator" data-orientation={orientation}></div>

<script lang="ts">let { open = $bindable(false), side = 'right', title, trigger, children, ...rest }: { open?: boolean; side?: 'top' | 'right' | 'bottom' | 'left'; title?: string; trigger?: import('svelte').Snippet; children?: import('svelte').Snippet; [key: string]: unknown } = $props(); let element: HTMLDialogElement; $effect(() => { if (!element) return; if (open && !element.open) element.showModal(); else if (!open && element.open) element.close(); });</script>
{#if trigger}<button type="button" data-slot="sheet-trigger" onclick={() => open = true}>{@render trigger()}</button>{/if}<dialog {...rest} bind:this={element} data-slot="sheet-content" data-side={side} onclose={() => open = false}>{#if title}<h2 data-slot="sheet-title">{title}</h2>{/if}{@render children?.()}<button type="button" aria-label="Close" data-slot="sheet-close" onclick={() => open = false}>×</button></dialog>

<script lang="ts">let { open = $bindable(true), label = 'Sidebar', triggerLabel = 'Toggle sidebar', children, ...rest }: { open?: boolean; label?: string; triggerLabel?: string; children?: import('svelte').Snippet; [key: string]: unknown } = $props();</script>
<div {...rest} data-slot="sidebar-provider" data-state={open ? 'expanded' : 'collapsed'}><button type="button" aria-label={triggerLabel} aria-expanded={open} data-slot="sidebar-trigger" onclick={() => open = !open}>☰</button><aside aria-label={label} data-slot="sidebar" hidden={!open}>{@render children?.()}</aside></div>

<script lang="ts">let { children }: { children?: import('svelte').Snippet } = $props();</script>
<div aria-hidden="true" data-slot="skeleton">{@render children?.()}</div>

<script lang="ts">let { value = $bindable(0), min = 0, max = 100, step = 1, disabled = false, ...rest }: { value?: number; min?: number; max?: number; step?: number; disabled?: boolean; [key: string]: unknown } = $props();</script>
<input {...rest} type="range" bind:value {min} {max} {step} {disabled} data-slot="slider" data-state={disabled ? 'disabled' : 'enabled'} />

<script lang="ts">let { label = 'Loading' }: { label?: string } = $props();</script>
<span role="status" aria-label={label} data-slot="spinner"></span>

<script lang="ts">
  let { checked = $bindable(false), disabled = false, name, value = 'on', children, ...rest }: { checked?: boolean; disabled?: boolean; name?: string; value?: string; children?: import('svelte').Snippet; [key: string]: unknown } = $props();
</script>
<label data-slot="switch" data-state={checked ? 'checked' : 'unchecked'} data-disabled={disabled || undefined}>
  <input {...rest} type="checkbox" role="switch" bind:checked {disabled} {name} {value} />
  <span aria-hidden="true" data-part="thumb">{@render children?.()}</span>
</label>

<script lang="ts">let { caption, head, body, foot, ...rest }: { caption?: import('svelte').Snippet; head?: import('svelte').Snippet; body?: import('svelte').Snippet; foot?: import('svelte').Snippet; [key: string]: unknown } = $props();</script>
<div data-slot="table-container"><table {...rest} data-slot="table">{#if caption}<caption data-slot="table-caption">{@render caption()}</caption>{/if}{#if head}<thead data-slot="table-header">{@render head()}</thead>{/if}<tbody data-slot="table-body">{@render body?.()}</tbody>{#if foot}<tfoot data-slot="table-footer">{@render foot()}</tfoot>{/if}</table></div>

<script lang="ts">type Tab = { value: string; label: string; disabled?: boolean; content?: string }; let { value = $bindable(''), tabs = [], label = 'Tabs', ...rest }: { value?: string; tabs?: Tab[]; label?: string; [key: string]: unknown } = $props(); $effect(() => { if (!value && tabs[0]) value = tabs[0].value; });</script>
<div {...rest} data-slot="tabs"><div role="tablist" aria-label={label}>{#each tabs as tab}<button type="button" role="tab" aria-selected={value === tab.value} aria-controls={`panel-${tab.value}`} id={`tab-${tab.value}`} disabled={tab.disabled} tabindex={value === tab.value ? 0 : -1} onclick={() => value = tab.value}>{tab.label}</button>{/each}</div>{#each tabs as tab}<div role="tabpanel" id={`panel-${tab.value}`} aria-labelledby={`tab-${tab.value}`} hidden={value !== tab.value}>{tab.content ?? ''}</div>{/each}</div>

<script lang="ts">
  let { value = $bindable<string[]>([]), name, disabled = false, label = 'Tags', ...rest }: { value?: string[]; name?: string; disabled?: boolean; label?: string; [key: string]: unknown } = $props(); let draft = $state('');
  function commit() { const tag = draft.trim(); if (tag && !value.includes(tag)) value = [...value, tag]; draft = ''; }
  function keydown(event: KeyboardEvent) { if (event.key === 'Enter' || event.key === ',') { event.preventDefault(); commit(); } else if (event.key === 'Backspace' && !draft) value = value.slice(0, -1); }
</script>
<div {...rest} data-slot="tags-input">{#each value as tag, index}<span data-slot="tag">{tag}<button type="button" aria-label={`Remove ${tag}`} {disabled} onclick={() => value = value.filter((_, i) => i !== index)}>×</button></span>{/each}<input bind:value={draft} aria-label={label} {disabled} onkeydown={keydown} onblur={commit} />{#if name}<input type="hidden" {name} value={value.join(',')} />{/if}</div>

<script lang="ts">
  let { invalid = false, value = '', ...props }: { invalid?: boolean; value?: string; [key: string]: unknown } = $props();
</script>
<textarea {...props} aria-invalid={invalid || undefined}>{value}</textarea>

<script lang="ts">type Message = { id: string; title: string; description?: string; tone?: 'neutral' | 'success' | 'warning' | 'danger' }; let { messages = $bindable<Message[]>([]), label = 'Notifications', ...rest }: { messages?: Message[]; label?: string; [key: string]: unknown } = $props();</script>
<div {...rest} aria-label={label} data-slot="toast-viewport">{#each messages as message (message.id)}<div role={message.tone === 'danger' ? 'alert' : 'status'} aria-live={message.tone === 'danger' ? 'assertive' : 'polite'} data-slot="toast" data-tone={message.tone ?? 'neutral'}><strong>{message.title}</strong>{#if message.description}<p>{message.description}</p>{/if}<button type="button" aria-label="Dismiss notification" onclick={() => messages = messages.filter(item => item.id !== message.id)}>×</button></div>{/each}</div>

<script lang="ts">type Option = { value: string; label: string; disabled?: boolean }; let { value = $bindable<string[]>([]), options = [], multiple = false, disabled = false, label = 'Toggle group', ...rest }: { value?: string[]; options?: Option[]; multiple?: boolean; disabled?: boolean; label?: string; [key: string]: unknown } = $props(); function toggle(option: Option) { if (disabled || option.disabled) return; value = value.includes(option.value) ? value.filter(v => v !== option.value) : multiple ? [...value, option.value] : [option.value]; }</script>
<div {...rest} role="group" aria-label={label} data-slot="toggle-group">{#each options as option}<button type="button" aria-pressed={value.includes(option.value)} disabled={disabled || option.disabled} data-state={value.includes(option.value) ? 'on' : 'off'} onclick={() => toggle(option)}>{option.label}</button>{/each}</div>

<script lang="ts">
  let { pressed = $bindable(false), disabled = false, children, ...rest }: { pressed?: boolean; disabled?: boolean; children?: import('svelte').Snippet; [key: string]: unknown } = $props();
</script>
<button {...rest} type="button" aria-pressed={pressed} data-slot="toggle" data-state={pressed ? 'on' : 'off'} {disabled} onclick={() => { if (!disabled) pressed = !pressed; }}>{@render children?.()}</button>

<script lang="ts">let { label = 'Toolbar', orientation = 'horizontal', children, ...rest }: { label?: string; orientation?: 'horizontal' | 'vertical'; children?: import('svelte').Snippet; [key: string]: unknown } = $props();</script>
<div {...rest} role="toolbar" aria-label={label} aria-orientation={orientation} data-slot="toolbar" data-orientation={orientation}>{@render children?.()}</div>

<script lang="ts">let { content, children, ...rest }: { content: string; children?: import('svelte').Snippet; [key: string]: unknown } = $props(); let open = $state(false); const id = `tooltip-${Math.random().toString(36).slice(2)}`;</script>
<span {...rest} data-slot="tooltip" onmouseenter={() => open = true} onmouseleave={() => open = false} onfocusin={() => open = true} onfocusout={() => open = false}><span aria-describedby={id} data-slot="tooltip-trigger">{@render children?.()}</span><span id={id} role="tooltip" data-slot="tooltip-content" hidden={!open}>{content}</span></span>

<script lang="ts">type Item = { value: string; label: string; level?: number; disabled?: boolean }; let { value = $bindable(''), items = [], label = 'Tree', ...rest }: { value?: string; items?: Item[]; label?: string; [key: string]: unknown } = $props();</script>
<div {...rest} role="tree" aria-label={label} data-slot="tree">{#each items as item}<button type="button" role="treeitem" aria-level={(item.level ?? 0) + 1} aria-selected={value === item.value} disabled={item.disabled} style:padding-inline-start={`${(item.level ?? 0) * 1.25}rem`} onclick={() => value = item.value}>{item.label}</button>{/each}</div>

<script lang="ts">let { children }: { children?: import('svelte').Snippet } = $props();</script>
<span data-slot="visually-hidden">{@render children?.()}</span>
