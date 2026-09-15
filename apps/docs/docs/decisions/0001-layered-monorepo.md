---
id: 0001-layered-monorepo
title: "0001. Layered pnpm/Turborepo monorepo"
---

# 0001. Layered pnpm/Turborepo monorepo

- **Status:** accepted
- **Date:** 2026-09-15
- **Deciders:** agentCourses scaffold

## Context

agentCourses needs isolated agent worktrees, shared quality gates, and a DDD layout that can grow without rewriting the factory.

## Decision

Use pnpm workspaces + Turborepo. Application layers live under `packages/axc/*`. Verification lives under `packages/axc-verification/*`. Cellix seedwork is vendored under `packages/cellix/*`. The HTTP surface is Hono, deployed as Azure Functions v4 via a rolldown zip.

## Consequences

- Agents run `pnpm run verify` as the enforcement boundary.
- Parallel worktrees use Portless hostnames `*.<worktree>.localhost`.
- Domain growth plugs into existing ports rather than new runtimes.
