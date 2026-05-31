"use client";

import React, { useState } from "react";
import { Topbar } from "./topbar";
import { Sidebar } from "./sidebar";
import { ContextPanel, ContextPanelMetadata } from "./context-panel";

export interface AppShellProps {
  children: React.ReactNode;
  defaultContextOpen?: boolean;
  repositoryName?: string;
  metadata?: ContextPanelMetadata;
}

export function AppShell({
  children,
  defaultContextOpen = true,
  repositoryName,
  metadata
}: AppShellProps) {
  const [isContextOpen, setIsContextOpen] = useState<boolean>(defaultContextOpen);
  const [prevDefaultOpen, setPrevDefaultOpen] = useState<boolean>(defaultContextOpen);

  if (defaultContextOpen !== prevDefaultOpen) {
    setIsContextOpen(defaultContextOpen);
    setPrevDefaultOpen(defaultContextOpen);
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background text-foreground select-none font-sans">
      {/* 1. Top Header Navigation Bar */}
      <Topbar
        onToggleContext={() => setIsContextOpen(prev => !prev)}
        isContextOpen={isContextOpen}
        repositoryName={repositoryName}
      />

      {/* 2. Level 0: Symmetrical App Canvas / Drafting Table with subtle blueprint grids */}
      <div className="flex-1 min-h-0 w-full p-4 md:p-6 bg-background blueprint-grid flex overflow-hidden">

        {/* LEVEL 1: Unified Workspace Sheet / Drafting Drawing Board */}
        <div className="flex-1 flex bg-[#E5E3DB] dark:bg-zinc-900/40 border-2 border-border shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] dark:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Left Panel: Sidebar */}
          <Sidebar repositoryName={repositoryName} />

          {/* Center Column: Main Workspace Scrollable Desk Canvas */}
          <main className="flex-1 min-w-0 h-full flex flex-col relative overflow-y-auto bg-[#DCDAD2] dark:bg-zinc-950/20">
            {/* Scrollable Children Page Area */}
            <div className="p-6 md:p-8 space-y-12">
              {children}
            </div>
          </main>

          {/* Right Panel: Symmetrical Diagnostics Context Panel */}
          <ContextPanel
            isOpen={isContextOpen}
            onClose={() => setIsContextOpen(false)}
            metadata={metadata}
            repositoryName={repositoryName}
          />
        </div>

      </div>
    </div>
  );
}
