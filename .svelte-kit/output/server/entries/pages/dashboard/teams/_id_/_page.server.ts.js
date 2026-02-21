import { redirect, fail } from "@sveltejs/kit";
const load = (async ({ locals, params }) => {
  if (!locals.user) throw redirect(303, "/");
  try {
    const [team, checkIns] = await Promise.all([
      locals.pb.collection("teams").getOne(params.id),
      locals.pb.collection("check_ins").getFullList({
        filter: `team = "${params.id}"`,
        expand: "post",
        sort: "-checked_in"
      })
    ]);
    const history = checkIns.map((ci) => {
      const pts = Array.isArray(ci.points) ? ci.points : [];
      const total = pts.reduce((sum, p) => sum + (Number(p.value) || 0), 0);
      return {
        id: ci.id,
        postName: ci.expand?.post?.name ?? "Ukendt post",
        checked_in: ci.checked_in,
        checked_out: ci.checked_out ?? null,
        points: pts,
        total
      };
    });
    const members = Array.from({ length: 6 }, (_, i) => {
      const n = String(i + 1).padStart(2, "0");
      return {
        num: i + 1,
        name: team[`member${n}_name`] || "",
        age: team[`member${n}_age`] || "",
        notes: team[`member${n}_notes`] || ""
      };
    }).filter((m) => m.name.trim() !== "");
    return { team, history, members };
  } catch {
    throw redirect(303, "/dashboard/teams");
  }
});
const actions = {
  delete: async ({ locals, params }) => {
    if (!locals.user) throw redirect(303, "/");
    try {
      await locals.pb.collection("teams").delete(params.id);
    } catch {
      return fail(500, { error: true, message: "Kunne ikke slette holdet" });
    }
    throw redirect(303, "/dashboard/teams");
  }
};
export {
  actions,
  load
};
