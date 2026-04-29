import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getLocaleDirection, type Locale } from '@/features/site/config';
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();
  return {
    title: `${t('about.title')} | ${t('common.appName')}`,
    description: t('about.description'),
  };
};

const AboutPage = async () => {
  const t = await getTranslations('about');
  const locale = (await getLocale()) as Locale;
  const isRtl = getLocaleDirection(locale) === 'rtl';

  const deployUrl =
    'https://vercel.com/new/clone?repository-url=https://github.com/salmanshahriar/Nextjs-Elite-Boilerplate';

  return (
    <div
      className={`mx-auto max-w-7xl px-4 py-12 ${isRtl ? 'text-right' : 'text-left'}`}
    >
      <div className="mb-12 text-center">
        <h1 className="mb-4 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-5xl font-bold text-transparent">
          {t('title')}
        </h1>
        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {t('description')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>What is Next.js Elite?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Next.js Elite is a frontend-first boilerplate designed for teams
              that already have (or plan to build) an API. You get a clean,
              scalable App Router setup with auth, RBAC, i18n, and a modern DX,
              without committing to a database layer.
            </p>
            <p>
              The goal is simple: ship faster while keeping the codebase strict,
              readable, and production-ready.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Who is it for?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary">✓</span>
                <span>
                  Product teams building dashboards, admin panels, and
                  authenticated apps
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary">✓</span>
                <span>
                  SaaS starters that want a premium DX with strict TypeScript
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary">✓</span>
                <span>
                  API-driven apps that need caching, routing, and UX patterns
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Core features</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary">✓</span>
                <span>BetterAuth sessions + server-first auth helpers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary">✓</span>
                <span>RBAC guards + parallel routes for /dashboard</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary">✓</span>
                <span>Type-safe i18n with cookie-based locale + RTL</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Developer experience</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary">✓</span>
                <span>Strict TypeScript + ESLint + Prettier</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary">✓</span>
                <span>Knip + Lefthook for hygiene and fast hooks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary">✓</span>
                <span>Storybook + test suites (Vitest / Playwright)</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Ship & deploy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Deploy to Vercel with one click, then configure env</p>
            <a
              href={deployUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Deploy Now
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
