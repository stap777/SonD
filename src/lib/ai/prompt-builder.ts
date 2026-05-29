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

    return `You are Sond's AI Reasoning engine. Your task is to investigate an incident and find the probable root cause, supporting evidence, and recommendations.

You are given the following InvestigationContext representing the system state retrieved from the database (via Coral):

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

=== INSTRUCTIONS ===
1. Analyze the incidents and correlate them with the retrieved commits, pull requests, statuses, and check suites.
2. Identify the most probable root cause (e.g., a specific commit that introduced a failure, a failing status/check suite, or mismatched deployment).
3. Gather supporting evidence (e.g., pointing out specific commit SHAs, author names, pull requests, status messages, or check suite failures).
4. Provide actionable recommendations on how to resolve the incident.
5. Provide a confidence score between 0.0 and 1.0.

Provide the response in the requested structured JSON format.`;
  }
}
