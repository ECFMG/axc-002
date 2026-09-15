import { isAgent } from 'std-env';

export default {
	paths: ['src/features/**/*.feature'],
	import: ['src/serenity.config.ts', 'src/world.ts', 'src/step-definitions/**/*.ts'],
	format: [...(isAgent ? ['@cellix/serenity-framework/formatters/agent'] : ['progress-bar']), 'json:./reports/cucumber-report-api.json', 'html:./reports/cucumber-report-api.html'],
	formatOptions: {
		snippetInterface: 'async-await',
	},
	parallel: 1,
};
