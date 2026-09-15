import { createHealthSnapshot, type HealthSnapshot } from '@axc/domain';
import type { PersistencePorts } from '@axc/persistence';

export function getHealth(ports: PersistencePorts): HealthSnapshot {
	return createHealthSnapshot({
		environment: ports.environment(),
		now: ports.clock.now(),
	});
}
