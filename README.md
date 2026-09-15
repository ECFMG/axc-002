# agentCourses (axc)

agentCourses exists to quantify how **harness engineering**, **agentic coding harnesses**, and **model selection** affect software quality and delivery efficiency.

This monorepo is a **dark software factory** scaffold: coding agents implement work in isolated git worktrees, and every output must pass automated quality, architecture, security, and BDD gates.

The first delivered feature is the healthcheck. Product domain beyond that is intentionally not built yet; extension points live under `packages/axc/*` and reusable Cellix seedwork under `packages/cellix/*`.

License: [MIT](./LICENSE)

## Healthcheck contract

`GET /health` → **200**

```json
{
  "status": "ok",
  "service": "agentCourses-api",
  "projectCode": "axc",
  "environment": "<local|test|production>",
  "timestamp": "<ISO-8601 string>"
}
```

`environment` is `local`, `test`, or `production`. Override with `AXC_ENVIRONMENT`. This contract is shared by the API, this README, the docs site, the Serenity feature, and acceptance tests.

## Tooling

- pnpm `>=11` (npm and yarn are not used)
- Node.js 24 (see `.nvmrc`)
- Turborepo, Biome, knip, `@e18e/cli`, ArchUnit, Serenity/JS + Cucumber, Snyk CLI, Portless
- No dependency lifecycle scripts (`onlyBuiltDependencies: []`). Tests use `mongodb-memory-server-core`, not `mongodb-memory-server`.

```bash
nvm use
pnpm install --frozen-lockfile
```

## Commands (Turborepo)

| Command | What it does |
| --- | --- |
| `pnpm run dev` | Starts the API behind Portless with hot reload (`https://api.agentcourses.localhost/health`) |
| `pnpm run dev:worktree` | Same, with hostname `api.agentcourses.<worktree-folder>.localhost` |
| `pnpm run test` | Unit/integration tests and Serenity/Cucumber acceptance tests for healthcheck |
| `pnpm run verify` | Full gate: script policy, Biome, TypeScript, knip, e18e, ArchUnit, tests, Serenity, `pnpm audit`, Snyk |
| `pnpm run build` | Rolldown-bundles the API and writes `apps/api/agentCourses-api.zip` for Azure Functions run-from-package |
| `pnpm run start` | Starts the **built** API with Azure Functions Core Tools (`func start --script-root deploy/`) |

Docs: `pnpm run dev:docs` → `https://docs.agentcourses.localhost`

### Snyk

`pnpm run verify` always **attempts** Snyk (`snyk test --org=agentcourses`, local CLI only; no `snyk monitor`, no `--remote-repo-url`).

If credentials are missing in this scaffold environment, the gate prints **`Snyk SKIPPED (non-blocking for first scaffold)`** and the reason. It does not fail silently. Authenticate with `snyk auth` or `SNYK_TOKEN` to make the gate blocking.

### Husky

Husky + lint-staged run on pre-commit (Biome on staged files, then `pnpm run verify`) so agent-authored changes get local feedback. **CI and `pnpm run verify` remain the enforcement boundary** if hooks are skipped.

## Layout

```
apps/api                 composition root (Hono + Azure Functions adapter)
apps/docs                Docusaurus (API, MADR, SRTM)
packages/axc/*           domain, application-services, rest, persistence, service-mongoose
packages/axc-verification/acceptance-api    Serenity/Cucumber
packages/axc-verification/archunit-tests    architecture tests
packages/cellix/*        copied Cellix seedwork for later build-out
```

`apps/api` injects `@axc/application-services` into `@axc/rest`. Domain packages must not import REST, Hono, Azure Functions, Mongoose, persistence implementations, or composition code.

## Parallel agent worktrees

```bash
git worktree add ../axc-task-n -b task/n
cd ../axc-task-n
pnpm install --frozen-lockfile
pnpm run dev:worktree
```

Portless + Turborepo keep ports and hostnames isolated per worktree directory name.

## MCP and skills

- `.mcp.json` — `@e18e/mcp`
- `.agents/skills` — Turborepo, Portless, Serenity/JS
