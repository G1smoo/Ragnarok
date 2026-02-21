import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.B85v6drJ.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/BV3VnAY7.js","_app/immutable/chunks/CLeL-Gr1.js","_app/immutable/chunks/0UACANsc.js","_app/immutable/chunks/DVTYKMIZ.js","_app/immutable/chunks/CsT_n9Hh.js"];
export const stylesheets = ["_app/immutable/assets/0.CRypAxNF.css"];
export const fonts = [];
