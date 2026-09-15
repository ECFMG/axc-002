#!/usr/bin/env node
/**
 * Creates a run-from-package zip of the Azure Functions deploy directory.
 */
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const apiDir = process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), '../apps/api');
const zipPath = join(apiDir, 'agentCourses-api.zip');

const result = spawnSync('zip', ['-r', '-q', zipPath, 'deploy', '-x', 'deploy/*.zip'], {
	cwd: apiDir,
	stdio: 'inherit',
});

if (result.status !== 0) {
	console.error('Failed to create Azure Functions deployment zip.');
	process.exit(result.status ?? 1);
}

console.log(`Wrote Azure Functions zip: ${zipPath}`);
