import { useState } from 'react';
import {
  animated,
  Presence,
  type MotionDefinition,
} from '@simurgh-ui/motion/react';

const interactiveMotion: MotionDefinition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  whileHover: { scale: 1.04, y: -2 },
  whilePress: { scale: 0.97 },
  whileFocus: { scale: 1.02 },
  transition: { type: 'spring', stiffness: 220, damping: 20 },
};

const panelMotion: MotionDefinition = {
  initial: { opacity: 0, scale: 0.96, y: 8 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: -6 },
  transition: { duration: 0.18, easing: 'ease-out' },
};

const keyframeMotion: MotionDefinition = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: [0, 1, 1, 1],
    scale: [0.8, 1.08, 0.96, 1],
    rotate: [0, 8, -5, 0],
  },
  transition: { duration: 0.65, easing: 'ease-in-out' },
};

const listMotion: MotionDefinition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  stagger: 0.3,
};

const listItemMotion: MotionDefinition = {
  initial: { opacity: 0, x: -12 },
  animate: { opacity: [0, 1], x: [-18, 0] },
  transition: { duration: 0.45, easing: 'ease-out' },
};

const inViewMotion: MotionDefinition = {
  initial: { opacity: 0.2, y: 18 },
  animate: { opacity: 0.2, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.35 },
};

const cardStyle = {
  border: '1px solid hsl(var(--simurgh-border))',
  borderRadius: 'var(--simurgh-radius-lg, 0.75rem)',
  padding: '1rem',
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

export default function MotionExamples() {
  const [open, setOpen] = useState(true);
  const [replay, setReplay] = useState(0);
  const [keyframeReplay, setKeyframeReplay] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))',
        gap: '1rem',
        width: '100%',
      }}
    >
      <section style={cardStyle}>
        <h3 style={{ marginBlockStart: 0 }}>Keyframes</h3>
        <p>Combine transform and opacity arrays in one timeline.</p>
        <button
          type="button"
          style={buttonStyle}
          onClick={() => setKeyframeReplay((value) => value + 1)}
        >
          Replay keyframes
        </button>
        <animated.div
          key={keyframeReplay}
          motion={keyframeMotion}
          aria-hidden="true"
          style={{
            width: '3.5rem',
            height: '3.5rem',
            margin: '1rem auto 0',
            borderRadius: '1rem',
            background: 'hsl(var(--simurgh-firuzeh))',
          }}
        />
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginBlockStart: 0 }}>Spring gestures</h3>
        <p>Hover, focus, or press the button.</p>
        <animated.button
          type="button"
          motion={interactiveMotion}
          style={buttonStyle}
        >
          Preview motion
        </animated.button>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginBlockStart: 0 }}>Presence</h3>
        <button
          type="button"
          style={buttonStyle}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Hide panel' : 'Show panel'}
        </button>
        <div style={{ minHeight: '5.5rem', paddingBlockStart: '0.75rem' }}>
          <Presence exit={panelMotion}>
            {open && (
              <animated.div
                key="motion-panel"
                motion={panelMotion}
                style={{
                  borderRadius: 'var(--simurgh-radius, 0.5rem)',
                  padding: '0.75rem',
                  background: 'hsl(var(--simurgh-muted))',
                }}
              >
                Content remains mounted until its exit animation completes.
              </animated.div>
            )}
          </Presence>
        </div>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginBlockStart: 0 }}>Staggered children</h3>
        <button
          type="button"
          style={buttonStyle}
          onClick={() => setReplay((value) => value + 1)}
        >
          Replay list
        </button>
        <animated.ul
          key={replay}
          motion={listMotion}
          style={{ marginBlockEnd: 0, paddingInlineStart: '1.25rem' }}
        >
          {['Plan', 'Build', 'Verify'].map((label) => (
            <animated.li key={label} motion={listItemMotion}>
              {label}
            </animated.li>
          ))}
        </animated.ul>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginBlockStart: 0 }}>In-view motion</h3>
        <p>Elements animate when they intersect the viewport.</p>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          {['Discover', 'Compose', 'Deliver'].map((label) => (
            <animated.div
              key={label}
              motion={inViewMotion}
              style={{
                borderRadius: 'var(--simurgh-radius, 0.5rem)',
                padding: '0.6rem 0.75rem',
                background: 'hsl(var(--simurgh-muted))',
              }}
            >
              {label}
            </animated.div>
          ))}
        </div>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginBlockStart: 0 }}>Reduced motion</h3>
        <p>Product settings can override the operating-system preference.</p>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            checked={reduceMotion}
            onChange={(event) => setReduceMotion(event.currentTarget.checked)}
          />
          Remove animation duration
        </label>
        <animated.div
          key={String(reduceMotion)}
          motion={{
            ...keyframeMotion,
            reducedMotion: reduceMotion ? 'always' : 'never',
          }}
          aria-hidden="true"
          style={{
            width: '100%',
            height: '0.5rem',
            marginBlockStart: '1rem',
            borderRadius: '999px',
            background: 'hsl(var(--simurgh-primary))',
            transformOrigin: 'left center',
          }}
        />
      </section>
    </div>
  );
}
