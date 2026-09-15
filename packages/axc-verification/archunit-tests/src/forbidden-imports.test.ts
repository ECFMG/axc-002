import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const domainRoot = path.join(repoRoot, 'packages/axc/domain/src');

const forbiddenInDomain = ['hono', '@azure/functions', 'mongoose', '@axc/rest', '@axc/service-mongoose', '@axc/persistence', '@apps/api', '@marplex/hono-azurefunc-adapter'];

describe('domain isolation', () => {
	it('does not import REST, Hono, Azure Functions, Mongoose, persistence, or composition code', () => {
		const files = collectTsFiles(domainRoot);
		const violations: string[] = [];

		for (const file of files) {
			const source = readFileSync(file, 'utf8');
			for (const token of forbiddenInDomain) {
				if (source.includes(`from '${token}`) || source.includes(`from "${token}`)) {
					violations.push(`${path.relative(repoRoot, file)} imports ${token}`);
				}
			}
		}

		expect(violations).toStrictEqual([]);
	});
});

function collectTsFiles(dir: string, results: string[] = []): string[] {
	for (const entry of readdirSync(dir)) {
		const full = path.join(dir, entry);
		if (statSync(full).isDirectory()) {
			collectTsFiles(full, results);
			continue;
		}
		if (entry.endsWith('.ts')) {
			results.push(full);
		}
	}
	return results;
}
