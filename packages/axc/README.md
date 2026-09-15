# `@axc/*` workspace packages

These packages are the agentCourses (project code **axc**) application layers. `apps/api` is the composition root: it constructs infrastructure and injects application services into `@axc/rest`.

## Layers

| Package | Responsibility | May import | Must not import |
| --- | --- | --- | --- |
| `@axc/domain` | DDD model, healthcheck contract, future aggregates | `@cellix/domain-seedwork` | REST, Hono, Azure Functions, Mongoose, persistence implementations, `apps/*` |
| `@axc/application-services` | Use cases and request-scoped orchestration | domain, persistence ports | Hono, Azure Functions, Mongoose, `apps/*` |
| `@axc/persistence` | Ports / repository contracts and future adapters | domain | REST, Hono, Azure Functions, `apps/*` |
| `@axc/rest` | Hono routing. Application services are injected. | application-services, domain types, Hono | Azure Functions, Mongoose, `apps/*` |
| `@axc/service-mongoose` | MongoDB / Mongoose infrastructure service | persistence, `@cellix/mongoose-seedwork`, mongoose | domain internals that would invert the dependency rule |

## Healthcheck contract

`GET /health` is owned by domain types and reused by the REST adapter, docs, and Serenity tests:

```json
{
  "status": "ok",
  "service": "agentCourses-api",
  "projectCode": "axc",
  "environment": "<local|test|production>",
  "timestamp": "<ISO-8601 string>"
}
```

## Extension points

- **Domain contexts** — add bounded contexts under `packages/axc/domain/src/contexts/` using `@cellix/domain-seedwork`.
- **Use cases** — add factories under `packages/axc/application-services/src/`.
- **Persistence** — implement ports in `packages/axc/persistence` and mongoose mappings in `packages/axc/service-mongoose`.
- **HTTP** — add Hono routes in `packages/axc/rest`; register nothing Azure-specific there.
- **Composition** — wire new infrastructure in `apps/api` only.

Copied Cellix seedwork lives in `packages/cellix/*` for future domain/persistence/BDD build-out.
