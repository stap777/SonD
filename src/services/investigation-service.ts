import { CoralIncidentRetrieval } from "@/lib/coral/incident-retrieval";
import { CoralGitHubRetrieval } from "@/lib/coral/coral-github";
import type { GitHubCommit } from "@/lib/github/github-types";
import type {
  CreateInvestigationContextOptions,
  IncidentCommitCorrelation,
  InvestigationContext,
  LocalIncident,
} from "@/types/investigation";
import { AnalysisService } from "@/lib/ai/analysis-service";
import type { AIAnalysis } from "@/lib/ai/ai-types";

export { filterIncidents } from "@/lib/coral/incident-retrieval";

const DEFAULT_COMMIT_LIMIT = 20;

type GitHubEvidenceRetriever = Pick<CoralGitHubRetrieval, "getRepositoryEvidence">;
type IncidentRetriever = Pick<CoralIncidentRetrieval, "getLocalIncidents">;

export class InvestigationService {
  constructor(
    private readonly githubRetrieval: GitHubEvidenceRetriever = new CoralGitHubRetrieval(),
    private readonly coralRetrieval: IncidentRetriever = new CoralIncidentRetrieval(),
    private readonly analysisService: AnalysisService = new AnalysisService(),
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

    const contextWithoutAnalysis: Omit<InvestigationContext, "aiAnalysis"> = {
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
    };

    let aiAnalysis: AIAnalysis | null = null;
    try {
      aiAnalysis = await this.analysisService.analyze(contextWithoutAnalysis);
    } catch (error) {
      console.warn("AI Analysis failed gracefully:", error instanceof Error ? error.message : String(error));
    }

    return {
      ...contextWithoutAnalysis,
      aiAnalysis,
    };
  }
}

export function correlateIncidentsWithCommits(
  incidents: LocalIncident[],
  commits: GitHubCommit[],
): IncidentCommitCorrelation[] {
  if (!incidents) return [];
  const safeCommits = (commits || []).filter(
    (commit) => commit && typeof commit.sha === "string" && typeof commit.message === "string"
  );

  return incidents.map((incident) => {
    if (!incident || !incident.commit) {
      return {
        incident,
        commits: [],
        matchType: "none" as const,
      };
    }

    const shaMatches = safeCommits.filter((commit) => {
      if (!commit.sha) return false;
      return commit.sha.toLowerCase().startsWith(incident.commit.toLowerCase());
    });

    if (shaMatches.length > 0) {
      return {
        incident,
        commits: shaMatches,
        matchType: "sha" as const,
      };
    }

    const messageMatches = safeCommits.filter((commit) => {
      if (!commit.message) return false;
      return commit.message.toLowerCase().includes(incident.commit.toLowerCase());
    });

    return {
      incident,
      commits: messageMatches,
      matchType: messageMatches.length > 0 ? "message" : ("none" as const),
    };
  });
}
