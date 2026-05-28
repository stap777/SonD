import type { GitHubClientOptions } from "./github-types";

export class GitHubClient {
  private readonly baseUrl: string;
  private readonly token: string;

  constructor(options: GitHubClientOptions = {}) {
    this.baseUrl = options.baseUrl ?? "https://api.github.com";
    this.token = options.token ?? process.env.GITHUB_TOKEN ?? "";

    if (!this.token) {
      throw new Error("Missing GitHub token. Set GITHUB_TOKEN in the environment.");
    }
  }

  async get<T>(path: string, query?: Record<string, string | number | undefined>): Promise<T> {
    const url = new URL(`${this.baseUrl}${path}`);

    Object.entries(query ?? {}).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });

    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${this.token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    if (!response.ok) {
      throw new Error(await this.formatError(response));
    }

    return response.json() as Promise<T>;
  }

  private async formatError(response: Response): Promise<string> {
    let message = response.statusText;

    try {
      const body = (await response.json()) as { message?: string };
      message = body.message ?? message;
    } catch {
      // GitHub error responses are usually JSON, but keep the original status text otherwise.
    }

    return `GitHub API request failed (${response.status}): ${message}`;
  }
}
