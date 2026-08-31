// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import { useEffect, useRef, useState, type ReactNode } from 'preact/compat';

export type ChartResponsiveSize = { width: number; height: number };

export function ChartResponsiveContainer({ aspectRatio = 16 / 9, minWidth = 0, minHeight = 0, children }: {
  aspectRatio?: number;
  minWidth?: number;
  minHeight?: number;
  children: (size: ChartResponsiveSize) => ReactNode;
}) {
  const element = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<ChartResponsiveSize>({ width: minWidth, height: minHeight });
  useEffect(() => {
    const node = element.current;
    if (!node || typeof ResizeObserver === 'undefined') return;
    const update = (width: number) => setSize({ width: Math.max(minWidth, width), height: Math.max(minHeight, width / aspectRatio) });
    update(node.getBoundingClientRect().width);
    const observer = new ResizeObserver((entries) => update(entries[0]?.contentRect.width ?? 0));
    observer.observe(node);
    return () => observer.disconnect();
  }, [aspectRatio, minHeight, minWidth]);
  return <div ref={element} data-part="responsive-container" style={{ width: '100%', minWidth, minHeight, aspectRatio }}>{size.width > 0 ? children(size) : null}</div>;
}
