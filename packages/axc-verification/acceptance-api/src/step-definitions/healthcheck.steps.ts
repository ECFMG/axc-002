import { RUNTIME_ENVIRONMENTS } from '@axc/domain';
import { Then, When } from '@cucumber/cucumber';
import { Ensure, equals, isTrue } from '@serenity-js/assertions';
import { actorCalled } from '@serenity-js/core';
import { api } from '../world.ts';

When('a client requests GET \\/health', async () => {
	await api.get('/health');
	await actorCalled('Operator').attemptsTo(Ensure.that(api.lastResponse !== undefined, isTrue()));
});

Then('the response status is {int}', async (status: number) => {
	await actorCalled('Operator').attemptsTo(Ensure.that(api.lastResponse?.status, equals(status)));
});

Then('the response body field {string} is {string}', async (field: string, value: string) => {
	await actorCalled('Operator').attemptsTo(Ensure.that(String(api.lastResponse?.body[field]), equals(value)));
});

Then('the environment is one of local, test, production', async () => {
	// biome-ignore lint/complexity/useLiteralKeys: JSON body is an index signature
	const environment = String(api.lastResponse?.body['environment']);
	await actorCalled('Operator').attemptsTo(Ensure.that((RUNTIME_ENVIRONMENTS as readonly string[]).includes(environment), isTrue()));
});

Then('timestamp is an ISO-8601 string', async () => {
	// biome-ignore lint/complexity/useLiteralKeys: JSON body is an index signature
	const timestamp = String(api.lastResponse?.body['timestamp']);
	const parsed = Date.parse(timestamp);
	await actorCalled('Operator').attemptsTo(Ensure.that(Number.isNaN(parsed), equals(false)));
	await actorCalled('Operator').attemptsTo(Ensure.that(new Date(timestamp).toISOString(), equals(timestamp)));
});
