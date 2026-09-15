import { buildApplicationServicesFactory } from '@axc/application-services';
import { HEALTH_SERVICE_NAME, PROJECT_CODE } from '@axc/domain';
import { describe, expect, it } from 'vitest';
import { createRestApp } from './create-rest-app.ts';

describe('GET /health', () => {
	it('returns the published healthcheck contract', async () => {
		const app = createRestApp(
			buildApplicationServicesFactory({
				clock: { now: () => new Date('2026-09-15T08:30:00.000Z') },
				environment: () => 'local',
			}),
		);

		const response = await app.request('/health');
		expect(response.status).toBe(200);
		expect(await response.json()).toStrictEqual({
			status: 'ok',
			service: HEALTH_SERVICE_NAME,
			projectCode: PROJECT_CODE,
			environment: 'local',
			timestamp: '2026-09-15T08:30:00.000Z',
		});
	});
});
