import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
	docsSidebar: [
		'intro',
		'agent-workflow',
		{
			type: 'category',
			label: 'API',
			items: ['api/healthcheck'],
		},
		{
			type: 'category',
			label: 'Architecture',
			items: ['architecture/overview'],
		},
		{
			type: 'category',
			label: 'Decisions (MADR)',
			items: ['decisions/0001-layered-monorepo'],
		},
		{
			type: 'category',
			label: 'SRTM',
			items: ['srtm/healthcheck'],
		},
	],
};

export default sidebars;
