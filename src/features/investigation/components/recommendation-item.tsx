"use client";

import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { RecommendationData } from "../data/mock-data";
import { Typography } from "@/components/design-system/typography";

interface RecommendationItemProps {
  item: RecommendationData;
  index: number;
}

export function RecommendationItem({ item, index }: RecommendationItemProps) {
  const [completed, setCompleted] = useState(false);

  const getImpactBadge = (impact: RecommendationData["impact"]) => {
    switch (impact) {
      case "High":
        return "bg-incident-red/10 text-incident-red border-incident-red/20";
      case "Medium":
        return "bg-warning-orange/10 text-warning-orange border-warning-orange/20";
      case "Low":
        return "bg-brand-blue/10 text-brand-blue border-brand-blue/20";
    }
  };

  return (
    <div 
      onClick={() => setCompleted(!completed)}
      className={`border-2 p-4 shadow-neo-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-neo active:shadow-none transition-all flex items-start gap-4 cursor-pointer select-none ${
        completed 
          ? "bg-success-green/5 dark:bg-success-green/10 border-success-green" 
          : "bg-white dark:bg-zinc-900 border-border"
      }`}
    >
      {/* Index Tag or Check icon */}
      <div className="shrink-0 mt-0.5">
        {completed ? (
          <CheckCircle2 className="w-5 h-5 text-success-green animate-in zoom-in-50 duration-200" />
        ) : (
          <span className="font-mono font-bold text-xs text-zinc-500 bg-secondary/80 border border-border/10 px-2 py-0.5">
            0{index + 1}
          </span>
        )}
      </div>

      {/* Task Description */}
      <div className="space-y-1.5 flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3">
          <Typography.Subheading className={`text-xs ${
            completed ? "text-success-green line-through opacity-85" : "text-foreground"
          }`}>
            {item.title}
          </Typography.Subheading>
          <span className={`font-mono text-[8px] font-black uppercase px-2 py-0.5 border shrink-0 ${getImpactBadge(item.impact)}`}>
            {item.impact}
          </span>
        </div>
        <Typography.Body className={`text-[11px] leading-relaxed ${
          completed ? "text-zinc-400 dark:text-zinc-500 line-through opacity-70" : "text-zinc-500"
        }`}>
          {item.description}
        </Typography.Body>
      </div>
    </div>
  );
}
