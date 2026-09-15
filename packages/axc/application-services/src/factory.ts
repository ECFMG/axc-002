import type { HealthSnapshot } from '@axc/domain';
import type { PersistencePorts } from '@axc/persistence';
import { getHealth } from './health/get-health.ts';

export type ApplicationServices = {
	health: {
		getStatus(): HealthSnapshot;
	};
};

export type ApplicationServicesFactory = {
	forRequest(): Promise<ApplicationServices>;
};

export function buildApplicationServicesFactory(ports: PersistencePorts): ApplicationServicesFactory {
	return {
		forRequest(): Promise<ApplicationServices> {
			return Promise.resolve({
				health: {
					getStatus: () => getHealth(ports),
				},
			});
		},
	};
}
