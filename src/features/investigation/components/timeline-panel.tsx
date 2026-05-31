"use client";

import React from "react";
import { Clock } from "lucide-react";
import { TimelineData } from "../data/mock-data";
import { TimelineEvent } from "./timeline-event";
import { Card } from "@/components/design-system/card";
import { ReportSection } from "@/components/design-system/report-container";

interface TimelinePanelProps {
  timeline: TimelineData[];
}

export function TimelinePanel({ timeline }: TimelinePanelProps) {
  return (
    <ReportSection 
      title="05 // Chronological Incident Lifecycle"
      badge={
        <div className="flex items-center gap-1.5 text-zinc-400">
          <Clock className="w-3.5 h-3.5" />
          <span className="font-mono text-[9px] font-bold uppercase tracking-wider">Historical Logs</span>
        </div>
      }
    >
      <Card shadow="default" className="w-full">
        {/* Centered Timeline Event Flow column */}
        <div className="max-w-2xl mx-auto w-full py-2">
          <div className="relative pl-1 space-y-1">
            {timeline.map((event) => (
              <TimelineEvent key={event.id} event={event} />
            ))}
          </div>
        </div>
      </Card>
    </ReportSection>
  );
}
