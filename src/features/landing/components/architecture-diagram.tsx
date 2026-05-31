import React from "react";
import { Terminal, Cpu, Database, GitPullRequest, BrainCircuit, FileText, ArrowRight } from "lucide-react";

export function ArchitectureDiagram() {
  const blocks = [
    {
      id: "Q",
      label: "User Request",
      tech: "Next.js UI / API",
      desc: "User query + URL intake",
      icon: Terminal,
      bg: "bg-[#F4F3EF] dark:bg-zinc-900 border-primary",
    },
    {
      id: "I",
      label: "Investigation Service",
      tech: "TypeScript Engine",
      desc: "Orchestrates logs & commits",
      icon: Cpu,
      bg: "bg-[#FAF8F3] dark:bg-zinc-900 border-border",
    },
    {
      id: "C",
      label: "Coral SQL Layer",
      tech: "Coral CLI / SQLite",
      desc: "Fast relational index query",
      icon: Database,
      bg: "bg-[#FAF8F3] dark:bg-zinc-900 border-warning-orange",
    },
    {
      id: "G",
      label: "GitHub API Telemetry",
      tech: "Octokit REST",
      desc: "Live check suites & statuses",
      icon: GitPullRequest,
      bg: "bg-[#FAF8F3] dark:bg-zinc-900 border-border",
    },
    {
      id: "A",
      label: "Gemini Analysis",
      tech: "Gemini 1.5 Flash API",
      desc: "Reasoning & correlation model",
      icon: BrainCircuit,
      bg: "bg-[#FAF8F3] dark:bg-zinc-900 border-success-green",
    },
    {
      id: "R",
      label: "Forensic Report",
      tech: "Relational JSON",
      desc: "Interactive evidence board",
      icon: FileText,
      bg: "bg-white dark:bg-zinc-900 border-destructive shadow-neo-lg",
    },
  ];

  return (
    <div className="w-full border-2 border-border bg-[#F4F3EF] dark:bg-zinc-950 blueprint-grid p-6 relative shadow-neo select-none overflow-hidden">
      {/* CAD technical metadata */}
      <div className="absolute top-2 left-2 font-mono text-[8px] text-muted-foreground">
        SYS_ARCH // SOND_FORENSIC_PIPELINE // V0.1.0
      </div>
      <div className="absolute top-2 right-2 font-mono text-[8px] text-muted-foreground uppercase flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        PIPELINE_RESOLVED
      </div>

      {/* Grid container representing the architecture flow */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-stretch relative z-10 py-6">
        {blocks.map((block, idx) => {
          const Icon = block.icon;
          return (
            <div key={block.id} className="flex flex-col md:flex-row items-center w-full">
              {/* Architecture Node Card */}
              <div className={`flex-1 border-2 p-4 shadow-neo flex flex-col justify-between h-full relative group hover:scale-[1.02] transition-transform ${block.bg}`}>
                <span className="absolute top-1 right-2 font-mono text-[7px] text-muted-foreground font-bold">
                  [{block.id}]
                </span>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-display font-bold text-[10px] text-foreground uppercase tracking-tight truncate">
                      {block.label}
                    </span>
                  </div>
                  
                  <div className="font-mono text-[8px] font-bold text-muted-foreground bg-white dark:bg-zinc-800 border border-border/10 px-1.5 py-0.5 w-fit mb-2">
                    {block.tech}
                  </div>
                  
                  <p className="font-mono text-[9px] text-muted-foreground leading-normal">
                    {block.desc}
                  </p>
                </div>
              </div>

              {/* Dotted horizontal connectors */}
              {idx < blocks.length - 1 && (
                <div className="flex justify-center md:justify-start items-center my-3 md:my-0 md:px-2 shrink-0">
                  <ArrowRight className="w-4 h-4 text-border rotate-90 md:rotate-0" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Symmetrical Locator calibration markings at bottom */}
      <div className="absolute bottom-2 left-2 font-mono text-[7px] text-muted-foreground uppercase flex gap-4">
        <span>X: 102.32</span>
        <span>Y: 894.1A</span>
      </div>
      <div className="absolute bottom-2 right-2 font-mono text-[7px] text-muted-foreground uppercase">
        sond_pipeline_diagram_rendered
      </div>
    </div>
  );
}
