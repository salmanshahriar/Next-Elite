import { LandingPage } from '@/components/pages/landing-page';

const githubRepoApi = 'https://api.github.com/repos/salmanshahriar/Next-Elite';

function formatGitHubStars(count: number) {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  }

  return String(count);
}

async function getGitHubStars() {
  try {
    const response = await fetch(githubRepoApi, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as { stargazers_count?: number };

    if (typeof data.stargazers_count !== 'number') {
      return null;
    }

    return formatGitHubStars(data.stargazers_count);
  } catch {
    return null;
  }
}

const HomePage = async () => {
  const githubStars = await getGitHubStars();

  return <LandingPage githubStars={githubStars} />;
};

export default HomePage;
