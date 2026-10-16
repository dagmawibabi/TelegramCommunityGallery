import vercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import fs from 'node:fs';
import path from 'node:path';

/**
 * adapter-vercel writes `.vc-config.json` `handler` with `path.relative(base + ancestor, entry)`.
 * On Windows `base` is `D:\`, so that becomes `D:\D:\...` and the handler is a backslash
 * path that escapes the function dir. Node on Vercel then rejects the encoded `\`.
 */
function vercelWindowsHandlerFix(options) {
	const inner = vercel(options);
	return {
		...inner,
		adapt: async (builder) => {
			await inner.adapt(builder);
			fixVercelHandlers(path.join('.vercel', 'output', 'functions'));
		}
	};
}

/** @param {string} dir */
function fixVercelHandlers(dir) {
	if (!fs.existsSync(dir)) return;

	/** @type {string[]} */
	const stack = [dir];
	while (stack.length) {
		const current = stack.pop();
		if (!current) continue;

		for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
			const full = path.join(current, entry.name);
			if (entry.isDirectory()) {
				stack.push(full);
				continue;
			}
			if (entry.name !== '.vc-config.json') continue;

			const config = JSON.parse(fs.readFileSync(full, 'utf8'));
			if (typeof config.handler !== 'string') continue;

			const funcDir = path.dirname(full);
			const bundledEntry = path.join(funcDir, '.svelte-kit', 'vercel-tmp', 'index.js');
			let handler = config.handler.replaceAll('\\', '/');

			if ((handler.includes('..') || handler.includes(':')) && fs.existsSync(bundledEntry)) {
				handler = '.svelte-kit/vercel-tmp/index.js';
			}

			if (handler !== config.handler) {
				config.handler = handler;
				fs.writeFileSync(full, `${JSON.stringify(config, null, '\t')}\n`);
			}
		}
	}
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: vercelWindowsHandlerFix({
			runtime: 'nodejs24.x'
		}),
		csrf: {
			trustedOrigins: ['https://telegram.dagmawi.dev']
		}
	}
};

export default config;
