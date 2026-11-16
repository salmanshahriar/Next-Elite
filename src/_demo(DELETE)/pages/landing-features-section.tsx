import { HOME_FEATURES } from '@/_demo(DELETE)/pages/landing-features';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { getTranslations } from 'next-intl/server';

export async function LandingFeaturesSection() {
  const t = await getTranslations('home.features');

  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 px-4">
      <h2 className="text-center text-2xl font-extrabold tracking-tight">
        {t('title')}
      </h2>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {HOME_FEATURES.map(({ id, icon: Icon, tech }) => (
          <li key={id} className="flex">
            <Card variant="glow" className="flex-1 gap-4 p-6">
              <div className="flex size-12 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary">
                <Icon className="size-6" aria-hidden />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-bold tracking-tight">
                  {t(`${id}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(`${id}.description`)}
                </p>
              </div>
              <ul className="mt-auto flex flex-wrap gap-1.5">
                {tech.map((name) => (
                  <li key={name}>
                    <Badge
                      variant="outline"
                      className="font-normal text-muted-foreground"
                    >
                      {name}
                    </Badge>
                  </li>
                ))}
              </ul>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
