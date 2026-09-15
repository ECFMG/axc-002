import { ValueObject } from '@cellix/domain-seedwork/value-object';

/**
 * Published healthcheck contract. Reuse these constants and types in the
 * REST adapter, docs site, Serenity feature, and future task-set validation.
 */
export const PROJECT_CODE = 'axc' as const;
export const HEALTH_SERVICE_NAME = 'agentCourses-api' as const;
export const RUNTIME_ENVIRONMENTS = ['local', 'test', 'production'] as const;

export type RuntimeEnvironment = (typeof RUNTIME_ENVIRONMENTS)[number];
export type HealthStatus = 'ok';

export type HealthSnapshot = {
	status: HealthStatus;
	service: typeof HEALTH_SERVICE_NAME;
	projectCode: typeof PROJECT_CODE;
	environment: RuntimeEnvironment;
	timestamp: string;
};

type HealthSnapshotProps = {
	environment: RuntimeEnvironment;
	timestamp: string;
};

export class HealthSnapshotValue extends ValueObject<HealthSnapshotProps> {
	public static create(input: { environment: RuntimeEnvironment; now: Date }): HealthSnapshotValue {
		return new HealthSnapshotValue({
			environment: input.environment,
			timestamp: input.now.toISOString(),
		});
	}

	public toJSON(): HealthSnapshot {
		return {
			status: 'ok',
			service: HEALTH_SERVICE_NAME,
			projectCode: PROJECT_CODE,
			environment: this.props.environment,
			timestamp: this.props.timestamp,
		};
	}
}

export function isRuntimeEnvironment(value: string): value is RuntimeEnvironment {
	return (RUNTIME_ENVIRONMENTS as readonly string[]).includes(value);
}

export function createHealthSnapshot(input: { environment: RuntimeEnvironment; now: Date }): HealthSnapshot {
	return HealthSnapshotValue.create(input).toJSON();
}
