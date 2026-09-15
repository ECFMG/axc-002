import { describe, expect, it } from 'vitest';
import { createHealthSnapshot, HEALTH_SERVICE_NAME, PROJECT_CODE } from './health-snapshot.ts';

describe('createHealthSnapshot', () => {
	it('returns the published healthcheck contract', () => {
		const now = new Date('2026-09-15T12:00:00.000Z');
		expect(createHealthSnapshot({ environment: 'local', now })).toStrictEqual({
			status: 'ok',
			service: HEALTH_SERVICE_NAME,
			projectCode: PROJECT_CODE,
			environment: 'local',
			timestamp: '2026-09-15T12:00:00.000Z',
		});
	});
});
