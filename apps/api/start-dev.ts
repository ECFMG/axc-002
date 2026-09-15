import { serve } from '@hono/node-server';
import { composeApiApp } from './src/app.ts';

/**
 * Local hot-reload entry. Portless binds the public hostname and injects PORT.
 * Git worktrees use `pnpm run dev:worktree` so hostnames stay isolated.
 */
// biome-ignore lint/complexity/useLiteralKeys: ProcessEnv is an index signature
const port = Number(process.env['PORT'] ?? '7071');
const app = composeApiApp();

serve(
	{
		fetch: app.fetch,
		port,
		hostname: '127.0.0.1',
	},
	(info) => {
		console.log(`agentCourses-api listening on http://127.0.0.1:${info.port}/health`);
	},
);
