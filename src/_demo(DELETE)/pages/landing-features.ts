import {
  CubeIcon,
  GaugeIcon,
  GlobeIcon,
  LockKeyIcon,
  PersonArmsSpreadIcon,
  RocketLaunchIcon,
  SealCheckIcon,
  ShieldCheckIcon,
  SquaresFourIcon,
} from '@phosphor-icons/react/ssr';

export const HOME_FEATURES = [
  {
    id: 'dashboards',
    icon: SquaresFourIcon,
    tech: [
      'Next.js 16',
      'React 19',
      'App Router',
      'TanStack Query',
      'TanStack Table',
      'uPlot charts',
    ],
  },
  {
    id: 'auth',
    icon: LockKeyIcon,
    tech: ['Better Auth', 'Google OAuth', 'React Hook Form', 'Zod'],
  },
  {
    id: 'roles',
    icon: ShieldCheckIcon,
    tech: ['RBAC', 'Parallel routes', 'Server-side guard', 'Permissions'],
  },
  {
    id: 'components',
    icon: CubeIcon,
    tech: [
      'shadcn/ui',
      'Radix UI',
      'Tailwind CSS 4',
      'CVA',
      'Phosphor Icons',
      'Dark mode',
    ],
  },
  {
    id: 'i18n',
    icon: GlobeIcon,
    tech: [
      'next-intl',
      'ICU messages',
      'RTL',
      'Type-safe keys',
      'Locale cookie',
    ],
  },
  {
    id: 'a11y',
    icon: PersonArmsSpreadIcon,
    tech: [
      'WCAG AA',
      'ARIA',
      'Skip link',
      'Reduced motion',
      'Keyboard navigation',
    ],
  },
  {
    id: 'performance',
    icon: GaugeIcon,
    tech: [
      'Server Components',
      'Bundle budgets',
      'Sitemap',
      'Open Graph',
      'llms.txt',
      'PWA',
    ],
  },
  {
    id: 'quality',
    icon: SealCheckIcon,
    tech: [
      'TypeScript',
      'Oxlint',
      'Oxfmt',
      'Knip',
      'Vitest',
      'Playwright',
      'Lefthook',
    ],
  },
  {
    id: 'deploy',
    icon: RocketLaunchIcon,
    tech: [
      'Vercel',
      'Docker',
      'GitHub Actions',
      'Sentry',
      'T3 Env',
      'Health check',
    ],
  },
] as const;
