'use client';

import { BetterAuthIcon, GithubIcon, VercelIcon } from '@/_demo(DELETE)/icons';
import TextLink from '@/components/shared/text-link';
import {
  ShowcaseDashboard,
  ShowcaseData,
  ShowcaseProfile,
} from '@/_demo(DELETE)/components/ui-showcase';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { siteConfig } from '@/features/site/config';
import { cn } from '@/libs/utils';
import { HOME_FEATURES } from '@/_demo(DELETE)/pages/landing-features';
import {
  CalendarIcon,
  CheckIcon,
  CopyIcon,
  StarIcon,
  TerminalIcon,
} from '@phosphor-icons/react';
import { useLocale, useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { createElement, Fragment, useEffect, useState } from 'react';
import { toast } from 'sonner';

const useGithubStars = () => {
  const [githubStars, setGithubStars] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetch('https://api.github.com/repos/salmanshahriar/Next-Elite')
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { stargazers_count?: number } | null) => {
        if (isMounted && typeof data?.stargazers_count === 'number') {
          const count = data.stargazers_count;
          const formatted =
            count >= 1000
              ? `${(count / 1000).toFixed(1).replace(/\.0$/, '')}K`
              : String(count);
          setGithubStars(formatted);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  return githubStars;
};

export const LandingPage = () => {
  const githubStars = useGithubStars();

  return (
    <div className="flex flex-col gap-16 lg:gap-24">
      <HeroSection githubStars={githubStars} />
      <UiShowcaseSection />
      <FeaturesSection />
      <FooterSection githubStars={githubStars} />
    </div>
  );
};

const HeroSection = ({ githubStars }: { githubStars: string | null }) => {
  const t = useTranslations('home.hero');
  const locale = useLocale();
  const [switchChecked, setSwitchChecked] = useState<boolean>(true);
  const [checkboxChecked, setCheckboxChecked] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(2026, 5, 17),
  );

  const LIGHTHOUSE_SCORES = [
    { id: 'performance', delay: 100 },
    { id: 'accessibility', delay: 250 },
    { id: 'bestPractices', delay: 400 },
    { id: 'seo', delay: 550 },
  ] as const;

  const HeroCard = ({
    large,
    title,
    description,
    children,
  }: {
    large?: boolean;
    title: ReactNode;
    description: string;
    children: ReactNode;
  }) => {
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
  };

  const HeroActions = () => {
    return (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href="https://vercel.com/new/clone?repository-url=https://github.com/salmanshahriar/Next-Elite"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          <VercelIcon className="size-3.5 shrink-0" />
          {t('deployToVercel')}
        </a>
        <a
          href="https://github.com/salmanshahriar/Next-Elite"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-muted/50"
        >
          <GithubIcon className="size-4 shrink-0" />
          {t('starOnGithub')}
          {githubStars ? (
            <span className="text-muted-foreground">{githubStars}</span>
          ) : null}
        </a>
      </div>
    );
  };

  const formattedDate = selectedDate?.toLocaleDateString(locale, {
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
        <HeroActions />
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <HeroCard
          large
          title={
            <>
              <span className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
                {t('components.title')}
              </span>
              <span className="text-foreground/80">
                {' - '}
                <TextLink
                  href="/ui-components"
                  variant="underlined"
                  className="text-primary hover:text-primary/80"
                  aria-label={t('components.seeAllLabel')}
                >
                  {t('components.seeAll')}
                </TextLink>
              </span>
            </>
          }
          description={t('components.description')}
        >
          <div className="flex flex-col items-center gap-6 select-none md:flex-row md:gap-12">
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2.5">
                <Button variant="primary" size="sm" className="h-9 w-24">
                  {t('demo.primary')}
                </Button>
                <Button variant="success" size="sm" className="h-9 w-24">
                  {t('demo.success')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden h-9 w-24 sm:inline-flex"
                >
                  {t('demo.outline')}
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outlineDestructive"
                  size="sm"
                  className="h-9 w-24"
                >
                  {t('demo.destructive')}
                </Button>
                <Button loading size="sm" className="h-9 w-24">
                  {t('demo.loading')}
                </Button>
                <Button
                  variant="primary"
                  size="icon"
                  aria-label={t('demo.starLabel')}
                  className="hidden size-9 sm:inline-flex"
                >
                  <StarIcon
                    weight="fill"
                    className="size-4 text-primary-foreground"
                  />
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-6">
                <Switch
                  checked={switchChecked}
                  onCheckedChange={setSwitchChecked}
                  size="lg"
                  aria-label={t('demo.switchLabel')}
                />
                <Checkbox
                  checked={checkboxChecked}
                  onCheckedChange={(checked) =>
                    setCheckboxChecked(checked === true)
                  }
                  aria-label={t('demo.checkboxLabel')}
                />
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    aria-label={t('demo.pickDateLabel')}
                    className="h-10 w-36 justify-start gap-2 border-border/80 px-4 text-sm font-medium hover:border-primary/50 hover:bg-muted/30"
                  >
                    <CalendarIcon className="size-4 text-muted-foreground" />
                    <span className="truncate" suppressHydrationWarning>
                      {formattedDate ?? t('demo.pickDate')}
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
                    autoFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </HeroCard>

        <HeroCard
          title={
            <span className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
              {t('deployment.title')}
            </span>
          }
          description={t('deployment.description')}
        >
          <a
            href="https://vercel.com/new/clone?repository-url=https://github.com/salmanshahriar/Next-Elite"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-2 rounded-md bg-black px-4 font-sans text-xs font-medium text-white transition-transform duration-200 select-none hover:scale-105 dark:bg-white dark:text-black"
          >
            <VercelIcon className="h-3 w-auto" />
            {t('deployToVercel')}
          </a>
        </HeroCard>

        <HeroCard
          large
          title={
            <span className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
              {t('speed.title')}
            </span>
          }
          description={t('speed.description')}
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {LIGHTHOUSE_SCORES.map(({ id, delay }) => (
              <DynamicChart
                key={id}
                label={t(`speed.lighthouse.${id}`)}
                value={100}
                delay={delay}
              />
            ))}
          </div>
        </HeroCard>

        <HeroCard
          title={
            <span className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
              {t('auth.title')}
            </span>
          }
          description={t('auth.description')}
        >
          <BetterAuthIcon className="h-28 w-auto text-foreground transition-transform duration-200 select-none hover:scale-105" />
        </HeroCard>
      </div>
    </section>
  );
};

const UiShowcaseSection = () => {
  const t = useTranslations('home.showcase');

  return (
    <section className="mx-auto w-full max-w-7xl space-y-2 px-4">
      <h2 className="text-center text-2xl font-extrabold tracking-tight">
        {t('title')}
        <span className="text-foreground/80">
          {' - '}
          <TextLink
            href="/ui-components"
            variant="underlined"
            className="text-primary hover:text-primary/80"
            aria-label={t('seeAllLabel')}
          >
            {t('seeAll')}
          </TextLink>
        </span>
      </h2>

      <Tabs defaultValue="dashboard" className="gap-6">
        <TabsList className="mx-auto">
          <TabsTrigger value="dashboard">{t('tabs.dashboard')}</TabsTrigger>
          <TabsTrigger value="data">{t('tabs.data')}</TabsTrigger>
          <TabsTrigger value="profile">{t('tabs.profile')}</TabsTrigger>
        </TabsList>
        <Card variant="glow" className="p-4 md:p-6">
          <TabsContent value="dashboard">
            <ShowcaseDashboard />
          </TabsContent>
          <TabsContent value="data">
            <ShowcaseData />
          </TabsContent>
          <TabsContent value="profile">
            <ShowcaseProfile />
          </TabsContent>
        </Card>
      </Tabs>
    </section>
  );
};

const FeaturesSection = () => {
  const t = useTranslations('home.features');

  const renderHighlightedText = (
    text: string,
    highlights: readonly string[] = [],
  ): ReactNode => {
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
  };

  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 px-4">
      <h2 className="text-center text-2xl font-extrabold tracking-tight">
        {t('title')}
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {HOME_FEATURES.map(({ id, icon: Icon, details }) => (
          <Card
            key={id}
            variant="glow"
            className={cn(
              'row-span-2 grid grid-rows-subgrid p-6',
              '[&>div:last-child]:row-span-2 [&>div:last-child]:grid [&>div:last-child]:grid-rows-subgrid',
            )}
          >
            <div className="flex items-start gap-3.5">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-gradient-to-br from-primary/20 to-primary/10 text-primary shadow-xs">
                <Icon className="size-6" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-base font-extrabold tracking-tight text-transparent">
                  {t(`${id}.title`)}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {t(`${id}.description`)}
                </p>
              </div>
            </div>
            <ul className="space-y-2.5 text-[11px] text-muted-foreground">
              {details.map((detail) => (
                <li key={detail.key} className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckIcon weight="bold" className="size-2.5" />
                  </div>
                  <span className="leading-normal">
                    {renderHighlightedText(t(detail.key), detail.highlights)}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
};

const FooterSection = ({ githubStars }: { githubStars: string | null }) => {
  const t = useTranslations('home');
  const [copied, setCopied] = useState<boolean>(false);

  const INSTALL_LINES: readonly string[] = [
    'git clone https://github.com/salmanshahriar/Next-Elite',
    'cd Next-Elite',
    'npm install',
    'cp .env.example .env',
    'npm run dev',
  ];

  const INSTALL_COMMANDS: string = INSTALL_LINES.join('\n');

  const FooterActions = () => {
    return (
      <div className="flex flex-col flex-wrap items-center gap-3 sm:flex-row">
        <a
          href="https://vercel.com/new/clone?repository-url=https://github.com/salmanshahriar/Next-Elite"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90 sm:w-auto"
        >
          <VercelIcon className="size-3.5 shrink-0" />
          {t('hero.deployToVercel')}
        </a>
        <a
          href="https://github.com/salmanshahriar/Next-Elite"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-muted/50 sm:w-auto"
        >
          <GithubIcon className="size-4 shrink-0" />
          {t('hero.starOnGithub')}
          {githubStars ? (
            <span className="text-muted-foreground">{githubStars}</span>
          ) : null}
        </a>
      </div>
    );
  };

  const formatInstallLine = (line: string): ReactNode => {
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
  };

  const copyInstallCommands = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMANDS);
      setCopied(true);
      toast.success(t('footer.copiedToast'));
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(t('footer.copyError'));
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16">
      <Card className="p-6 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-5 lg:items-center lg:gap-10">
          <div className="flex flex-col gap-5 lg:col-span-2">
            <div className="space-y-3">
              <h2 className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-2xl font-extrabold tracking-tight text-transparent sm:text-3xl lg:text-4xl">
                {t('footer.title')}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t('footer.description')}
              </p>
            </div>
            <FooterActions />
          </div>

          <Card
            flat
            className="overflow-hidden rounded-md p-0 lg:col-span-3"
            dir="ltr"
          >
            <div className="flex items-center justify-between border-b border-border/40 bg-muted/20 px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-md border border-border/50 bg-background/40 text-muted-foreground">
                  <TerminalIcon className="size-4" aria-hidden />
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {t('footer.installTitle')}
                </span>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="h-8 gap-1.5 border-border/50 bg-background/40 px-3 text-xs backdrop-blur-sm"
                onClick={() => copyInstallCommands()}
                aria-label={copied ? t('footer.copied') : t('footer.copyLabel')}
              >
                {copied ? (
                  <>
                    <CheckIcon className="size-3.5" />
                    <span className="hidden sm:inline">
                      {t('footer.copied')}
                    </span>
                  </>
                ) : (
                  <>
                    <CopyIcon className="size-3.5" />
                    <span className="hidden sm:inline">{t('footer.copy')}</span>
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
};
