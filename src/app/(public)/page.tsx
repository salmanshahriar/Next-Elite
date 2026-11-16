import { getGithubStars } from '@/_demo(DELETE)/lib/github-stars';
import { LandingPage } from '@/_demo(DELETE)/pages/landing-page';

const HomePage = async () => {
  const githubStars = await getGithubStars();
  return <LandingPage githubStars={githubStars} />;
};

export default HomePage;
