'use client';

import { GithubIcon } from '@/components/icons/github-icon';
import { VercelIcon } from '@/components/icons/vercel-icon';
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
import TextLink from '@/components/shared/text-link';
import {
  getLocaleDirection,
  siteConfig,
  type Locale,
} from '@/features/site/config';
import {
  homeFeatures,
  renderHighlightedText,
} from '@/features/site/home-features';
import { githubRepoUrl, vercelDeployUrl } from '@/features/site/github';
import { cn } from '@/libs/utils';
import {
  Calendar as CalendarIcon,
  Check,
  Copy,
  Star,
  Terminal,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { toast } from 'sonner';

const EXTERNAL_LINK = { target: '_blank', rel: 'noopener noreferrer' } as const;

const GRADIENT_TEXT =
  'bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent';

const HERO_CARD =
  'relative col-span-1 h-auto min-h-[22rem] overflow-hidden rounded-2xl p-4 sm:min-h-[24rem] sm:p-6 md:p-8 [&>div]:flex [&>div]:h-full [&>div]:w-full [&>div]:flex-col [&>div]:items-center [&>div]:justify-center [&>div]:gap-4 sm:[&>div]:gap-6';

const INSTALL_LINES = [
  `git clone ${githubRepoUrl}`,
  'cd Next-Elite',
  'npm install',
  'cp .env.example .env',
  'npm run dev',
] as const;

const INSTALL_COMMANDS = INSTALL_LINES.join('\n');

const LIGHTHOUSE_SCORES = [
  { label: 'Performance', delay: 100 },
  { label: 'Accessibility', delay: 250 },
  { label: 'Best Practices', delay: 400 },
  { label: 'SEO', delay: 550 },
] as const;

const CMD = 'font-semibold text-primary';
const ARG = 'text-foreground/80';

function formatInstallLine(line: string) {
  if (line.startsWith('git clone')) {
    return (
      <span>
        <span className={CMD}>git</span> <span className={CMD}>clone</span>{' '}
        <span className={ARG}>{line.slice(10)}</span>
      </span>
    );
  }
  if (line.startsWith('cd ')) {
    return (
      <span>
        <span className={CMD}>cd</span>{' '}
        <span className={ARG}>{line.slice(3)}</span>
      </span>
    );
  }
  if (line === 'npm install') {
    return (
      <span>
        <span className={CMD}>npm</span> <span className={CMD}>install</span>
      </span>
    );
  }
  if (line.startsWith('cp ')) {
    return (
      <span>
        <span className={CMD}>cp</span>{' '}
        <span className={ARG}>{line.slice(3)}</span>
      </span>
    );
  }
  if (line.startsWith('npm run ')) {
    return (
      <span>
        <span className={CMD}>npm</span> <span className={CMD}>run</span>{' '}
        <span className="font-semibold text-success">{line.slice(8)}</span>
      </span>
    );
  }
  return <span className={ARG}>{line}</span>;
}

async function copyInstallCommands(setCopied: (value: boolean) => void) {
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
        HERO_CARD,
        large ? 'md:col-span-2 md:h-[29rem]' : 'md:h-[29rem]',
      )}
    >
      <div className="flex w-full items-center justify-center overflow-hidden px-1 sm:px-0">
        {children}
      </div>
      <div className="flex w-full max-w-xl flex-col items-center text-center">
        <h2 className="mb-3 text-xl font-extrabold tracking-tight text-foreground md:text-2xl">
          {title}
        </h2>
        <p className="mx-auto max-w-md text-sm leading-relaxed [text-wrap:balance] text-muted-foreground">
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
        stacked ? 'flex-col sm:flex-row sm:items-center' : 'justify-center',
      )}
    >
      <a
        href={vercelDeployUrl}
        {...EXTERNAL_LINK}
        className={cn(
          'inline-flex items-center justify-center gap-2.5 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90',
          width,
        )}
      >
        <VercelIcon className="size-3.5 shrink-0" />
        Deploy to Vercel
      </a>
      <a
        href={githubRepoUrl}
        {...EXTERNAL_LINK}
        className={cn(
          'inline-flex items-center justify-center gap-2.5 rounded-full border px-5 text-sm font-medium text-foreground shadow-sm transition-colors',
          stacked
            ? 'border-border/60 bg-background/50 backdrop-blur-sm hover:bg-background/70'
            : 'border-border bg-background hover:bg-muted/50',
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

function HeroSection({
  locale,
  githubStars,
}: {
  locale: Locale;
  githubStars?: string | null;
}) {
  const [switchChecked, setSwitchChecked] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(2026, 5, 17),
  );
  const isRtl = getLocaleDirection(locale) === 'rtl';
  const demoButtonClass =
    'h-9 w-24 cursor-default rounded-xl text-sm font-medium shadow-sm';
  const formattedDate = selectedDate?.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <section
      className={cn(
        'mx-auto flex max-w-7xl flex-col gap-8 px-4 pt-20',
        isRtl ? 'text-right' : 'text-left',
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <header className="space-y-0 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            <span className={GRADIENT_TEXT}>{siteConfig.appName}</span>
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {siteConfig.appType}
          </p>
        </header>
        <LandingActions githubStars={githubStars} />
      </div>

      <div className="mx-auto mt-16 grid w-full max-w-screen-xl grid-cols-1 gap-4 px-4 sm:gap-6 sm:px-5 md:grid-cols-3 xl:px-0">
        <HeroCard
          large
          title={
            <>
              <span className={GRADIENT_TEXT}>
                40+ custom, reusable components
              </span>
              <span className="text-foreground/80">
                {' - '}
                <TextLink
                  href="/ui-components"
                  variant="underlined"
                  className="text-primary transition-colors hover:text-primary/80"
                  aria-label="see all 40+ custom, reusable components"
                >
                  see all
                </TextLink>
              </span>
            </>
          }
          description="Accelerate your workflow with a vast collection of accessible, fully customizable Tailwind CSS and Radix UI components designed for modern web apps."
        >
          <div className="flex w-full max-w-lg flex-col items-center justify-center gap-8 select-none md:flex-row md:gap-16">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2.5">
                <Button variant="primary" size="sm" className={demoButtonClass}>
                  Primary
                </Button>
                <Button variant="success" size="sm" className={demoButtonClass}>
                  Success
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    demoButtonClass,
                    'hidden shadow-xs sm:inline-flex',
                  )}
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
                    className="h-10 w-36 shrink-0 cursor-pointer items-center justify-start gap-2 rounded-xl border-border/80 px-4 text-sm font-medium hover:border-primary/50 hover:bg-muted/30"
                  >
                    <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
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
          title={<span className={GRADIENT_TEXT}>Instant Deployment</span>}
          description="Deploy Next-Elite directly to Vercel's global edge network with a seamless, single-click integration."
        >
          <a
            href={vercelDeployUrl}
            {...EXTERNAL_LINK}
            className="inline-flex h-9 items-center gap-2 rounded-md bg-black px-4 font-sans text-xs font-medium text-white transition-transform duration-200 select-none hover:scale-105 dark:bg-white dark:text-black"
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
        </HeroCard>

        <HeroCard
          large
          title={<span className={GRADIENT_TEXT}>Blazing Fast Speeds</span>}
          description="Performance optimized for maximum efficiency. Experience instant page loads, highly optimized static assets, and elite Lighthouse scores across accessibility, SEO, and best practices."
        >
          <div className="grid w-full max-w-3xl grid-cols-2 justify-center gap-x-3 gap-y-3 py-1 sm:grid-cols-4 sm:gap-x-8 sm:gap-y-4 sm:px-4 sm:py-0 lg:gap-x-12">
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
          title={<span className={GRADIENT_TEXT}>RBAC & Better Auth</span>}
          description="Enterprise-grade auth with Better Auth - email/password, Google OAuth, session handling, and permission-based RBAC out of the box."
        >
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
        </HeroCard>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="mx-auto w-full max-w-7xl min-w-0 px-4">
      <div className="mx-auto w-full max-w-screen-xl space-y-4 px-5 sm:space-y-6 xl:px-0">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-foreground sm:text-start sm:text-3xl">
          More features
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {homeFeatures.map(({ icon: Icon, title, description, details }) => (
            <Card
              key={title}
              variant="glow"
              className="relative min-h-[15rem] gap-4 overflow-hidden rounded-2xl p-4 text-start sm:gap-5 sm:p-6 md:p-7"
            >
              <div className="flex items-start gap-3.5">
                <div className="relative flex aspect-square size-12 shrink-0 items-center justify-center rounded-full border border-[#7663ff]/25 bg-gradient-to-br from-[#7663ff]/20 to-[#392ea3]/10 text-[#9d8cff] shadow-[0_0_12px_rgba(118,99,255,0.15)]">
                  <Icon className="size-6" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-extrabold tracking-tight">
                    <span className={GRADIENT_TEXT}>{title}</span>
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
              <ul className="mt-6 space-y-2.5 text-[11px] text-muted-foreground">
                {details.map((detail) => (
                  <li key={detail.text} className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
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
      </div>
    </section>
  );
}

function FooterSection({ githubStars }: { githubStars?: string | null }) {
  const [copied, setCopied] = useState(false);

  return (
    <section className="mx-auto w-full max-w-7xl min-w-0 px-4 pb-12 sm:pb-16">
      <div className="mx-auto w-full max-w-screen-xl px-5 xl:px-0">
        <Card className="relative gap-0 overflow-hidden rounded-2xl py-0 sm:rounded-3xl">
          <div className="relative z-10 grid min-w-0 gap-8 p-6 sm:p-8 lg:grid-cols-5 lg:items-center lg:gap-10 lg:p-10">
            <div className="flex min-w-0 flex-col gap-5 lg:col-span-2">
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                  <span className={cn('inline-block', GRADIENT_TEXT)}>
                    Get started in minutes
                  </span>
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg">
                  Clone the repository, copy the local environment
                  configurations, install dependencies, and launch your
                  developer server instantly. Ready to deploy to Vercel when you
                  are.
                </p>
              </div>
              <LandingActions githubStars={githubStars} stacked />
            </div>

            <Card
              flat
              className="min-w-0 gap-0 overflow-hidden rounded-xl py-0 lg:col-span-3"
              dir="ltr"
            >
              <div className="flex items-center justify-between gap-3 border-b border-border/40 bg-muted/20 px-4 py-3 sm:px-5">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border/50 bg-background/40 text-muted-foreground">
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
                  className="h-8 shrink-0 gap-1.5 border-border/50 bg-background/40 px-3 text-xs backdrop-blur-sm"
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

              <div className="min-w-0 bg-background/20">
                <pre className="overflow-x-auto overscroll-x-contain p-4 font-mono text-xs leading-relaxed sm:p-5 sm:text-sm">
                  <code className="grid min-w-0 gap-2">
                    {INSTALL_LINES.map((line) => (
                      <span key={line} className="flex min-w-0 gap-2">
                        <span
                          className="w-3 shrink-0 font-bold text-foreground select-none"
                          aria-hidden
                        >
                          $
                        </span>
                        <span className="min-w-0 [overflow-wrap:anywhere] break-all">
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
      </div>
    </section>
  );
}

export function LandingPage({
  locale,
  githubStars,
}: {
  locale: Locale;
  githubStars?: string | null;
}) {
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      <HeroSection locale={locale} githubStars={githubStars} />
      <FeaturesSection />
      <FooterSection githubStars={githubStars} />
    </div>
  );
}
