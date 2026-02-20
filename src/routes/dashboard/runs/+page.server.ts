import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { z } from 'zod';

const runSchema = z.object({
	name: z.string().trim().min(1, 'Navn er påkrævet'),
	date: z.string().optional()
});

export const load = (async ({ locals }) => {
	if (!locals.user) throw redirect(303, '/');

	const runs = await locals.pb.collection('runs').getFullList({ sort: '-created' });

	return { runs };
}) satisfies PageServerLoad;

export const actions: Actions = {
	create: async ({ locals, request }) => {
		if (!locals.user) throw redirect(303, '/');

		const data = Object.fromEntries(await request.formData());
		const parsed = runSchema.safeParse(data);

		if (!parsed.success) {
			return fail(400, {
				error: true,
				errors: parsed.error.issues.map((e) => ({ field: e.path[0], message: e.message }))
			});
		}

		try {
			const run = await locals.pb.collection('runs').create({
				name: parsed.data.name,
				date: parsed.data.date || null
			});
			return { success: true, runId: run.id };
		} catch (err) {
			console.log(err);
			return fail(500, { error: true, errors: [{ field: 'general', message: 'Kunne ikke oprette løb' }] });
		}
	}
};
