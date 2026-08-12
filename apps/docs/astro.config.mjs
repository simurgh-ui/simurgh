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
            { label: 'Compatibility', slug: 'guides/compatibility' },
            { label: 'Choose a component', slug: 'guides/component-chooser' },
            {
              label: 'Updates and migrations',
              slug: 'guides/updates-and-migrations',
            },
            { label: 'Versioning and stability', slug: 'guides/versioning' },
            { label: 'Troubleshooting', slug: 'guides/troubleshooting' },
            {
              label: 'Documentation acceptance test',
              slug: 'guides/documentation-acceptance-test',
            },
          ],
        },
        {
          label: 'Foundations',
          items: [
            { label: 'Theming', slug: 'guides/theming' },
            { label: 'Accessibility & RTL', slug: 'guides/accessibility-rtl' },
            { label: 'Overlay focus', slug: 'guides/overlay-focus' },
            { label: 'SSR and hydration', slug: 'guides/ssr-and-hydration' },
            { label: 'TypeScript patterns', slug: 'guides/typescript' },
          ],
        },
        { label: 'Components', autogenerate: { directory: 'components' } },
      ],
    }),
  ],
});
