import type { ServiceBase } from '@cellix/api-services-spec';
import type { MongooseSeedwork } from '@cellix/mongoose-seedwork';
import mongoose, { type ConnectOptions, type Mongoose } from 'mongoose';

export type ServiceMongooseOptions = ConnectOptions & { debug?: boolean };

/**
 * MongoDB infrastructure service. The composition root (`apps/api`) starts
 * this when `MONGODB_URI` is set. Healthcheck does not require it.
 */
export class ServiceMongoose implements ServiceBase<MongooseSeedwork.MongooseContextFactory>, MongooseSeedwork.MongooseContextFactory {
	private readonly uri: string;
	private readonly options: ServiceMongooseOptions;
	private serviceInternal: Mongoose | undefined;

	constructor(uri: string, options?: ServiceMongooseOptions) {
		if (!uri || uri.trim() === '') {
			throw new Error('MongoDB uri is required');
		}
		this.uri = uri;
		this.options = options ?? {};
	}

	public async startUp() {
		const { debug, ...options } = this.options;
		this.serviceInternal = await mongoose.connect(this.uri, options);
		if (debug) {
			this.serviceInternal.set('debug', true);
		}
		return this;
	}

	public async shutDown() {
		if (!this.serviceInternal) {
			throw new Error('ServiceMongoose is not started - shutdown cannot proceed');
		}
		await this.serviceInternal.disconnect();
	}

	public get service(): Mongoose {
		if (!this.serviceInternal) {
			throw new Error('ServiceMongoose is not started - cannot access service');
		}
		return this.serviceInternal;
	}
}
