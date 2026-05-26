# Sond

Sond is a production intelligence system that helps developers investigate production failures by correlating repository activity, operational logs and team discussions into a single workflow using Coral as the retrieval layer.

Instead of manually jumping between commits, logs and chats while debugging deployments, Sond tries to surface the most relevant operational evidence and identify possible root causes faster.

---

## What Sond Does

A developer can ask something like:

> "why did auth fail after latest deploy"

Sond will:
- inspect recent commits and PR activity
- correlate deployment timestamps
- analyse uploaded logs and incidents
- retrieve operational evidence using Coral
- generate investigation summaries and recommendations

The project focuses on:
- clean investigation workflows
- meaningful Coral integration
- modular architecture
- operational usefulness
- stable and readable implementation

---

## How It Works

```text
User Investigation Query
            ↓
       Coral Retrieval
            ↓
   Structured Operational Data
            ↓
    Correlation + Analysis
            ↓
 Investigation Report Output
```

Coral acts as the unified retrieval and orchestration layer for operational sources.

The AI layer is responsible only for:
- analysis
- summarization
- recommendations

---

## Current Sources

Planned supported sources:

- GitHub repository activity
- uploaded deployment logs
- uploaded incident files
- operational documentation
- Slack discussions

---

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Coral
- GitHub API
- Gemini / Ollama

---

# Project Structure

```text
src/
│
├── app/                  # Next.js app router
│
├── components/           # Reusable UI components
│   ├── dashboard/
│   ├── investigation/
│   ├── layout/
│   ├── timeline/
│   └── ui/
│
├── lib/
│   ├── ai/               # AI integration logic
│   ├── coral/            # Coral retrieval layer
│   ├── github/           # GitHub integration
│   ├── parsers/          # File/log parsers
│   └── utils/
│
├── services/             # Investigation workflows
│
├── prompts/              # AI prompts
│
├── types/                # Shared TypeScript types
│
├── constants/
│
└── data/                 # Local structured datasets
    ├── docs/
    ├── logs/
    └── slack/
```

---

# Documentation

Additional project documentation is available inside:

```text
docs/
```

Important files:

- `architecture.md`
- `workflow.md`
- `development-rules.md`

Please read the docs before making major architectural or workflow changes.

---



# Vision

Sond is not intended to be a generic AI chatbot.

The goal is to build a focused operational investigation system that helps developers understand production failures faster using structured retrieval and correlation workflows powered by Coral.