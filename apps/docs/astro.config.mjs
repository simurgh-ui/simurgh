import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://simurgh-ui.ir',
  integrations: [
    react(),
    starlight({
      title: {
        en: 'Simurgh UI',
        fa: 'رابط کاربری سیمرغ',
      },
      description:
        'Accessible, source-owned primitives for Angular, React, and Vue.',
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'English',
          lang: 'en',
        },
        fa: {
          label: 'فارسی',
          lang: 'fa',
          dir: 'rtl',
        },
      },
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
          translations: { fa: 'شروع' },
          items: [
            {
              label: 'Introduction',
              translations: { fa: 'معرفی' },
              slug: 'index',
            },
            {
              label: 'Installation',
              translations: { fa: 'نصب' },
              slug: 'guides/installation',
            },
            {
              label: 'Compatibility',
              translations: { fa: 'سازگاری' },
              slug: 'guides/compatibility',
            },
            {
              label: 'Choose a component',
              translations: { fa: 'انتخاب کامپوننت' },
              slug: 'guides/component-chooser',
            },
            {
              label: 'Updates and migrations',
              translations: { fa: 'به‌روزرسانی و مهاجرت' },
              slug: 'guides/updates-and-migrations',
            },
            {
              label: 'Overlay positioning migration',
              translations: { fa: 'مهاجرت موقعیت‌دهی لایه‌ها' },
              slug: 'guides/overlay-positioning-migration',
            },
            {
              label: 'Versioning and stability',
              translations: { fa: 'نسخه‌بندی و پایداری' },
              slug: 'guides/versioning',
            },
            {
              label: 'V1 readiness',
              translations: { fa: 'آمادگی نسخه یک' },
              slug: 'guides/v1-readiness',
            },
            {
              label: 'Troubleshooting',
              translations: { fa: 'رفع اشکال' },
              slug: 'guides/troubleshooting',
            },
            {
              label: 'Documentation acceptance test',
              translations: { fa: 'آزمون پذیرش مستندات' },
              slug: 'guides/documentation-acceptance-test',
            },
          ],
        },
        {
          label: 'Foundations',
          translations: { fa: 'مبانی' },
          items: [
            {
              label: 'Theming',
              translations: { fa: 'شخصی‌سازی پوسته' },
              slug: 'guides/theming',
            },
            {
              label: 'Visual language',
              translations: { fa: 'زبان بصری' },
              slug: 'guides/visual-language',
            },
            {
              label: 'Chart gallery',
              translations: { fa: 'گالری نمودارها' },
              slug: 'guides/chart-gallery',
            },
            {
              label: 'Motion',
              translations: { fa: 'حرکت و پویانمایی' },
              slug: 'guides/motion',
            },
            {
              label: 'Accessibility & RTL',
              translations: { fa: 'دسترس‌پذیری و راست‌به‌چپ' },
              slug: 'guides/accessibility-rtl',
            },
            {
              label: 'Overlay focus',
              translations: { fa: 'فوکوس لایه‌ها' },
              slug: 'guides/overlay-focus',
            },
            {
              label: 'SSR and hydration',
              translations: { fa: 'SSR و hydration' },
              slug: 'guides/ssr-and-hydration',
            },
            {
              label: 'TypeScript patterns',
              translations: { fa: 'الگوهای TypeScript' },
              slug: 'guides/typescript',
            },
          ],
        },
        {
          label: 'Icons',
          translations: { fa: 'آیکن‌ها' },
          items: [
            {
              label: 'Icon catalog',
              translations: { fa: 'فهرست آیکن‌ها' },
              slug: 'icons/overview',
            },
            {
              label: 'Usage and API',
              translations: { fa: 'استفاده و API' },
              slug: 'icons/usage',
            },
            {
              label: 'Accessibility and RTL',
              translations: { fa: 'دسترس‌پذیری و راست‌به‌چپ' },
              slug: 'icons/accessibility-and-rtl',
            },
            {
              label: 'Research evidence',
              translations: { fa: 'شواهد پژوهشی' },
              slug: 'icons/research-evidence',
            },
          ],
        },
        {
          label: 'Components',
          translations: { fa: 'کامپوننت‌ها' },
          autogenerate: { directory: 'components' },
        },
      ],
    }),
  ],
});
