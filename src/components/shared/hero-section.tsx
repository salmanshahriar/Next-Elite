import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getLocaleDirection, type Locale } from '@/features/site/config';

const deployUrl =
  'https://vercel.com/new/clone?repository-url=https://github.com/salmanshahriar/Nextjs-Elite-Boilerplate';

const repoUrl = 'https://github.com/salmanshahriar/Nextjs-Elite-Boilerplate';

const HeroSection = async ({ locale }: { locale: Locale }) => {
  const isRtl = getLocaleDirection(locale) === 'rtl';

  const features = [
    {
      icon: '🚀',
      title: 'Modern stack, lean setup',
      description: 'Next.js 16 App Router, React 19, Tailwind v4.',
      badges: [
        { label: 'Framework', value: 'Next.js 16 + React 19' },
        { label: 'UI', value: 'Tailwind v4 + shadcn' },
      ],
      details: [
        'RSC-first; client components only when needed',
        'Ownable shadcn/ui primitives',
        'API-driven; no forced database layer',
      ],
    },
    {
      icon: '🔐',
      title: 'BetterAuth',
      description: 'Sessions, OAuth, and permission-based RBAC.',
      badges: [
        { label: 'Auth', value: 'BetterAuth' },
        { label: 'Access', value: 'RBAC' },
      ],
      details: [
        'Email/password + optional Google OAuth',
        'Session handling with server-side guards',
        'requireUser and requirePermission helpers',
      ],
    },
    {
      icon: '🔍',
      title: 'SEO + PWA, server-first',
      description: 'Metadata, sitemap, and manifest generated on the server.',
      badges: [{ label: 'SEO', value: 'OG + JSON-LD' }],
      details: [
        'Open Graph, Twitter cards, and JSON-LD from site config',
        'sitemap.ts and robots.ts metadata routes',
        'Web manifest and canonical URL from site config',
      ],
    },
    {
      icon: '🎨',
      title: 'shadcn/ui component library',
      description:
        'Copy-paste components with full TypeScript support and accessible Radix primitives.',
      badges: [
        { label: 'UI', value: 'shadcn + Radix' },
        { label: 'Styling', value: 'CVA + Tailwind v4' },
      ],
      details: [
        'Button, card, sheet, dropdown, input; source in src/components/ui',
        'Size, variant, and state props; consistent across every component',
        'Radix primitives, Lucide icons, and CSS theme tokens',
      ],
    },
    {
      icon: '🔀',
      title: 'Parallel routing',
      description: 'One URL per feature; role-specific UI via slots.',
      badges: [{ label: 'Routes', value: '@user · @admin' }],
      details: [
        'Same /dashboard path for every role',
        '@user and @admin slots render the right dashboard',
        'Layout picks the active slot from permissions',
      ],
    },
    {
      icon: '🌐',
      title: 'Type-safe i18n',
      description: 'Type-safe next-intl with cookie locale and RTL.',
      badges: [{ label: 'i18n', value: '6 locales + RTL' }],
      details: [
        'NEXT_LOCALE cookie; no /en or /fr URL prefixes',
        'Typed messages via global.d.ts and useTranslations',
        'Six locales with RTL support for Arabic',
      ],
    },
    {
      icon: '📝',
      title: 'Forms + validation',
      description:
        'Zod schemas define the rules; React Hook Form handles the UI.',
      badges: [
        { label: 'Validation', value: 'Zod' },
        { label: 'Forms', value: 'React Hook Form' },
      ],
      details: [
        'Dedicated Zod schemas for login, register, and password reset',
        'Inferred types with z.infer; used in client auth forms',
        'zodResolver plus InputError for accessible inline errors',
      ],
    },
    {
      icon: '🛡️',
      title: 'Type-safe environment',
      description: 'T3 Env validates every variable with Zod at build time.',
      badges: [
        { label: 'Env', value: 'T3 Env' },
        { label: 'Schema', value: 'Zod' },
      ],
      details: [
        'Server secrets and NEXT_PUBLIC_* client vars in src/libs/env.ts',
        'Zod validates URLs, booleans, and required auth secrets',
        'SKIP_ENV_VALIDATION for CI, Vitest, and lint',
      ],
    },
    {
      icon: '🧪',
      title: 'Developer experience',
      description: 'Quality gates without tool bloat.',
      badges: [
        { label: 'CI', value: 'npm run check' },
        { label: 'Hooks', value: 'Lefthook' },
      ],
      details: [
        'ESLint + Prettier via lint / lint:fix',
        'Knip for unused code and dependencies',
        'Vitest plus Playwright; Check workflow on push and PR',
      ],
    },
  ];

  return (
    <div
      className={`mx-auto flex max-w-7xl flex-col gap-12 px-4 pt-12 ${isRtl ? 'text-right' : 'text-left'}`}
    >
      <div className="flex flex-col items-center gap-6 text-center">
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
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="w-full sm:flex-1"
          >
            <a href={repoUrl} target="_blank" rel="noopener noreferrer">
              Source code (GitHub)
            </a>
          </Button>
          <Button asChild size="lg" className="w-full sm:flex-1">
            <a href={deployUrl} target="_blank" rel="noopener noreferrer">
              Deploy Now
            </a>
          </Button>
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
