import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.DTtAIbKE.js","_app/immutable/chunks/KzS1Q4Fi.js","_app/immutable/chunks/GrH2OH3C.js","_app/immutable/chunks/-W5s1P4J.js","_app/immutable/chunks/Bu40PzFt.js","_app/immutable/chunks/B_lkpg3t.js","_app/immutable/chunks/GQ2kafw3.js"];
export const stylesheets = ["_app/immutable/assets/2.BhI0NH7-.css"];
export const fonts = [];
