import type { Component } from 'svelte';
import type { IconName } from './dist/icons.generated.js';
import type { SvelteIconProps } from './svelte-icon.svelte';
declare const DynamicIcon: Component<Omit<SvelteIconProps, 'definition'> & { name: IconName }>;
export default DynamicIcon;
