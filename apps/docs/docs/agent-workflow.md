---
id: agent-workflow
title: Agentic workflow
---

# Agentic workflow

Coding agents implement features in **isolated git worktrees**. They must not share a single `pnpm run dev` process or a single Portless hostname.

## Worktree loop

1. Create a git worktree for the task.
2. `pnpm install --frozen-lockfile`
3. `pnpm run dev:worktree` — Portless hostname is `api.agentcourses.<worktree-folder>.localhost`
4. Implement behind quality gates.
5. `pnpm run verify` before merge. Husky + lint-staged give pre-commit feedback; CI re-runs verify.

## Gates

`pnpm run verify` is the enforcement boundary:

1. Dependency script policy (`onlyBuiltDependencies: []`)
2. Biome format + lint
3. TypeScript compilation (`tsgo`)
4. knip
5. `@e18e/cli analyze`
6. ArchUnit
7. Unit/integration tests
8. Serenity/Cucumber acceptance tests (healthcheck) + HTML report
9. `pnpm audit`
10. Snyk CLI (`--org=agentcourses`). If credentials are missing in the scaffold environment, Snyk is **SKIPPED (non-blocking)** and the reason is printed. It must never fail silently.

## MCP and skills

- MCP: `@e18e/mcp` (see `.mcp.json`)
- Skills: Turborepo, Portless, Serenity/JS under `.agents/skills`
