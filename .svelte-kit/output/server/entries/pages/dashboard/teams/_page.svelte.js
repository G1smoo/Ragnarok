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
    let memberCount = 3;
    function pad(n) {
      return String(n).padStart(2, "0");
    }
    $$renderer2.push(`<div class="m-3 mx-auto max-w-7xl space-y-4"><div class="flex items-center justify-between"><div class="flex items-center gap-3"><a href="/dashboard" class="btn btn-ghost btn-sm">← Tilbage</a> <h1 class="text-2xl font-bold">Hold</h1></div> <button class="btn btn-primary btn-sm">+ Nyt hold</button></div> `);
    if (data.teams.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="card bg-base-100 shadow"><div class="card-body text-center text-base-content/50">Ingen hold endnu. Opret det første hold.</div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="card bg-base-100 shadow overflow-x-auto"><table class="table table-zebra"><thead><tr><th>Patruljenavn</th><th>Gruppenavn</th><th class="text-center">Antal</th><th>Leder</th><th>Telefon</th><th>Email</th></tr></thead><tbody><!--[-->`);
      const each_array = ensure_array_like(data.teams);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let team = each_array[$$index];
        $$renderer2.push(`<tr class="hover cursor-pointer"><td class="font-medium">${escape_html(team.team_name)}</td><td>${escape_html(team.group_name)}</td><td class="text-center">${escape_html(team.team_number)}</td><td>${escape_html(team.contact_name)}</td><td>${escape_html(team.contact_phone)}</td><td>${escape_html(team.contact_email)}</td></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table></div>`);
    }
    $$renderer2.push(`<!--]--></div> <dialog class="modal"><div class="modal-box max-w-2xl"><h3 class="font-bold text-lg">Opret nyt hold</h3> <p class="text-sm text-base-content/50 mt-1 mb-6">Udfyld oplysninger om patruljen og den ansvarlige leder.</p> <form method="POST" action="?/create" class="space-y-5"><div class="space-y-3"><p class="text-xs font-semibold uppercase tracking-wide text-base-content/40">Patrulje</p> <div class="grid grid-cols-1 sm:grid-cols-2 gap-3"><label class="form-control w-full"><div class="label"><span class="label-text">Patruljenavn</span></div> <input type="text" name="team_name" class="input input-bordered" placeholder="Ulvene" required/></label> <label class="form-control w-full"><div class="label"><span class="label-text">Gruppenavn</span></div> <input type="text" name="group_name" class="input input-bordered" placeholder="1. Aarhus" required/></label></div> <label class="form-control w-32"><div class="label"><span class="label-text">Antal deltagere</span> <span class="label-text-alt text-base-content/40">3–6</span></div> <input type="number" name="team_number" class="input input-bordered" min="3" max="6" placeholder="4" required${attr("value", memberCount)}/></label></div> <div class="divider my-0"></div> <div class="space-y-3"><p class="text-xs font-semibold uppercase tracking-wide text-base-content/40">Ansvarlig leder</p> <div class="grid grid-cols-1 sm:grid-cols-2 gap-3"><label class="form-control w-full"><div class="label"><span class="label-text">Navn</span></div> <input type="text" name="contact_name" class="input input-bordered" placeholder="Anders Jensen" required/></label> <label class="form-control w-full"><div class="label"><span class="label-text">Telefon</span></div> <input type="text" name="contact_phone" class="input input-bordered" placeholder="12 34 56 78" required/></label></div> <label class="form-control w-full"><div class="label"><span class="label-text">Email</span></div> <input type="email" name="contact_email" class="input input-bordered" placeholder="anders@spejder.dk" required/></label></div> <div class="divider my-0"></div> <div class="space-y-4"><p class="text-xs font-semibold uppercase tracking-wide text-base-content/40">Deltagere <span class="normal-case font-normal ml-1 text-base-content/30">(${escape_html(Math.min(Math.max(memberCount, 3), 6))} personer)</span></p> <!--[-->`);
    const each_array_1 = ensure_array_like(Array.from({ length: Math.min(Math.max(memberCount, 3), 6) }, (_, i) => i + 1));
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let num = each_array_1[$$index_1];
      $$renderer2.push(`<div class="border border-base-300 rounded-lg p-3 space-y-2"><p class="text-xs text-base-content/40 font-medium">Deltager ${escape_html(num)}</p> <div class="grid grid-cols-2 gap-2"><label class="form-control col-span-2 sm:col-span-1"><div class="label py-0.5"><span class="label-text text-xs">Navn</span></div> <input type="text"${attr("name", `member${stringify(pad(num))}_name`)} class="input input-bordered input-sm" placeholder="Fulde navn"/></label> <label class="form-control"><div class="label py-0.5"><span class="label-text text-xs">Alder</span></div> <input type="text"${attr("name", `member${stringify(pad(num))}_age`)} class="input input-bordered input-sm" placeholder="12"/></label></div> <label class="form-control w-full"><div class="label py-0.5"><span class="label-text text-xs">Noter <span class="text-base-content/30">(valgfrit)</span></span></div> <input type="text"${attr("name", `member${stringify(pad(num))}_notes`)} class="input input-bordered input-sm" placeholder="Allergi, særlige behov..."/></label></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (form?.error) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<!--[-->`);
      const each_array_2 = ensure_array_like(form.errors ?? []);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let err = each_array_2[$$index_2];
        $$renderer2.push(`<div role="alert" class="alert alert-error py-2"><span class="text-sm">${escape_html(err.message)}</span></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="modal-action pt-2"><button type="button" class="btn btn-ghost">Annuller</button> <button type="submit" class="btn btn-primary">Opret hold</button></div></form></div> <form method="dialog" class="modal-backdrop"><button>close</button></form></dialog>`);
  });
}
export {
  _page as default
};
