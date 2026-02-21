import { y as ensure_array_like, x as attr, z as stringify } from "../../../../../chunks/index2.js";
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
    $$renderer2.push(`<div class="m-3 mx-auto max-w-7xl space-y-6"><div class="flex flex-wrap items-center gap-3"><a href="/dashboard/runs" class="btn btn-ghost btn-sm">← Tilbage</a> <h1 class="text-2xl font-bold">${escape_html(data.run.name)}</h1> `);
    if (data.run.date) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="badge badge-neutral">${escape_html(new Date(data.run.date).toLocaleDateString("da-DK"))}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (data.posts.length > 0 && data.teams.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="card bg-base-100 shadow"><div class="card-body p-4"><h2 class="text-lg font-semibold mb-2">Oversigt</h2> <div class="overflow-x-auto"><table class="table table-sm"><thead><tr><th class="min-w-32">Hold</th><!--[-->`);
      const each_array = ensure_array_like(data.posts);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let post = each_array[$$index];
        $$renderer2.push(`<th class="text-center whitespace-nowrap">${escape_html(post.name)}</th>`);
      }
      $$renderer2.push(`<!--]--></tr></thead><tbody><!--[-->`);
      const each_array_1 = ensure_array_like(data.matrix);
      for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
        let row = each_array_1[$$index_2];
        $$renderer2.push(`<tr><td class="font-medium whitespace-nowrap">${escape_html(row.team.team_name)}</td><!--[-->`);
        const each_array_2 = ensure_array_like(row.cells);
        for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
          let cell = each_array_2[$$index_1];
          $$renderer2.push(`<td class="text-center">`);
          if (cell.status === "checked_out") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<span class="badge badge-success badge-sm gap-1">✓ ${escape_html(fmt(cell.until))}</span>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (cell.status === "checked_in") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<span class="badge badge-warning badge-sm gap-1">⏳ ${escape_html(fmt(cell.since))}</span>`);
            } else {
              $$renderer2.push("<!--[!-->");
              $$renderer2.push(`<span class="text-base-content/20">—</span>`);
            }
            $$renderer2.push(`<!--]-->`);
          }
          $$renderer2.push(`<!--]--></td>`);
        }
        $$renderer2.push(`<!--]--></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table></div> <div class="flex gap-4 mt-3 text-xs text-base-content/60"><span><span class="badge badge-warning badge-xs mr-1">⏳</span>Tjekket ind</span> <span><span class="badge badge-success badge-xs mr-1">✓</span>Færdig</span> <span><span class="opacity-30">—</span> Ikke besøgt</span></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (data.teams.length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div role="alert" class="alert alert-info"><span>Ingen hold fundet. <a href="/dashboard/teams" class="link">Opret hold</a> for at komme i gang.</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--> `);
    if (data.teamScores.some((t) => t.total > 0) || data.postScores.some((p) => p.total > 0)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="card bg-base-100 shadow"><div class="card-body p-4"><h2 class="text-lg font-semibold mb-3">Point — Hold</h2> <ol class="space-y-2"><!--[-->`);
      const each_array_3 = ensure_array_like(data.teamScores);
      for (let i = 0, $$length = each_array_3.length; i < $$length; i++) {
        let team = each_array_3[i];
        $$renderer2.push(`<li class="flex items-center gap-3"><span class="text-sm font-mono w-5 text-base-content/40 shrink-0">${escape_html(i + 1)}</span> <a${attr("href", `/dashboard/teams/${stringify(team.id)}`)} class="flex-1 text-sm font-medium truncate hover:underline">${escape_html(team.name)}</a> <span class="text-xs text-base-content/40 shrink-0">${escape_html(team.postsVisited)} poster</span> <span class="badge badge-neutral font-mono shrink-0">${escape_html(team.total)} pt</span></li>`);
      }
      $$renderer2.push(`<!--]--></ol></div></div> <div class="card bg-base-100 shadow"><div class="card-body p-4"><h2 class="text-lg font-semibold mb-3">Point — Poster</h2> <ol class="space-y-2"><!--[-->`);
      const each_array_4 = ensure_array_like(data.postScores);
      for (let i = 0, $$length = each_array_4.length; i < $$length; i++) {
        let post = each_array_4[i];
        $$renderer2.push(`<li class="flex items-center gap-3"><span class="text-sm font-mono w-5 text-base-content/40 shrink-0">${escape_html(i + 1)}</span> <span class="flex-1 text-sm font-medium truncate">${escape_html(post.name)}</span> <span class="text-xs text-base-content/40 shrink-0">${escape_html(post.teamsServed)} hold</span> <span class="badge badge-neutral font-mono shrink-0">${escape_html(post.total)} pt</span></li>`);
      }
      $$renderer2.push(`<!--]--></ol></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="flex items-center justify-between"><h2 class="text-xl font-semibold">Poster</h2> <button class="btn btn-primary btn-sm">+ Tilføj post</button></div> `);
    if (data.postData.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="card bg-base-100 shadow"><div class="card-body text-center text-base-content/50">Ingen poster endnu. Tilføj den første post.</div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
      const each_array_5 = ensure_array_like(data.postData);
      for (let $$index_7 = 0, $$length = each_array_5.length; $$index_7 < $$length; $$index_7++) {
        let post = each_array_5[$$index_7];
        $$renderer2.push(`<div class="card bg-base-100 shadow"><div class="card-body p-4 space-y-3"><div class="flex items-center justify-between gap-2"><h3 class="font-semibold text-base">${escape_html(post.name)}</h3> <a${attr("href", `/dashboard/runs/${stringify(data.run.id)}/posts/${stringify(post.id)}`)} class="btn btn-outline btn-xs gap-1" title="Åbn post-visning til mobil"><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg> Post-visning</a></div> `);
        if (post.activeCheckIns.length === 0) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<p class="text-sm text-base-content/40 italic">Ingen hold her nu</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<div class="space-y-2"><!--[-->`);
          const each_array_6 = ensure_array_like(post.activeCheckIns);
          for (let $$index_5 = 0, $$length2 = each_array_6.length; $$index_5 < $$length2; $$index_5++) {
            let ci = each_array_6[$$index_5];
            $$renderer2.push(`<div class="flex items-center justify-between bg-warning/10 border border-warning/20 rounded-lg px-3 py-2"><div><p class="font-medium text-sm">${escape_html(ci.teamName)}</p> <p class="text-xs text-base-content/50">Ind kl. ${escape_html(fmt(ci.checked_in))}</p></div> <form method="POST" action="?/checkOut"><input type="hidden" name="checkInId"${attr("value", ci.id)}/> <button class="btn btn-xs btn-success">Ud ✓</button></form></div>`);
          }
          $$renderer2.push(`<!--]--></div>`);
        }
        $$renderer2.push(`<!--]--> `);
        if (post.availableTeams.length > 0) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<form method="POST" action="?/checkIn" class="flex gap-2 pt-1"><input type="hidden" name="post"${attr("value", post.id)}/> <select name="team" class="select select-bordered select-xs flex-1 min-w-0">`);
          $$renderer2.option({ value: "" }, ($$renderer3) => {
            $$renderer3.push(`Vælg hold...`);
          });
          $$renderer2.push(`<!--[-->`);
          const each_array_7 = ensure_array_like(post.availableTeams);
          for (let $$index_6 = 0, $$length2 = each_array_7.length; $$index_6 < $$length2; $$index_6++) {
            let team = each_array_7[$$index_6];
            $$renderer2.option({ value: team.id }, ($$renderer3) => {
              $$renderer3.push(`${escape_html(team.team_name)}`);
            });
          }
          $$renderer2.push(`<!--]--></select> <button class="btn btn-primary btn-xs whitespace-nowrap">Check ind</button></form>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<p class="text-xs text-base-content/40 italic">Alle hold er tjekket ind</p>`);
        }
        $$renderer2.push(`<!--]--></div></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div> <dialog class="modal"><div class="modal-box"><h3 class="font-bold text-lg mb-4">Tilføj post</h3> <form method="POST" action="?/addPost" class="space-y-3"><label class="form-control w-full"><div class="label"><span class="label-text">Post navn</span></div> <input type="text" name="name" class="input input-bordered" placeholder="Post 1" required/></label> <label class="form-control w-full"><div class="label"><span class="label-text">Rækkefølge (valgfrit)</span></div> <input type="number" name="order" class="input input-bordered" placeholder="1" min="0"/></label> `);
    if (form?.error && form?.action === "addPost") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div role="alert" class="alert alert-error py-2"><span class="text-sm">${escape_html(form.message)}</span></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="modal-action"><button type="button" class="btn">Annuller</button> <button type="submit" class="btn btn-primary">Tilføj</button></div></form></div> <form method="dialog" class="modal-backdrop"><button>close</button></form></dialog>`);
  });
}
export {
  _page as default
};
