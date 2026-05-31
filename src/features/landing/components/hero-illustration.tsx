import React from "react";
import { Database, ShieldAlert, GitBranch, Cpu, CheckCircle } from "lucide-react";

export function HeroIllustration() {
  return (
    <div className="w-full h-full min-h-[400px] border-2 border-border bg-white dark:bg-zinc-950 blueprint-grid p-6 relative flex flex-col justify-between shadow-neo-lg select-none">
      {/* Blueprint Grid Coordinates Info Ticks */}
      <div className="absolute top-2 left-2 font-mono text-[9px] text-muted-foreground uppercase">
        LOCATOR_GRID: 24.12A // SOND_ENGINE
      </div>
      <div className="absolute top-2 right-2 font-mono text-[9px] text-muted-foreground uppercase flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-success-green animate-pulse" />
        SYSTEM_READY
      </div>

      {/* 1. Repository Level (Inputs) */}
      <div className="flex justify-between items-center z-10">
        <div className="bg-white dark:bg-zinc-900 border-2 border-border p-3 flex items-center gap-2 shadow-neo-sm">
          <GitBranch className="w-4 h-4 text-primary" />
          <div className="font-mono text-[10px]">
            <div className="text-[7px] text-muted-foreground font-bold uppercase">Repo Source</div>
            <div className="font-bold text-foreground">github.com/stap777/sond</div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border-2 border-border p-3 flex items-center gap-2 shadow-neo-sm">
          <Database className="w-4 h-4 text-warning-orange" />
          <div className="font-mono text-[10px]">
            <div className="text-[7px] text-muted-foreground font-bold uppercase">DB Store</div>
            <div className="font-bold text-foreground">Coral SQL Tables</div>
          </div>
        </div>
      </div>

      {/* Technical dashed signal pathways linking to middle elements */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 80 80 L 160 200" stroke="currentColor" className="text-border/20 dark:text-border/40" strokeWidth="2" strokeDasharray="5 5" />
        <path d="M 400 80 L 320 200" stroke="currentColor" className="text-border/20 dark:text-border/40" strokeWidth="2" strokeDasharray="5 5" />
        <path d="M 160 200 L 240 320" stroke="currentColor" className="text-primary/40" strokeWidth="2" />
        <path d="M 320 200 L 240 320" stroke="currentColor" className="text-destructive/40" strokeWidth="2" />
      </svg>

      {/* 2. Evidence & Correlation Level (Middle Process) */}
      <div className="flex justify-around items-center z-10 w-full my-6">
        <div className="bg-white dark:bg-zinc-900 border-2 border-border p-4 flex flex-col gap-1.5 shadow-neo w-[160px] relative hover:-translate-y-1 hover:shadow-neo-mega transition-all">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-success-green" />
            <span className="font-mono font-bold text-[10px] text-foreground uppercase">PR & Statuses</span>
          </div>
          <div className="font-mono text-[9px] text-muted-foreground">
            - 42 Checks Verified<br />
            - 12 Evaluated PRs
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border-2 border-border p-4 flex flex-col gap-1.5 shadow-neo w-[160px] relative hover:-translate-y-1 hover:shadow-neo-mega transition-all">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-primary animate-pulse" />
            <span className="font-mono font-bold text-[10px] text-foreground uppercase">AI Correlation</span>
          </div>
          <div className="font-mono text-[9px] text-muted-foreground">
            - Semantic Tracing<br />
            - Check correlation
          </div>
        </div>
      </div>

      {/* 3. Root Cause Level (Output Result) */}
      <div className="flex justify-center items-center z-10">
        <div className="bg-white dark:bg-zinc-900 border-2 border-border p-4 shadow-neo-lg w-[240px] border-destructive relative hover:scale-105 transition-all">
          {/* Target locator corners */}
          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-destructive" />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-destructive" />
          <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-destructive" />
          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-destructive" />

          <div className="flex items-center gap-2.5 pb-2 border-b border-border/10">
            <ShieldAlert className="w-5 h-5 text-destructive animate-pulse" />
            <div>
              <span className="font-mono font-bold text-[10px] text-destructive uppercase tracking-wide">
                Root Cause Located
              </span>
              <div className="font-mono text-[8px] text-muted-foreground">Confidence: 94% Cert.</div>
            </div>
          </div>
          <div className="font-mono text-[9px] text-foreground mt-2 leading-relaxed">
            <span className="font-bold text-primary">Commit: 7a82b9c</span><br />
            Regression identified in dependency update pipeline.
          </div>
        </div>
      </div>

      {/* Bottom scale markers */}
      <div className="absolute bottom-2 left-2 font-mono text-[8px] text-muted-foreground flex items-center gap-4">
        <span>GRID_SCALE: 1:1</span>
        <span>forensics_buffer_active</span>
      </div>
    </div>
  );
}
