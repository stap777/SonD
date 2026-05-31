"use client";

import React from "react";
import { ShieldAlert } from "lucide-react";
import { Card } from "@/components/design-system/card";
import { Typography } from "@/components/design-system/typography";

interface RootCauseProps {
  data: {
    trigger: string;
    description: string;
    impact: string;
    confidence: number;
  };
}

export function RootCauseCard({ data }: RootCauseProps) {
  return (
    <Card shadow="default" className="border-l-4 border-l-incident-red flex flex-col justify-between gap-6">
      {/* Title & Confidence Metric badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/10 pb-4">
        <div className="flex items-center gap-2.5 text-incident-red">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <Typography.Heading className="text-incident-red">
            01 // Primary Root Cause Trigger
          </Typography.Heading>
        </div>
        <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
          <Typography.Caption className="text-[9px]">
            Gemini Certainty
          </Typography.Caption>
          <span className="bg-incident-red/10 text-incident-red border border-incident-red/30 px-2 py-0.5 font-mono font-bold text-xs">
            {data.confidence}% confidence
          </span>
        </div>
      </div>

      {/* Hero content details */}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Typography.Label className="block">
            Definitive Trigger
          </Typography.Label>
          <Typography.Subheading className="text-base md:text-lg">
            {data.trigger}
          </Typography.Subheading>
        </div>

        <div className="space-y-1.5">
          <Typography.Label className="block">
            Analysis Synopsis
          </Typography.Label>
          <Typography.Body className="text-xs md:text-sm">
            {data.description}
          </Typography.Body>
        </div>
      </div>

      {/* Impact card strip */}
      <div className="bg-[#F5F1E8]/40 dark:bg-zinc-800/40 border border-border/10 p-4 flex flex-col sm:flex-row items-start gap-3 mt-2">
        <div className="bg-incident-red/10 border border-incident-red/20 px-2 py-0.5 font-mono text-[9px] font-bold text-incident-red uppercase shrink-0">
          Impact Scope
        </div>
        <Typography.TechnicalLabel className="border-none bg-transparent p-0 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {data.impact}
        </Typography.TechnicalLabel>
      </div>
    </Card>
  );
}
