import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { z } from 'zod';

const emailSchema = z.object({
	email: z.string().trim().email().min(1)
});

export const load = (async ({ locals }) => {
	// Already logged-in users don't need this
}) satisfies PageServerLoad;

export const actions: Actions = {
	request: async ({ locals, request }) => {
		const data = Object.fromEntries(await request.formData());

		const parsed = emailSchema.safeParse(data);

		if (!parsed.success) {
			return fail(400, { error: true, errors: parsed.error.issues.map((e) => ({ field: e.path[0], message: e.message })) });
		}

		try {
			await locals.pb.collection('users').requestPasswordReset(parsed.data.email);
		} catch (err) {
			console.log(err);
			// Don't reveal whether the email exists
		}

		// Always return success to avoid email enumeration
		return { success: true };
	}
};
