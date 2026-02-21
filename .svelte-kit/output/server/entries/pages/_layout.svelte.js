import { w as head, x as attr } from "../../chunks/index2.js";
import { e as escape_html } from "../../chunks/escaping.js";
const favicon = "/_app/immutable/assets/favicon.B7q1eeWj.png";
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, children } = $$props;
    head($$renderer2, ($$renderer3) => {
      $$renderer3.push(`<link rel="icon"${attr("href", favicon)}/>`);
    });
    $$renderer2.push(`<div class="navbar bg-base-100 shadow-sm"><div class="flex-1"><a class="btn btn-ghost text-xl items-center gap-2" href="/dashboard"><img${attr("src", favicon)} alt="Ragnarok" class="w-50 h-8"/></a></div> <div class="flex-none"><ul class="menu menu-horizontal px-1 space-x-2">`);
    if (data.currentUser) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<li><button>${escape_html(data.currentUser?.email)}</button></li> <li class="whitespace-nowrap"><form method="POST" action="/signout" class="whitespace-nowrap"><button>Log ud</button></form></li>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<li><a href="/signin">Log ind</a></li>`);
    }
    $$renderer2.push(`<!--]--></ul></div></div> `);
    children?.($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
export {
  _layout as default
};
