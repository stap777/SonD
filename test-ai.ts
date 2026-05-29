import dotenv from "dotenv";
import path from "node:path";
import fs from "node:fs";
import { InvestigationService } from "./src/services/investigation-service";
import { CoralGitHubRetrieval } from "./src/lib/coral/coral-github";
import assert from "node:assert/strict";

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

console.log("=== SMOKE TEST: SOND AI REASONING LAYER ===");
console.log("GEMINI_API_KEY Configured:", !!process.env.GEMINI_API_KEY);

const githubRetrieval = new CoralGitHubRetrieval();

async function main() {
  console.log("Pre-fetching dynamic commit from Coral for correlation...");
  const owner = "fastapi";
  const repo = "fastapi";
  const perPage = 10;

  const githubEvidence = await githubRetrieval.getRepositoryEvidence({
    owner,
    repo,
    perPage,
  });

  if (githubEvidence.commits.length === 0) {
    throw new Error("No commits returned from Coral for repository.");
  }

  const latestCommit = githubEvidence.commits[0];
  console.log(`✓ Dynamic commit found: ${latestCommit.sha} (${latestCommit.message.split("\n")[0]})`);

  // Construct dynamic incident linked directly to this real commit
  const dynamicIncident = {
    commit: latestCommit.sha.slice(0, 7), // short SHA matching pattern
    service: "auth-service",
    status: "failed",
    timestamp: latestCommit.authoredAt || new Date().toISOString(),
  };

  const dynamicCoralRetrieval = {
    getLocalIncidents: async () => {
      return {
        incidents: [dynamicIncident],
        sourcePath: "dynamic-demo-generator",
      };
    },
  };

  // Instantiate InvestigationService with our dynamically populated incident retriever
  const investigationService = new InvestigationService(
    githubRetrieval,
    dynamicCoralRetrieval
  );

  console.log("Generating Investigation Context via Coral...");
  const context = await investigationService.createInvestigationContext({
    owner,
    repo,
    perPage,
    query: "Manual investigation workflow smoke test",
  });

  // Verify that Coral evidence retrieval succeeded
  assert.equal(context.sources.commits.type, "coral-github");
  assert.ok(context.commits.length > 0, "Expected Coral to retrieve GitHub commits.");
  console.log("✓ Coral successfully retrieved GitHub commits.");
  console.log("✓ Coral successfully retrieved Check Suites:", context.checkSuites.length);

  console.log("\nExecuting AI Reasoning Layer Analysis...");
  const analysis = context.aiAnalysis;

  if (!analysis) {
    console.error("[ERROR] AI Analysis was returned as null!");
    process.exit(1);
  }

  console.log("\n=== AI ANALYSIS RESULT ===");
  console.log("Summary:");
  console.log("--------------------------------------------------");
  console.log(analysis.summary);
  console.log("--------------------------------------------------");

  console.log("\nProbable Root Cause:");
  console.log("--------------------------------------------------");
  console.log(analysis.probableRootCause);
  console.log("--------------------------------------------------");

  console.log("\nEvidence:");
  analysis.evidence.forEach((item, index) => {
    console.log(`${index + 1}. ${item}`);
  });

  console.log("\nRecommendations:");
  analysis.recommendations.forEach((item, index) => {
    console.log(`${index + 1}. ${item}`);
  });

  console.log("\nConfidence Score:", analysis.confidence);
  console.log("==========================================");

  // Assert correct structure
  assert.ok(typeof analysis.summary === "string" && analysis.summary.length > 0, "Summary must be a non-empty string");
  assert.ok(typeof analysis.probableRootCause === "string" && analysis.probableRootCause.length > 0, "Probable Root Cause must be a non-empty string");
  assert.ok(Array.isArray(analysis.evidence), "Evidence must be an array");
  assert.ok(Array.isArray(analysis.recommendations), "Recommendations must be an array");
  assert.ok(typeof analysis.confidence === "number" && analysis.confidence >= 0 && analysis.confidence <= 1, "Confidence must be a number between 0 and 1");

  console.log("\n✓ Smoke test verification passed successfully!");
}

main().catch((error) => {
  console.error("Smoke test failed with error:", error);
  process.exit(1);
});
