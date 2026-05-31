"use client";

import React from "react";
import { BookOpen } from "lucide-react";
import { Card } from "@/components/design-system/card";
import { Typography } from "@/components/design-system/typography";

interface SummaryCardProps {
  summary: string;
}

export function SummaryCard({ summary }: SummaryCardProps) {
  return (
    <Card shadow="default" className="flex flex-col justify-between gap-4 h-full">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center gap-2 border-b border-border/10 pb-3 text-foreground">
          <BookOpen className="w-4 h-4 text-brand-blue" />
          <Typography.Heading>
            02 // Incident Summary
          </Typography.Heading>
        </div>

        {/* Narrative */}
        <Typography.Body className="text-sm">
          {summary}
        </Typography.Body>
      </div>

      {/* Meta indicator */}
      <Typography.Caption className="text-[9px]">
        Engine output // Verified token anomaly matches
      </Typography.Caption>
    </Card>
  );
}
