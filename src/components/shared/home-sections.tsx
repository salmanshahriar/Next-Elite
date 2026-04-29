import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const deployUrl =
  'https://vercel.com/new/clone?repository-url=https://github.com/salmanshahriar/Nextjs-Elite-Boilerplate';

const repoUrl = 'https://github.com/salmanshahriar/Nextjs-Elite-Boilerplate';

export const HomeGetStartedSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16">
      <Card className="shadow-sm">
        <CardContent className="grid gap-8 p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
          <div className="min-w-0">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Get started in minutes
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Clone it, run it, ship it. Or deploy to Vercel with one click.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a href={deployUrl} target="_blank" rel="noopener noreferrer">
                  Deploy Now
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                  Source code (GitHub)
                </a>
              </Button>
            </div>
          </div>

          <div className="min-w-0 rounded-xl border bg-muted/30 p-4 font-mono text-sm text-foreground sm:p-6">
            <div className="space-y-2 whitespace-pre-wrap">
              <p className="text-xs text-muted-foreground">Install & run</p>
              <p className="break-all">{`git clone ${repoUrl}
cd Nextjs-Elite-Boilerplate
npm install
cp .env.example .env
npm run dev`}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
