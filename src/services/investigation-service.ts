import { CoralIncidentRetrieval } from "@/lib/coral/incident-retrieval";
import { CoralGitHubRetrieval } from "@/lib/coral/coral-github";
import type { GitHubCommit } from "@/lib/github/github-types";
import type {
  CreateInvestigationContextOptions,
  IncidentCommitCorrelation,
  InvestigationContext,
  LocalIncident,
} from "@/types/investigation";

export { filterIncidents } from "@/lib/coral/incident-retrieval";

const DEFAULT_COMMIT_LIMIT = 20;

type GitHubEvidenceRetriever = Pick<CoralGitHubRetrieval, "getRepositoryEvidence">;
type IncidentRetriever = Pick<CoralIncidentRetrieval, "getLocalIncidents">;

export class InvestigationService {
  constructor(
    private readonly githubRetrieval: GitHubEvidenceRetriever = new CoralGitHubRetrieval(),
    private readonly coralRetrieval: IncidentRetriever = new CoralIncidentRetrieval(),
  ) {}

  async createInvestigationContext(
    options: CreateInvestigationContextOptions,
  ): Promise<InvestigationContext> {
    const perPage = options.perPage ?? DEFAULT_COMMIT_LIMIT;
    const [incidentRetrieval, githubEvidence] = await Promise.all([
      this.coralRetrieval.getLocalIncidents(options.incidentFilter),
      this.githubRetrieval.getRepositoryEvidence({
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
          type: "coral-github",
          total: githubEvidence.commits.length,
          perPage,
        },
        pullRequests: {
          type: "coral-github",
          total: githubEvidence.pullRequests.length,
        },
        commitStatuses: {
          type: "coral-github",
          total: githubEvidence.commitStatuses.length,
        },
        checkSuites: {
          type: "coral-github",
          total: githubEvidence.checkSuites.length,
        },
      },
      incidents: incidentRetrieval.incidents,
      commits: githubEvidence.commits,
      pullRequests: githubEvidence.pullRequests,
      commitStatuses: githubEvidence.commitStatuses,
      checkSuites: githubEvidence.checkSuites,
      correlations: correlateIncidentsWithCommits(incidentRetrieval.incidents, githubEvidence.commits),
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
