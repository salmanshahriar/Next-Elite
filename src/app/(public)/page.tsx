import { getGithubStars } from '@/_demo(DELETE)/lib/github-stars';
import { LandingFeaturesSection } from '@/_demo(DELETE)/pages/landing-features-section';
import { LandingPage } from '@/_demo(DELETE)/pages/landing-page';

const HomePage = async () => {
  const githubStars = await getGithubStars();
  return (
    <LandingPage
      githubStars={githubStars}
      features={<LandingFeaturesSection />}
    />
  );
};

export default HomePage;
