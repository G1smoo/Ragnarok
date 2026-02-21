import * as server from '../entries/pages/sub/helper/_page.server.ts.js';

export const index = 13;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/sub/helper/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/sub/helper/+page.server.ts";
export const imports = ["_app/immutable/nodes/13.BDBCl83t.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/BV3VnAY7.js","_app/immutable/chunks/tTaZ9371.js","_app/immutable/chunks/BPnsxY1_.js","_app/immutable/chunks/CnRFv2QU.js","_app/immutable/chunks/CLeL-Gr1.js","_app/immutable/chunks/0UACANsc.js"];
export const stylesheets = [];
export const fonts = [];
