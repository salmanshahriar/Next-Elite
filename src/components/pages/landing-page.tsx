'use client';

import { BetterAuthIcon, GithubIcon, VercelIcon } from '@/components/icons';
import TextLink from '@/components/shared/text-link';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DynamicChart } from '@/components/ui/dynamic-chart';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { siteConfig } from '@/features/site/config';
import { cn } from '@/libs/utils';
import {
  Calendar as CalendarIcon,
  Check,
  Copy,
  Cpu,
  FileText,
  FlaskConical,
  Globe,
  Search,
  Shuffle,
  Star,
  Terminal,
  type LucideIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { createElement, Fragment, useState } from 'react';
import { toast } from 'sonner';

type HomeFeatureDetail = {
  text: string;
  highlights?: readonly string[];
};

type HomeFeature = {
  icon: LucideIcon;
  title: string;
  description: string;
  details: readonly HomeFeatureDetail[];
};

function renderHighlightedText(
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
          { key: index, className: 'font-semibold text-primary' },
          part,
        )
      : createElement(Fragment, { key: index }, part),
  );
}

const homeFeatures: readonly HomeFeature[] = [
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
        text: 'NEXT_LOCALE cookie remembers language without prefixes',
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

const INSTALL_LINES: readonly string[] = [
  'git clone https://github.com/salmanshahriar/Next-Elite',
  'cd Next-Elite',
  'npm install',
  'cp .env.example .env',
  'npm run dev',
];

const INSTALL_COMMANDS: string = INSTALL_LINES.join('\n');

const LIGHTHOUSE_SCORES = [
  { label: 'Performance', delay: 100 },
  { label: 'Accessibility', delay: 250 },
  { label: 'Best Practices', delay: 400 },
  { label: 'SEO', delay: 550 },
] as const;

function formatInstallLine(line: string): ReactNode {
  const parts = line.split(' ');
  const cmd = parts[0];
  const sub = parts[1];
  const rest = parts.slice(2).join(' ');

  if (cmd === 'git' && sub === 'clone') {
    return (
      <>
        <span className="font-semibold text-primary">git clone</span>{' '}
        <span className="text-foreground/80">{rest}</span>
      </>
    );
  }
  if (cmd === 'cd' || cmd === 'cp') {
    return (
      <>
        <span className="font-semibold text-primary">{cmd}</span>{' '}
        <span className="text-foreground/80">{parts.slice(1).join(' ')}</span>
      </>
    );
  }
  if (cmd === 'npm' && sub === 'run') {
    return (
      <>
        <span className="font-semibold text-primary">npm run</span>{' '}
        <span className="font-semibold text-success">{rest}</span>
      </>
    );
  }
  if (cmd === 'npm') {
    return <span className="font-semibold text-primary">{line}</span>;
  }
  return <span className="text-foreground/80">{line}</span>;
}

async function copyInstallCommands(
  setCopied: (value: boolean) => void,
): Promise<void> {
  try {
    await navigator.clipboard.writeText(INSTALL_COMMANDS);
    setCopied(true);
    toast.success('Copied to clipboard');
    window.setTimeout(() => setCopied(false), 2000);
  } catch {
    toast.error('Could not copy commands');
  }
}

function HeroCard({
  large,
  title,
  description,
  children,
}: {
  large?: boolean;
  title: ReactNode;
  description: string;
  children: ReactNode;
}) {
  return (
    <Card
      className={cn(
        'flex h-auto min-h-[22rem] flex-col items-center justify-center gap-6 rounded-md p-6 text-center sm:min-h-[24rem] sm:p-8 md:h-[29rem]',
        large && 'md:col-span-2',
      )}
    >
      <div className="flex w-full items-center justify-center overflow-hidden">
        {children}
      </div>
      <div className="max-w-xl text-center">
        <h2 className="mb-2 text-xl font-extrabold tracking-tight text-foreground md:text-2xl">
          {title}
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </Card>
  );
}

function LandingActions({
  githubStars,
  stacked,
}: {
  githubStars?: string | null;
  stacked?: boolean;
}) {
  const width = stacked ? 'h-11 w-full sm:w-auto' : 'h-11';

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-3',
        stacked ? 'flex-col sm:flex-row' : 'justify-center',
      )}
    >
      <a
        href="https://vercel.com/new/clone?repository-url=https://github.com/salmanshahriar/Next-Elite"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90',
          width,
        )}
      >
        <VercelIcon className="size-3.5 shrink-0" />
        Deploy to Vercel
      </a>
      <a
        href="https://github.com/salmanshahriar/Next-Elite"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-muted/50',
          width,
        )}
      >
        <GithubIcon className="size-4 shrink-0" />
        Star on GitHub
        {githubStars ? (
          <span className="text-muted-foreground">{githubStars}</span>
        ) : null}
      </a>
    </div>
  );
}

