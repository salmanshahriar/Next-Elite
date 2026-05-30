import HeroSection from '@/components/shared/hero-section';
import { HomeGetStartedSection } from '@/components/shared/home-sections';
import type { Locale } from '@/features/site/config';
import { getLocale } from 'next-intl/server';

const HomePage = async () => {
  const locale = (await getLocale()) as Locale;
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      <HeroSection locale={locale} />
      <HomeGetStartedSection />
    </div>
  );
};

export default HomePage;
