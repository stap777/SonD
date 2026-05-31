"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/shell/app-shell";
import {
  Compass,
  ArrowRight,
  RefreshCw,
  AlertOctagon
} from "lucide-react";

// Design System Core Components
import { ReportContainer } from "@/components/design-system/report-container";
import { Typography } from "@/components/design-system/typography";
import { Card } from "@/components/design-system/card";

// Refined Presentation Cards
import { RootCauseCard } from "@/features/investigation/components/root-cause-card";
import { SummaryCard } from "@/features/investigation/components/summary-card";
import { ConfidenceCard } from "@/features/investigation/components/confidence-card";
import { EvidencePanel } from "@/features/investigation/components/evidence-panel";
import { TimelinePanel } from "@/features/investigation/components/timeline-panel";
import { RecommendationsPanel } from "@/features/investigation/components/recommendations-panel";

import type { EvidenceData, TimelineData, RecommendationData } from "@/features/investigation/data/mock-data";
import type { ContextPanelMetadata } from "@/components/shell/context-panel";

interface InvestigationReport {
  repository: string;
  branch: string;
  rootCause: {
    trigger: string;
    description: string;
    impact: string;
    confidence: number;
  };
  summary: string;
  evidence: EvidenceData[];
  timeline: TimelineData[];
  recommendations: RecommendationData[];
  metadata?: ContextPanelMetadata;
}

