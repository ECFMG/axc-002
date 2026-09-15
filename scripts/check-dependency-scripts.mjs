#!/usr/bin/env node
/**
 * Dependency lifecycle-script policy.
 *
 * agentCourses forbids install-time scripts from dependencies
 * (`onlyBuiltDependencies` must stay empty). Project scripts such as
 * `prepare` (husky) remain allowed. The `mongodb-memory-server` wrapper
 * (postinstall binary download) is banned; use `mongodb-memory-server-core`.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];

const workspace = readFileSync(join(root, 'pnpm-workspace.yaml'), 'utf8');
if (!/allowBuilds:/.test(workspace)) {
	errors.push('pnpm-workspace.yaml must declare allowBuilds so dependency lifecycle scripts are explicit.');
}
for (const match of workspace.matchAll(/^[\t ]{2}([^:\n]+):\s*(true|false)/gm)) {
	const name = match[1].trim();
	const allowed = match[2] === 'true';
	if (allowed) {
		errors.push(`pnpm-workspace.yaml allowBuilds.${name} must be false (no dependency lifecycle scripts).`);
	}
}

const forbiddenPackages = new Set(['mongodb-memory-server']);

for (const file of collectPackageJsonFiles(root)) {
	const pkg = JSON.parse(readFileSync(file, 'utf8'));
	for (const section of ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies']) {
		const deps = pkg[section];
		if (!deps) {
			continue;
		}
		for (const name of Object.keys(deps)) {
			if (forbiddenPackages.has(name)) {
				errors.push(`${file}: forbids ${name}; use mongodb-memory-server-core (no postinstall download script).`);
			}
		}
	}
}

if (errors.length > 0) {
	console.error('Dependency script policy FAILED:');
	for (const error of errors) {
		console.error(`  - ${error}`);
	}
	process.exit(1);
}

console.log('Dependency script policy OK: allowBuilds entries are all false; mongodb-memory-server wrapper is not used.');

function collectPackageJsonFiles(dir, results = []) {
	const skip = new Set(['node_modules', 'dist', 'build', 'deploy', 'coverage', '.turbo', '.git']);
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		if (entry.isDirectory()) {
			if (!skip.has(entry.name)) {
				collectPackageJsonFiles(join(dir, entry.name), results);
			}
			continue;
		}
		if (entry.isFile() && entry.name === 'package.json') {
			results.push(join(dir, entry.name));
		}
	}
	return results;
}
