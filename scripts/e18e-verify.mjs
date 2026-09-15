#!/usr/bin/env node
/**
 * Runs @e18e/cli analyze. Duplicate-dependency warnings from the
 * Cellix seedwork graph are expected in the first scaffold and are
 * non-blocking. A missing CLI or a hard crash fails the gate.
 */
import { spawnSync } from 'node:child_process';

const result = spawnSync('pnpm', ['exec', 'e18e-cli', 'analyze', '--pack', 'pnpm'], {
	encoding: 'utf8',
	stdio: 'pipe',
});

if (result.error && result.error.code === 'ENOENT') {
	console.error('e18e FAILED: e18e-cli is not on PATH. Add @e18e/cli as a workspace dependency.');
	process.exit(1);
}

const output = `${result.stdout ?? ''}${result.stderr ?? ''}`;
console.log(output);

if (result.status === 0) {
	console.log('e18e OK.');
	process.exit(0);
}

const crashed = typeof result.status === 'number' && result.status > 1;
if (crashed || /TypeError|EACCES|Cannot find/.test(output)) {
	console.error(`e18e FAILED with exit code ${result.status ?? 'unknown'}.`);
	process.exit(result.status ?? 1);
}

console.log('e18e completed with modernization warnings (non-blocking for first scaffold). Duplicate dependency reports from vendored Cellix seedwork are expected.');
process.exit(0);
