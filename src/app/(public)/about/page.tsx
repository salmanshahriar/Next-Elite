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
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();
  return {
    title: `${t('about.title')} | ${t('common.appName')}`,
    description: siteConfig.description,
  };
};

const audienceItems = [
  'Teams building dashboards, admin panels, and authenticated SaaS apps',
  'Startups that want strict TypeScript, lean tooling, and fast iteration',
  'API-first products that need caching, routing, and polished UX out of the box',
];

const stackItems = [
  'Next.js 16 App Router with React 19 and Tailwind v4',
  '40+ shadcn/ui primitives plus custom components with a live showcase',
  'ofetch API layer with TanStack Query for server-state caching',
  'React Hook Form + Zod for typed forms and inline validation',
];

const platformItems = [
  'BetterAuth with email/password, Google OAuth, and permission-based RBAC',
  'Parallel /dashboard routes with @user and @admin slots',
  'Type-safe i18n via next-intl — 6 locales with Arabic RTL support',
  'Server-first SEO, PWA manifest, sitemap, robots, and JSON-LD',
];

const dxItems = [
  'T3 Env for build-time validation of server and client variables',
  'Sentry monitoring and Upstash rate limiting hooks',
  'ESLint, Prettier, Knip, Lefthook, Vitest, and Playwright',
  'npm run check — typecheck, lint, knip, and tests in one command',
];

const AboutPage = async () => {
  const t = await getTranslations('about');
  const locale = (await getLocale()) as Locale;
  const isRtl = getLocaleDirection(locale) === 'rtl';

  return (
    <div
      className={`mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 sm:gap-12 ${isRtl ? 'text-right' : 'text-left'}`}
    >
      <header className="text-center lg:text-left">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          {t('title')}
        </h1>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>What is {siteConfig.appName}?</CardTitle>
            <CardDescription>{siteConfig.tagline}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Who is it for?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <ul className="space-y-2">
              {audienceItems.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 text-primary">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Stack & UI</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <ul className="space-y-2">
              {stackItems.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 text-primary">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Auth & platform</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <ul className="space-y-2">
              {platformItems.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 text-primary">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>DX & quality</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <ul className="space-y-2">
              {dxItems.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 text-primary">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
