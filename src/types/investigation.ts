import type { GitHubCommit, GitHubRepository } from "@/lib/github/github-types";

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
      type: "github";
      total: number;
      perPage: number;
    };
  };
  incidents: LocalIncident[];
  commits: GitHubCommit[];
  correlations: IncidentCommitCorrelation[];
  aiAnalysis: null;
};
