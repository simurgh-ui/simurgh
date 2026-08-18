export const iconDirectionStyles =
  ':where(svg[data-simurgh-direction="auto"]:dir(rtl)) > .simurgh-icon-directional { transform: scaleX(-1); transform-box: view-box; transform-origin: center; }';

export function iconDirectionMode(
  direction: 'ltr' | 'rtl' | undefined,
  mirrorInRtl: boolean,
  directional: boolean,
): 'auto' | 'ltr' | 'rtl' | undefined {
  if (!mirrorInRtl || !directional) return undefined;
  return direction ?? 'auto';
}

export function explicitMirrorTransform(
  direction: 'auto' | 'ltr' | 'rtl' | undefined,
): string | undefined {
  return direction === 'rtl' ? 'translate(144 0) scale(-1 1)' : undefined;
}
