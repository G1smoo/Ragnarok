import { x as attr, z as stringify, y as ensure_array_like } from "../../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../../chunks/exports.js";
import "../../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../../chunks/state.svelte.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, form } = $$props;
    function fmt(iso) {
      if (!iso) return "";
      return new Date(iso).toLocaleTimeString("da-DK", { hour: "2-digit", minute: "2-digit" });
    }
    const totalPoints = data.history.reduce((sum, h) => sum + h.total, 0);
    const completedPosts = data.history.filter((h) => h.checked_out).length;
    $$renderer2.push(`<div class="m-3 mx-auto max-w-3xl space-y-6"><div class="flex flex-wrap items-center gap-3"><a href="/dashboard/teams" class="btn btn-ghost btn-sm">← Tilbage</a> <h1 class="text-2xl font-bold flex-1">${escape_html(data.team.team_name)}</h1> <button class="btn btn-error btn-sm">Slet hold</button></div> <div class="card bg-base-100 shadow"><div class="card-body"><h2 class="card-title text-base mb-3">Holdoplysninger</h2> <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm"><div><dt class="text-base-content/50 text-xs uppercase tracking-wide">Patruljenavn</dt> <dd class="font-medium mt-0.5">${escape_html(data.team.team_name)}</dd></div> <div><dt class="text-base-content/50 text-xs uppercase tracking-wide">Gruppenavn</dt> <dd class="font-medium mt-0.5">${escape_html(data.team.group_name)}</dd></div> <div><dt class="text-base-content/50 text-xs uppercase tracking-wide">Antal deltagere</dt> <dd class="font-medium mt-0.5">${escape_html(data.team.team_number)}</dd></div> <div><dt class="text-base-content/50 text-xs uppercase tracking-wide">Leder</dt> <dd class="font-medium mt-0.5">${escape_html(data.team.contact_name)}</dd></div> <div><dt class="text-base-content/50 text-xs uppercase tracking-wide">Telefon</dt> <dd class="font-medium mt-0.5"><a${attr("href", `tel:${stringify(data.team.contact_phone)}`)} class="link link-hover">${escape_html(data.team.contact_phone)}</a></dd></div> <div><dt class="text-base-content/50 text-xs uppercase tracking-wide">Email</dt> <dd class="font-medium mt-0.5"><a${attr("href", `mailto:${stringify(data.team.contact_email)}`)} class="link link-hover">${escape_html(data.team.contact_email)}</a></dd></div></dl></div></div> `);
    if (data.members.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="card bg-base-100 shadow"><div class="card-body p-0"><div class="px-4 pt-4 pb-2 flex items-center justify-between"><h2 class="font-semibold">Deltagere</h2> <span class="text-xs text-base-content/40">${escape_html(data.members.length)} person${escape_html(data.members.length !== 1 ? "er" : "")}</span></div> <ul class="divide-y divide-base-200"><!--[-->`);
      const each_array = ensure_array_like(data.members);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let member = each_array[$$index];
        $$renderer2.push(`<li class="px-4 py-3 flex items-start gap-4"><div class="flex-1 min-w-0"><p class="font-medium text-sm">${escape_html(member.name)}</p> `);
        if (member.notes) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<p class="text-xs text-base-content/50 mt-0.5">${escape_html(member.notes)}</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div> `);
        if (member.age) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="badge badge-ghost badge-sm shrink-0">${escape_html(member.age)} år</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></li>`);
      }
      $$renderer2.push(`<!--]--></ul></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="grid grid-cols-2 gap-4"><div class="card bg-base-100 shadow"><div class="card-body p-4 items-center text-center"><p class="text-3xl font-bold font-mono">${escape_html(totalPoints)}</p> <p class="text-xs text-base-content/50 uppercase tracking-wide mt-1">Samlede point</p></div></div> <div class="card bg-base-100 shadow"><div class="card-body p-4 items-center text-center"><p class="text-3xl font-bold font-mono">${escape_html(completedPosts)}</p> <p class="text-xs text-base-content/50 uppercase tracking-wide mt-1">Poster gennemført</p></div></div></div> `);
    if (data.history.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="card bg-base-100 shadow"><div class="card-body text-center text-base-content/50 text-sm">Ingen check-in historik endnu.</div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="card bg-base-100 shadow"><div class="card-body p-0"><div class="px-4 pt-4 pb-2"><h2 class="font-semibold">Historik</h2></div> <ul class="divide-y divide-base-200"><!--[-->`);
      const each_array_1 = ensure_array_like(data.history);
      for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
        let entry = each_array_1[$$index_2];
        $$renderer2.push(`<li class="px-4 py-3 space-y-2"><div class="flex items-center justify-between gap-2"><span class="font-medium text-sm">${escape_html(entry.postName)}</span> <div class="flex items-center gap-2">`);
        if (entry.checked_out) {
          $$renderer2.push("<!--[-->");
          if (entry.total > 0) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<span class="badge badge-neutral badge-sm font-mono">${escape_html(entry.total)} pt</span>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> <span class="badge badge-success badge-sm">✓ Færdig</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<span class="badge badge-warning badge-sm">⏳ Her nu</span>`);
        }
        $$renderer2.push(`<!--]--></div></div> <div class="flex items-center gap-4 text-xs text-base-content/40"><span>Ind: ${escape_html(fmt(entry.checked_in))}</span> `);
        if (entry.checked_out) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span>Ud: ${escape_html(fmt(entry.checked_out))}</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div> `);
        if (entry.points.length > 0) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex flex-wrap gap-2 pt-0.5"><!--[-->`);
          const each_array_2 = ensure_array_like(entry.points);
          for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
            let p = each_array_2[$$index_1];
            $$renderer2.push(`<span class="badge badge-ghost badge-sm font-mono">${escape_html(p.label)}: ${escape_html(p.value)}</span>`);
          }
          $$renderer2.push(`<!--]--></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></li>`);
      }
      $$renderer2.push(`<!--]--></ul></div></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (form?.error) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div role="alert" class="alert alert-error"><span>${escape_html(form.message)}</span></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <dialog class="modal"><div class="modal-box"><h3 class="font-bold text-lg">Slet hold</h3> <p class="py-4 text-base-content/70">Er du sikker på at du vil slette <strong>${escape_html(data.team.team_name)}</strong>?
			Dette kan ikke fortrydes og vil også slette alle check-in data for holdet.</p> <div class="modal-action"><button class="btn">Annuller</button> <form method="POST" action="?/delete"><button class="btn btn-error">Ja, slet holdet</button></form></div></div> <form method="dialog" class="modal-backdrop"><button>close</button></form></dialog>`);
  });
}
export {
  _page as default
};
