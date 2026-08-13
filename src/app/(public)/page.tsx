import { LandingPage } from '@/components/pages/landing-page';
import type { Locale } from '@/features/site/config';
import { getGitHubStars } from '@/features/site/github';
import { getLocale } from 'next-intl/server';

const HomePage = async () => {
  const [locale, githubStars] = await Promise.all([
    getLocale(),
    getGitHubStars(),
  ]);

  return <LandingPage locale={locale as Locale} githubStars={githubStars} />;
};

export default HomePage;
