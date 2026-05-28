import { CoralIncidentRetrieval } from "@/lib/coral/incident-retrieval";
import { GitHubService } from "@/lib/github/github-service";
import type { GitHubCommit } from "@/lib/github/github-types";
import type {
  CreateInvestigationContextOptions,
  IncidentCommitCorrelation,
  InvestigationContext,
  LocalIncident,
} from "@/types/investigation";

export { filterIncidents } from "@/lib/coral/incident-retrieval";

const DEFAULT_COMMIT_LIMIT = 20;

type CommitRetriever = Pick<GitHubService, "getRecentCommits">;
type IncidentRetriever = Pick<CoralIncidentRetrieval, "getLocalIncidents">;

export class InvestigationService {
  constructor(
    private readonly githubService: CommitRetriever = new GitHubService(),
    private readonly coralRetrieval: IncidentRetriever = new CoralIncidentRetrieval(),
  ) {}

  async createInvestigationContext(
    options: CreateInvestigationContextOptions,
  ): Promise<InvestigationContext> {
    const perPage = options.perPage ?? DEFAULT_COMMIT_LIMIT;
    const [incidentRetrieval, commits] = await Promise.all([
      this.coralRetrieval.getLocalIncidents(options.incidentFilter),
      this.githubService.getRecentCommits({
        owner: options.owner,
        repo: options.repo,
        branch: options.branch,
        perPage,
      }),
    ]);

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
          path: incidentRetrieval.sourcePath,
          total: incidentRetrieval.incidents.length,
          filters: options.incidentFilter ?? null,
        },
        commits: {
          type: "github",
          total: commits.length,
          perPage,
        },
      },
      incidents: incidentRetrieval.incidents,
      commits,
      correlations: correlateIncidentsWithCommits(incidentRetrieval.incidents, commits),
      aiAnalysis: null,
    };
  }
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
