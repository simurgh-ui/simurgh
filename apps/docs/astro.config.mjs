import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [
    react(),
    starlight({
      title: 'Simurgh UI',
      description:
        'Accessible, source-owned primitives for Angular, React, and Vue.',
      logo: {
        src: './src/assets/simurgh-ui-logo.png',
        alt: 'Simurgh UI',
      },
      favicon: '/brand/simurgh-ui-logo.png',
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 2 },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/simurgh-ui/simurgh',
        },
      ],
      customCss: ['./src/styles/custom.css'],
      components: {
        Footer: './src/components/DocumentationFooter.astro',
      },
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
            {
              label: 'Overlay positioning migration',
              slug: 'guides/overlay-positioning-migration',
            },
            { label: 'Versioning and stability', slug: 'guides/versioning' },
            { label: 'V1 readiness', slug: 'guides/v1-readiness' },
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
            {
              label: 'Visual language',
              slug: 'guides/visual-language',
            },
            { label: 'Chart gallery', slug: 'guides/chart-gallery' },
            { label: 'Motion', slug: 'guides/motion' },
            { label: 'Accessibility & RTL', slug: 'guides/accessibility-rtl' },
            { label: 'Overlay focus', slug: 'guides/overlay-focus' },
            { label: 'SSR and hydration', slug: 'guides/ssr-and-hydration' },
            { label: 'TypeScript patterns', slug: 'guides/typescript' },
          ],
        },
        {
          label: 'Icons',
          items: [
            { label: 'Icon catalog', slug: 'icons/overview' },
            { label: 'Usage and API', slug: 'icons/usage' },
            {
              label: 'Accessibility and RTL',
              slug: 'icons/accessibility-and-rtl',
            },
          ],
        },
        { label: 'Components', autogenerate: { directory: 'components' } },
      ],
    }),
  ],
});
