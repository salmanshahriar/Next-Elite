import {
  Cpu,
  FileText,
  FlaskConical,
  Globe,
  Search,
  Shuffle,
  type LucideIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { createElement, Fragment } from 'react';

const highlightClassName = 'font-semibold text-primary';

export type HomeFeatureDetail = {
  text: string;
  highlights?: readonly string[];
};

export type HomeFeature = {
  icon: LucideIcon;
  title: string;
  description: string;
  details: readonly HomeFeatureDetail[];
};

export function renderHighlightedText(
  text: string,
  highlights: readonly string[] = [],
): ReactNode {
  if (highlights.length === 0) return text;

  const pattern = highlights
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  const parts = text.split(new RegExp(`(${pattern})`, 'g')).filter(Boolean);

  return parts.map((part, index) =>
    highlights.includes(part)
      ? createElement(
          'span',
          { key: index, className: highlightClassName },
          part,
        )
      : createElement(Fragment, { key: index }, part),
  );
}

export const homeFeatures: readonly HomeFeature[] = [
  {
    icon: Cpu,
    title: 'Modern stack, lean setup',
    description: 'API-first Next.js starter. No database bundled.',
    details: [
      {
        text: 'Next.js 16, React 19, and TypeScript ready to go',
        highlights: ['Next.js 16', 'React 19', 'TypeScript'],
      },
      {
        text: 'Organized feature folders in src/features/',
        highlights: ['src/features/'],
      },
      {
        text: 'Tailwind CSS 4, shadcn/ui, and TanStack Query included',
        highlights: ['Tailwind CSS 4', 'shadcn/ui', 'TanStack Query'],
      },
    ],
  },
  {
    icon: Search,
    title: 'SEO + PWA, server-first',
    description: 'Server-built SEO and installable PWA.',
    details: [
      {
        text: 'site.config.json powers SEO, sitemap, robots, and manifest',
        highlights: ['site.config.json'],
      },
      {
        text: 'Open Graph, Twitter cards, and JSON-LD for rich previews',
        highlights: ['Open Graph', 'JSON-LD'],
      },
      {
        text: 'llms.txt for AI discovery; Sentry and /api/health monitoring',
        highlights: ['llms.txt', 'Sentry', '/api/health'],
      },
    ],
  },
  {
    icon: FlaskConical,
    title: 'Testing & quality gates',
    description: 'Tests and lint in one command.',
    details: [
      {
        text: 'Oxlint + Oxfmt, Knip, Lefthook, and Commitlint on commit',
        highlights: ['Oxlint + Oxfmt', 'Knip', 'Lefthook'],
      },
      {
        text: 'Vitest unit tests with renderWithProviders helper',
        highlights: ['Vitest', 'renderWithProviders'],
      },
      {
        text: 'Playwright end-to-end tests in local dev and CI',
        highlights: ['Playwright'],
      },
    ],
  },
  {
    icon: Shuffle,
    title: 'Parallel routing',
    description: 'Auth and role-based dashboards.',
    details: [
      {
        text: '@admin and @user slots, one /dashboard URL for all',
        highlights: ['@admin', '@user', '/dashboard'],
      },
      {
        text: 'Email, password, and Google sign-in with Better Auth',
        highlights: ['Better Auth'],
      },
      {
        text: 'Admin and user roles protected with requirePermission',
        highlights: ['requirePermission'],
      },
    ],
  },
  {
    icon: Globe,
    title: 'Type-safe i18n',
    description: 'Six languages. No locale in the URL.',
    details: [
      {
        text: 'English, Bengali, Arabic RTL, French, Spanish, and Chinese',
        highlights: ['RTL'],
      },
      {
        text: 'NEXT_LOCALE cookie remembers language without /en prefixes',
        highlights: ['NEXT_LOCALE'],
      },
      {
        text: 'next-intl catches missing translation keys at build time',
        highlights: ['next-intl'],
      },
    ],
  },
  {
    icon: FileText,
    title: 'Forms + validation',
    description: 'Accessible forms with Zod validation.',
    details: [
      {
        text: 'Zod schemas for login, sign-up, and password reset',
        highlights: ['Zod'],
      },
      {
        text: 'React Hook Form + zodResolver for type-safe input',
        highlights: ['React Hook Form', 'zodResolver'],
      },
      {
        text: 'InputError shows helpful inline messages per field',
        highlights: ['InputError'],
      },
    ],
  },
];
