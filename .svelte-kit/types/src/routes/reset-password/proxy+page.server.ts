// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { z } from 'zod';

const resetSchema = z.object({
	token: z.string().min(1),
	password: z.string().trim().min(8),
	passwordConfirm: z.string().trim().min(8)
}).refine((data) => data.password === data.passwordConfirm, {
	message: 'Passwords do not match',
	path: ['passwordConfirm']
});

export const load = (async ({ url }) => {
	const token = url.searchParams.get('token') ?? '';
	return { token };
}) satisfies PageServerLoad;

export const actions = {
	reset: async ({ locals, request }: import('./$types').RequestEvent) => {
		const data = Object.fromEntries(await request.formData());

		const parsed = resetSchema.safeParse(data);

		if (!parsed.success) {
			return fail(400, {
				error: true,
				errors: parsed.error.issues.map((e) => ({ field: e.path[0], message: e.message }))
			});
		}

		try {
			await locals.pb
				.collection('users')
				.confirmPasswordReset(parsed.data.token, parsed.data.password, parsed.data.passwordConfirm);
		} catch (err) {
			console.log(err);
			return fail(400, { error: true, invalidToken: true });
		}

		throw redirect(303, '/signin');
	}
};
;null as any as Actions;