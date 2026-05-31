"use client";

import React, { useState } from "react";
import { Compass, Clock, GitPullRequest, CheckSquare, BookOpen, GitBranch } from "lucide-react";
import { LAYOUT } from "@/lib/design-system/layout";

interface SidebarProps {
  repositoryName?: string;
}

export function Sidebar({ repositoryName = "stap777/SonD" }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<string>("investigation");

  const navItems = [
    { id: "investigation", label: "Investigation", icon: Compass },
    { id: "evidence", label: "Evidence", icon: GitPullRequest },
    { id: "timeline", label: "Timeline", icon: Clock },
    { id: "recommendations", label: "Recommendations", icon: CheckSquare },
  ];

  return (
    <aside 
      style={{ width: LAYOUT.SIDEBAR_WIDTH }}
      className="bg-[#DCDAD2] dark:bg-zinc-950/40 border-r-2 border-border flex flex-col h-full z-30 select-none shrink-0"
    >
      {/* Navigation Stack */}
      <div className="flex-1 py-6 px-4 space-y-6">
        <div className="space-y-1.5">
          <div className="font-mono text-[9px] text-muted-foreground font-bold uppercase tracking-widest px-2 mb-2">
            Investigation Suite
          </div>
          
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isSelected = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    const element = document.getElementById(`section-${item.id}`);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className={`w-full px-3 py-2 border-2 border-transparent font-mono text-[11px] font-bold flex items-center gap-3 transition-all cursor-pointer ${
                    isSelected 
                      ? "bg-white dark:bg-zinc-800 text-brand-blue border-border shadow-neo-sm translate-x-0.5 translate-y-0.5" 
                      : "text-muted-foreground hover:text-foreground hover:bg-white/40 dark:hover:bg-zinc-800/40 hover:translate-x-0.5"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? "text-brand-blue" : "text-muted-foreground"}`} />
                  <span className="tracking-wide uppercase text-left">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Technical Resources Section */}
        <div className="space-y-1.5">
          <div className="font-mono text-[9px] text-muted-foreground font-bold uppercase tracking-widest px-2 mb-2">
            Resources
          </div>
          <div className="space-y-1">
            <a 
              href="#docs" 
              className="px-3 py-2 font-mono text-[11px] font-bold flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              <span className="tracking-wide uppercase">API Documentation</span>
            </a>
            <a 
              href={`https://github.com/${repositoryName}`} 
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 font-mono text-[11px] font-bold flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <GitBranch className="w-4 h-4 text-muted-foreground" />
              <span className="tracking-wide uppercase">Coral Git Repository</span>
            </a>
          </div>
        </div>
      </div>

      {/* Target Workspace Identity Card */}
      <div className="p-4 border-t-2 border-border bg-white dark:bg-zinc-900 font-mono text-[10px]">
        <div className="flex items-center gap-2.5">
          <div className="bg-brand-blue/10 dark:bg-blue-500/10 p-2 border border-brand-blue text-brand-blue font-bold text-[10px] rounded-none">
            SQL
          </div>
          <div className="truncate">
            <div className="text-[8px] text-muted-foreground font-bold uppercase tracking-wider">Indexed Target</div>
            <div className="font-bold text-foreground truncate" title={repositoryName}>{repositoryName}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
