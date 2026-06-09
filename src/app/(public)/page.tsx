import HeroSection from '@/components/shared/hero-section';
import { HomeGetStartedSection } from '@/components/shared/home-sections';
import type { Locale } from '@/features/site/config';
import { getGitHubStars } from '@/features/site/github';
import { getLocale } from 'next-intl/server';

const HomePage = async () => {
  const [locale, githubStars] = await Promise.all([
    getLocale(),
    getGitHubStars(),
  ]);

  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      <HeroSection locale={locale as Locale} githubStars={githubStars} />
      <HomeGetStartedSection githubStars={githubStars} />
    </div>
  );
};

export default HomePage;
