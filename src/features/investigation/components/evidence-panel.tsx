"use client";

import React from "react";
import { GitPullRequest } from "lucide-react";
import { EvidenceData } from "../data/mock-data";
import { EvidenceItem } from "./evidence-item";
import { ReportSection } from "@/components/design-system/report-container";

interface EvidencePanelProps {
  evidence: EvidenceData[];
}

export function EvidencePanel({ evidence }: EvidencePanelProps) {
  return (
    <ReportSection 
      title="04 // Correlated Evidence Artifacts"
      badge={
        <div className="flex items-center gap-1.5 text-brand-blue">
          <GitPullRequest className="w-3.5 h-3.5" />
          <span className="font-mono text-[9px] font-bold uppercase tracking-wider">Verified Logs</span>
        </div>
      }
    >
      {/* Columns Grid with standardized grid gaps: 24px (gap-6) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {evidence.map((item) => (
          <EvidenceItem key={item.id} item={item} />
        ))}
      </div>
    </ReportSection>
  );
}
