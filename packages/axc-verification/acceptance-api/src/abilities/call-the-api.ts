import { Ability } from '@serenity-js/core';
import type { Hono } from 'hono';

export type HealthResponse = {
	status: number;
	body: Record<string, unknown>;
};

export class CallTheApi extends Ability {
	public lastResponse: HealthResponse | undefined;

	private readonly app: Hono;

	private constructor(app: Hono) {
		super();
		this.app = app;
	}

	public static using(app: Hono): CallTheApi {
		return new CallTheApi(app);
	}

	public async get(path: string): Promise<HealthResponse> {
		const response = await this.app.request(path);
		this.lastResponse = {
			status: response.status,
			body: (await response.json()) as Record<string, unknown>,
		};
		return this.lastResponse;
	}
}
