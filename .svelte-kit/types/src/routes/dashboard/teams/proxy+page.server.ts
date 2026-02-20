// @ts-nocheck
import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { z } from 'zod';

const teamSchema = z.object({
	patruljenavn: z.string().trim().min(1, 'Patruljenavn er påkrævet'),
	gruppenavn: z.string().trim().min(1, 'Gruppenavn er påkrævet'),
	antal: z.coerce.number().min(3).max(6),
	leder_navn: z.string().trim().min(1, 'Leder navn er påkrævet'),
	telefonnummer: z.string().trim().min(1, 'Telefonnummer er påkrævet'),
	email: z.string().trim().email()
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