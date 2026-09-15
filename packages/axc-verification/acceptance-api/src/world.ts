import { buildApplicationServicesFactory } from '@axc/application-services';
import { createRestApp } from '@axc/rest';
import { CallTheApi } from './abilities/call-the-api.ts';

export const api = CallTheApi.using(
	createRestApp(
		buildApplicationServicesFactory({
			clock: { now: () => new Date() },
			environment: () => 'test',
		}),
	),
);
