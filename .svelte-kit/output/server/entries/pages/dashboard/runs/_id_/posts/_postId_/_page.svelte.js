import { x as attr, z as stringify, y as ensure_array_like } from "../../../../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../../../../chunks/exports.js";
import "../../../../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../../../../chunks/state.svelte.js";
import { e as escape_html } from "../../../../../../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, form } = $$props;
    let pointSets = [
      { label: "Disciplin 1", value: "" },
      { label: "Disciplin 2", value: "" }
    ];
    function totalPoints() {
      return pointSets.reduce((sum, p) => sum + (parseFloat(p.value) || 0), 0);
    }
    function fmt(iso) {
      if (!iso) return "";
      return new Date(iso).toLocaleTimeString("da-DK", { hour: "2-digit", minute: "2-digit" });
    }
    $$renderer2.push(`<div class="min-h-screen bg-base-200 flex flex-col"><div class="bg-base-100 shadow-sm sticky top-0 z-10"><div class="flex items-center gap-3 px-4 py-3"><a${attr("href", `/dashboard/runs/${stringify(data.run.id)}`)} class="btn btn-ghost btn-sm btn-square"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></a> <div class="flex-1 min-w-0"><p class="text-xs text-base-content/50 truncate">${escape_html(data.run.name)}</p> <h1 class="text-lg font-bold leading-tight truncate">${escape_html(data.post.name)}</h1></div> <span class="flex items-center gap-1 text-xs text-success font-medium"><span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span> <span class="relative inline-flex rounded-full h-2 w-2 bg-success"></span></span> Live</span></div></div> <div class="flex-1 p-4 space-y-5 max-w-lg mx-auto w-full"><section><h2 class="text-sm font-semibold text-base-content/50 uppercase tracking-wide mb-3">Her nu `);
    if (data.activeCheckIns.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="badge badge-warning badge-sm ml-1">${escape_html(data.activeCheckIns.length)}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></h2> `);
    if (data.activeCheckIns.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="card bg-base-100 shadow-sm"><div class="card-body items-center py-8 text-base-content/40"><svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mb-2 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"></path></svg> <p class="text-sm">Ingen hold her nu</p></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="space-y-3"><!--[-->`);
      const each_array = ensure_array_like(data.activeCheckIns);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let ci = each_array[$$index];
        $$renderer2.push(`<div class="card bg-warning/10 border border-warning/30 shadow-sm"><div class="card-body p-4"><div class="flex items-center justify-between gap-3"><div class="min-w-0"><p class="font-bold text-lg leading-tight truncate">${escape_html(ci.teamName)}</p> <p class="text-sm text-base-content/50 mt-0.5">Tjekket ind kl. ${escape_html(fmt(ci.checked_in))}</p></div> <button class="btn btn-success btn-lg gap-2 min-w-[100px]"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg> Ud</button></div></div></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></section> <section><h2 class="text-sm font-semibold text-base-content/50 uppercase tracking-wide mb-3">Check ind</h2> `);
    if (data.availableTeams.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="card bg-base-100 shadow-sm"><div class="card-body py-5 items-center text-base-content/40 text-sm">Alle hold er tjekket ind</div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="card bg-base-100 shadow-sm"><div class="card-body p-4"><form method="POST" action="?/checkIn" class="flex flex-col gap-3"><select name="team" class="select select-bordered select-lg w-full text-base" required>`);
      $$renderer2.option({ value: "" }, ($$renderer3) => {
        $$renderer3.push(`Vælg hold...`);
      });
      $$renderer2.push(`<!--[-->`);
      const each_array_1 = ensure_array_like(data.availableTeams);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let team = each_array_1[$$index_1];
        $$renderer2.option({ value: team.id }, ($$renderer3) => {
          $$renderer3.push(`${escape_html(team.team_name)}`);
        });
      }
      $$renderer2.push(`<!--]--></select> `);
      if (form?.error && form?.action === "checkIn") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div role="alert" class="alert alert-error py-2"><span class="text-sm">${escape_html(form.message ?? "Fejl ved check-in")}</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <button class="btn btn-primary btn-lg w-full gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14"></path></svg> Check ind</button></form></div></div>`);
    }
    $$renderer2.push(`<!--]--></section> `);
    if (data.recentCheckOuts.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<section><h2 class="text-sm font-semibold text-base-content/50 uppercase tracking-wide mb-3">Senest færdige</h2> <div class="card bg-base-100 shadow-sm"><div class="card-body p-0"><ul class="divide-y divide-base-200"><!--[-->`);
      const each_array_2 = ensure_array_like(data.recentCheckOuts);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let co = each_array_2[$$index_2];
        $$renderer2.push(`<li class="flex items-center justify-between px-4 py-3 gap-2"><div class="min-w-0"><span class="font-medium text-sm truncate block">${escape_html(co.teamName)}</span> <span class="text-xs text-base-content/40">${escape_html(fmt(co.checked_in))} → ${escape_html(fmt(co.checked_out))}</span></div> <div class="flex items-center gap-2 shrink-0">`);
        if (co.total > 0) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="badge badge-neutral badge-sm font-mono">${escape_html(co.total)} pt</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> <span class="badge badge-success badge-sm">✓</span></div></li>`);
      }
      $$renderer2.push(`<!--]--></ul></div></div></section>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div> <dialog class="modal modal-bottom sm:modal-middle"><div class="modal-box w-full max-w-lg"><h3 class="font-bold text-lg mb-1">Check ud</h3> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <form method="POST" action="?/checkOut" class="space-y-4"><input type="hidden" name="checkInId"${attr("value", "")}/> <div class="space-y-3"><div class="flex items-center justify-between"><span class="text-sm font-semibold">Point</span> `);
    if (pointSets.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="text-xs text-base-content/40 font-mono">Total: ${escape_html(totalPoints())}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <!--[-->`);
    const each_array_3 = ensure_array_like(pointSets);
    for (let i = 0, $$length = each_array_3.length; i < $$length; i++) {
      let ps = each_array_3[i];
      $$renderer2.push(`<div class="flex items-center gap-2"><input type="text" class="input input-bordered input-sm flex-1 min-w-0" placeholder="Navn (f.eks. Opgave 1)"${attr("value", ps.label)}/> <input type="number" class="input input-bordered input-sm w-24 font-mono text-right" placeholder="0"${attr("value", ps.value)} inputmode="numeric"/> <button type="button" class="btn btn-ghost btn-sm btn-square text-error"${attr("disabled", pointSets.length <= 1, true)} aria-label="Fjern"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
    }
    $$renderer2.push(`<!--]--> <button type="button" class="btn btn-ghost btn-sm w-full border border-dashed border-base-content/20">+ Tilføj point</button></div> <div class="modal-action mt-4"><button type="button" class="btn btn-ghost">Annuller</button> <button type="submit" class="btn btn-success gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg> Gem &amp; check ud</button></div></form></div> <form method="dialog" class="modal-backdrop"><button>close</button></form></dialog>`);
  });
}
export {
  _page as default
};
