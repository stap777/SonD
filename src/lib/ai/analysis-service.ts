import { GeminiClient } from "./gemini-client";
import { PromptBuilder } from "./prompt-builder";
import type { AIAnalysis } from "./ai-types";
import type { InvestigationContext } from "@/types/investigation";

const AI_ANALYSIS_SCHEMA = {
  type: "OBJECT",
  properties: {
    summary: {
      type: "STRING",
      description: "A concise summary of the investigation findings.",
    },
    probableRootCause: {
      type: "STRING",
      description: "The identified most probable root cause of the incident.",
    },
    evidence: {
      type: "ARRAY",
      items: {
        type: "STRING",
      },
      description: "Detailed bullet points of evidence found in commits, statuses, pull requests, and check suites.",
    },
    recommendations: {
      type: "ARRAY",
      items: {
        type: "STRING",
      },
      description: "Actionable recommendations to resolve or mitigate the incident.",
    },
    confidence: {
      type: "NUMBER",
      description: "A confidence score from 0.0 (no confidence) to 1.0 (absolute confidence) for the findings.",
    },
  },
  required: ["summary", "probableRootCause", "evidence", "recommendations", "confidence"],
};

export class AnalysisService {
  private readonly client: GeminiClient;
  private readonly builder: PromptBuilder;

  constructor(
    client: GeminiClient = new GeminiClient(),
    builder: PromptBuilder = new PromptBuilder(),
  ) {
    this.client = client;
    this.builder = builder;
  }

  async analyze(context: Omit<InvestigationContext, "aiAnalysis">): Promise<AIAnalysis> {
    const prompt = this.builder.build(context as InvestigationContext);
    const rawResponse = await this.client.generateContent(prompt, AI_ANALYSIS_SCHEMA);

    try {
      interface RawAnalysis {
        summary?: string;
        probableRootCause?: string;
        evidence?: string[];
        recommendations?: string[];
        confidence?: number;
      }
      const parsed = JSON.parse(rawResponse) as RawAnalysis;

      return {
        summary: String(parsed.summary ?? ""),
        probableRootCause: String(parsed.probableRootCause ?? ""),
        evidence: Array.isArray(parsed.evidence) ? parsed.evidence.map(String) : [],
        recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations.map(String) : [],
        confidence: typeof parsed.confidence === "number" ? parsed.confidence : 0,
      };
    } catch (error) {
      throw new Error(`Failed to parse Gemini structured JSON: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
