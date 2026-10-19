import {
  CpuIcon,
  FileTextIcon,
  FlaskIcon,
  GlobeIcon,
  MagnifyingGlassIcon,
  ShuffleIcon,
} from '@phosphor-icons/react';

export const HOME_FEATURES = [
  {
    id: 'stack',
    icon: CpuIcon,
    details: [
      {
        key: 'stack.details.versions',
        highlights: ['Next.js 16', 'React 19', 'TypeScript'],
      },
      { key: 'stack.details.folders', highlights: ['src/features/'] },
      {
        key: 'stack.details.styling',
        highlights: ['Tailwind CSS 4', 'shadcn/ui', 'TanStack Query'],
      },
    ],
  },
  {
    id: 'seo',
    icon: MagnifyingGlassIcon,
    details: [
      { key: 'seo.details.config', highlights: ['site.config.json'] },
      { key: 'seo.details.previews', highlights: ['Open Graph', 'JSON-LD'] },
      {
        key: 'seo.details.monitoring',
        highlights: ['llms.txt', 'Sentry', '/api/health'],
      },
    ],
  },
  {
    id: 'quality',
    icon: FlaskIcon,
    details: [
      {
        key: 'quality.details.tooling',
        highlights: ['Oxlint + Oxfmt', 'Knip', 'Lefthook'],
      },
      {
        key: 'quality.details.unit',
        highlights: ['Vitest', 'renderWithProviders'],
      },
      { key: 'quality.details.e2e', highlights: ['Playwright'] },
    ],
  },
  {
    id: 'routing',
    icon: ShuffleIcon,
    details: [
      {
        key: 'routing.details.slots',
        highlights: ['@admin', '@user', '/dashboard'],
      },
      { key: 'routing.details.signIn', highlights: ['Better Auth'] },
      { key: 'routing.details.roles', highlights: ['requirePermission'] },
    ],
  },
  {
    id: 'i18n',
    icon: GlobeIcon,
    details: [
      { key: 'i18n.details.languages', highlights: ['RTL'] },
      { key: 'i18n.details.cookie', highlights: ['NEXT_LOCALE'] },
      { key: 'i18n.details.keys', highlights: ['next-intl'] },
    ],
  },
  {
    id: 'forms',
    icon: FileTextIcon,
    details: [
      { key: 'forms.details.schemas', highlights: ['Zod'] },
      {
        key: 'forms.details.hookForm',
        highlights: ['React Hook Form', 'zodResolver'],
      },
      { key: 'forms.details.errors', highlights: ['InputError'] },
    ],
  },
] as const;
