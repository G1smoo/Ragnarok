import { y as ensure_array_like, x as attr, z as stringify } from "../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, form } = $$props;
    function formatDate(d) {
      if (!d) return "";
      return new Date(d).toLocaleDateString("da-DK");
    }
    $$renderer2.push(`<div class="m-3 mx-auto max-w-7xl space-y-4"><div class="flex items-center justify-between"><div class="flex items-center gap-3"><a href="/dashboard" class="btn btn-ghost btn-sm">← Tilbage</a> <h1 class="text-2xl font-bold">Løb</h1></div> <button class="btn btn-primary btn-sm">+ Nyt løb</button></div> `);
    if (data.runs.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="card bg-base-100 shadow"><div class="card-body text-center text-base-content/50">Ingen løb endnu. Opret det første løb.</div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
      const each_array = ensure_array_like(data.runs);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let run = each_array[$$index];
        $$renderer2.push(`<a${attr("href", `/dashboard/runs/${stringify(run.id)}`)} class="card bg-base-100 shadow hover:shadow-md transition-shadow"><div class="card-body"><h2 class="card-title">${escape_html(run.name)}</h2> `);
        if (run.date) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<p class="text-sm text-base-content/60">${escape_html(formatDate(run.date))}</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> <div class="card-actions justify-end mt-2"><span class="btn btn-sm btn-outline">Åbn →</span></div></div></a>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div> <dialog class="modal"><div class="modal-box max-w-md"><h3 class="font-bold text-lg">Nyt løb</h3> <p class="text-sm text-base-content/50 mt-1 mb-6">Giv løbet et navn og valgfrit en dato.</p> <form method="POST" action="?/create" class="space-y-4"><label class="form-control w-full"><div class="label"><span class="label-text">Navn</span></div> <input type="text" name="name" class="input input-bordered" placeholder="Ragnarok 2026" required/></label> <label class="form-control w-full"><div class="label"><span class="label-text">Dato</span> <span class="label-text-alt text-base-content/40">Valgfrit</span></div> <input type="date" name="date" class="input input-bordered"/></label> `);
    if (form?.error) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<!--[-->`);
      const each_array_1 = ensure_array_like(form.errors ?? []);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let err = each_array_1[$$index_1];
        $$renderer2.push(`<div role="alert" class="alert alert-error py-2"><span class="text-sm">${escape_html(err.message)}</span></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="modal-action pt-2"><button type="button" class="btn btn-ghost">Annuller</button> <button type="submit" class="btn btn-primary">Opret løb</button></div></form></div> <form method="dialog" class="modal-backdrop"><button>close</button></form></dialog>`);
  });
}
export {
  _page as default
};
