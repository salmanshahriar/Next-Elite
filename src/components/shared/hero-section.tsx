'use client';

import { GithubIcon } from '@/components/icons/github-icon';
import { VercelIcon } from '@/components/icons/vercel-icon';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import {
  getLocaleDirection,
  siteConfig,
  type Locale,
} from '@/features/site/config';
import { githubRepoUrl, vercelDeployUrl } from '@/features/site/github';
import {
  Calendar as CalendarIcon,
  Check,
  Cpu,
  FileText,
  Globe,
  Search,
  Shield,
  Shuffle,
  Star,
  type LucideIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import TextLink from './text-link';

export interface HomeCardProps {
  title: string;
  description: string;
  demo: ReactNode;
  large?: boolean;
  link?: {
    href: string;
    label: string;
  };
}

export function HomeCard({
  title,
  description,
  demo,
  large = false,
  link,
}: HomeCardProps) {
  return (
    <div
      className={`ui-card relative col-span-1 flex h-auto min-h-[24rem] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-md sm:p-8 ${
        large ? 'md:col-span-2 md:h-[29rem]' : 'md:h-[29rem]'
      }`}
    >
      <div className="mb-4 flex w-full flex-1 items-center justify-center overflow-hidden">
        {demo}
      </div>

      <div className="mx-auto mt-auto flex w-full max-w-xl flex-col items-center text-center">
        <h2 className="mb-3 text-xl font-extrabold tracking-tight text-foreground md:text-2xl">
          <span className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
            {title}
          </span>
          {link && (
            <span className="text-foreground/80">
              {' - '}
              <TextLink
                href={link.href}
                variant="underlined"
                className="text-primary transition-colors hover:text-primary/80"
                aria-label={`${link.label} ${title.toLowerCase()}`}
              >
                {link.label}
              </TextLink>
            </span>
          )}
        </h2>
        <p className="mx-auto max-w-md text-sm leading-relaxed [text-wrap:balance] text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

export function ComponentShowcaseGrid() {
  const [switchChecked, setSwitchChecked] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(2026, 5, 17),
  );

  return (
    <div className="flex w-full max-w-lg flex-col items-center justify-center gap-8 select-none md:flex-row md:gap-16">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2.5">
          <Button
            variant="primary"
            size="sm"
            className="h-9 w-24 cursor-default rounded-xl text-sm font-medium shadow-sm"
          >
            Primary
          </Button>
          <Button
            variant="success"
            size="sm"
            className="h-9 w-24 cursor-default rounded-xl text-sm font-medium shadow-sm"
          >
            Success
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hidden h-9 w-24 cursor-default rounded-xl text-sm font-medium shadow-xs sm:inline-flex"
          >
            Outline
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outlineDestructive"
            size="sm"
            className="h-9 w-24 cursor-default rounded-xl text-sm font-medium"
          >
            Destructive
          </Button>
          <Button
            loading
            size="sm"
            className="h-9 w-24 cursor-default rounded-xl text-sm font-medium shadow-xs"
          >
            Loading
          </Button>
          <Button
            variant="primary"
            size="icon"
            aria-label="Demo star button"
            className="hidden h-9 w-9 cursor-default rounded-xl shadow-xs sm:inline-flex"
          >
            <Star className="size-4 shrink-0 fill-primary-foreground text-primary-foreground" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4.5">
        <div className="flex items-center gap-6">
          <Switch
            checked={switchChecked}
            onCheckedChange={setSwitchChecked}
            size="lg"
            aria-label="Demo switch"
          />
          <Checkbox
            checked={checkboxChecked}
            onCheckedChange={(checked) => setCheckboxChecked(checked === true)}
            aria-label="Demo checkbox"
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-10 w-36 shrink-0 cursor-pointer items-center justify-start gap-2 rounded-xl border-border/80 px-4 text-sm font-medium hover:border-primary/50 hover:bg-muted/30"
            >
              <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
              <span className="truncate" suppressHydrationWarning>
                {selectedDate
                  ? selectedDate.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })
                  : 'Pick date'}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="z-50 w-auto bg-popover p-0" align="center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

function ScoreGauge({
  label,
  targetScore,
  delay,
}: {
  label: string;
  targetScore: number;
  delay: number;
}) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const timerId = setTimeout(() => {
      let current = 0;
      intervalId = setInterval(() => {
        current += 2;
        if (current >= targetScore) {
          setScore(targetScore);
          clearInterval(intervalId);
        } else {
          setScore(current);
        }
      }, 15);
    }, delay);

    return () => {
      clearTimeout(timerId);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [targetScore, delay]);

  const radius = 60;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1.5 select-none sm:gap-3">
      <div className="xs:h-24 xs:w-24 relative h-20 w-20 sm:h-36 sm:w-36">
        <svg
          className="h-full w-full rotate-[-90deg]"
          viewBox="0 0 144 144"
          aria-hidden="true"
        >
          <circle
            cx="72"
            cy="72"
            r={radius}
            stroke="var(--border)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx="72"
            cy="72"
            r={radius}
            stroke="#22c55e"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-75 ease-out"
            style={{
              filter: 'drop-shadow(0 0 4px rgba(34, 197, 94, 0.45))',
            }}
          />
        </svg>
        <span className="xs:text-2xl absolute inset-0 flex items-center justify-center text-xl font-black text-success sm:text-4xl">
          {score}
        </span>
      </div>
      <span className="xs:text-xs text-center text-[10px] font-medium text-muted-foreground sm:text-sm">
        {label}
      </span>
    </div>
  );
}

