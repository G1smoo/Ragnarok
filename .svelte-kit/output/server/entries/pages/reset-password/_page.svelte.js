import { x as attr, y as ensure_array_like } from "../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { e as escape_html } from "../../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, form } = $$props;
    $$renderer2.push(`<div class="m-3 mx-auto max-w-xl rounded-xl bg-base-100 shadow"><form method="POST" action="?/reset" class="flex flex-col p-3 space-y-3"><h1 class="text-center text-2xl font-bold">Nulstil adgangskode</h1> <input type="hidden" name="token"${attr("value", data.token)}/> `);
    if (form?.invalidToken) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div role="alert" class="alert alert-error"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <span>Linket er udløbet eller ugyldigt. <a href="/forgot-password" class="link">Anmod om et nyt.</a></span></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<label class="form-control w-full"><div class="label"><span class="label-text">Ny adgangskode</span></div> <input type="password" name="password" placeholder="Ny adgangskode" class="input input-bordered w-full" required/></label> <label class="form-control w-full"><div class="label"><span class="label-text">Bekræft adgangskode</span></div> <input type="password" name="passwordConfirm" placeholder="Bekræft adgangskode" class="input input-bordered w-full" required/></label> `);
      if (form?.error && form?.errors) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<ul><!--[-->`);
        const each_array = ensure_array_like(form.errors);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let error = each_array[$$index];
          $$renderer2.push(`<li><div role="alert" class="alert alert-error m-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <span>${escape_html(error.message)}</span></div></li>`);
        }
        $$renderer2.push(`<!--]--></ul>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <button class="btn btn-outline btn-primary btn-wide m-3 mx-auto">Gem adgangskode</button>`);
    }
    $$renderer2.push(`<!--]--></form></div>`);
  });
}
export {
  _page as default
};
