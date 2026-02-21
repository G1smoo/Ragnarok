import { redirect, fail } from "@sveltejs/kit";
import { z } from "zod";
const postSchema = z.object({
  name: z.string().trim().min(1, "Post navn er påkrævet"),
  order: z.coerce.number().optional()
});
const load = (async ({ locals, params }) => {
  if (!locals.user) throw redirect(303, "/");
  try {
    let sumPts = function(pts) {
      if (!Array.isArray(pts)) return 0;
      return pts.reduce((s, p) => s + (Number(p.value) || 0), 0);
    };
    const [run, posts, teams, checkIns] = await Promise.all([
      locals.pb.collection("runs").getOne(params.id),
      locals.pb.collection("posts").getFullList({
        filter: `run = "${params.id}"`,
        sort: "order,name"
      }),
      locals.pb.collection("teams").getFullList({ sort: "team_name" }),
      locals.pb.collection("check_ins").getFullList({
        filter: `post.run = "${params.id}"`,
        expand: "team,post",
        sort: "-checked_in"
      })
    ]);
    const matrix = teams.map((team) => ({
      team,
      cells: posts.map((post) => {
        const ci = checkIns.find((c) => c.team === team.id && c.post === post.id);
        if (!ci) return { status: "not_visited" };
        if (ci.checked_out) return { status: "checked_out", since: ci.checked_in, until: ci.checked_out };
        return { status: "checked_in", checkInId: ci.id, since: ci.checked_in };
      })
    }));
    const postData = posts.map((post) => {
      const postCheckIns = checkIns.filter((ci) => ci.post === post.id);
      const activeCheckIns = postCheckIns.filter((ci) => !ci.checked_out).map((ci) => ({
        id: ci.id,
        checked_in: ci.checked_in,
        teamName: ci.expand?.team?.team_name ?? "Ukendt hold",
        teamId: ci.team
      }));
      const activeTeamIds = new Set(activeCheckIns.map((ci) => ci.teamId));
      const availableTeams = teams.filter((t) => !activeTeamIds.has(t.id));
      return { id: post.id, name: post.name, order: post.order, activeCheckIns, availableTeams };
    });
    const teamScores = teams.map((team) => {
      const teamCheckIns = checkIns.filter((ci) => ci.team === team.id && ci.checked_out);
      const total = teamCheckIns.reduce((s, ci) => s + sumPts(ci.points), 0);
      const postsVisited = teamCheckIns.length;
      return { id: team.id, name: team.team_name, total, postsVisited };
    }).sort((a, b) => b.total - a.total);
    const postScores = posts.map((post) => {
      const postCheckIns = checkIns.filter((ci) => ci.post === post.id && ci.checked_out);
      const total = postCheckIns.reduce((s, ci) => s + sumPts(ci.points), 0);
      const teamsServed = postCheckIns.length;
      return { id: post.id, name: post.name, total, teamsServed };
    }).sort((a, b) => b.total - a.total);
    return { run, posts, teams, matrix, postData, teamScores, postScores };
  } catch {
    throw redirect(303, "/dashboard/runs");
  }
});
const actions = {
  addPost: async ({ locals, params, request }) => {
    if (!locals.user) throw redirect(303, "/");
    const data = Object.fromEntries(await request.formData());
    const parsed = postSchema.safeParse(data);
    if (!parsed.success) {
      return fail(400, { error: true, action: "addPost", message: parsed.error.errors[0].message });
    }
    await locals.pb.collection("posts").create({
      name: parsed.data.name,
      run: params.id,
      order: parsed.data.order ?? 0
    });
    return { success: true, action: "addPost" };
  },
  checkIn: async ({ locals, request }) => {
    if (!locals.user) throw redirect(303, "/");
    const data = Object.fromEntries(await request.formData());
    if (!data.team || !data.post) return fail(400, { error: true, action: "checkIn" });
    const existing = await locals.pb.collection("check_ins").getList(1, 1, {
      filter: `team = "${data.team}" && post = "${data.post}" && checked_out = ""`
    });
    if (existing.totalItems > 0) {
      return fail(400, { error: true, action: "checkIn", message: "Hold allerede tjekket ind her" });
    }
    await locals.pb.collection("check_ins").create({
      team: data.team,
      post: data.post,
      checked_in: (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").slice(0, 19)
    });
    return { success: true, action: "checkIn" };
  },
  checkOut: async ({ locals, request }) => {
    if (!locals.user) throw redirect(303, "/");
    const data = Object.fromEntries(await request.formData());
    if (!data.checkInId) return fail(400, { error: true, action: "checkOut" });
    await locals.pb.collection("check_ins").update(String(data.checkInId), {
      checked_out: (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").slice(0, 19)
    });
    return { success: true, action: "checkOut" };
  }
};
export {
  actions,
  load
};
