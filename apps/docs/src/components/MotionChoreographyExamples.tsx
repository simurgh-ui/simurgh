import { useState } from 'react';
import { animated, type MotionDefinition } from '@simurgh-ui/motion/react';

const cardStyle = {
  border: '1px solid hsl(var(--simurgh-border))',
  borderRadius: 'var(--simurgh-radius-lg, 0.75rem)',
  padding: '1rem',
  minHeight: '15rem',
  overflow: 'hidden',
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

const orbitMotion: MotionDefinition = {
  animate: {
    x: [0, 54, 0, -54, 0],
    y: [-42, 0, 42, 0, -42],
    scale: [0.8, 1.15, 0.8, 1.15, 0.8],
  },
  transition: { duration: 2.4, easing: 'linear', repeat: 1 },
};

const marqueeMotion: MotionDefinition = {
  animate: { x: ['0%', '-50%'] },
  transition: { duration: 3.5, easing: 'linear', repeat: 2 },
};

const colorMotion: MotionDefinition = {
  animate: {
    backgroundColor: [
      'hsl(176 70% 35%)',
      'hsl(43 88% 55%)',
      'hsl(8 72% 52%)',
      'hsl(176 70% 35%)',
    ],
    rotate: [0, 8, -8, 0],
    scale: [0.9, 1.08, 0.96, 1],
    borderRadius: ['18%', '50%', '28%', '18%'],
  },
  transition: { duration: 1.8, easing: 'ease-in-out' },
};

export default function MotionChoreographyExamples() {
  const [orbitReplay, setOrbitReplay] = useState(0);
  const [marqueeReplay, setMarqueeReplay] = useState(0);
  const [colorReplay, setColorReplay] = useState(0);

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
        <h3 style={{ marginBlockStart: 0 }}>Orbital keyframes</h3>
        <button
          type="button"
          style={buttonStyle}
          onClick={() => setOrbitReplay((value) => value + 1)}
        >
          Replay orbit
        </button>
        <div
          aria-label="A dot following an orbital path"
          style={{
            position: 'relative',
            display: 'grid',
            placeItems: 'center',
            height: '8rem',
            marginBlockStart: '0.5rem',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              width: '6.5rem',
              height: '5rem',
              border: '1px dashed hsl(var(--simurgh-border))',
              borderRadius: '50%',
            }}
          />
          <animated.span
            key={orbitReplay}
            motion={orbitMotion}
            aria-hidden="true"
            style={{
              position: 'relative',
              width: '1.25rem',
              height: '1.25rem',
              borderRadius: '50%',
              background: 'hsl(var(--simurgh-firuzeh))',
              boxShadow: '0 0 0 6px hsl(var(--simurgh-firuzeh) / 0.18)',
            }}
          />
        </div>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginBlockStart: 0 }}>Looping marquee</h3>
        <button
          type="button"
          style={buttonStyle}
          onClick={() => setMarqueeReplay((value) => value + 1)}
        >
          Replay marquee
        </button>
        <div
          aria-label="Simurgh motion principles"
          style={{
            overflow: 'hidden',
            marginBlockStart: '2rem',
            borderBlock: '1px solid hsl(var(--simurgh-border))',
            paddingBlock: '0.75rem',
          }}
        >
          <animated.div
            key={marqueeReplay}
            motion={marqueeMotion}
            aria-hidden="true"
            style={{
              display: 'flex',
              width: 'max-content',
              gap: '1.5rem',
              whiteSpace: 'nowrap',
              fontWeight: 700,
            }}
          >
            {[0, 1].map((copy) => (
              <span key={copy}>
                Purposeful · Accessible · Lightweight · Purposeful ·
                Accessible · Lightweight ·
              </span>
            ))}
          </animated.div>
        </div>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginBlockStart: 0 }}>Shape and color</h3>
        <button
          type="button"
          style={buttonStyle}
          onClick={() => setColorReplay((value) => value + 1)}
        >
          Replay keyframes
        </button>
        <animated.div
          key={colorReplay}
          motion={colorMotion}
          aria-hidden="true"
          style={{
            width: '5rem',
            height: '5rem',
            margin: '1.25rem auto 0',
          }}
        />
      </section>
    </div>
  );
}
