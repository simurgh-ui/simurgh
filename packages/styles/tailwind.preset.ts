import type { Config } from 'tailwindcss';

export default {
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--simurgh-background) / <alpha-value>)',
        foreground: 'hsl(var(--simurgh-foreground) / <alpha-value>)',
        surface: 'hsl(var(--simurgh-surface) / <alpha-value>)',
        primary: 'hsl(var(--simurgh-primary) / <alpha-value>)',
        accent: 'hsl(var(--simurgh-accent) / <alpha-value>)',
        border: 'hsl(var(--simurgh-border) / <alpha-value>)',
      },
      borderRadius: { simurgh: 'var(--simurgh-radius)' },
    },
  },
} satisfies Partial<Config>;
