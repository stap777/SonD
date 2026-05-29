import type { GitHubCommit, GitHubPullRequest, GitHubRepository } from "@/lib/github/github-types";

export type CoralClientOptions = {
  command?: string;
};

export type CoralQueryClient = {
  query<T extends object>(sql: string): Promise<T[]>;
};

export type CoralGitHubRetrievalOptions = GitHubRepository & {
  branch?: string;
  perPage?: number;
};

export type CoralCommitStatus = {
  ref: string;
  context: string | null;
  state: string | null;
  description: string | null;
  targetUrl: string | null;
  createdAt: string | null;
  updatedAt: string | null;
};

export type CoralCheckSuite = {
  headSha: string;
  status: string | null;
  conclusion: string | null;
  checkName: string | null;
  createdAt: string | null;
  updatedAt: string | null;
};

export type CoralGitHubEvidence = {
  commits: GitHubCommit[];
  pullRequests: GitHubPullRequest[];
  commitStatuses: CoralCommitStatus[];
  checkSuites: CoralCheckSuite[];
};
