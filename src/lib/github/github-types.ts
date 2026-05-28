export type GitHubRepository = {
  owner: string;
  repo: string;
};

export type GitHubCommit = {
  sha: string;
  message: string;
  authorName: string | null;
  authorEmail: string | null;
  authoredAt: string | null;
  url: string;
};

export type GitHubPullRequest = {
  number: number;
  title: string;
  state: "open" | "closed";
  authorLogin: string | null;
  createdAt: string;
  updatedAt: string;
  url: string;
};

export type GitHubChangedFile = {
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  changes: number;
  patch?: string;
};

export type GitHubPullRequestState = "open" | "closed" | "all";

export type GitHubClientOptions = {
  token?: string;
  baseUrl?: string;
};

export type GetRecentCommitsOptions = GitHubRepository & {
  branch?: string;
  perPage?: number;
};

export type GetPullRequestsOptions = GitHubRepository & {
  state?: GitHubPullRequestState;
  perPage?: number;
};

export type GetChangedFilesOptions = GitHubRepository & {
  pullNumber: number;
  perPage?: number;
};
