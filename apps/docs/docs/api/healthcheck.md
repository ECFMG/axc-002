---
id: healthcheck
title: GET /health
sidebar_label: Healthcheck
---

# GET /health

Published contract for the agentCourses API. Reuse this exact payload in implementation, README, Serenity features, acceptance tests, and future task-set validation.

## Request

```http
GET /health
```

## Response

**Status:** `200`

```json
{
  "status": "ok",
  "service": "agentCourses-api",
  "projectCode": "axc",
  "environment": "<local|test|production>",
  "timestamp": "<ISO-8601 string>"
}
```

| Field | Type | Allowed values |
| --- | --- | --- |
| `status` | string | `ok` |
| `service` | string | `agentCourses-api` |
| `projectCode` | string | `axc` |
| `environment` | string | `local`, `test`, or `production` |
| `timestamp` | string | ISO-8601 instant, e.g. `2026-09-15T12:00:00.000Z` |

## Local example

With `pnpm run dev` and Portless:

```bash
curl -k https://api.agentcourses.localhost/health
```

Worktree:

```bash
curl -k https://api.agentcourses.<worktree-name>.localhost/health
```
