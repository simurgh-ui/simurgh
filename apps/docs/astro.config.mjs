import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Simurgh UI',
      description:
        'Accessible, source-owned primitives for Angular, React, and Vue.',
      logo: {
        src: './src/assets/simurgh-ui-logo.png',
        alt: 'Simurgh UI',
      },
      favicon: '/brand/simurgh-ui-logo.png',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/simurgh-ui/simurgh',
        },
      ],
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: 'Start',
          items: [
            { label: 'Introduction', slug: 'index' },
            { label: 'Installation', slug: 'guides/installation' },
            { label: 'Choose a component', slug: 'guides/component-chooser' },
            { label: 'Troubleshooting', slug: 'guides/troubleshooting' },
          ],
        },
        {
          label: 'Foundations',
          items: [
            { label: 'Theming', slug: 'guides/theming' },
            { label: 'Accessibility & RTL', slug: 'guides/accessibility-rtl' },
          ],
        },
        { label: 'Components', autogenerate: { directory: 'components' } },
      ],
    }),
  ],
});
