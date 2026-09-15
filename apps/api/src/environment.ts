import { isRuntimeEnvironment, type RuntimeEnvironment } from '@axc/domain';

export function resolveRuntimeEnvironment(env: NodeJS.ProcessEnv): RuntimeEnvironment {
	// biome-ignore lint/complexity/useLiteralKeys: ProcessEnv is an index signature
	const explicit = env['AXC_ENVIRONMENT'];
	if (explicit && isRuntimeEnvironment(explicit)) {
		return explicit;
	}

	// biome-ignore lint/complexity/useLiteralKeys: ProcessEnv is an index signature
	if (env['NODE_ENV'] === 'production') {
		return 'production';
	}
	// biome-ignore lint/complexity/useLiteralKeys: ProcessEnv is an index signature
	if (env['NODE_ENV'] === 'test') {
		return 'test';
	}
	return 'local';
}
