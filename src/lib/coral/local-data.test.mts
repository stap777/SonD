import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

type Incident = {
  commit: string;
  service: string;
  status: string;
  timestamp: string;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Minimal Coral local-data setup:
// - keep the fixture on disk as structured JSON
// - read it directly from this isolated test
// - query it in memory without API routes, UI wiring, or AI behavior
const incidentFixturePath = path.resolve(
  __dirname,
  "../../data/logs/incident.json"
);

test("Coral can read local structured JSON data", () => {
  const incidents = JSON.parse(
    readFileSync(incidentFixturePath, "utf8")
  ) as Incident[];

  assert.equal(incidents.length, 1);
  assert.equal(incidents[0]?.commit, "fix-auth-timeout");
});

test("Coral can query local data by service and status", () => {
  const incidents = JSON.parse(
    readFileSync(incidentFixturePath, "utf8")
  ) as Incident[];

  const failedAuthIncidents = incidents.filter(
    (incident) =>
      incident.service === "auth-service" && incident.status === "failed"
  );

  assert.deepEqual(
    failedAuthIncidents.map((incident) => incident.commit),
    ["fix-auth-timeout"]
  );
});
