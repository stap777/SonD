import React from "react";
import { GitBranch, FolderSearch, Shuffle, Brain, ShieldAlert, CheckSquare, ArrowRight } from "lucide-react";

export function FlowDiagram() {
  const steps = [
    {
      id: "01",
      title: "Repository",
      description: "Connect GitHub workspace",
      icon: GitBranch,
      color: "text-brand-blue bg-blue-500/10 border-brand-blue",
    },
    {
      id: "02",
      title: "Evidence",
      description: "Coral SQL indexing & logs",
      icon: FolderSearch,
      color: "text-warning-orange bg-amber-500/10 border-warning-orange",
    },
    {
      id: "03",
      title: "Correlation",
      description: "Compute commit links",
      icon: Shuffle,
      color: "text-primary bg-blue-500/10 border-primary",
    },
    {
      id: "04",
      title: "AI Analysis",
      description: "Gemini forensic assessment",
      icon: Brain,
      color: "text-success-green bg-emerald-500/10 border-success-green",
    },
    {
      id: "05",
      title: "Root Cause",
      description: "Pinpoint core code failure",
      icon: ShieldAlert,
      color: "text-destructive bg-rose-500/10 border-destructive",
    },
    {
      id: "06",
      title: "Resolution",
      description: "Actionable hotfixes",
      icon: CheckSquare,
      color: "text-success-green bg-emerald-500/10 border-success-green",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-6 relative select-none">
      {steps.map((step, idx) => {
        const Icon = step.icon;
        return (
          <div key={step.id} className="relative flex items-center w-full">
            {/* Main Step Card */}
            <div className="flex-1 bg-white dark:bg-zinc-900 border-2 border-border p-5 shadow-neo relative hover:-translate-y-1 hover:shadow-neo-lg transition-all w-full flex flex-col items-center text-center">
              <span className="absolute top-2 left-2 font-mono text-[9px] font-bold text-muted-foreground">
                {step.id}
              </span>
              
              <div className={`p-3 border-2 border-border rounded-none mb-3 ${step.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              
              <h4 className="font-display font-bold text-xs text-foreground uppercase tracking-tight mb-1">
                {step.title}
              </h4>
              <p className="font-mono text-[9px] text-muted-foreground leading-normal">
                {step.description}
              </p>
            </div>

            {/* Connecting Chevron Arrow (desktop only) */}
            {idx < steps.length - 1 && (
              <div className="hidden md:flex absolute -right-3.5 z-20 bg-white dark:bg-zinc-950 border-2 border-border p-1">
                <ArrowRight className="w-3 h-3 text-border" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
