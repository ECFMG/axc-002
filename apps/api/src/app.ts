import { buildApplicationServicesFactory } from '@axc/application-services';
import { systemClock } from '@axc/persistence';
import { createRestApp } from '@axc/rest';
import { resolveRuntimeEnvironment } from './environment.ts';

/**
 * Composition root helper: constructs persistence ports and injects
 * application services into the Hono REST adapter.
 */
export function composeApiApp(env: NodeJS.ProcessEnv = process.env) {
	const applicationServicesFactory = buildApplicationServicesFactory({
		clock: systemClock,
		environment: () => resolveRuntimeEnvironment(env),
	});
	return createRestApp(applicationServicesFactory);
}
