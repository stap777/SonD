export interface AIAnalysis {
  summary: string;
  probableRootCause: string;
  evidence: string[];
  recommendations: string[];
  confidence: number;
}
