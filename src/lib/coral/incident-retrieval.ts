import incidentData from "@/data/logs/incident.json";
import type { IncidentFilter, LocalIncident } from "@/types/investigation";

export const INCIDENT_SOURCE_PATH = "src/data/logs/incident.json";

type IncidentRetrievalResult = {
  incidents: LocalIncident[];
  sourcePath: string;
};

const localIncidents: LocalIncident[] = incidentData;

export class CoralIncidentRetrieval {
  async getLocalIncidents(filter?: IncidentFilter): Promise<IncidentRetrievalResult> {
    return {
      incidents: filterIncidents(localIncidents, filter),
      sourcePath: INCIDENT_SOURCE_PATH,
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
