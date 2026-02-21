import * as server from '../entries/pages/reset-password/_page.server.ts.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/reset-password/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/reset-password/+page.server.ts";
export const imports = ["_app/immutable/nodes/10.DSAmFyDu.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/BV3VnAY7.js","_app/immutable/chunks/CLeL-Gr1.js","_app/immutable/chunks/DVTYKMIZ.js","_app/immutable/chunks/LJCc-4DW.js","_app/immutable/chunks/tTaZ9371.js","_app/immutable/chunks/BPnsxY1_.js","_app/immutable/chunks/CnRFv2QU.js","_app/immutable/chunks/0UACANsc.js","_app/immutable/chunks/CsT_n9Hh.js"];
export const stylesheets = [];
export const fonts = [];
