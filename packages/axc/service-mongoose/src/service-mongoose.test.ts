import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('mongoose', () => {
	const connect = vi.fn();
	return {
		default: { connect },
		connect,
	};
});

import { ServiceMongoose } from './service-mongoose.ts';

describe('ServiceMongoose', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('rejects an empty uri', () => {
		expect(() => new ServiceMongoose('')).toThrow('MongoDB uri is required');
	});

	it('connects on startUp and disconnects on shutDown', async () => {
		const mongooseModule = await import('mongoose');
		const disconnect = vi.fn().mockResolvedValue(undefined);
		const set = vi.fn();
		vi.mocked(mongooseModule.connect).mockResolvedValue({ disconnect, set } as never);

		const service = new ServiceMongoose('mongodb://localhost:27017/axc');
		await service.startUp();
		expect(service.service).toBeDefined();
		await service.shutDown();
		expect(disconnect).toHaveBeenCalledOnce();
	});
});
