import { siteConfig } from '@/features/site/config';
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.appName || siteConfig.title,
    short_name: siteConfig.appName || siteConfig.title,
    description: siteConfig.description,
    start_url: '/',
    scope: '/',
    lang: siteConfig.language,
    dir: (siteConfig.languages.locales[siteConfig.languages.default]
      ?.direction ?? 'ltr') as 'ltr' | 'rtl' | 'auto',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: siteConfig.theme.light,
    theme_color: siteConfig.theme.light,
    categories: ['productivity', 'developer-tools'],
    icons: [
      {
        src: siteConfig.icons.favicon,
        sizes: '48x48',
        type: 'image/x-icon',
        purpose: 'any',
      },
      {
        src: siteConfig.images.og,
        sizes: '1200x630',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: siteConfig.icons.svg,
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Login',
        short_name: 'Login',
        description: 'Sign in to your account',
        url: '/login',
      },
      {
        name: 'About',
        short_name: 'About',
        description: 'Learn more',
        url: '/about',
      },
    ],
  };
}
