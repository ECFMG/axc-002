#!/usr/bin/env node
/**
 * Local Snyk CLI gate.
 *
 * Organization: agentcourses
 * First-scaffold policy: if credentials or org access are missing, report
 * SKIPPED (non-blocking) with an explicit reason. Never fail silently.
 * Vulnerability findings are blocking when Snyk can actually run.
 *
 * Monitor / --remote-repo-url are intentionally unused.
 */
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const org = 'agentcourses';
const exclude = 'dist,build,.turbo,coverage,.agents-work,.agents,.github,docs,deploy';

function hasCredentials() {
	if (process.env.SNYK_TOKEN && process.env.SNYK_TOKEN.trim() !== '') {
		return { ok: true, source: 'SNYK_TOKEN' };
	}
	const configCandidates = [join(homedir(), 'Library/Application Support/snyk/snyk.json'), join(homedir(), '.config/configstore/snyk.json'), join(homedir(), '.config/snyk/snyk.json')];
	for (const candidate of configCandidates) {
		if (existsSync(candidate)) {
			return { ok: true, source: candidate };
		}
	}
	return { ok: false, source: null };
}

function isUnavailable(output) {
	return /Authentication|Unauthorized|SNYK_TOKEN|Could not find org|Organisation .+ not found|org not found|403|401|Forbidden|not a member/i.test(output);
}

function skip(reason) {
	console.warn(`Snyk SKIPPED (non-blocking for first scaffold): ${reason}`);
	console.warn(`To enforce this gate, run \`snyk auth\` for org "${org}" or export SNYK_TOKEN, then re-run pnpm run verify.`);
	process.exit(0);
}

const credentials = hasCredentials();
if (!credentials.ok) {
	skip('credentials unavailable (SNYK_TOKEN unset and no local Snyk CLI config).');
}

console.log(`Snyk credentials detected via ${credentials.source}. Running snyk test --org=${org} (local CLI only).`);

const test = spawnSync('snyk', ['test', '--all-projects', `--org=${org}`, '--policy-path=.snyk', `--exclude=${exclude}`], {
	encoding: 'utf8',
});

if (test.error && test.error.code === 'ENOENT') {
	skip('snyk CLI is not on PATH.');
}

const testOutput = `${test.stdout ?? ''}${test.stderr ?? ''}`;
process.stdout.write(testOutput);

if (test.status !== 0) {
	if (isUnavailable(testOutput)) {
		skip('Snyk could not access org "agentcourses" with the current credentials.');
	}
	console.error(`Snyk test failed with exit code ${test.status ?? 'unknown'}.`);
	process.exit(test.status ?? 1);
}

const code = spawnSync('snyk', ['code', 'test', `--org=${org}`], { encoding: 'utf8' });
const codeOutput = `${code.stdout ?? ''}${code.stderr ?? ''}`;
process.stdout.write(codeOutput);

if (code.status !== 0) {
	if (isUnavailable(codeOutput)) {
		skip('Snyk Code could not access org "agentcourses" with the current credentials.');
	}
	console.error(`Snyk code test failed with exit code ${code.status ?? 'unknown'}.`);
	process.exit(code.status ?? 1);
}

console.log('Snyk OK.');
