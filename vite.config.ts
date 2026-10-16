import { createRequire } from 'node:module';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type Plugin } from 'vite';

/**
 * @sveltejs/kit 2.12+ `$app/state` uses `$state.raw` when it thinks Svelte 5
 * is in use. Detection is `onMount.toString()`, which fails on the SSR build:
 * Svelte 4's server `onMount` is a multiline empty function and does not
 * contain `$$`, so the Svelte 5 branch runs and GET / 500s with
 * `$state is not defined`.
 */
function svelte4KitStateFix(): Plugin {
	const require = createRequire(import.meta.url);
	const svelteMajor = Number.parseInt(require('svelte/package.json').version, 10);

	return {
		name: 'svelte4-kit-state-fix',
		enforce: 'pre',
		transform(code, id) {
			if (svelteMajor >= 5) return;

			const normalized = id.split('?')[0].replace(/\\/g, '/');
			if (!normalized.endsWith('/runtime/client/state.svelte.js')) return;
			if (!code.includes('$state.raw') || !code.includes('const is_legacy')) return;

			const next = code.replace(
				/const is_legacy =[\s\S]*?onMount\.toString\(\)\);/,
				'const is_legacy = true;'
			);

			if (next === code) {
				this.error(
					'svelte4-kit-state-fix: could not patch @sveltejs/kit $app/state is_legacy check'
				);
			}

			return { code: next, map: null };
		}
	};
}

export default defineConfig({
	plugins: [svelte4KitStateFix(), sveltekit()]
});
