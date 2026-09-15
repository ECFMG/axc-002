import { HEALTH_SERVICE_NAME, PROJECT_CODE } from '@axc/domain';
import { describe, expect, it } from 'vitest';
import { getHealth } from './get-health.ts';

describe('getHealth', () => {
	it('orchestrates domain health from persistence ports', () => {
		const snapshot = getHealth({
			clock: { now: () => new Date('2026-01-01T00:00:00.000Z') },
			environment: () => 'test',
		});

		expect(snapshot).toStrictEqual({
			status: 'ok',
			service: HEALTH_SERVICE_NAME,
			projectCode: PROJECT_CODE,
			environment: 'test',
			timestamp: '2026-01-01T00:00:00.000Z',
		});
	});
});
