"use client";

import React from "react";
import { Layers } from "lucide-react";
import { SondLogo } from "../brand/sond-logo";

export interface TopbarProps {
  onToggleContext?: () => void;
  isContextOpen?: boolean;
  repositoryName?: string;
}

export function Topbar({ onToggleContext, isContextOpen, repositoryName = "stap777/SonD" }: TopbarProps) {
  // Parse owner and repo dynamically
  let owner = "STAP777";
  let repo = "SOND";

  if (repositoryName && repositoryName.includes("/")) {
    const parts = repositoryName.split("/");
    owner = parts[0].toUpperCase();
    repo = parts[1].toUpperCase();
  }

  return (
    <header className="w-full bg-[#F5F1E8] dark:bg-[#15171C] border-b-2 border-border h-16 flex items-center justify-between px-6 z-40 select-none">
      {/* Editorial SOND Brand Header */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <SondLogo className="w-5 h-5 text-brand-blue" />
          <span className="font-display font-bold text-xl tracking-tight text-foreground uppercase">
            Sond
          </span>
        </div>
        <div className="h-4 w-[1px] bg-border/40"></div>
        <span className="font-mono text-[9px] font-bold tracking-widest text-muted-foreground uppercase bg-background border border-border px-2 py-0.5">
          Software Investigation Engine
        </span>
      </div>

      {/* Center metadata / silent breadcrumb */}
      <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
        <span>{owner}</span>
        <span className="text-border/40">/</span>
        <span className="text-foreground font-semibold">{repo}</span>
        <span className="h-2 w-2 rounded-full bg-success-green animate-pulse ml-2" title="Engine Active" />
      </div>

      {/* Actions: Context Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleContext}
          className={`h-9 px-4 border-2 border-border font-mono text-xs font-bold flex items-center gap-2 shadow-neo-sm hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none hover:shadow-neo transition-all cursor-pointer ${isContextOpen
              ? "bg-brand-blue text-white"
              : "bg-white dark:bg-zinc-800 text-foreground hover:bg-secondary"
            }`}
          title="Toggle Context Panel"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>CONTEXT</span>
        </button>
      </div>
    </header>
  );
}
