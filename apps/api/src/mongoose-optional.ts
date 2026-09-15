import { ServiceMongoose } from '@axc/service-mongoose';

/**
 * Optional MongoDB startup. Healthcheck does not require a database.
 * Set MONGODB_URI when future persistence features need MongoDB.
 */
export async function startOptionalMongoose(env: NodeJS.ProcessEnv): Promise<ServiceMongoose | undefined> {
	// biome-ignore lint/complexity/useLiteralKeys: ProcessEnv is an index signature
	const uri = env['MONGODB_URI'];
	if (!uri || uri.trim() === '') {
		return undefined;
	}

	const service = new ServiceMongoose(uri);
	await service.startUp();
	return service;
}
