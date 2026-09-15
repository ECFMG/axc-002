import { describe, expect, it } from 'vitest';
import { systemClock } from './clock.ts';

describe('systemClock', () => {
	it('returns a Date', () => {
		expect(systemClock.now()).toBeInstanceOf(Date);
	});
});
