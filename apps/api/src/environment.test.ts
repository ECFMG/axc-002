import { describe, expect, it } from 'vitest';
import { resolveRuntimeEnvironment } from './environment.ts';

describe('resolveRuntimeEnvironment', () => {
	it('prefers AXC_ENVIRONMENT when it is a published value', () => {
		expect(resolveRuntimeEnvironment({ AXC_ENVIRONMENT: 'production', NODE_ENV: 'test' })).toBe('production');
	});

	it('maps NODE_ENV=test to test', () => {
		expect(resolveRuntimeEnvironment({ NODE_ENV: 'test' })).toBe('test');
	});

	it('defaults to local', () => {
		expect(resolveRuntimeEnvironment({})).toBe('local');
	});
});
