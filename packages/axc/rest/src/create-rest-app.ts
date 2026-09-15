import type { ApplicationServicesFactory } from '@axc/application-services';
import { Hono } from 'hono';

/**
 * HTTP adapter. Application services are injected by the composition root
 * (`apps/api`). This package must not construct infrastructure.
 */
export function createRestApp(applicationServicesFactory: ApplicationServicesFactory): Hono {
	const app = new Hono();

	app.get('/health', async (c) => {
		const applicationServices = await applicationServicesFactory.forRequest();
		return c.json(applicationServices.health.getStatus(), 200);
	});

	return app;
}
