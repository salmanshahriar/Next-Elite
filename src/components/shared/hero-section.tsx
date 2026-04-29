import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getLocaleDirection, type Locale } from '@/features/site/config';

const HeroSection = async ({ locale }: { locale: Locale }) => {
  const isRtl = getLocaleDirection(locale) === 'rtl';

  const deployUrl =
    'https://vercel.com/new/clone?repository-url=https://github.com/salmanshahriar/Nextjs-Elite-Boilerplate';

  const features = [
    {
      icon: '🌐',
      title: 'i18n that doesn’t fight you',
      description: 'Type-safe `next-intl` layout primitives.',
      badges: [{ label: 'i18n', value: '6 locales + RTL' }],
      details: [
        'Cookie-based locale (no URL prefixes)',
        'Typed keys + autocompletion (safe refactors)',
        'Direction-aware layout (LTR/RTL)',
      ],
    },
    {
      icon: '🔐',
      title: 'Auth + RBAC, server-first',
      description: 'BetterAuth sessions with permission checks in RSC.',
      badges: [{ label: 'Auth', value: 'BetterAuth + RBAC' }],
      details: [
        'Email/password + optional Google OAuth',
        'Permission-based guards (`requireUser`, `requirePermission`)',
        'Parallel routes for role-agnostic URLs (`/dashboard`)',
      ],
    },
    {
      icon: '📄',
      title: 'Config-driven boilerplate',
      description: 'Single source of truth for site + runtime config.',
      badges: [
        { label: 'Testing', value: 'Vitest + Playwright' },
        { label: 'DX', value: 'Knip + Lefthook' },
      ],
      details: [
        'Typed env split (server vs client) via T3 Env',
        'Site config drives metadata, sitemap, robots, manifest',
        'Sane defaults that stay editable, not magical',
      ],
    },
    {
      icon: '🚀',
      title: 'Modern stack, minimal ceremony',
      description: 'Next.js App Router with a clean UI + data layer.',
      badges: [
        { label: 'App Router', value: 'Next.js 16' },
        { label: 'UI', value: 'Tailwind v4 + shadcn/ui' },
      ],
      details: [
        'RSC by default, client components only when needed',
        'Composable `shadcn/ui` primitives you can own',
        'API-driven architecture (no forced database layer)',
      ],
    },
    {
      icon: '🎨',
      title: 'Forms that scale',
      description: 'Fast, accessible forms with shared validation.',
      badges: [{ label: 'Forms', value: 'RHF + Zod' }],
      details: [
        'Zod schemas as the single validation source',
        'React Hook Form for performance + DX',
        'Password UX with a reusable input component',
      ],
    },
    {
      icon: '🔍',
      title: 'SEO + PWA, built-in',
      description: 'Metadata and PWA outputs generated from config.',
      badges: [{ label: 'SEO/PWA', value: 'Sitemap + Manifest' }],
      details: [
        'Open Graph + Twitter cards + JSON-LD',
        'Dynamic sitemap + robots.txt generation',
        'Web manifest wired to the central site config',
      ],
    },
    {
      icon: '🧩',
      title: 'API client + caching',
      description: 'Typed fetch patterns with caching and retries.',
      badges: [{ label: 'Data', value: 'ofetch + TanStack Query' }],
      details: [
        'One API client wrapper (headers, base URL, errors)',
        'Queries/mutations with caching + invalidation',
        'Predictable request behavior (retry/dedupe)',
      ],
    },
    {
      icon: '📈',
      title: 'Observability + limits',
      description: 'Monitoring and traffic control.',
      badges: [{ label: 'Ops', value: 'Sentry + Upstash' }],
      details: [
        'Sentry instrumentation (client + server)',
        'Upstash rate-limit helper for routes and actions',
        'Server-only logger for consistent logs',
      ],
    },
    {
      icon: '🧪',
      title: 'CI that catches drift',
      description: 'Type safety, linting, dead-code checks, and tests.',
      badges: [{ label: 'CI', value: 'Typecheck + Lint + Knip' }],
      details: [
        'Strict TypeScript for safer refactors',
        'Knip keeps unused code and deps out',
        'Vitest + Playwright for confidence',
      ],
    },
  ];

  return (
    <div
      className={`mx-auto max-w-7xl px-4 py-12 ${isRtl ? 'text-right' : 'text-left'}`}
    >
      <div className="mb-10 flex flex-col items-center gap-6 text-center">
        <div>
          <h1 className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-5xl font-bold text-transparent">
            Next.js Elite
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-xl leading-relaxed text-muted-foreground sm:text-2xl">
            Frontend-first, API-driven Next.js 16 boilerplate with i18n, RBAC,
            BetterAuth, and a polished DX.
          </p>
        </div>

        <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href="https://github.com/salmanshahriar/Nextjs-Elite-Boilerplate"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center rounded-lg bg-secondary px-6 py-3 text-base font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
          >
            Source code (GitHub)
          </a>

          <a
            href={deployUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Deploy Now
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="transition-shadow hover:shadow-lg"
          >
            <CardHeader>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{feature.icon}</span>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                {feature.badges?.length ? (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {feature.badges.map((badge) => (
                      <div
                        key={`${badge.label}:${badge.value}`}
                        className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs text-muted-foreground"
                      >
                        <span className="font-medium text-foreground">
                          {badge.label}
                        </span>
                        <span className="text-muted-foreground">
                          {badge.value}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : null}

                {feature.description && (
                  <p className="mb-4 text-left text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                )}

                <ul className="w-full space-y-2 text-left">
                  {feature.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-2 text-xs text-muted-foreground"
                    >
                      <span className="mt-0.5 text-primary">✓</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
