import incidentData from "@/data/logs/incident.json";
import { GitHubService } from "@/lib/github/github-service";
import type { GitHubCommit } from "@/lib/github/github-types";
import type {
  CreateInvestigationContextOptions,
  IncidentCommitCorrelation,
  IncidentFilter,
  InvestigationContext,
  LocalIncident,
} from "@/types/investigation";

const DEFAULT_COMMIT_LIMIT = 20;
const INCIDENT_SOURCE_PATH = "src/data/logs/incident.json";

type CommitRetriever = Pick<GitHubService, "getRecentCommits">;

const localIncidents: LocalIncident[] = incidentData;

export class InvestigationService {
  constructor(private readonly githubService: CommitRetriever = new GitHubService()) {}

  async createInvestigationContext(
    options: CreateInvestigationContextOptions,
  ): Promise<InvestigationContext> {
    const perPage = options.perPage ?? DEFAULT_COMMIT_LIMIT;
    const incidents = filterIncidents(localIncidents, options.incidentFilter);
    const commits = await this.githubService.getRecentCommits({
      owner: options.owner,
      repo: options.repo,
      branch: options.branch,
      perPage,
    });

    return {
      generatedAt: new Date().toISOString(),
      query: options.query ?? null,
      repository: {
        owner: options.owner,
        repo: options.repo,
        branch: options.branch ?? null,
      },
      sources: {
        incidents: {
          type: "local-json",
          path: INCIDENT_SOURCE_PATH,
          total: incidents.length,
          filters: options.incidentFilter ?? null,
        },
        commits: {
          type: "github",
          total: commits.length,
          perPage,
        },
      },
      incidents,
      commits,
      correlations: correlateIncidentsWithCommits(incidents, commits),
      aiAnalysis: null,
    };
  }
}

export function filterIncidents(
  incidents: LocalIncident[],
  filter?: IncidentFilter,
): LocalIncident[] {
  if (!filter) {
    return incidents;
  }

  return incidents.filter((incident) => {
    const serviceMatches = filter.service === undefined || incident.service === filter.service;
    const statusMatches = filter.status === undefined || incident.status === filter.status;

    return serviceMatches && statusMatches;
  });
}

export function correlateIncidentsWithCommits(
  incidents: LocalIncident[],
  commits: GitHubCommit[],
): IncidentCommitCorrelation[] {
  return incidents.map((incident) => {
    const shaMatches = commits.filter((commit) => commit.sha.startsWith(incident.commit));

    if (shaMatches.length > 0) {
      return {
        incident,
        commits: shaMatches,
        matchType: "sha",
      };
    }

    const messageMatches = commits.filter((commit) =>
      commit.message.toLowerCase().includes(incident.commit.toLowerCase()),
    );

    return {
      incident,
      commits: messageMatches,
      matchType: messageMatches.length > 0 ? "message" : "none",
    };
  });
}
