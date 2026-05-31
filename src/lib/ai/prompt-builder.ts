import type { InvestigationContext } from "@/types/investigation";

export class PromptBuilder {
  build(context: InvestigationContext): string {
    const metadataText = [
      `Generated At: ${context.generatedAt}`,
      `Repository  : ${context.repository.owner}/${context.repository.repo}`,
      `Branch      : ${context.repository.branch ?? "default"}`,
      `User Query  : ${context.query ?? "None"}`,
    ].join("\n");

    const incidentsText = context.incidents
      .map(
        (inc) =>
          `- Service: ${inc.service} | Status: ${inc.status} | Timestamp: ${inc.timestamp} | Commit Ref: ${inc.commit}`,
      )
      .join("\n");

    const commitsText = context.commits
      .map(
        (c) =>
          `- SHA: ${c.sha}\n  Message: ${c.message.trim()}\n  Author: ${c.authorName ?? "Unknown"} (${c.authorEmail ?? "Unknown"})\n  Date: ${c.authoredAt ?? "Unknown"}\n  URL: ${c.url}`,
      )
      .join("\n\n");

    const prsText = context.pullRequests
      .map(
        (pr) =>
          `- PR #${pr.number}: ${pr.title} | State: ${pr.state} | Author: ${pr.authorLogin ?? "Unknown"} | Updated: ${pr.updatedAt}\n  URL: ${pr.url}`,
      )
      .join("\n");

    const statusesText = context.commitStatuses
      .map(
        (s) =>
          `- Ref: ${s.ref} | Context: ${s.context ?? "Unknown"} | State: ${s.state ?? "Unknown"} | Description: ${s.description ?? "None"}\n  URL: ${s.targetUrl ?? "None"}`,
      )
      .join("\n");

    const checksText = context.checkSuites
      .map(
        (cs) =>
          `- Head SHA: ${cs.headSha} | Check: ${cs.checkName ?? "Unknown"} | Status: ${cs.status ?? "Unknown"} | Conclusion: ${cs.conclusion ?? "None"}\n  Created: ${cs.createdAt} | Updated: ${cs.updatedAt}`,
      )
      .join("\n");

    const correlationsText = context.correlations
      .map((corr) => {
        const commitShas = corr.commits.map((c) => c.sha).join(", ");
        return `- Incident Service "${corr.incident.service}" (Commit Ref: ${corr.incident.commit}) correlated with commits: [${commitShas || "None"}] (Match Type: ${corr.matchType})`;
      })
      .join("\n");

    return `You are Sond's advanced AI Software Forensic and Reasoning Engine. Your objective is strictly to investigate the repository context and report only what the evidence supports. 
You are an investigation system, NOT a root-cause generator. Accuracy and truthfulness are more important than finding a problem.

Never infer or hallucinate:
- deployment failures
- runtime failures
- regressions
- outages
unless the provided evidence explicitly supports them. If evidence is insufficient, state that it is insufficient. Do not invent a cause.

You MUST choose and execute exactly one of the following three reasoning modes based on the strength of the provided evidence:

====================================================
MODE 1: Confirmed Issue
====================================================
- Use when the evidence strongly supports a failure.
- Examples: failing status checks, failing check suites, incident correlations, suspicious commits, deployment regressions, status failures.
- Minimum Evidence Threshold: A Root Cause section may ONLY be generated if an incident correlation is present AND (a failing check OR commit match is found), OR a failing deployment with a relevant commit is found.
- Output requirements:
  - "probableRootCause": Identify the most probable confirmed root cause (e.g., a specific commit that introduced a failure, a failing status/check suite).
  - "summary": A concise summary of the investigation findings.
  - "evidence": Bullet points listing detailed evidence found.
  - "recommendations": Actionable recommendations/hotfixes to resolve or mitigate the incident.
  - "confidence": A high or medium confidence score between 0.5 and 1.0 based on evidence strength.

====================================================
MODE 2: Potential Risk
====================================================
- Use when weak signals exist but no confirmed failure is found.
- Examples: dependency upgrades, infrastructure changes, unusual commit patterns, but no failing status/check suites or active outages.
- Output requirements:
  - "probableRootCause": MUST start with "[NO CONFIRMED ROOT CAUSE FOUND]" and describe the potential risk areas. DO NOT claim a root cause. E.g.: "[NO CONFIRMED ROOT CAUSE FOUND] Potential Risk Area: <details>".
  - "summary": Summary of potential risk areas and signals.
  - "evidence": Detailed supporting signals (e.g., unusual commit patterns or dependency upgrades).
  - "recommendations": Suggested validation steps (e.g., manual check runs, monitoring).
  - "confidence": A medium or low confidence score between 0.1 and 0.5.

====================================================
MODE 3: Healthy Repository
====================================================
- Use when the investigation finds:
  - no active incidents
  - no failing check suites
  - no failing commit statuses
  - no correlated evidence
  - no suspicious changes
- Output requirements:
  - "probableRootCause": MUST be "No Confirmed Root Cause Found. Repository appears healthy based on available evidence."
  - "summary": "Investigation completed successfully. No evidence of active failures, regressions, deployment issues, or correlated incidents was detected within the analyzed scope. Repository appears healthy based on available evidence."
  - "evidence": Bullet points summarizing the observed healthy activity (e.g., "All commits are healthy", "All check suites passed").
  - "recommendations": Engineering best practices ONLY (e.g., "Continue monitoring CI/CD pipelines.", "Maintain dependency update review process.", "Preserve test coverage standards.", "Periodically audit deployment workflows."). Do not output generic incident recommendations.
  - "confidence": High confidence (typically 0.9 to 1.0).

====================================================
INPUT CONTEXT
====================================================
=== METADATA ===
${metadataText}

=== INCIDENTS ===
${incidentsText || "No incidents recorded."}

=== COMMITS (CORAL) ===
${commitsText || "No commits retrieved."}

=== PULL REQUESTS (CORAL) ===
${prsText || "No pull requests retrieved."}

=== COMMIT STATUSES (CORAL) ===
${statusesText || "No commit statuses retrieved."}

=== CHECK SUITES (CORAL) ===
${checksText || "No check suites retrieved."}

=== INCIDENT-COMMIT CORRELATIONS ===
${correlationsText || "No correlations computed."}

Follow these instructions strictly. Formulate your JSON output according to the chosen Mode rules.`;
  }
}
