---
id: healthcheck
title: SRTM — Healthcheck
---

# Software Requirements Traceability Matrix — Healthcheck

| Requirement | Specification | Implementation | Architecture | Acceptance |
| --- | --- | --- | --- | --- |
| API-HEALTH-001 | `GET /health` returns 200 with the published JSON contract | `@axc/domain` `createHealthSnapshot`, `@axc/application-services` `getHealth`, `@axc/rest` `GET /health`, `apps/api` composition | ArchUnit domain isolation + layered dependency rules | `packages/axc-verification/acceptance-api` `healthcheck.feature` + Serenity HTML report |

## Contract

```json
{
  "status": "ok",
  "service": "agentCourses-api",
  "projectCode": "axc",
  "environment": "<local|test|production>",
  "timestamp": "<ISO-8601 string>"
}
```
