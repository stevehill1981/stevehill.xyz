interface GitHubRepo {
  name: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  language: string;
  description: string;
}

export interface GitHubStats {
  stars: number;
  forks: number;
  watchers: number;
  issues: number;
  language: string;
}

/**
 * Extract owner and repo from a GitHub URL
 * Supports both repo URLs and org URLs
 */
function parseGitHubUrl(url: string): { owner: string; repo: string | null } {
  const match = url.match(/github\.com\/([^\/]+)(?:\/([^\/]+))?/);
  if (!match) {
    throw new Error(`Invalid GitHub URL: ${url}`);
  }
  return {
    owner: match[1],
    repo: match[2] || null,
  };
}

/**
 * Fetch GitHub repository statistics
 * Returns null if the URL is an organization page or if the API fails
 */
export async function getGitHubStats(githubUrl: string): Promise<GitHubStats | null> {
  try {
    const { owner, repo } = parseGitHubUrl(githubUrl);

    // If it's just an org URL (no repo), return null
    if (!repo) {
      return null;
    }

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // Add GitHub token if available for higher rate limits
        ...(process.env.GITHUB_TOKEN ? {
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        } : {})
      }
    });

    if (!response.ok) {
      console.warn(`Failed to fetch GitHub stats for ${owner}/${repo}: ${response.status}`);
      return null;
    }

    const data: GitHubRepo = await response.json();

    return {
      stars: data.stargazers_count,
      forks: data.forks_count,
      watchers: data.watchers_count,
      issues: data.open_issues_count,
      language: data.language,
    };
  } catch (error) {
    console.warn(`Error fetching GitHub stats for ${githubUrl}:`, error);
    return null;
  }
}
