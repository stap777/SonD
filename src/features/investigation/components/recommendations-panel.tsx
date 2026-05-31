"use client";

import React from "react";
import { CheckSquare, Sparkles } from "lucide-react";
import { RecommendationData } from "../data/mock-data";
import { RecommendationItem } from "./recommendation-item";
import { Card } from "@/components/design-system/card";
import { ReportSection } from "@/components/design-system/report-container";
import { Typography } from "@/components/design-system/typography";

interface RecommendationsPanelProps {
  recommendations: RecommendationData[];
}

export function RecommendationsPanel({ recommendations }: RecommendationsPanelProps) {
  return (
    <ReportSection 
      title="06 // Priority Resolutions Checklist"
      badge={
        <div className="flex items-center gap-1.5 text-warning-orange">
          <CheckSquare className="w-3.5 h-3.5" />
          <span className="font-mono text-[9px] font-bold uppercase tracking-wider">Remediation Backlog</span>
        </div>
      }
    >
      <Card shadow="default" className="space-y-4">
        {/* Checklist items stack: Standardized element gap spacing to 16px (space-y-4) */}
        <div className="space-y-4">
          {recommendations.map((item, index) => (
            <RecommendationItem key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* AI directive validation stamp */}
        <div className="bg-[#F5F1E8]/40 dark:bg-zinc-800/40 border border-border/10 p-4 flex items-start gap-2.5 mt-2">
          <Sparkles className="w-3.5 h-3.5 text-brand-blue shrink-0 mt-0.5" />
          <div className="space-y-1">
            <Typography.Subheading className="text-xs uppercase">AI Forensics Matcher</Typography.Subheading>
            <Typography.Body className="text-[11px] leading-normal">
              Recommendations compiled by analyzing requirements.txt and pyproject.toml changes. Checked against current deployment schemas.
            </Typography.Body>
          </div>
        </div>
      </Card>
    </ReportSection>
  );
}
