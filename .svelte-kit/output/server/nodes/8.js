import * as server from '../entries/pages/dashboard/teams/_id_/_page.server.ts.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/teams/_id_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/dashboard/teams/[id]/+page.server.ts";
export const imports = ["_app/immutable/nodes/8.CtuUFD_3.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/BV3VnAY7.js","_app/immutable/chunks/CLeL-Gr1.js","_app/immutable/chunks/DVTYKMIZ.js","_app/immutable/chunks/LJCc-4DW.js","_app/immutable/chunks/tTaZ9371.js","_app/immutable/chunks/BPnsxY1_.js","_app/immutable/chunks/CnRFv2QU.js","_app/immutable/chunks/0UACANsc.js","_app/immutable/chunks/CsT_n9Hh.js","_app/immutable/chunks/B4OLx-bc.js"];
export const stylesheets = [];
export const fonts = [];
