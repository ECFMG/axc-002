import { app as azureApp } from '@azure/functions';
import { azureHonoHandler } from '@marplex/hono-azurefunc-adapter';
import { composeApiApp } from './app.ts';
import { startOptionalMongoose } from './mongoose-optional.ts';

const honoApp = composeApiApp();

azureApp.http('httpTrigger', {
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
	authLevel: 'anonymous',
	route: '{*proxy}',
	handler: azureHonoHandler(honoApp.fetch),
});

azureApp.hook.appStart(async () => {
	await startOptionalMongoose(process.env);
});
