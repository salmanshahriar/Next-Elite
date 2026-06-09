import { GithubIcon } from '@/components/icons/github-icon';
import { VercelIcon } from '@/components/icons/vercel-icon';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  getLocaleDirection,
  siteConfig,
  type Locale,
} from '@/features/site/config';
import { githubRepoUrl, vercelDeployUrl } from '@/features/site/github';

const HeroSection = async ({
  locale,
  githubStars,
}: {
  locale: Locale;
  githubStars?: string | null;
}) => {
  const isRtl = getLocaleDirection(locale) === 'rtl';

  const features = [
    {
      icon: '🚀',
      title: 'Modern stack, lean setup',
      description: 'Next.js 16 App Router, React 19, Tailwind v4.',
      badges: [
        { label: 'Framework', value: 'Next.js 16 + React 19 + TypeScript' },
      ],
      details: [
        'RSC-first; client components only when needed',
        'TypeScript strict mode with path aliases',
        'API-driven; no forced database layer',
      ],
    },
    {
      icon: '🎨',
      title: 'shadcn/ui + custom components',
      description: 'shadcn/ui primitives with custom extensions.',
      badges: [
        { label: 'Library', value: '40+ components' },
        { label: 'Stack', value: 'Radix + CVA' },
      ],
      details: [
        'Live showcase at /ui-components',
        'Combobox, password input, OTP, and input group',
        'Buttons, forms, overlays, and data display',
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
      description: 'Zod schemas, React Hook Form for form handling.',
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
      <div className="flex flex-col items-center gap-6">
        <header className="space-y-0 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-foreground">
            {siteConfig.appName}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-xl leading-relaxed text-muted-foreground sm:text-2xl">
            {siteConfig.tagline}
          </p>
        </header>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={vercelDeployUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2.5 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            <VercelIcon className="size-3.5" />
            Deploy to Vercel
          </a>
          <a
            href={githubRepoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2.5 rounded-full border border-border bg-background px-5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted/50"
          >
            <GithubIcon className="size-4" />
            Star on GitHub
            {githubStars ? (
              <span className="text-muted-foreground">{githubStars}</span>
            ) : null}
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
                  <CardDescription className="mb-4 text-left leading-relaxed">
                    {feature.description}
                  </CardDescription>
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
