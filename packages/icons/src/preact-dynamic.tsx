import { createElement, type ComponentType } from 'preact';
import { icons, type IconName } from './icons.generated.js';
import { createIconComponent, type PreactIconProps } from './preact-base.js';

const components = new Map<IconName, ComponentType<PreactIconProps>>();
export function PreactDynamicIcon({ name, ...props }: PreactIconProps & { name: IconName }) {
  let component = components.get(name);
  if (!component) {
    component = createIconComponent(icons[name], `${name}Icon`);
    components.set(name, component);
  }
  return createElement(component, props);
}
