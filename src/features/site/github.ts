export const githubRepoUrl = 'https://github.com/salmanshahriar/Next-Elite';

export const vercelDeployUrl =
  'https://vercel.com/new/clone?repository-url=https://github.com/salmanshahriar/Next-Elite';

const githubRepoApi = 'https://api.github.com/repos/salmanshahriar/Next-Elite';

export function formatGitHubStars(count: number) {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  }

  return String(count);
}

export async function getGitHubStars() {
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
