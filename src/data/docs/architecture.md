# Sond Architecture

## Overview

Sond is a production intelligence system designed to help developers investigate production failures by correlating repository activity, operational logs and team discussions.

The system uses Coral as the retrieval and orchestration layer for structured operational data.

Current architecture focuses on:
- modularity
- clean separation of concerns
- stable retrieval workflows
- minimal early abstractions

---

## Core Layers

### Frontend
- Next.js
- TypeScript
- Tailwind
- shadcn/ui

Responsible only for:
- rendering UI
- displaying investigation results
- handling user interaction

---

### Coral Layer
Location:
src/lib/coral

Responsible for:
- querying structured sources
- retrieval workflows
- source normalization

---

### Services Layer
Location:
src/services

Responsible for:
- investigation workflows
- orchestration logic
- business rules

---

### Data Layer
Location:
src/data

Contains:
- logs
- incidents
- uploaded structured files

---

### AI Layer
Location:
src/lib/ai

Future responsibility:
- root cause analysis
- summarization
- recommendations

No AI functionality implemented yet.

---

## Current Status

Completed:
- project setup
- strict TypeScript setup
- shadcn/ui setup
- local structured data testing
- Coral foundation validation

Not implemented yet:
- GitHub integration
- AI reasoning
- production workflows
- dashboard functionality