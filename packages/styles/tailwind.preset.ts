import type { Config } from 'tailwindcss';

export default {
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--simurgh-background) / <alpha-value>)',
        foreground: 'hsl(var(--simurgh-foreground) / <alpha-value>)',
        surface: 'hsl(var(--simurgh-surface) / <alpha-value>)',
        primary: 'hsl(var(--simurgh-primary) / <alpha-value>)',
        'primary-foreground':
          'hsl(var(--simurgh-primary-foreground) / <alpha-value>)',
        secondary: 'hsl(var(--simurgh-secondary) / <alpha-value>)',
        'secondary-foreground':
          'hsl(var(--simurgh-secondary-foreground) / <alpha-value>)',
        accent: 'hsl(var(--simurgh-accent) / <alpha-value>)',
        danger: 'hsl(var(--simurgh-danger) / <alpha-value>)',
        'danger-foreground':
          'hsl(var(--simurgh-danger-foreground) / <alpha-value>)',
        success: 'hsl(var(--simurgh-success) / <alpha-value>)',
        'success-foreground':
          'hsl(var(--simurgh-success-foreground) / <alpha-value>)',
        warning: 'hsl(var(--simurgh-warning) / <alpha-value>)',
        'warning-foreground':
          'hsl(var(--simurgh-warning-foreground) / <alpha-value>)',
        information: 'hsl(var(--simurgh-information) / <alpha-value>)',
        'information-foreground':
          'hsl(var(--simurgh-information-foreground) / <alpha-value>)',
        muted: 'hsl(var(--simurgh-muted) / <alpha-value>)',
        'muted-foreground':
          'hsl(var(--simurgh-muted-foreground) / <alpha-value>)',
        'disabled-surface':
          'hsl(var(--simurgh-disabled-surface) / <alpha-value>)',
        'disabled-foreground':
          'hsl(var(--simurgh-disabled-foreground) / <alpha-value>)',
        'input-surface': 'hsl(var(--simurgh-input-surface) / <alpha-value>)',
        'input-border': 'hsl(var(--simurgh-input-border) / <alpha-value>)',
        hover: 'hsl(var(--simurgh-hover) / <alpha-value>)',
        pressed: 'hsl(var(--simurgh-pressed) / <alpha-value>)',
        ring: 'hsl(var(--simurgh-ring) / <alpha-value>)',
        scrim: 'hsl(var(--simurgh-scrim) / <alpha-value>)',
        border: 'hsl(var(--simurgh-border) / <alpha-value>)',
      },
      borderRadius: { simurgh: 'var(--simurgh-radius)' },
      boxShadow: {
        simurghSm: 'var(--simurgh-shadow-sm)',
        simurgh: 'var(--simurgh-shadow)',
        simurghLg: 'var(--simurgh-shadow-lg)',
      },
      minHeight: {
        controlSm: 'var(--simurgh-control-sm)',
        controlMd: 'var(--simurgh-control-md)',
        controlLg: 'var(--simurgh-control-lg)',
        control: 'var(--simurgh-control-height)',
        item: 'var(--simurgh-item-height)',
      },
      spacing: {
        control: 'var(--simurgh-control-padding)',
        simurgh1: 'var(--simurgh-space-1)',
        simurgh2: 'var(--simurgh-space-2)',
        simurgh3: 'var(--simurgh-space-3)',
        simurgh4: 'var(--simurgh-space-4)',
      },
      fontFamily: { simurgh: ['var(--simurgh-font-sans)'] },
      fontSize: {
        simurghSm: 'var(--simurgh-text-sm)',
        simurgh: 'var(--simurgh-text-md)',
        simurghLg: 'var(--simurgh-text-lg)',
      },
      lineHeight: { simurgh: 'var(--simurgh-line-height)' },
      transitionDuration: {
        simurghFast: 'var(--simurgh-duration-fast)',
        simurgh: 'var(--simurgh-duration)',
        simurghSlow: 'var(--simurgh-duration-slow)',
      },
      transitionTimingFunction: {
        simurgh: 'var(--simurgh-ease-standard)',
        simurghEmphasized: 'var(--simurgh-ease-emphasized)',
      },
    },
  },
} satisfies Partial<Config>;
