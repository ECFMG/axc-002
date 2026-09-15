import { ConsoleReporter } from '@serenity-js/console-reporter';
import { ArtifactArchiver, configure } from '@serenity-js/core';
import { SerenityBDDReporter } from '@serenity-js/serenity-bdd';

configure({
	crew: [
		ConsoleReporter.withDefaultColourSupport(),
		SerenityBDDReporter.fromJSON({
			specDirectory: './src/features',
		}) as never,
		ArtifactArchiver.storingArtifactsAt('./target/site/serenity'),
	],
});
