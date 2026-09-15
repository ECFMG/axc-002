import type { DependencyRulesTestsConfig } from '@cellix/archunit-tests/general';

export const axcDependencyRulesConfig: DependencyRulesTestsConfig = {
	appsGlob: '../../../apps/**',
	packagesGlob: '../../**',
	domainFolder: '../../axc/domain',
	persistenceFolder: '../../axc/persistence',
	applicationServicesFolder: '../../axc/application-services',
	restFolder: '../../axc/rest',
	infrastructurePattern: '../../axc/service-*/**',
	restInfrastructurePattern: '../../axc/service-*/**',
};
