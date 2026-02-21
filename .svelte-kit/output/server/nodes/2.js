

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.D96ytsrF.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/Cbj8hgPs.js","_app/immutable/chunks/BV3VnAY7.js"];
export const stylesheets = [];
export const fonts = [];
