import * as server from '../entries/pages/dashboard/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/dashboard/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.n_8wyalX.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/BV3VnAY7.js","_app/immutable/chunks/CLeL-Gr1.js"];
export const stylesheets = [];
export const fonts = [];