function HeroSection({ githubStars }: { githubStars?: string | null }) {
  const [switchChecked, setSwitchChecked] = useState<boolean>(true);
  const [checkboxChecked, setCheckboxChecked] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(2026, 5, 17),
  );
  const formattedDate = selectedDate?.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <section className="mx-auto max-w-7xl space-y-16 px-4 pt-20">
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl md:text-7xl">
          {siteConfig.appName}
        </h1>
        <p className="mx-auto max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-xl">
          {siteConfig.appType}
        </p>
        <LandingActions githubStars={githubStars} />
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <HeroCard
          large
          title={
            <>
              <span className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
                50+ custom, reusable components
              </span>
              <span className="text-foreground/80">
                {' - '}
                <TextLink
                  href="/ui-components"
                  variant="underlined"
                  className="text-primary hover:text-primary/80"
                  aria-label="see all 50+ custom, reusable components"
                >
                  see all
                </TextLink>
              </span>
            </>
          }
          description="Accelerate your workflow with a vast collection of accessible, fully customizable Tailwind CSS and Radix UI components designed for modern web apps."
        >
          <div className="flex flex-col items-center gap-6 select-none md:flex-row md:gap-12">
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2.5">
                <Button variant="primary" size="sm" className="h-9 w-24">
                  Primary
                </Button>
                <Button variant="success" size="sm" className="h-9 w-24">
                  Success
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden h-9 w-24 sm:inline-flex"
                >
                  Outline
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outlineDestructive"
                  size="sm"
                  className="h-9 w-24"
                >
                  Destructive
                </Button>
                <Button loading size="sm" className="h-9 w-24">
                  Loading
                </Button>
                <Button
                  variant="primary"
                  size="icon"
                  aria-label="Demo star button"
                  className="hidden size-9 sm:inline-flex"
                >
                  <Star className="size-4 fill-primary-foreground text-primary-foreground" />
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-6">
                <Switch
                  checked={switchChecked}
                  onCheckedChange={setSwitchChecked}
                  size="lg"
                  aria-label="Demo switch"
                />
                <Checkbox
                  checked={checkboxChecked}
                  onCheckedChange={(checked) =>
                    setCheckboxChecked(checked === true)
                  }
                  aria-label="Demo checkbox"
                />
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    aria-label="Demo pick date button"
                    className="h-10 w-36 justify-start gap-2 border-border/80 px-4 text-sm font-medium hover:border-primary/50 hover:bg-muted/30"
                  >
                    <CalendarIcon className="size-4 text-muted-foreground" />
                    <span className="truncate" suppressHydrationWarning>
                      {formattedDate ?? 'Pick date'}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="z-50 w-auto bg-popover p-0"
                  align="center"
                >
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
        </HeroCard>

        <HeroCard
          title={
            <span className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
              Instant Deployment
            </span>
          }
          description="Deploy Next-Elite directly to Vercel's global edge network with a seamless, single-click integration."
        >
          <a
            href="https://vercel.com/new/clone?repository-url=https://github.com/salmanshahriar/Next-Elite"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-2 rounded-md bg-black px-4 font-sans text-xs font-medium text-white transition-transform duration-200 select-none hover:scale-105 dark:bg-white dark:text-black"
          >
            <VercelIcon className="h-3 w-auto" />
            Deploy to Vercel
          </a>
        </HeroCard>

        <HeroCard
          large
          title={
            <span className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
              Blazing Fast Speeds
            </span>
          }
          description="Performance optimized for maximum efficiency. Experience instant page loads, highly optimized static assets, and elite Lighthouse scores across accessibility, SEO, and best practices."
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {LIGHTHOUSE_SCORES.map(({ label, delay }) => (
              <DynamicChart
                key={label}
                label={label}
                value={100}
                delay={delay}
              />
            ))}
          </div>
        </HeroCard>

        <HeroCard
          title={
            <span className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
              RBAC & Better Auth
            </span>
          }
          description="Enterprise-grade auth with Better Auth - email/password, Google OAuth, session handling, and permission-based RBAC out of the box."
        >
          <BetterAuthIcon className="h-28 w-auto text-foreground transition-transform duration-200 select-none hover:scale-105" />
        </HeroCard>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="mx-auto max-w-7xl space-y-6 px-4">
      <h2 className="text-center text-2xl font-extrabold tracking-tight">
        More features
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {homeFeatures.map(({ icon: Icon, title, description, details }) => (
          <Card key={title} variant="glow" className="p-6">
            <div className="flex items-start gap-3.5">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-gradient-to-br from-primary/20 to-primary/10 text-primary shadow-xs">
                <Icon className="size-6" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-base font-extrabold tracking-tight text-transparent">
                  {title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
            <ul className="mt-6 space-y-2.5 text-[9px] text-muted-foreground md:text-[11px]">
              {details.map((detail) => (
                <li key={detail.text} className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-2.5 stroke-[3]" />
                  </div>
                  <span className="leading-normal">
                    {renderHighlightedText(detail.text, detail.highlights)}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
}

function FooterSection({ githubStars }: { githubStars?: string | null }) {
  const [copied, setCopied] = useState<boolean>(false);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16">
      <Card className="p-6 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-5 lg:items-center lg:gap-10">
          <div className="flex flex-col gap-5 lg:col-span-2">
            <div className="space-y-3">
              <h2 className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-2xl font-extrabold tracking-tight text-transparent sm:text-3xl lg:text-4xl">
                Get started in minutes
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Clone the repository, copy the local environment, install
                dependencies, launch your developer server and customize the
                application as you like and deploy.
              </p>
            </div>
            <LandingActions githubStars={githubStars} stacked />
          </div>

          <Card
            flat
            className="overflow-hidden rounded-md p-0 lg:col-span-3"
            dir="ltr"
          >
            <div className="flex items-center justify-between border-b border-border/40 bg-muted/20 px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-md border border-border/50 bg-background/40 text-muted-foreground">
                  <Terminal className="size-4" aria-hidden />
                </span>
                <span className="text-sm font-semibold text-foreground">
                  Install & run
                </span>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="h-8 gap-1.5 border-border/50 bg-background/40 px-3 text-xs backdrop-blur-sm"
                onClick={() => copyInstallCommands(setCopied)}
                aria-label={copied ? 'Copied' : 'Copy commands'}
              >
                {copied ? (
                  <>
                    <Check className="size-3.5" />
                    <span className="hidden sm:inline">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span className="hidden sm:inline">Copy</span>
                  </>
                )}
              </Button>
            </div>

            <div className="bg-background/20">
              <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed sm:p-5 sm:text-sm">
                <code className="grid gap-2">
                  {INSTALL_LINES.map((line) => (
                    <span key={line} className="flex gap-2">
                      <span
                        className="w-3 shrink-0 font-bold text-foreground select-none"
                        aria-hidden
                      >
                        $
                      </span>
                      <span className="break-all">
                        {formatInstallLine(line)}
                      </span>
                    </span>
                  ))}
                </code>
              </pre>
            </div>
          </Card>
        </div>
      </Card>
    </section>
  );
}

export function LandingPage({ githubStars }: { githubStars?: string | null }) {
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      <HeroSection githubStars={githubStars} />
      <FeaturesSection />
      <FooterSection githubStars={githubStars} />
    </div>
  );
}
