import type { GitHubCommit, GitHubPullRequest } from "@/lib/github/github-types";
import { CoralClient } from "./coral-client";
import type {
  CoralCheckSuite,
  CoralCommitStatus,
  CoralGitHubEvidence,
  CoralGitHubRetrievalOptions,
  CoralQueryClient,
} from "./coral-types";

type CoralCommitRow = {
  sha: string;
  commit__message: string;
  commit__author__name: string | null;
  commit__author__email: string | null;
  commit__author__date: string | null;
  html_url: string;
};

type CoralPullRequestRow = {
  number: number;
  title: string;
  state: "open" | "closed";
  user__login: string | null;
  created_at: string;
  updated_at: string;
  html_url: string;
};

type CoralCommitStatusRow = {
  ref: string;
  context: string | null;
  state: string | null;
  description: string | null;
  target_url: string | null;
  created_at: string | null;
  updated_at: string | null;
};

type CoralCheckSuiteRow = {
  head_sha: string;
  status: string | null;
  conclusion: string | null;
  check_name: string | null;
  created_at: string | null;
  updated_at: string | null;
};

const DEFAULT_LIMIT = 20;

export class CoralGitHubRetrieval {
  constructor(private readonly client: CoralQueryClient = new CoralClient()) {}

  async getRepositoryEvidence(
    options: CoralGitHubRetrievalOptions,
  ): Promise<CoralGitHubEvidence> {
    const t0 = performance.now();

    let tCommitsStart = 0;
    let tCommitsEnd = 0;
    let tPRsStart = 0;
    let tPRsEnd = 0;

    const [commits, pullRequests] = await Promise.all([
      (async () => {
        tCommitsStart = performance.now();
        const res = await this.getRecentCommits(options);
        tCommitsEnd = performance.now();
        return res;
      })(),
      (async () => {
        tPRsStart = performance.now();
        const res = await this.getPullRequests(options);
        tPRsEnd = performance.now();
        return res;
      })(),
    ]);

    console.log(`[DIAGNOSTIC] Commits retrieval: ${(tCommitsEnd - tCommitsStart).toFixed(2)}ms`);
    console.log(`[DIAGNOSTIC] Pull Requests retrieval: ${(tPRsEnd - tPRsStart).toFixed(2)}ms`);

    const refs = commits.map((commit) => commit.sha);

    let tStatusesStart = 0;
    let tStatusesEnd = 0;
    let tChecksStart = 0;
    let tChecksEnd = 0;

    const [commitStatuses, checkSuites] = await Promise.all([
      (async () => {
        try {
          tStatusesStart = performance.now();
          const res = await this.getCommitStatuses({ ...options, refs });
          tStatusesEnd = performance.now();
          return res;
        } catch (error) {
          console.warn("[WARNING] Commit statuses retrieval failed. Continuing without statuses:", error instanceof Error ? error.message : String(error));
          tStatusesEnd = performance.now();
          return [];
        }
      })(),
      (async () => {
        try {
          tChecksStart = performance.now();
          const res = await this.getCommitCheckSuites({ ...options, refs });
          tChecksEnd = performance.now();
          return res;
        } catch (error) {
          console.warn("[WARNING] Check suites retrieval failed. Continuing without check suites:", error instanceof Error ? error.message : String(error));
          tChecksEnd = performance.now();
          return [];
        }
      })(),
    ]);

    console.log(`[DIAGNOSTIC] Statuses retrieval: ${(tStatusesEnd - tStatusesStart).toFixed(2)}ms`);
    console.log(`[DIAGNOSTIC] Check Suites retrieval: ${(tChecksEnd - tChecksStart).toFixed(2)}ms`);

    const totalTime = performance.now() - t0;
    console.log(`[DIAGNOSTIC] Total Coral evidence retrieval: ${totalTime.toFixed(2)}ms`);

    return {
      commits,
      pullRequests,
      commitStatuses,
      checkSuites,
    };
  }

  async getRecentCommits(options: CoralGitHubRetrievalOptions): Promise<GitHubCommit[]> {
    const rows = await this.client.query<CoralCommitRow>(`
      SELECT
        sha,
        commit__message,
        commit__author__name,
        commit__author__email,
        commit__author__date,
        html_url
      FROM github.commits
      WHERE owner = ${sqlString(options.owner)}
        AND repo = ${sqlString(options.repo)}
        ${options.branch ? `AND ref = ${sqlString(options.branch)}` : ""}
      LIMIT ${sqlLimit(options.perPage)}
    `);

    return rows.map((row) => ({
      sha: row.sha,
      message: row.commit__message,
      authorName: row.commit__author__name,
      authorEmail: row.commit__author__email,
      authoredAt: row.commit__author__date,
      url: row.html_url,
    }));
  }

  async getPullRequests(options: CoralGitHubRetrievalOptions): Promise<GitHubPullRequest[]> {
    const rows = await this.client.query<CoralPullRequestRow>(`
      SELECT
        number,
        title,
        state,
        user__login,
        created_at,
        updated_at,
        html_url
      FROM github.pulls
      WHERE owner = ${sqlString(options.owner)}
        AND repo = ${sqlString(options.repo)}
      LIMIT ${sqlLimit(options.perPage)}
    `);

    return rows.map((row) => ({
      number: row.number,
      title: row.title,
      state: row.state,
      authorLogin: row.user__login,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      url: row.html_url,
    }));
  }

  async getCommitStatuses(
    options: CoralGitHubRetrievalOptions & { refs: string[] },
  ): Promise<CoralCommitStatus[]> {
    const rows = await queryByRef<CoralCommitStatusRow>(
      this.client,
      options,
      (ref) => `
        SELECT
          ref,
          context,
          state,
          description,
          target_url,
          created_at,
          updated_at
        FROM github.repo_commit_statuses
        WHERE owner = ${sqlString(options.owner)}
          AND repo = ${sqlString(options.repo)}
          AND ref = ${sqlString(ref)}
        LIMIT 20
      `,
    );

    return rows.map((row) => ({
      ref: row.ref,
      context: row.context,
      state: row.state,
      description: row.description,
      targetUrl: row.target_url,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  }

  async getCommitCheckSuites(
    options: CoralGitHubRetrievalOptions & { refs: string[] },
  ): Promise<CoralCheckSuite[]> {
    const rows = await queryByRef<CoralCheckSuiteRow>(
      this.client,
      options,
      (ref) => `
        SELECT
          head_sha,
          status,
          conclusion,
          check_name,
          created_at,
          updated_at
        FROM github.repo_commit_check_suites
        WHERE owner = ${sqlString(options.owner)}
          AND repo = ${sqlString(options.repo)}
          AND ref = ${sqlString(ref)}
        LIMIT 20
      `,
    );

    return rows.map((row) => ({
      headSha: row.head_sha,
      status: row.status,
      conclusion: row.conclusion,
      checkName: row.check_name,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  }
}

async function queryByRef<T extends object>(
  client: CoralQueryClient,
  options: CoralGitHubRetrievalOptions & { refs: string[] },
  buildSql: (ref: string) => string,
): Promise<T[]> {
  const refLimit = sqlLimit(options.perPage);
  const rowSets = await Promise.all(
    options.refs.slice(0, refLimit).map((ref) => client.query<T>(buildSql(ref))),
  );

  return rowSets.flat();
}

function sqlString(value: string): string {
  return `'${value.replaceAll("'", "''")}'`;
}

function sqlLimit(value: number | undefined): number {
  return Math.max(1, Math.min(value ?? DEFAULT_LIMIT, 100));
}
