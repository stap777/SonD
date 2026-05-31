"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ReportContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ReportContainer({ children, className }: ReportContainerProps) {
  return (
    <div className={cn("w-full space-y-12 max-w-5xl mx-auto", className)}>
      {children}
    </div>
  );
}

interface ReportSectionProps {
  title: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function ReportSection({ title, badge, children, footer, className }: ReportSectionProps) {
  return (
    <section className={cn("space-y-4 max-w-5xl mx-auto w-full", className)}>
      {/* Title & Divider Grid Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/10 pb-3">
        <h3 className="font-display font-extrabold text-xs uppercase tracking-widest text-foreground">
          {title}
        </h3>
        {badge && <div className="shrink-0">{badge}</div>}
      </div>

      {/* Main Section Content Area */}
      <div className="space-y-4">
        {children}
      </div>

      {/* Optional Section Footer */}
      {footer && (
        <div className="pt-3 border-t border-border/5">
          {footer}
        </div>
      )}
    </section>
  );
}