export function LighthouseDashboard() {
  return (
    <div className="grid w-full max-w-3xl grid-cols-2 justify-center gap-x-2 gap-y-4 px-1 sm:grid-cols-4 sm:gap-x-8 sm:px-4 lg:gap-x-12">
      <ScoreGauge label="Performance" targetScore={100} delay={100} />
      <ScoreGauge label="Accessibility" targetScore={100} delay={250} />
      <ScoreGauge label="Best Practices" targetScore={100} delay={400} />
      <ScoreGauge label="SEO" targetScore={100} delay={550} />
    </div>
  );
}

export function AuthDemoVisual() {
  return (
    <div className="flex items-center justify-center transition-transform duration-200 select-none hover:scale-105">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 300"
        className="h-28 w-auto shrink-0 text-foreground"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M200 0h200v300H200V200h100V100H200zM0 0h100v100h100v100H100v100H0z"
        />
      </svg>
    </div>
  );
}

export function DeployDemoVisual() {
  return (
    <a
      href={vercelDeployUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-9 items-center gap-2 rounded-md bg-black px-4 font-mono text-[11px] font-bold text-white transition-transform duration-200 select-none hover:scale-105 dark:bg-white dark:text-black"
    >
      <svg
        viewBox="0 0 75 65"
        fill="currentColor"
        className="h-3 w-auto"
        aria-hidden="true"
      >
        <path d="M37.5 0L75 65H0L37.5 0Z" />
      </svg>
      Deploy to Vercel
    </a>
  );
}

function FeatureCard({
  icon: IconComponent,
  title,
  description,
  badges,
  details,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  badges?: { label: string; value: string }[];
  details: string[];
}) {
  return (
    <div className="ui-card ui-hover-lift relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-6 text-left shadow-sm">
      <div className="flex items-center gap-3">
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#7663ff]/25 bg-gradient-to-br from-[#7663ff]/20 to-[#392ea3]/10 text-[#9d8cff] shadow-[0_0_12px_rgba(118,99,255,0.15)]">
          <IconComponent className="h-5 w-5" />
        </div>
        <h3 className="text-base font-extrabold tracking-tight">
          <span className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
            {title}
          </span>
        </h3>
      </div>

      <p className="text-xs leading-relaxed text-muted-foreground">
        {description}
      </p>

      {badges?.length ? (
        <div className="flex flex-wrap gap-1.5 pt-0.5 select-none">
          {badges.map((badge) => (
            <span
              key={`${badge.label}:${badge.value}`}
              className="inline-flex items-center rounded-md border border-border/40 bg-muted/60 px-2 py-0.5 text-[9px] font-bold text-muted-foreground"
            >
              {badge.value}
            </span>
          ))}
        </div>
      ) : null}

      <ul className="mt-auto space-y-1.5 border-t border-border/40 pt-3 text-[11px] text-muted-foreground">
        {details.map((detail) => (
          <li key={detail} className="flex items-start gap-2">
            <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
              <Check className="h-2.5 w-2.5 stroke-[3]" />
            </div>
            <span className="leading-tight">{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const secondaryFeatures = [
  {
    icon: Cpu,
    title: 'Modern stack, lean setup',
    description: 'Next.js 16 App Router, React 19, Tailwind v4.',
    badges: [{ label: 'Framework', value: 'Next.js 16 + React 19' }],
    details: [
      'RSC-first; client components only when needed',
      'TypeScript strict mode with path aliases',
      'API-driven; no forced database layer',
    ],
  },
  {
    icon: Search,
    title: 'SEO + PWA, server-first',
    description: 'Metadata, sitemap & manifest generated on server.',
    badges: [{ label: 'SEO', value: 'OG + JSON-LD' }],
    details: [
      'Open Graph, Twitter cards, and JSON-LD metadata',
      'sitemap.ts and robots.ts metadata routes',
      'Web manifest and canonical URL from site config',
    ],
  },
  {
    icon: Shuffle,
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
    icon: Globe,
    title: 'Type-safe i18n',
    description: 'Type-safe next-intl with cookie locale and RTL.',
    badges: [{ label: 'i18n', value: '6 locales + RTL' }],
    details: [
      'NEXT_LOCALE cookie; no URL prefixes needed',
      'Typed messages via global.d.ts declarations',
      'Six locales with RTL support for Arabic',
    ],
  },
  {
    icon: FileText,
    title: 'Forms + validation',
    description: 'Zod schemas, React Hook Form for form handling.',
    badges: [{ label: 'Validation', value: 'React Hook Form + Zod' }],
    details: [
      'Zod schemas for login, register, and reset',
      'Inferred types with z.infer inside auth forms',
      'zodResolver plus InputError for accessible inline errors',
    ],
  },
  {
    icon: Shield,
    title: 'Type-safe environment',
    description: 'T3 Env validates every variable with Zod.',
    badges: [{ label: 'Env', value: 'T3 Env + Zod' }],
    details: [
      'Server secrets and NEXT_PUBLIC_* client vars validated',
      'Zod validates URLs, booleans, and required secrets',
      'SKIP_ENV_VALIDATION for CI, Vitest, and lint checks',
    ],
  },
];

function HeroSection({
  locale,
  githubStars,
}: {
  locale: Locale;
  githubStars?: string | null;
}) {
  const isRtl = getLocaleDirection(locale) === 'rtl';

  return (
    <div
      className={`mx-auto flex max-w-7xl flex-col gap-8 px-4 pt-8 ${
        isRtl ? 'text-right' : 'text-left'
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <header className="space-y-0 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            <span className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
              {siteConfig.appName}
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
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

      <div className="mx-auto mt-16 mb-10 grid w-full max-w-screen-xl grid-cols-1 gap-6 px-5 md:grid-cols-3 xl:px-0">
        <HomeCard
          title="40+ custom, reusable components"
          description="Accelerate your workflow with a vast collection of accessible, fully customizable Tailwind CSS and Radix UI components designed for modern web apps."
          demo={<ComponentShowcaseGrid />}
          link={{ href: '/ui-components', label: 'see all' }}
          large
        />
        <HomeCard
          title="Better Auth"
          description="Enterprise-grade user management powered by BetterAuth. Includes session handling, social logins, and role-based access control out of the box."
          demo={<AuthDemoVisual />}
        />
        <HomeCard
          title="Blazing Fast Speeds"
          description="Performance optimized for maximum efficiency. Experience instant page loads, highly optimized static assets, and perfect 100/100 Lighthouse metrics from day one."
          demo={<LighthouseDashboard />}
          large
        />
        <HomeCard
          title="Instant Deployment"
          description="Deploy Next-Elite directly to Vercel's global edge network with a seamless, single-click integration."
          demo={<DeployDemoVisual />}
        />
      </div>

      <div className="mx-auto mt-12 w-full max-w-screen-xl space-y-8 px-5 xl:px-0">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            More features
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {secondaryFeatures.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              badges={feature.badges}
              details={feature.details}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
