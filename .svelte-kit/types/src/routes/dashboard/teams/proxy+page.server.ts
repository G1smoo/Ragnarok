// @ts-nocheck
import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { z } from 'zod';

const opt = z.string().trim().optional();

const teamSchema = z.object({
	team_name: z.string().trim().min(1, 'Patruljenavn er påkrævet'),
	group_name: z.string().trim().min(1, 'Gruppenavn er påkrævet'),
	team_number: z.coerce.number().min(3).max(6),
	contact_name: z.string().trim().min(1, 'Leder navn er påkrævet'),
	contact_phone: z.string().trim().min(1, 'Telefonnummer er påkrævet'),
	contact_email: z.string().trim().email(),
	member01_name: opt, member01_age: opt, member01_notes: opt,
	member02_name: opt, member02_age: opt, member02_notes: opt,
	member03_name: opt, member03_age: opt, member03_notes: opt,
	member04_name: opt, member04_age: opt, member04_notes: opt,
	member05_name: opt, member05_age: opt, member05_notes: opt,
	member06_name: opt, member06_age: opt, member06_notes: opt
});

export const load = (async ({ locals }) => {
	if (!locals.user) throw redirect(303, '/');

	const teams = await locals.pb.collection('teams').getFullList({
		sort: 'team_name'
	});

	return { teams };
}) satisfies PageServerLoad;

export const actions = {
	create: async ({ locals, request }: import('./$types').RequestEvent) => {
		if (!locals.user) throw redirect(303, '/');

		const data = Object.fromEntries(await request.formData());
		const parsed = teamSchema.safeParse(data);

		if (!parsed.success) {
			return fail(400, {
				error: true,
				errors: parsed.error.issues.map((e) => ({ field: e.path[0], message: e.message }))
			});
		}

		try {
			await locals.pb.collection('teams').create(parsed.data);
		} catch (err) {
			console.log(err);
			return fail(500, { error: true, errors: [{ field: 'general', message: 'Kunne ikke oprette hold' }] });
		}

		return { success: true };
	}
};
;null as any as Actions;