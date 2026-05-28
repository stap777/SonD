import { InvestigationService } from "./src/services/investigation-service";

const investigationService = new InvestigationService();

const context = await investigationService.createInvestigationContext({
  owner: "stap777",
  repo: "SonD",
  perPage: 10,
  query: "Manual investigation workflow smoke test",
});

const relatedServices = [...new Set(context.incidents.map((incident) => incident.service))];

console.log("\nInvestigation Context");
console.log("=====================");
console.log(`Generated: ${context.generatedAt}`);
console.log(`Repository: ${context.repository.owner}/${context.repository.repo}`);
console.log(`Branch: ${context.repository.branch ?? "default"}`);
console.log(`Query: ${context.query ?? "none"}`);

console.log("\nRelated Services");
console.log("----------------");
relatedServices.forEach((service) => {
  console.log(`- ${service}`);
});

console.log("\nIncidents");
console.log("---------");
context.incidents.forEach((incident) => {
  console.log(`- ${incident.service} | ${incident.status} | ${incident.timestamp}`);
  console.log(`  commit reference: ${incident.commit}`);
});

console.log("\nCommits");
console.log("-------");
context.commits.forEach((commit) => {
  console.log(`- ${commit.sha.slice(0, 7)} | ${commit.authoredAt ?? "unknown date"}`);
  console.log(`  ${commit.message.split("\n")[0]}`);
  console.log(`  author: ${commit.authorName ?? "unknown"}`);
  console.log(`  url: ${commit.url}`);
});

console.log("\nRelated Commit Matches");
console.log("----------------------");
context.correlations.forEach((correlation) => {
  console.log(
    `- ${correlation.incident.service} (${correlation.incident.commit}) match: ${correlation.matchType}`,
  );

  if (correlation.commits.length === 0) {
    console.log("  no related commits found");
    return;
  }

  correlation.commits.forEach((commit) => {
    console.log(`  - ${commit.sha.slice(0, 7)} ${commit.message.split("\n")[0]}`);
  });
});

console.log("\nAI Analysis");
console.log("-----------");
console.log(context.aiAnalysis);

console.log("\nRaw Context");
console.log("-----------");
console.dir(context, { depth: null, colors: true });
