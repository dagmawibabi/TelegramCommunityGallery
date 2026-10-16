import * as server from '../entries/pages/_username_/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_username_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/[username]/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.B5ZtINu-.js","_app/immutable/chunks/KzS1Q4Fi.js","_app/immutable/chunks/GrH2OH3C.js","_app/immutable/chunks/-W5s1P4J.js","_app/immutable/chunks/Bu40PzFt.js"];
export const stylesheets = [];
export const fonts = [];
