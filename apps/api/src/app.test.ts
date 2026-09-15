import { HEALTH_SERVICE_NAME, PROJECT_CODE } from '@axc/domain';
import { describe, expect, it } from 'vitest';
import { composeApiApp } from './app.ts';

describe('composed API', () => {
	it('serves GET /health', async () => {
		const app = composeApiApp({ AXC_ENVIRONMENT: 'test' });
		const response = await app.request('/health');
		expect(response.status).toBe(200);
		const body = (await response.json()) as Record<string, string>;
		expect(body.status).toBe('ok');
		expect(body.service).toBe(HEALTH_SERVICE_NAME);
		expect(body.projectCode).toBe(PROJECT_CODE);
		expect(body.environment).toBe('test');
		expect(typeof body.timestamp).toBe('string');
	});
});
