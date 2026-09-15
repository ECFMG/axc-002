---
id: overview
title: Architecture overview
---

# Architecture overview

## Composition

`apps/api` is the **composition root**. It constructs persistence ports (clock, environment) and optional MongoDB, then injects `@axc/application-services` into `@axc/rest`.

```
apps/api
  └── @axc/rest (Hono)
        └── @axc/application-services
              ├── @axc/domain
              └── @axc/persistence (ports)
  └── @axc/service-mongoose (optional infrastructure)
```

## Layer rules

- Domain must not import REST, Hono, Azure Functions, Mongoose, persistence implementations, or composition code.
- Application services orchestrate domain and ports; they do not import Hono or Azure Functions.
- REST is an HTTP adapter only.
- Mongoose mappings live in `@axc/service-mongoose`.
- Azure Functions v4 compatibility is an `apps/api` concern via `@marplex/hono-azurefunc-adapter`.

## Copied Cellix seedwork

`packages/cellix/*` holds reusable seedwork (domain, mongoose, serenity, archunit, rolldown, typescript, local-dev) copied from CellixJS so later product features can grow without re-deriving the platform.