function getDynamicRepoName(url: string): string {
  try {
    if (!url || typeof url !== "string") return "stap777/SonD";
    const cleaned = url
      .trim()
      .split("?")[0]
      .split("#")[0]
      .replace(/^(https?:\/\/)?(www\.)?github\.com\//i, "")
      .replace(/\.git$/i, "");
    const parts = cleaned.split("/");
    if (parts.length >= 2) {
      return `${parts[0]}/${parts[1]}`;
    }
  } catch { }
  return "stap777/SonD";
}

export default function InvestigationPage() {
  const [repoUrl, setRepoUrl] = useState("https://github.com/stap777/SonD");
  const [branch, setBranch] = useState("main");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "failure">("idle");
  const [loadingStage, setLoadingStage] = useState<string>("Connecting Coral SQL databases...");
  const [reportData, setReportData] = useState<InvestigationReport | null>(null);
  const [errorReason, setErrorReason] = useState<string>("");

  const handleRunDiagnostics = async () => {
    setStatus("loading");
    setErrorReason("");
    setReportData(null);

    // Core real diagnostic stage sequence simulation
    const stages = [
      "Connecting Coral SQL retrieval engine...",
      "Fetching repository evidence, pull requests, and check suites...",
      "Correlating indexed database logs with git commits...",
      "Executing Gemini 1.5 diagnostic reasoning pipelines...",
      "Compiling forensic intelligence workstation layout...",
    ];

    let currentStageIndex = 0;
    setLoadingStage(stages[0]);

    const stageInterval = setInterval(() => {
      currentStageIndex++;
      if (currentStageIndex < stages.length) {
        setLoadingStage(stages[currentStageIndex]);
      }
    }, 1500);

    try {
      const response = await fetch("/api/investigation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repoUrl,
          branch,
        }),
      });

      clearInterval(stageInterval);

      if (!response.ok) {
        const errPayload = await response.json();
        throw new Error(errPayload.message || errPayload.error || "Investigation Pipeline Failure.");
      }

      const data = await response.json();
      setReportData(data);
      setStatus("success");
    } catch (err: unknown) {
      clearInterval(stageInterval);
      const errorMessage = err instanceof Error ? err.message : String(err);
      setErrorReason(errorMessage);
      setStatus("failure");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setReportData(null);
    setErrorReason("");
  };

  return (
    <AppShell
      defaultContextOpen={status === "success"}
      repositoryName={reportData ? reportData.repository : getDynamicRepoName(repoUrl)}
      metadata={reportData ? reportData.metadata : undefined}
    >
      <div className="w-full max-w-5xl mx-auto space-y-6">

        {/* State A: Repository Intake View (Idle) */}
        {status === "idle" && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] py-6 animate-in fade-in duration-200 w-full">
            <div className="max-w-xl w-full">
              <Card shadow="default">
                {/* Header */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-2.5">
                    <Compass className="w-6 h-6 text-brand-blue" />
                    <Typography.Subheading className="text-xl">
                      Index Software Coordinates
                    </Typography.Subheading>
                  </div>
                  <Typography.Body className="font-mono text-xs">
                    Provide a repository to index checked status logs, Coral SQL anomalies, and compile Gemini diagnostics.
                  </Typography.Body>
                </div>

                {/* Inputs */}
                <div className="space-y-4">
                  <div>
                    <Typography.Label className="block mb-1.5">
                      Repository intake URL
                    </Typography.Label>
                    <input
                      type="text"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      className="w-full h-11 px-4 border-2 border-border font-mono text-xs bg-background text-foreground focus:ring-2 focus:ring-brand-blue outline-none"
                      placeholder="e.g. https://github.com/stap777/SonD"
                    />
                  </div>

                  <div>
                    <Typography.Label className="block mb-1.5">
                      Target Branch Reference
                    </Typography.Label>
                    <input
                      type="text"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full h-11 px-4 border-2 border-border font-mono text-xs bg-background text-foreground focus:ring-2 focus:ring-brand-blue outline-none"
                      placeholder="main"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleRunDiagnostics}
                      className="w-full h-12 bg-brand-blue border-2 border-border text-white font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 shadow-neo hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none hover:shadow-neo-lg transition-all cursor-pointer"
                    >
                      <span>Index & Analyze Repository</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* State B: Real Pipeline Loading Progress View */}
        {status === "loading" && (
          <div className="max-w-md mx-auto my-24 text-center animate-in fade-in duration-200 w-full">
            <Card shadow="default" className="flex flex-col items-center justify-center space-y-4">
              <RefreshCw className="w-8 h-8 text-brand-blue animate-spin" />
              <div className="space-y-1.5 w-full">
                <Typography.Heading className="text-sm">
                  Executing Software Diagnostics
                </Typography.Heading>
                <div className="font-mono text-[10px] text-zinc-500 bg-[#F5F1E8]/40 border border-border/10 p-2 text-left truncate leading-relaxed">
                  <span className="text-brand-blue font-bold">active:</span> {loadingStage}
                </div>
              </div>
              <div className="w-full bg-secondary h-1.5 border border-border overflow-hidden relative">
                <div className="bg-brand-blue h-full w-[60%] animate-[pulse_1s_infinite]"></div>
              </div>
            </Card>
          </div>
        )}

        {/* State D: Pipeline Failure View */}
        {status === "failure" && (
          <div className="max-w-xl mx-auto my-20 animate-in fade-in duration-200 w-full">
            <Card shadow="default" className="border-l-4 border-l-incident-red flex flex-col gap-6">
              <div className="flex items-center gap-3 text-incident-red border-b border-border/10 pb-4">
                <AlertOctagon className="w-6 h-6 shrink-0" />
                <Typography.Heading className="text-lg text-incident-red">
                  Investigation Pipeline Failure
                </Typography.Heading>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <Typography.Label className="block text-zinc-500">
                  Exception Details
                </Typography.Label>
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 p-4 text-incident-red whitespace-pre-wrap select-text leading-relaxed">
                  {errorReason}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="w-full h-11 bg-white dark:bg-zinc-800 border-2 border-border text-foreground font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 shadow-neo hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none hover:shadow-neo transition-all cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retry Intake Configuration</span>
                </button>
              </div>
            </Card>
          </div>
        )}

        {/* State C: Success - Render Dynamic Investigation Report */}
        {status === "success" && reportData && (
          <div className="animate-in fade-in duration-300 w-full space-y-6">

            {/* Header Title block */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-border/10 pb-6">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Typography.Display className="text-2xl md:text-3xl">
                    Software Diagnostic Report
                  </Typography.Display>
                  <Typography.Caption className="text-brand-blue bg-brand-blue/10 border border-brand-blue/30 px-2.5 py-0.5 text-[9px] uppercase tracking-wide">
                    Workspace Active // LIVE
                  </Typography.Caption>
                </div>
                <Typography.Body className="font-mono text-xs">
                  Incident summary for {repoUrl} (branch: {branch}) // Compiled via Gemini 1.5 Analyst
                </Typography.Body>
              </div>
              <button
                onClick={handleReset}
                className="h-9 px-4 bg-white dark:bg-zinc-800 border-2 border-border text-foreground font-mono text-xs font-bold uppercase flex items-center gap-1.5 shadow-neo-sm hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none hover:shadow-neo transition-all cursor-pointer self-start sm:self-center"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Intake</span>
              </button>
            </div>

            {/* Level 1: Report Workspace Surface Sheet Container */}
            <ReportContainer>

              {/* Sidebar Navigation Section 1: Investigation Overview */}
              <div id="section-investigation" className="scroll-mt-8 space-y-8">
                {/* 1. Root Cause Hero Card */}
                <RootCauseCard data={reportData.rootCause} />

                {/* 2. Summary & Confidence Card side-by-side grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                  <div className="md:col-span-2">
                    <SummaryCard summary={reportData.summary} />
                  </div>
                  <div className="md:col-span-1">
                    <ConfidenceCard score={reportData.rootCause.confidence} />
                  </div>
                </div>
              </div>

              {/* Sidebar Navigation Section 2: Evidence */}
              <div id="section-evidence" className="scroll-mt-8">
                <EvidencePanel evidence={reportData.evidence} />
              </div>

              {/* Sidebar Navigation Section 3: Timeline */}
              <div id="section-timeline" className="scroll-mt-8">
                <TimelinePanel timeline={reportData.timeline} />
              </div>

              {/* Sidebar Navigation Section 4: Recommendations */}
              <div id="section-recommendations" className="scroll-mt-8">
                <RecommendationsPanel recommendations={reportData.recommendations} />
              </div>

            </ReportContainer>
          </div>
        )}
      </div>
    </AppShell>
  );
}
