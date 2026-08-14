import { forwardRef } from 'react';
import { getIcon, type IconName } from './icons.generated.js';
import { createIconComponent, type IconProps } from './react-base.js';

export interface SimurghIconProps extends IconProps { name: IconName; }

export const SimurghIcon = /* @__PURE__ */ forwardRef<SVGSVGElement, SimurghIconProps>(
  function SimurghIcon({ name, ...props }, ref) {
    const Component = createIconComponent(getIcon(name), 'SimurghIcon');
    return <Component ref={ref} {...props} />;
  },
);
