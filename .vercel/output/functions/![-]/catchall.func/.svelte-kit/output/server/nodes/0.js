import * as universal from '../entries/pages/_layout.ts.js';
import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.DJmYglro.js","_app/immutable/chunks/KzS1Q4Fi.js","_app/immutable/chunks/GrH2OH3C.js","_app/immutable/chunks/GQ2kafw3.js","_app/immutable/chunks/Bu40PzFt.js"];
export const stylesheets = ["_app/immutable/assets/0.C2tQ3CQC.css"];
export const fonts = [];
