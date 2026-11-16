import 'server-only';

const REPO_API_URL = 'https://api.github.com/repos/salmanshahriar/Next-Elite';
const TIMEOUT_MS = 2000;

export async function getGithubStars(): Promise<string | null> {
  try {
    const response = await fetch(REPO_API_URL, {
      next: { revalidate: 3600 },
      headers: { Accept: 'application/vnd.github+json' },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) return null;
    const data = (await response.json()) as { stargazers_count?: number };
    if (typeof data.stargazers_count !== 'number') return null;
    const count = data.stargazers_count;
    return count >= 1000
      ? `${(count / 1000).toFixed(1).replace(/\.0$/, '')}K`
      : String(count);
  } catch {
    return null;
  }
}
