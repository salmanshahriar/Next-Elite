'use client';

import { GithubIcon } from '@/components/icons/github-icon';
import { VercelIcon } from '@/components/icons/vercel-icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { githubRepoUrl, vercelDeployUrl } from '@/features/site/github';
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
    <section className="mx-auto max-w-7xl px-4 pb-12 sm:pb-16">
      <Card className="shadow-sm">
        <CardContent className="grid gap-8 p-6 sm:p-10 lg:grid-cols-5 lg:items-stretch">
          <div className="min-w-0 lg:col-span-2">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Get started in minutes
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Clone the repo, copy the env file, and run the dev server locally.
              Deploy to Vercel when you are ready.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
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

          <Card className="h-full gap-0 overflow-hidden py-0 shadow-sm lg:col-span-3">
            <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/50 px-4 py-3 sm:px-5">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-background text-muted-foreground">
                  <Terminal className="size-4" aria-hidden />
                </span>
                <span className="truncate text-sm leading-none font-semibold text-foreground">
                  Install & run
                </span>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="h-8 shrink-0 gap-1.5 px-3 text-xs"
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <Check className="size-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <div className="bg-background">
              <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed sm:p-5 sm:text-sm">
                <code className="grid gap-1.5">
                  {installLines.map((line) => (
                    <span key={line} className="flex min-w-0 gap-2">
                      <span
                        className="shrink-0 font-bold text-foreground select-none"
                        aria-hidden
                      >
                        $
                      </span>
                      <span className="min-w-0 break-all text-foreground">
                        {line}
                      </span>
                    </span>
                  ))}
                </code>
              </pre>
            </div>
          </Card>
        </CardContent>
      </Card>
    </section>
  );
};
