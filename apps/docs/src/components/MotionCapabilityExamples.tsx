import { useEffect, useRef, useState } from 'react';
import {
  animate,
  animateAll,
  timeline,
  type MotionControls,
} from '@simurgh-ui/motion';
import { layout } from '@simurgh-ui/motion/layout';
import { scroll } from '@simurgh-ui/motion/scroll';

const cardStyle = {
  border: '1px solid hsl(var(--simurgh-border))',
  borderRadius: 'var(--simurgh-radius-lg, 0.75rem)',
  padding: '1rem',
  minHeight: '14rem',
  background: 'hsl(var(--simurgh-card))',
} as const;

const buttonStyle = {
  border: '1px solid hsl(var(--simurgh-border))',
  borderRadius: 'var(--simurgh-radius, 0.5rem)',
  padding: '0.5rem 0.75rem',
  background: 'hsl(var(--simurgh-primary))',
  color: 'hsl(var(--simurgh-primary-foreground))',
  cursor: 'pointer',
} as const;

function finishable(control: MotionControls | undefined) {
  control?.cancel();
}

export default function MotionCapabilityExamples() {
  const timelineNodes = useRef<Array<HTMLDivElement | null>>([]);
  const batchNodes = useRef<Array<HTMLDivElement | null>>([]);
  const springNode = useRef<HTMLButtonElement>(null);
  const scrollNode = useRef<HTMLDivElement>(null);
  const layoutNode = useRef<HTMLDivElement>(null);
  const timelineControl = useRef<MotionControls>();
  const batchControl = useRef<MotionControls>();
  const springControl = useRef<MotionControls>();
  const scrollControl = useRef<MotionControls>();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const node = scrollNode.current;
    if (!node) return;
    scrollControl.current = scroll(node, { opacity: [0.25, 1], y: [24, 0] }, { once: false });
    return () => finishable(scrollControl.current);
  }, []);

  const runTimeline = () => {
    finishable(timelineControl.current);
    const nodes = timelineNodes.current.filter(
      (node): node is HTMLDivElement => node !== null,
    );
    timelineControl.current = timeline([
      { target: nodes[0]!, keyframes: { opacity: [0.25, 1], x: [-18, 0] }, transition: { duration: 0.25 } },
      { target: nodes[1]!, keyframes: { opacity: [0.25, 1], x: [-18, 0] }, at: 'middle', transition: { duration: 0.25 } },
      { target: nodes[2]!, keyframes: { opacity: [0.25, 1], x: [-18, 0] }, at: 0.4, transition: { duration: 0.25 } },
    ], { labels: { middle: 0.18 } });
  };

  const runBatch = () => {
    finishable(batchControl.current);
    const nodes = batchNodes.current.filter(
      (node): node is HTMLDivElement => node !== null,
    );
    batchControl.current = animateAll(nodes, { opacity: [0.25, 1], scale: [0.8, 1] }, {
      duration: 0.35,
      stagger: (index) => index * 0.07,
    });
  };

  const runSpring = (velocity: number) => {
    const node = springNode.current;
    if (!node) return;
    finishable(springControl.current);
    springControl.current = animate(node, { x: [0, 48], scale: [1, 1.08] }, {
      type: 'spring',
      stiffness: 240,
      damping: 22,
      velocity,
    }, { reducedMotion: 'never' });
  };

  const toggleLayout = () => {
    const node = layoutNode.current;
    if (!node) return;
    layout(node, () => {
      node.style.blockSize = expanded ? '4rem' : '8rem';
      setExpanded((value) => !value);
    }, { transition: { type: 'spring', stiffness: 240, damping: 24 } });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))', gap: '1rem', width: '100%' }}>
      <section style={cardStyle}>
        <h3 style={{ marginBlockStart: 0 }}>1. Timeline</h3>
        <p>Labels and absolute offsets coordinate independent elements.</p>
        <button type="button" style={buttonStyle} onClick={runTimeline}>Run timeline</button>
        <div style={{ display: 'grid', gap: '0.35rem', marginBlockStart: '1rem' }}>
          {['Prepare', 'Compose', 'Ship'].map((label, index) => (
            <div key={label} ref={(node) => { timelineNodes.current[index] = node; }} style={{ padding: '0.35rem 0.5rem', borderRadius: '0.35rem', background: 'hsl(var(--simurgh-muted))' }}>{label}</div>
          ))}
        </div>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginBlockStart: 0 }}>2. Multi-target stagger</h3>
        <p>One keyframe definition can animate any iterable of elements.</p>
        <button type="button" style={buttonStyle} onClick={runBatch}>Run stagger</button>
        <div style={{ display: 'flex', gap: '0.4rem', marginBlockStart: '1.25rem' }}>
          {['A', 'B', 'C', 'D'].map((label, index) => (
            <div key={label} ref={(node) => { batchNodes.current[index] = node; }} style={{ display: 'grid', placeItems: 'center', inlineSize: '2rem', blockSize: '2rem', borderRadius: '50%', background: 'hsl(var(--simurgh-firuzeh))' }}>{label}</div>
          ))}
        </div>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginBlockStart: 0 }}>3. Interruptible spring</h3>
        <p>Cancel and restart with velocity to keep the transition fluid.</p>
        <button ref={springNode} type="button" style={buttonStyle} onPointerEnter={() => runSpring(0.8)} onPointerLeave={() => runSpring(-0.4)}>Hover me</button>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginBlockStart: 0 }}>4. Scroll-linked</h3>
        <p>Scroll this page to scrub the element between its keyframes.</p>
        <div ref={scrollNode} style={{ marginBlockStart: '2rem', padding: '0.75rem', borderRadius: '0.5rem', background: 'hsl(var(--simurgh-primary))', color: 'hsl(var(--simurgh-primary-foreground))' }}>Scroll progress</div>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginBlockStart: 0 }}>5. FLIP layout</h3>
        <p>Measure, update, and animate a layout change with the opt-in helper.</p>
        <button type="button" style={buttonStyle} onClick={toggleLayout} aria-expanded={expanded}>{expanded ? 'Collapse card' : 'Expand card'}</button>
        <div ref={layoutNode} style={{ blockSize: '4rem', marginBlockStart: '0.75rem', padding: '0.5rem', overflow: 'hidden', borderRadius: '0.5rem', background: 'hsl(var(--simurgh-muted))' }}>FLIP preserves the visual continuity of this resize.</div>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginBlockStart: 0 }}>6. Opt-in bundle boundary</h3>
        <p>Core animation stays small; heavier capabilities are imported only when used.</p>
        <pre style={{ overflowX: 'auto', padding: '0.75rem', borderRadius: '0.5rem', background: 'hsl(var(--simurgh-muted))' }}><code>{"import { animate } from '@simurgh-ui/motion';\nimport { scroll } from '@simurgh-ui/motion/scroll';\nimport { layout } from '@simurgh-ui/motion/layout';"}</code></pre>
      </section>
    </div>
  );
}
