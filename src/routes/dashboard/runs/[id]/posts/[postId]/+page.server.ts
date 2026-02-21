import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ locals, params }) => {
	try {
		const [run, post, teams, checkIns] = await Promise.all([
			locals.pb.collection('runs').getOne(params.id),
			locals.pb.collection('posts').getOne(params.postId),
			locals.pb.collection('teams').getFullList({ sort: 'team_name' }),
			locals.pb.collection('check_ins').getFullList({
				filter: `post = "${params.postId}"`,
				expand: 'team',
				sort: '-checked_in'
			})
		]);

		// Only check-ins without a checked_out time are active
		const activeCheckIns = checkIns
			.filter((ci) => !ci.checked_out)
			.map((ci) => ({
				id: ci.id,
				checked_in: ci.checked_in,
				teamName: (ci.expand?.team as { team_name?: string })?.team_name ?? 'Ukendt hold',
				teamId: ci.team
			}));

		const activeTeamIds = new Set(activeCheckIns.map((ci) => ci.teamId));
		const availableTeams = teams.filter((t) => !activeTeamIds.has(t.id));

		// Recent completed check-ins for this post (last 10)
		const recentCheckOuts = checkIns
			.filter((ci) => ci.checked_out)
			.slice(0, 10)
			.map((ci) => {
				const pts: { label: string; value: number }[] = Array.isArray(ci.points) ? ci.points : [];
				const total = pts.reduce((sum, p) => sum + (Number(p.value) || 0), 0);
				return {
					id: ci.id,
					checked_in: ci.checked_in,
					checked_out: ci.checked_out,
					teamName: (ci.expand?.team as { team_name?: string })?.team_name ?? 'Ukendt hold',
					points: pts,
					total
				};
			});

		return { run, post, teams, activeCheckIns, availableTeams, recentCheckOuts };
	} catch {
		throw redirect(303, `/dashboard/runs/${params.id}`);
	}
}) satisfies PageServerLoad;

export const actions: Actions = {
	checkIn: async ({ locals, params, request }) => {
		const data = Object.fromEntries(await request.formData());
		if (!data.team) return fail(400, { error: true, action: 'checkIn', message: 'Vælg et hold' });

		// Prevent duplicate active check-in at the same post
		const existing = await locals.pb.collection('check_ins').getList(1, 1, {
			filter: `team = "${data.team}" && post = "${params.postId}" && checked_out = ""`
		});
		if (existing.totalItems > 0) {
			return fail(400, { error: true, action: 'checkIn', message: 'Hold allerede tjekket ind her' });
		}

		await locals.pb.collection('check_ins').create({
			team: data.team,
			post: params.postId,
			checked_in: new Date().toISOString().replace('T', ' ').slice(0, 19)
		});

		return { success: true, action: 'checkIn' };
	},

	checkOut: async ({ locals, request }) => {
		const data = Object.fromEntries(await request.formData());
		if (!data.checkInId) return fail(400, { error: true, action: 'checkOut' });

		// Parse points submitted as JSON string
		let points: { label: string; value: number }[] = [];
		try {
			if (data.points) {
				const parsed = JSON.parse(String(data.points));
				if (Array.isArray(parsed)) points = parsed;
			}
		} catch {
			// ignore malformed JSON, save without points
			console.log(points)
		}

		await locals.pb.collection('check_ins').update(String(data.checkInId), {
			checked_out: new Date().toISOString().replace('T', ' ').slice(0, 19),
			points: points
		});

		return { success: true, action: 'checkOut' };
	}
};
