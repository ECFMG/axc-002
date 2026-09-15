import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
	title: 'agentCourses',
	tagline: 'A dark software factory for measuring harness engineering and model selection',
	favicon: 'img/favicon.svg',
	future: {
		v4: {},
	},
	url: 'https://agentcourses.local',
	baseUrl: '/',
	organizationName: 'agentcourses',
	projectName: 'agentCourses',
	onBrokenLinks: 'throw',
	markdown: {
		hooks: {
			onBrokenMarkdownLinks: 'warn',
		},
	},
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},
	presets: [
		[
			'classic',
			{
				docs: {
					sidebarPath: './sidebars.ts',
					editUrl: undefined,
				},
				blog: false,
				theme: {
					customCss: './src/css/custom.css',
				},
			} satisfies Preset.Options,
		],
	],
	themeConfig: {
		navbar: {
			title: 'agentCourses',
			items: [
				{ type: 'docSidebar', sidebarId: 'docsSidebar', position: 'left', label: 'Docs' },
				{ href: 'https://github.com', label: 'Source', position: 'right' },
			],
		},
		footer: {
			style: 'dark',
			copyright: `Copyright © ${new Date().getFullYear()} agentCourses. MIT License.`,
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
	} satisfies Preset.ThemeConfig,
};

export default config;
