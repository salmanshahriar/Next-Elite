import { HomeGetStartedSection } from '@/components/shared/get-started-section';
import {
  getLocaleDirection,
  siteConfig,
  type Locale,
} from '@/features/site/config';
import { getGitHubStars } from '@/features/site/github';
import { cn } from '@/libs/utils';
import { Check } from 'lucide-react';
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

function AboutCard({
  title,
  children,
  isRtl,
}: {
  title: string;
  children: React.ReactNode;
  isRtl: boolean;
}) {
  return (
    <div
      className={cn(
        'ui-card ui-hover-lift relative flex min-h-[15rem] flex-col gap-5 overflow-hidden rounded-2xl border border-border bg-card p-6 text-left shadow-sm sm:p-7',
        isRtl && 'text-right',
      )}
    >
      <h2 className="text-base font-extrabold tracking-tight">
        <span className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      {children}
    </div>
  );
}

function AboutCheckList({ items, isRtl }: { items: string[]; isRtl: boolean }) {
  return (
    <ul
      className={cn(
        'mt-auto space-y-2.5 border-t border-border/40 pt-4 text-[11px] text-muted-foreground',
        isRtl ? 'text-right' : 'text-left',
      )}
    >
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            'flex items-start gap-2.5',
            isRtl && 'flex-row-reverse',
          )}
        >
          <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
            <Check className="h-2.5 w-2.5 stroke-[3]" />
          </div>
          <span className="leading-normal">{item}</span>
        </li>
      ))}
    </ul>
  );
}

const AboutPage = async () => {
  const [t, locale, githubStars] = await Promise.all([
    getTranslations('about'),
    getLocale(),
    getGitHubStars(),
  ]);
  const isRtl = getLocaleDirection(locale as Locale) === 'rtl';

  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      <div className="mx-auto w-full max-w-7xl px-4 pt-12">
        <div className="mx-auto w-full max-w-screen-xl space-y-8 px-5 sm:space-y-10 xl:px-0">
          <header className={cn('text-center', !isRtl && 'lg:text-left')}>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              {t('title')}
            </h1>
          </header>

          <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:gap-8">
            <AboutCard title={`What is ${siteConfig.appName}?`} isRtl={isRtl}>
              <div className="space-y-3 text-xs leading-relaxed text-muted-foreground">
                <p>{siteConfig.tagline}</p>
                <p>{siteConfig.description}</p>
              </div>
            </AboutCard>

            <AboutCard title="Who is it for?" isRtl={isRtl}>
              <AboutCheckList items={audienceItems} isRtl={isRtl} />
            </AboutCard>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
            <AboutCard title="Stack & UI" isRtl={isRtl}>
              <AboutCheckList items={stackItems} isRtl={isRtl} />
            </AboutCard>

            <AboutCard title="Auth & platform" isRtl={isRtl}>
              <AboutCheckList items={platformItems} isRtl={isRtl} />
            </AboutCard>

            <AboutCard title="DX & quality" isRtl={isRtl}>
              <AboutCheckList items={dxItems} isRtl={isRtl} />
            </AboutCard>
          </div>
        </div>
      </div>

      <HomeGetStartedSection githubStars={githubStars} />
    </div>
  );
};

export default AboutPage;
