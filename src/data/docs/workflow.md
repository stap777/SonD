# Sond Workflow

## Intended Investigation Flow

User submits investigation query.

Example:
"why did auth fail after deployment"

---

## Retrieval Phase

Coral gathers:
- recent commits
- deployment logs
- uploaded incidents
- operational evidence

---

## Correlation Phase

System correlates:
- timestamps
- changed services
- failed deployments
- suspicious commits

---

## Analysis Phase

AI layer analyzes retrieved evidence and generates:
- probable root cause
- affected service
- confidence score
- recommendations

---

## Output Phase

Frontend displays:
- investigation summary
- correlated evidence
- timeline
- suspicious changes