# agentCourses agent notes

See `README.md` for commands and the healthcheck contract.

## Invariants

- Package manager is pnpm. Do not use npm or yarn.
- Do not add dependency lifecycle scripts. Keep `onlyBuiltDependencies: []`.
- Use `mongodb-memory-server-core`, never `mongodb-memory-server`.
- `apps/api` is the composition root. Domain must not import REST/Hono/Azure/Mongoose/apps.
- Reuse the published `GET /health` JSON contract exactly.
- Prefer isolated git worktrees + `pnpm run dev:worktree`.
- Run `pnpm run verify` before claiming a task is done. If Snyk is SKIPPED, quote the printed reason.

When an LSP tool is available, use it for TypeScript navigation instead of text search.
