'use client';

import { GithubIcon } from '@/components/icons/github-icon';
import { VercelIcon } from '@/components/icons/vercel-icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { githubRepoUrl, vercelDeployUrl } from '@/features/site/github';
import { cn } from '@/libs/utils';
import { Check, Copy, Terminal } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const installLines = [
  `git clone ${githubRepoUrl}`,
  'cd Next-Elite',
  'npm install',
  'cp .env.example .env',
  'npm run dev',
];

const installCommands = installLines.join('\n');

function syntaxHighlightedLine(line: string) {
  if (line.startsWith('git clone')) {
    return (
      <span>
        <span className="font-semibold text-primary">git</span>{' '}
        <span className="font-semibold text-primary">clone</span>{' '}
        <span className="text-foreground/80">
          {line.replace('git clone ', '')}
        </span>
      </span>
    );
  }
  if (line.startsWith('cd ')) {
    return (
      <span>
        <span className="font-semibold text-primary">cd</span>{' '}
        <span className="text-foreground/80">{line.replace('cd ', '')}</span>
      </span>
    );
  }
  if (line.startsWith('npm install')) {
    return (
      <span>
        <span className="font-semibold text-primary">npm</span>{' '}
        <span className="font-semibold text-primary">install</span>
      </span>
    );
  }
  if (line.startsWith('cp ')) {
    return (
      <span>
        <span className="font-semibold text-primary">cp</span>{' '}
        <span className="text-foreground/80">{line.replace('cp ', '')}</span>
      </span>
    );
  }
  if (line.startsWith('npm run ')) {
    return (
      <span>
        <span className="font-semibold text-primary">npm</span>{' '}
        <span className="font-semibold text-primary">run</span>{' '}
        <span className="font-semibold text-success">
          {line.replace('npm run ', '')}
        </span>
      </span>
    );
  }
  return <span className="text-foreground/80">{line}</span>;
}

export const HomeGetStartedSection = ({
  githubStars,
}: {
  githubStars?: string | null;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(installCommands);
      setCopied(true);
      toast.success('Copied to clipboard');
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Could not copy commands');
    }
  };

  return (
    <section className="mx-auto w-full max-w-7xl min-w-0 px-4 pb-12 sm:pb-16">
      <div className="mx-auto w-full max-w-screen-xl px-5 xl:px-0">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card/60 shadow-xl backdrop-blur-sm sm:rounded-3xl">
          <div
            className="pointer-events-none absolute -top-20 -right-20 size-80 rounded-full bg-primary/5 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-20 size-80 rounded-full bg-primary/5 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 grid min-w-0 gap-8 p-6 sm:p-8 lg:grid-cols-5 lg:items-center lg:gap-10 lg:p-10">
            <div className="flex min-w-0 flex-col gap-5 lg:col-span-2">
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                  <span className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
                    Get started in minutes
                  </span>
                </h2>
                <p className="text-sm leading-relaxed text-foreground/75 sm:text-base lg:text-lg">
                  Clone the repository, copy the local environment
                  configurations, install dependencies, and launch your
                  developer server instantly. Ready to deploy to Vercel when you
                  are.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={vercelDeployUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90 sm:w-auto"
                >
                  <VercelIcon className="size-3.5 shrink-0" />
                  Deploy to Vercel
                </a>
                <a
                  href={githubRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-full border border-border bg-background px-5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted/50 sm:w-auto"
                >
                  <GithubIcon className="size-4 shrink-0" />
                  Star on GitHub
                  {githubStars ? (
                    <span className="text-foreground/60">{githubStars}</span>
                  ) : null}
                </a>
              </div>
            </div>

            <Card className="min-w-0 gap-0 overflow-hidden py-0 lg:col-span-3">
              <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/50 px-4 py-3 sm:px-5">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-background text-muted-foreground">
                    <Terminal className="size-4" aria-hidden />
                  </span>
                  <span className="truncate text-sm font-semibold text-foreground">
                    Install & run
                  </span>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="h-8 shrink-0 gap-1.5 px-3 text-xs"
                  onClick={handleCopy}
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

              <div className="min-w-0 bg-background">
                <pre className="overflow-x-auto overscroll-x-contain p-4 font-mono text-xs leading-relaxed sm:p-5 sm:text-sm">
                  <code className="grid min-w-0 gap-2">
                    {installLines.map((line) => (
                      <span key={line} className="flex min-w-0 gap-2">
                        <span
                          className={cn(
                            'w-3 shrink-0 font-bold text-foreground select-none',
                          )}
                          aria-hidden
                        >
                          $
                        </span>
                        <span className="min-w-0 [overflow-wrap:anywhere] break-all">
                          {syntaxHighlightedLine(line)}
                        </span>
                      </span>
                    ))}
                  </code>
                </pre>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
