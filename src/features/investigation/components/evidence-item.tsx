"use client";

import React from "react";
import { GitCommit, AlertTriangle, FileCode, Clock } from "lucide-react";
import { EvidenceData } from "../data/mock-data";
import { Card } from "@/components/design-system/card";
import { Typography } from "@/components/design-system/typography";

interface EvidenceItemProps {
  item: EvidenceData;
}

export function EvidenceItem({ item }: EvidenceItemProps) {
  const getStrengthStyle = (strength: EvidenceData["correlationStrength"]) => {
    switch (strength) {
      case "High":
        return "bg-incident-red/10 text-incident-red border-incident-red/20";
      case "Medium":
        return "bg-warning-orange/10 text-warning-orange border-warning-orange/20";
      case "Low":
        return "bg-brand-blue/10 text-brand-blue border-brand-blue/20";
    }
  };

  return (
    <Card shadow="sm" className="flex flex-col justify-between gap-4">
      {/* Upper Area: Primary Commit Message & Badge */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2 min-w-0">
            {item.correlationStrength === "High" ? (
              <AlertTriangle className="w-4 h-4 text-incident-red shrink-0 mt-0.5" />
            ) : (
              <GitCommit className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
            )}
            <h4 className="font-sans font-bold text-xs text-foreground leading-snug min-w-0 break-words">
              {item.message}
            </h4>
          </div>
          <span className={`font-mono text-[8px] font-black uppercase px-2 py-0.5 border shrink-0 ${getStrengthStyle(item.correlationStrength)}`}>
            {item.correlationStrength}
          </span>
        </div>

        {/* Secondary: Files Changed */}
        {item.filePath && (
          <div className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-500">
            <FileCode className="w-3.5 h-3.5 text-zinc-400" />
            <span className="truncate">{item.filePath}</span>
          </div>
        )}
      </div>

      {/* Tertiary / Bottom: Monospaced quiet details & SHA badge */}
      <div className="space-y-4 pt-2 border-t border-border/5">
        <Typography.Body className="font-mono text-[9px] text-zinc-500 leading-normal select-text">
          {item.details}
        </Typography.Body>

        <div className="flex items-center justify-between font-mono text-[9px] text-zinc-400">
          <Typography.TechnicalLabel className="bg-secondary/70 text-zinc-500 border border-border/10 px-1.5 py-0.5">
            commit {item.sha}
          </Typography.TechnicalLabel>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {item.timestamp.split(" ")[1]} {item.timestamp.split(" ")[2]}
          </span>
        </div>
      </div>
    </Card>
  );
}
