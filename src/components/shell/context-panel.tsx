"use client";

import React from "react";
import { Layers, X, GitBranch, ShieldCheck, HelpCircle } from "lucide-react";
import { LAYOUT } from "@/lib/design-system/layout";

export interface ContextPanelMetadata {
  owner: string;
  repo: string;
  branch: string;
  commitCount: number;
  pullRequestCount: number;
  checkSuiteCount: number;
  incidentCount: number;
  confidence: number;
  model: string;
  status: string;
}

export interface ContextPanelProps {
  isOpen: boolean;
  onClose: () => void;
  metadata?: ContextPanelMetadata;
  repositoryName?: string;
}

export function ContextPanel({ isOpen, onClose, metadata, repositoryName }: ContextPanelProps) {
  if (!isOpen) return null;

  const repoDisplay = metadata ? `${metadata.owner}/${metadata.repo}` : (repositoryName || "stap777/SonD");
  const branchDisplay = metadata?.branch || "main";
  const modelDisplay = metadata?.model || "Gemini 1.5 Flash";
  const confidenceDisplay = metadata ? `${metadata.confidence}% Cert.` : "94% Cert.";
  const commitDisplay = metadata ? `${metadata.commitCount} Checked` : "20 Checked";
  const prDisplay = metadata ? `${metadata.pullRequestCount} Evaluated` : "12 Evaluated";
  const checkSuiteDisplay = metadata ? `${metadata.checkSuiteCount} Runs Verified` : "42 Runs Verified";
  const incidentDisplay = metadata ? `${metadata.incidentCount} Matches` : "4 Matches";

  return (
    <aside
      style={{ width: LAYOUT.CONTEXT_PANEL_WIDTH }}
      className="bg-[#DCDAD2] dark:bg-zinc-950/40 border-l-2 border-border flex flex-col h-full z-30 select-none shrink-0 animate-in slide-in-from-right duration-150"
    >
      {/* Panel Header */}
      <div className="p-4 border-b-2 border-border flex items-center justify-between bg-white dark:bg-zinc-900">
        <span className="font-mono text-[10px] font-bold text-foreground flex items-center gap-2 tracking-widest uppercase">
          <Layers className="w-3.5 h-3.5 text-brand-blue" />
          Technical Context
        </span>
        <button
          onClick={onClose}
          className="p-1 border-2 border-border hover:bg-[#EADFCD] dark:hover:bg-zinc-800 transition-colors active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
        >
          <X className="w-3 h-3 text-foreground" />
        </button>
      </div>

      {/* Technical Metadata Scroll Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 font-mono text-xs">
        {/* Section 1: Target Coordinates */}
        <div className="space-y-3">
          <div className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest px-1">
            Target Repository
          </div>
          <div className="bg-white dark:bg-zinc-900 border-2 border-border p-3 space-y-2.5 shadow-neo-sm">
            <div className="flex justify-between items-center border-b border-border/10 pb-1.5">
              <span className="text-muted-foreground text-[11px]">Repository</span>
              <span className="font-bold text-foreground truncate max-w-[120px] text-right" title={repoDisplay}>
                {repoDisplay}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-border/10 pb-1.5">
              <span className="text-muted-foreground text-[11px] flex items-center gap-1">
                <GitBranch className="w-3 h-3 text-muted-foreground" /> Branch
              </span>
              <span className="font-bold text-foreground">{branchDisplay}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-[11px]">Index Status</span>
              <span className="font-bold text-success-green flex items-center gap-1 animate-pulse">
                <span className="h-1.5 w-1.5 rounded-full bg-success-green" /> Correlated
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Engine Diagnostics */}
        <div className="space-y-3">
          <div className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest px-1">
            Engine Diagnostics
          </div>
          <div className="bg-white dark:bg-zinc-900 border-2 border-border p-3 space-y-2.5 shadow-neo-sm">
            <div className="flex justify-between items-center border-b border-border/10 pb-1.5">
              <span className="text-muted-foreground text-[11px]">Engine Model</span>
              <span className="font-bold text-foreground">{modelDisplay}</span>
            </div>
            <div className="flex justify-between items-center border-b border-border/10 pb-1.5">
              <span className="text-muted-foreground text-[11px] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-blue" /> Confidence
              </span>
              <span className="font-bold text-brand-blue">{confidenceDisplay}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-[11px]">Forensic Scope</span>
              <span className="font-bold text-foreground">Full History</span>
            </div>
          </div>
        </div>

        {/* Section 3: Index Metrics */}
        <div className="space-y-3">
          <div className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest px-1">
            Indexed Quantities
          </div>
          <div className="bg-white dark:bg-zinc-900 border-2 border-border p-3 space-y-2.5 shadow-neo-sm">
            <div className="flex justify-between items-center border-b border-border/10 pb-1.5">
              <span className="text-muted-foreground text-[11px]">Commit Buffer</span>
              <span className="font-bold text-foreground">{commitDisplay}</span>
            </div>
            <div className="flex justify-between items-center border-b border-border/10 pb-1.5">
              <span className="text-muted-foreground text-[11px]">Pull Requests</span>
              <span className="font-bold text-foreground">{prDisplay}</span>
            </div>
            <div className="flex justify-between items-center border-b border-border/10 pb-1.5">
              <span className="text-muted-foreground text-[11px]">Status Checks</span>
              <span className="font-bold text-foreground">{checkSuiteDisplay}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-[11px]">Incidents Logged</span>
              <span className="font-bold text-destructive">{incidentDisplay}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Target Workspace Info Strip */}
      <div className="p-4 border-t-2 border-border bg-white dark:bg-zinc-900 font-mono text-[9px] text-zinc-500 flex items-start gap-2">
        <HelpCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
        <p className="leading-normal">
          Coral SQL tables store commit summaries and logs anomalies dynamically, facilitating rapid database queries.
        </p>
      </div>
    </aside>
  );
}
