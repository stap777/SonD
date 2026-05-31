"use client";

import React from "react";
import { TimelineData } from "../data/mock-data";
import { Typography } from "@/components/design-system/typography";

interface TimelineEventProps {
  event: TimelineData;
}

export function TimelineEvent({ event }: TimelineEventProps) {
  const getCategoryMarkerStyle = (cat: TimelineData["category"]) => {
    switch (cat) {
      case "dependency":
        return "bg-brand-blue border-brand-blue/30";
      case "trigger":
        return "bg-warning-orange border-warning-orange/30";
      case "failure":
        return "bg-incident-red border-incident-red/30 animate-pulse";
      case "mitigation":
        return "bg-success-green border-success-green/30";
    }
  };

  return (
    <div className="relative space-y-1.5 pl-4.5 border-l border-border pb-3.5 last:pb-0">
      {/* Smaller Node bullet */}
      <div className={`absolute -left-[4px] top-1.5 h-2 w-2 rounded-full border border-white dark:border-zinc-950 ${getCategoryMarkerStyle(event.category)}`} />
      
      {/* High-density Timestamp Header */}
      <div className="flex items-center gap-1.5 leading-none">
        <Typography.TechnicalLabel className="border-brand-blue/20 bg-brand-blue/10 text-brand-blue text-[9px] font-bold py-0.5 px-1">
          {event.timestamp}
        </Typography.TechnicalLabel>
        <Typography.Caption className="text-[8px]">
          INCIDENT STEP
        </Typography.Caption>
      </div>

      {/* Description Body */}
      <div className="space-y-0.5">
        <Typography.Subheading className="text-[11px] uppercase tracking-wide leading-tight">
          {event.event}
        </Typography.Subheading>
        <Typography.Body className="text-[11px] leading-relaxed max-w-xl text-zinc-500">
          {event.description}
        </Typography.Body>
      </div>
    </div>
  );
}
