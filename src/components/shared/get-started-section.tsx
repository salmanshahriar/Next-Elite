'use client';

import { GithubIcon } from '@/components/icons/github-icon';
import { VercelIcon } from '@/components/icons/vercel-icon';
import { Button } from '@/components/ui/button';
import { githubRepoUrl, vercelDeployUrl } from '@/features/site/github';
import { Check, Copy } from 'lucide-react';
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
        <span className="font-bold text-violet-400">git</span>{' '}
        <span className="font-bold text-violet-400">clone</span>{' '}
        <span className="font-medium text-zinc-300">
          {line.replace('git clone ', '')}
        </span>
      </span>
    );
  }
  if (line.startsWith('cd ')) {
    return (
      <span>
        <span className="font-bold text-violet-400">cd</span>{' '}
        <span className="font-medium text-zinc-300">
          {line.replace('cd ', '')}
        </span>
      </span>
    );
  }
  if (line.startsWith('npm install')) {
    return (
      <span>
        <span className="font-bold text-violet-400">npm</span>{' '}
        <span className="font-bold text-violet-400">install</span>
      </span>
    );
  }
  if (line.startsWith('cp ')) {
    return (
      <span>
        <span className="font-bold text-violet-400">cp</span>{' '}
        <span className="font-medium text-zinc-300">
          {line.replace('cp ', '')}
        </span>
      </span>
    );
  }
  if (line.startsWith('npm run ')) {
    return (
      <span>
        <span className="font-bold text-violet-400">npm</span>{' '}
        <span className="font-bold text-violet-400">run</span>{' '}
        <span className="font-bold text-emerald-400">
          {line.replace('npm run ', '')}
        </span>
      </span>
    );
  }
  return <span className="font-medium text-zinc-300">{line}</span>;
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
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:pb-24">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card/60 p-6 shadow-xl backdrop-blur-sm sm:p-10 md:p-12">
        <div
          className="pointer-events-none absolute -top-20 -right-20 size-80 rounded-full bg-primary/5 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-20 size-80 rounded-full bg-primary/5 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 grid gap-10 lg:grid-cols-5 lg:items-center">
          <div className="min-w-0 space-y-5 lg:col-span-2">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              <span className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
                Get started in minutes
              </span>
            </h2>
            <p className="text-base leading-relaxed text-foreground/75 sm:text-lg">
              Clone the repository, copy the local environment configurations,
              install dependencies, and launch your developer server instantly.
              Ready to deploy to Vercel when you are.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
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
                  <span className="text-foreground/60">{githubStars}</span>
                ) : null}
              </a>
            </div>
          </div>

          <div className="relative h-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl backdrop-blur-md lg:col-span-3">
            <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/50 px-5 py-3.5">
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center gap-1.5 select-none"
                  aria-hidden="true"
                >
                  <span className="h-3 w-3 rounded-full bg-red-500/60" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
                  <span className="h-3 w-3 rounded-full bg-green-500/60" />
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 shrink-0 gap-1.5 px-3 font-mono text-xs text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <Check className="size-3.5 text-success" />
                    <span className="font-semibold text-success">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    Copy
                  </>
                )}
              </Button>
            </div>

            <div className="bg-zinc-950">
              <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed sm:text-sm">
                <code className="grid gap-2">
                  {installLines.map((line) => (
                    <span key={line} className="flex min-w-0 gap-3">
                      <span
                        className="shrink-0 font-mono font-bold text-zinc-600 select-none"
                        aria-hidden="true"
                      >
                        $
                      </span>
                      <span className="min-w-0 break-all">
                        {syntaxHighlightedLine(line)}
                      </span>
                    </span>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
