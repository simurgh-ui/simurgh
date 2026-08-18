import { useRef, useState } from 'react';
import {
  animate,
  animated,
  Presence,
  sequence,
  type MotionDefinition,
} from '@simurgh-ui/motion/react';

const cardStyle = {
  border: '1px solid hsl(var(--simurgh-border))',
  borderRadius: 'var(--simurgh-radius-lg, 0.75rem)',
  padding: '1rem',
  minHeight: '15rem',
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

const typewriterMotion: MotionDefinition = {
  initial: { width: '0ch', opacity: 1 },
  animate: { width: '21ch', opacity: 1 },
  transition: { duration: 1.1, easing: 'steps(21, end)' },
};

const accordionMotion: MotionDefinition = {
  initial: { height: '0px', opacity: 0 },
  animate: { height: '7rem', opacity: 1 },
  exit: { height: '0px', opacity: 0 },
  transition: { duration: 0.22, easing: 'ease-out' },
};

const shimmerMotion: MotionDefinition = {
  initial: { backgroundPositionX: '200%' },
  animate: { backgroundPositionX: '-200%' },
  transition: { duration: 1.15, easing: 'linear', repeat: 5 },
};

const characterGroupMotion: MotionDefinition = {
  animate: { opacity: 1 },
  stagger: 0.07,
};

const characterMotion: MotionDefinition = {
  initial: { opacity: 0, y: 14, rotate: -6 },
  animate: {
    opacity: [0, 1],
    y: [14, 0],
    rotate: [-6, 0],
  },
  transition: { duration: 0.28, easing: 'ease-out' },
};

const characterPhrase = 'Build with motion';

export default function MotionPatternExamples() {
  const [typewriterReplay, setTypewriterReplay] = useState(0);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [shimmerReplay, setShimmerReplay] = useState(0);
  const [characterReplay, setCharacterReplay] = useState(0);
  const sequenceNodes = useRef<Array<HTMLSpanElement | null>>([]);
  const circle = useRef<SVGCircleElement>(null);

  const playSequence = () => {
    const nodes = sequenceNodes.current.filter(
      (node): node is HTMLSpanElement => node !== null,
    );
    sequence(
      nodes.map((node, index) => [
        node,
        { opacity: [0.25, 1], scale: [0.75, 1.15, 1] },
        { duration: 0.22, delay: index * 0.03 },
      ]),
    );
  };

  const drawCircle = () => {
    animate(
      circle.current,
      { strokeDashoffset: [140, 0], opacity: [0.35, 1] },
      { duration: 0.8, easing: 'ease-in-out' },
    );
  };

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
        <h3 style={{ marginBlockStart: 0 }}>Typewriter</h3>
        <button
          type="button"
          style={buttonStyle}
          onClick={() => setTypewriterReplay((value) => value + 1)}
        >
          Replay text
        </button>
        <animated.p
          key={typewriterReplay}
          motion={typewriterMotion}
          style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            borderInlineEnd: '2px solid currentColor',
            fontFamily: 'monospace',
          }}
        >
          Motion tells a story.
        </animated.p>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginBlockStart: 0 }}>Character reveal</h3>
        <button
          type="button"
          style={buttonStyle}
          onClick={() => setCharacterReplay((value) => value + 1)}
        >
          Replay characters
        </button>
        <animated.p
          key={characterReplay}
          motion={characterGroupMotion}
          aria-hidden="true"
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBlockStart: '1.5rem',
            fontSize: '1.25rem',
            fontWeight: 700,
          }}
        >
          {[...characterPhrase].map((character, index) => (
            <animated.span
              key={`${character}-${index}`}
              motion={characterMotion}
              style={{ display: 'inline-block' }}
            >
              {character === ' ' ? '\u00a0' : character}
            </animated.span>
          ))}
        </animated.p>
        <span
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: 0,
          }}
        >
          {characterPhrase}
        </span>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginBlockStart: 0 }}>Accordion reveal</h3>
        <button
          type="button"
          style={buttonStyle}
          aria-expanded={accordionOpen}
          aria-controls="motion-pattern-panel"
          onClick={() => setAccordionOpen((value) => !value)}
        >
          {accordionOpen ? 'Collapse details' : 'Expand details'}
        </button>
        <Presence exit={accordionMotion}>
          {accordionOpen && (
            <animated.div
              key="accordion-panel"
              id="motion-pattern-panel"
              motion={accordionMotion}
              style={{ overflow: 'hidden', minWidth: 0 }}
            >
              <p style={{ marginBlockEnd: 0 }}>
                Presence keeps this region available while its closing motion
                finishes.
              </p>
            </animated.div>
          )}
        </Presence>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginBlockStart: 0 }}>Skeleton shimmer</h3>
        <button
          type="button"
          style={buttonStyle}
          onClick={() => setShimmerReplay((value) => value + 1)}
        >
          Replay shimmer
        </button>
        <div style={{ display: 'grid', gap: '0.5rem', marginBlockStart: '1rem' }}>
          {[100, 72, 86].map((width) => (
            <animated.div
              key={`${shimmerReplay}-${width}`}
              motion={shimmerMotion}
              aria-hidden="true"
              style={{
                width: `${width}%`,
                height: '0.75rem',
                borderRadius: '999px',
                background:
                  'linear-gradient(90deg, hsl(var(--simurgh-muted)) 25%, hsl(var(--simurgh-border)) 50%, hsl(var(--simurgh-muted)) 75%)',
                backgroundSize: '200% 100%',
              }}
            />
          ))}
        </div>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginBlockStart: 0 }}>Timeline sequence</h3>
        <button type="button" style={buttonStyle} onClick={playSequence}>
          Run sequence
        </button>
        <div
          aria-label="Three processing stages"
          style={{ display: 'flex', gap: '0.75rem', marginBlockStart: '1rem' }}
        >
          {['1', '2', '3'].map((label, index) => (
            <span
              key={label}
              ref={(node) => {
                sequenceNodes.current[index] = node;
              }}
              style={{
                display: 'grid',
                placeItems: 'center',
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: '999px',
                background: 'hsl(var(--simurgh-firuzeh))',
                color: 'hsl(var(--simurgh-background))',
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginBlockStart: 0 }}>SVG path drawing</h3>
        <button type="button" style={buttonStyle} onClick={drawCircle}>
          Draw path
        </button>
        <svg
          viewBox="0 0 64 64"
          role="img"
          aria-label="Animated circular progress path"
          style={{ display: 'block', width: '5rem', margin: '0.75rem auto 0' }}
        >
          <circle
            ref={circle}
            cx="32"
            cy="32"
            r="22"
            fill="none"
            stroke="hsl(var(--simurgh-firuzeh))"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="140"
            strokeDashoffset="140"
            transform="rotate(-90 32 32)"
          />
        </svg>
      </section>
    </div>
  );
}
