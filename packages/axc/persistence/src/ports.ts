import type { RuntimeEnvironment } from '@axc/domain';
import type { Clock } from './clock.ts';

/**
 * Persistence ports for future bounded contexts.
 * Healthcheck does not require a database; repositories are added here as
 * the domain grows. Implementations belong in `@axc/service-mongoose`.
 */
export type PersistencePorts = {
	clock: Clock;
	environment(): RuntimeEnvironment;
};
