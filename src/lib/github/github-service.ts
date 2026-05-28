import { GitHubClient } from "./github-client";
import type {
  GetChangedFilesOptions,
  GetPullRequestsOptions,
  GetRecentCommitsOptions,
  GitHubChangedFile,
  GitHubCommit,
  GitHubPullRequest,
} from "./github-types";

type GitHubCommitResponse = {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: {
      name: string | null;
      email: string | null;
      date: string | null;
    } | null;
  };
};

type GitHubPullRequestResponse = {
  number: number;
  title: string;
  state: "open" | "closed";
  html_url: string;
  user: {
    login: string;
  } | null;
  created_at: string;
  updated_at: string;
};

type GitHubChangedFileResponse = {
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  changes: number;
  patch?: string;
};

export class GitHubService {
  constructor(private readonly client = new GitHubClient()) {}

  async getRecentCommits(options: GetRecentCommitsOptions): Promise<GitHubCommit[]> {
    const commits = await this.client.get<GitHubCommitResponse[]>(
      `/repos/${options.owner}/${options.repo}/commits`,
      {
        per_page: options.perPage ?? 10,
        sha: options.branch,
      },
    );

    return commits.map((commit) => ({
      sha: commit.sha,
      message: commit.commit.message,
      authorName: commit.commit.author?.name ?? null,
      authorEmail: commit.commit.author?.email ?? null,
      authoredAt: commit.commit.author?.date ?? null,
      url: commit.html_url,
    }));
  }

  async getPullRequests(options: GetPullRequestsOptions): Promise<GitHubPullRequest[]> {
    const pullRequests = await this.client.get<GitHubPullRequestResponse[]>(
      `/repos/${options.owner}/${options.repo}/pulls`,
      {
        per_page: options.perPage ?? 10,
        state: options.state ?? "open",
      },
    );

    return pullRequests.map((pullRequest) => ({
      number: pullRequest.number,
      title: pullRequest.title,
      state: pullRequest.state,
      authorLogin: pullRequest.user?.login ?? null,
      createdAt: pullRequest.created_at,
      updatedAt: pullRequest.updated_at,
      url: pullRequest.html_url,
    }));
  }

  async getChangedFiles(options: GetChangedFilesOptions): Promise<GitHubChangedFile[]> {
    const files = await this.client.get<GitHubChangedFileResponse[]>(
      `/repos/${options.owner}/${options.repo}/pulls/${options.pullNumber}/files`,
      {
        per_page: options.perPage ?? 100,
      },
    );

    return files.map((file) => ({
      filename: file.filename,
      status: file.status,
      additions: file.additions,
      deletions: file.deletions,
      changes: file.changes,
      patch: file.patch,
    }));
  }
}
