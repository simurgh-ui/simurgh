import type { Component } from 'svelte';
import type { IconDefinition } from './dist/types.js';
export type SvelteIconProps = {
  definition: IconDefinition;
  size?: number | string;
  title?: string;
  direction?: 'ltr' | 'rtl';
  mirrorInRtl?: boolean;
  colorMode?: 'duotone' | 'currentColor';
  class?: string;
};
declare const Icon: Component<SvelteIconProps>;
export default Icon;
