"use client";

import React from "react";
import { ShieldCheck, HelpCircle } from "lucide-react";
import { Card } from "@/components/design-system/card";
import { Typography } from "@/components/design-system/typography";

interface ConfidenceCardProps {
  score: number;
}

export function ConfidenceCard({ score }: ConfidenceCardProps) {
  const getCertaintyLabel = (val: number) => {
    if (val >= 90) return "HIGH CONFIDENCE";
    if (val >= 70) return "MEDIUM CONFIDENCE";
    return "LOW CONFIDENCE";
  };

  return (
    <Card shadow="default" className="flex flex-col justify-between gap-4 h-full">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2 border-b border-border/10 pb-3 text-foreground">
          <ShieldCheck className="w-4 h-4 text-success-green" />
          <Typography.Heading>
            03 // Confidence Assessment
          </Typography.Heading>
        </div>

        {/* Scaled Text layout */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3 py-1">
          <Typography.Display className="text-4xl md:text-5xl leading-none">
            {score}%
          </Typography.Display>
          <span className="font-mono text-xs font-black uppercase tracking-wider text-success-green">
            {getCertaintyLabel(score)}
          </span>
        </div>

        {/* High-density validated status stack */}
        <div className="space-y-1.5 border-t border-border/10 pt-3 font-mono text-[9px] text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-success-green shrink-0" />
            <span>Token decoders mapped: <strong className="text-foreground">SUCCESS</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-success-green shrink-0" />
            <span>Commit logs correlated: <strong className="text-foreground">YES (High Match)</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-success-green shrink-0" />
            <span>Database logs index: <strong className="text-foreground">FOUND</strong></span>
          </div>
        </div>
      </div>

      {/* Info status strip */}
      <div className="bg-[#F5F1E8]/40 dark:bg-zinc-800/40 border border-border/10 p-2 font-mono text-[9px] text-zinc-500 flex items-center gap-1.5">
        <HelpCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
        <span>Validated against requirements.txt scope.</span>
      </div>
    </Card>
  );
}
