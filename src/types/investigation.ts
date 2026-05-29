import type { CoralCheckSuite, CoralCommitStatus } from "@/lib/coral/coral-types";
import type {
  GitHubCommit,
  GitHubPullRequest,
  GitHubRepository,
} from "@/lib/github/github-types";

export type LocalIncident = {
  commit: string;
  service: string;
  status: string;
  timestamp: string;
};

export type IncidentFilter = {
  service?: string;
  status?: string;
};

export type CreateInvestigationContextOptions = GitHubRepository & {
  branch?: string;
  perPage?: number;
  query?: string;
  incidentFilter?: IncidentFilter;
};

export type CommitIncidentMatchType = "sha" | "message" | "none";

export type IncidentCommitCorrelation = {
  incident: LocalIncident;
  commits: GitHubCommit[];
  matchType: CommitIncidentMatchType;
};

export type InvestigationContext = {
  generatedAt: string;
  query: string | null;
  repository: GitHubRepository & {
    branch: string | null;
  };
  sources: {
    incidents: {
      type: "local-json";
      path: string;
      total: number;
      filters: IncidentFilter | null;
    };
    commits: {
      type: "coral-github";
      total: number;
      perPage: number;
    };
    pullRequests: {
      type: "coral-github";
      total: number;
    };
    commitStatuses: {
      type: "coral-github";
      total: number;
    };
    checkSuites: {
      type: "coral-github";
      total: number;
    };
  };
  incidents: LocalIncident[];
  commits: GitHubCommit[];
  pullRequests: GitHubPullRequest[];
  commitStatuses: CoralCommitStatus[];
  checkSuites: CoralCheckSuite[];
  correlations: IncidentCommitCorrelation[];
  aiAnalysis: null;
};
