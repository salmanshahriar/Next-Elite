import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  getLocaleDirection,
  siteConfig,
  type Locale,
} from '@/features/site/config';
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

const deployUrl =
  'https://vercel.com/new/clone?repository-url=https://github.com/salmanshahriar/Nextjs-Elite-Boilerplate';

const repoUrl = 'https://github.com/salmanshahriar/Nextjs-Elite-Boilerplate';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();
  return {
    title: `${t('about.title')} | ${t('common.appName')}`,
    description: siteConfig.description,
  };
};

const AboutPage = async () => {
  const t = await getTranslations('about');
  const locale = (await getLocale()) as Locale;
  const isRtl = getLocaleDirection(locale) === 'rtl';

  return (
    <div
      className={`mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 sm:gap-12 ${isRtl ? 'text-right' : 'text-left'}`}
    >
      <div className="text-center">
        <h1 className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-5xl font-bold text-transparent">
          {t('title')}
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>What is Next.js Elite?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Next.js Elite is a frontend-first boilerplate for teams that
              already have or plan to build an API. You get Next.js 16, React
              19, Tailwind v4, and shadcn/ui without a forced database layer.
            </p>
            <p>
              Auth, RBAC, i18n, SEO, and quality tooling are included so you can
              focus on product screens and API integration.
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
                  Teams shipping dashboards, admin panels, and authenticated
                  apps
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary">✓</span>
                <span>
                  SaaS starters that want strict TypeScript and lean DX tooling
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary">✓</span>
                <span>
                  API-driven products that need caching, routing, and polished
                  UX
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Core features</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary">✓</span>
                <span>BetterAuth with RBAC and parallel /dashboard routes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary">✓</span>
                <span>Type-safe i18n; six locales with RTL support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary">✓</span>
                <span>Server-first SEO, PWA manifest, sitemap, and robots</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary">✓</span>
                <span>
                  Zod forms and T3 Env for typed validation and config
                </span>
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
                <span>
                  Strict TypeScript; ESLint + Prettier via lint scripts
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary">✓</span>
                <span>Knip and Lefthook for dead code and git hooks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary">✓</span>
                <span>
                  Vitest and Playwright with a GitHub Actions check workflow
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary">✓</span>
                <span>npm run check; typecheck, lint, knip, and tests</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Ship and deploy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              Clone the repo, copy .env.example to .env, and run npm run dev.
              Deploy to Vercel in one click when you are ready.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button asChild className="w-full sm:flex-1">
                <a href={deployUrl} target="_blank" rel="noopener noreferrer">
                  Deploy Now
                </a>
              </Button>
              <Button asChild variant="secondary" className="w-full sm:flex-1">
                <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
