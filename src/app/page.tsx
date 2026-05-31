"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/features/landing/components/navbar";
import { HeroIllustration } from "@/features/landing/components/hero-illustration";
import { FlowDiagram } from "@/features/landing/components/flow-diagram";
import { ArchitectureDiagram } from "@/features/landing/components/architecture-diagram";
import {
  Compass,
  ArrowDown,
  GitBranch,
  Database,
  Shuffle,
  Clock,
  ShieldAlert,
  CheckSquare,
  Layers,
  FileCode2,
  BrainCircuit,
  Flame,
  Component,
  AlertCircle
} from "lucide-react";

export default function LandingPage() {
  const problems = [
    {
      id: "01",
      title: "Broken Deployments",
      desc: "CI/CD check suite failures are often separated from the specific commits that introduced the regression, causing long debugging cycles.",
    },
    {
      id: "02",
      title: "Hidden Dependency Failures",
      desc: "Unintentional side-effects from transitive dependency upgrades register as generic failures with no clear link to package lock updates.",
    },
    {
      id: "03",
      title: "Unknown Root Causes",
      desc: "Anomalies, incident logs, and operational telemetry raise alarms but lack the deep relational timeline required to locate the source code origin.",
    },
  ];

  const features = [
    {
      title: "Repository Intelligence",
      desc: "Deep structure mapping of check suites, commit logs, statuses, and pull requests to build a complete model of repository activity.",
      icon: GitBranch,
    },
    {
      title: "Coral Evidence Retrieval",
      desc: "Relational querying of GitHub telemetry using highly optimized SQLite SQL schemas powered by the Coral engine.",
      icon: Database,
    },
    {
      title: "AI Correlation Engine",
      desc: "Advanced logic models that semantically parse pull request descriptions and correlate alerts directly with commit diffs.",
      icon: Shuffle,
    },
    {
      title: "Incident Timeline",
      desc: "Chronological reconstruction of system changes, commits, check completions, and telemetry events to pinpoint exactly when issues started.",
      icon: Clock,
    },
    {
      title: "Root Cause Analysis",
      desc: "Strict, evidence-based diagnostic tracing that targets the specific offending commit SHA, eliminating false-positives and speculative guesses.",
      icon: ShieldAlert,
    },
    {
      title: "Actionable Recommendations",
      desc: "Context-specific, high-fidelity restoration playbooks, hotfixes, and engineering best practices tailored directly to the repository state.",
      icon: CheckSquare,
    },
  ];

  const techStack = [
    { name: "Next.js 15", desc: "React Framework", icon: Layers, spec: "App Router / Server API" },
    { name: "TypeScript", desc: "Structural Typing", icon: FileCode2, spec: "Strict Compile Checking" },
    { name: "Coral CLI", desc: "Evidence Cache", icon: Database, spec: "SQL Relational Mapping" },
    { name: "Gemini 1.5 Flash", desc: "Reasoning Engine", icon: BrainCircuit, spec: "Structured JSON Output Schema" },
    { name: "Tailwind CSS", desc: "Utility Styling", icon: Flame, spec: "Neo-brutalist Design System" },
    { name: "shadcn/ui", desc: "Core Primitives", icon: Component, spec: "Radix UI Accessible Base" },
  ];

  return (
    <div className="min-h-screen bg-[#E5E3DB] dark:bg-zinc-950 text-foreground flex flex-col font-sans select-none overflow-x-hidden">
      {/* Dynamic Header Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 border-b-2 border-border bg-[#EBEAE5] dark:bg-zinc-900/10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block bg-brand-blue/10 dark:bg-blue-500/10 border border-brand-blue px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-brand-blue">
              Forensic Software Investigation
            </div>

            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl uppercase leading-none tracking-tight text-foreground">
              Sond <br />
              <span className="text-muted-foreground font-light text-2xl md:text-3xl lg:text-4xl block mt-2 normal-case font-sans">
                Software Investigation Engine
              </span>
            </h1>

            <p className="font-display font-semibold text-lg text-foreground max-w-xl leading-relaxed">
              Understand what happened. Discover why it happened. Resolve regressions faster.
            </p>

            <p className="font-mono text-xs text-muted-foreground max-w-xl leading-relaxed">
              Sond correlates commits, pull requests, status checks, operational incidents, and advanced AI reasoning to construct deep, evidence-based software forensic reports.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/investigation"
                className="h-12 px-6 border-2 border-border font-mono text-xs font-bold flex items-center gap-2 bg-brand-blue text-white shadow-neo hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 active:shadow-none hover:shadow-neo-lg transition-all"
              >
                <Compass className="w-4 h-4" />
                <span>ENTER WORKSPACE</span>
              </Link>
              <a
                href="#architecture"
                className="h-12 px-6 border-2 border-border font-mono text-xs font-bold flex items-center gap-2 bg-white dark:bg-zinc-800 text-foreground shadow-neo hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 active:shadow-none hover:shadow-neo-lg transition-all"
              >
                <ArrowDown className="w-4 h-4" />
                <span>VIEW ARCHITECTURE</span>
              </a>
            </div>
          </div>

          {/* Hero Right Visual */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* Section 2: Problem Statement */}
      <section className="w-full py-20 border-b-2 border-border bg-[#E5E3DB] dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="space-y-4 max-w-2xl">
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-brand-blue">
              Operational Realities
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl uppercase tracking-tight text-foreground">
              Modern repositories produce too much noise.
            </h2>
            <p className="font-mono text-xs text-muted-foreground leading-relaxed">
              Telemetry alarms alert you to outages, but developers are left manual-tracing through thousands of commits, PR files, and transient status alerts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {problems.map((problem) => (
              <div
                key={problem.id}
                className="bg-white dark:bg-zinc-900 border-2 border-border p-6 shadow-neo hover:-translate-y-1 hover:shadow-neo-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-[10px] font-bold text-muted-foreground uppercase mb-4">
                    Anomaly // {problem.id}
                  </div>
                  <h3 className="font-display font-bold text-base uppercase text-foreground mb-3">
                    {problem.title}
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                    {problem.desc}
                  </p>
                </div>
                <div className="mt-6 flex justify-end">
                  <AlertCircle className="w-5 h-5 text-destructive/40" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Core Features */}
      <section id="features" className="w-full py-20 border-b-2 border-border bg-[#EBEAE5] dark:bg-zinc-900/10">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="space-y-4 max-w-2xl">
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-brand-blue">
              Platform Capabilities
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl uppercase tracking-tight text-foreground">
              Engineered for Deep Analysis.
            </h2>
            <p className="font-mono text-xs text-muted-foreground leading-relaxed">
              Sond features a powerful array of forensic capabilities that replaces speculation with relational queries and concrete insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-zinc-900 border-2 border-border p-6 shadow-neo hover:-translate-y-1 hover:shadow-neo-lg transition-all"
                >
                  <div className="p-2 border-2 border-border bg-[#E5E3DB] dark:bg-zinc-800 text-brand-blue w-fit mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-sm uppercase text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-mono text-[11px] text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 4: Investigation Flow */}
      <section id="flow" className="w-full py-20 border-b-2 border-border bg-[#E5E3DB] dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="space-y-4 max-w-2xl">
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-brand-blue">
              Sequential Process
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl uppercase tracking-tight text-foreground">
              The Investigation Pipeline
            </h2>
            <p className="font-mono text-xs text-muted-foreground leading-relaxed">
              Trace how data travels from initial GitHub connection to relational correlation, and final AI verification.
            </p>
          </div>

          <FlowDiagram />
        </div>
      </section>

      {/* Section 5: Architecture */}
      <section id="architecture" className="w-full py-20 border-b-2 border-border bg-[#EBEAE5] dark:bg-zinc-900/10">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="space-y-4 max-w-2xl">
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-brand-blue">
              Technical Design
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl uppercase tracking-tight text-foreground">
              Relational Pipeline Architecture
            </h2>
            <p className="font-mono text-xs text-muted-foreground leading-relaxed">
              Sond relies on optimized local databases and structured LLM JSON outputs to ensure zero-speculation forensics.
            </p>
          </div>

          <ArchitectureDiagram />
        </div>
      </section>

      {/* Section 6: Technology Stack */}
      <section id="technology" className="w-full py-20 border-b-2 border-border bg-[#E5E3DB] dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="space-y-4 max-w-2xl">
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-brand-blue">
              Engineering Specs
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl uppercase tracking-tight text-foreground">
              Workstation Core Stack
            </h2>
            <p className="font-mono text-xs text-muted-foreground leading-relaxed">
              Built on state-of-the-art frameworks and databases to deliver rapid diagnostic indexing and visual excellence.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {techStack.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-zinc-900 border-2 border-border p-4 shadow-neo flex flex-col justify-between hover:-translate-y-1 hover:shadow-neo-lg transition-all"
                >
                  <div className="flex flex-col gap-2">
                    <Icon className="w-5 h-5 text-brand-blue" />
                    <h3 className="font-display font-bold text-xs uppercase text-foreground leading-tight">
                      {tech.name}
                    </h3>
                    <span className="font-mono text-[8px] font-bold text-muted-foreground bg-[#E5E3DB] dark:bg-zinc-800 border border-border/10 px-1 py-0.5 w-fit">
                      {tech.desc}
                    </span>
                  </div>
                  <div className="font-mono text-[8px] text-muted-foreground border-t border-border/10 pt-2 mt-4 leading-normal">
                    {tech.spec}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 7: Demo Call To Action */}
      <section className="w-full py-24 bg-[#EBEAE5] dark:bg-zinc-900/10">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-8 flex flex-col items-center">
          <div className="inline-block bg-destructive/10 border border-destructive px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-destructive">
            Workspace Shell Active
          </div>

          <h2 className="font-display font-bold text-4xl md:text-5xl uppercase tracking-tight text-foreground leading-none">
            Ready to investigate?
          </h2>

          <p className="font-mono text-xs text-muted-foreground max-w-lg leading-relaxed">
            Launch the Software Investigation Engine to diagnose telemetry check suites, index commit relations, and discover root causes instantly.
          </p>

          <Link
            href="/investigation"
            className="h-14 px-8 border-2 border-border font-mono text-sm font-bold flex items-center gap-3 bg-brand-blue text-white shadow-neo-lg hover:-translate-x-1.5 hover:-translate-y-1.5 active:translate-x-0 active:translate-y-0 active:shadow-none hover:shadow-neo-mega transition-all w-fit"
          >
            <Compass className="w-5 h-5" />
            <span>ENTER SOND WORKSPACE</span>
          </Link>
        </div>
      </section>

      {/* Engineering Footer */}
      <footer className="w-full border-t-2 border-border bg-[#E5E3DB] dark:bg-zinc-950 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[9px] text-muted-foreground uppercase">
          <span>&copy; 2026 SOND // Software Investigation Engine</span>
          <span>Designed with Symmetrical neo-brutalist grids</span>
        </div>
      </footer>
    </div>
  );
}
