import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { any, z } from 'zod';

const userSchema = z.object({
	username: z.string().trim().min(1),
	email: z.string().trim().email().min(1),
	password: z.string().trim().min(8),
	passwordConfirm: z.string().trim().min(8)
});

export const load = (async ({ locals }) => {
	if (locals.user) {
		throw redirect(303, '/dashboard');
	}
}) satisfies PageServerLoad;

export const actions = {

	register: async ({locals, request}) => {
		const data = await request.formData();

		const createData = {
			username: data.get('username') as string,
			password: data.get('password') as string,
			passwordConfirm: data.get('passwordConfirm') as string,
		}

		try {
			const newUser = await locals.pb.collection('helpers').create(createData)
		} catch (error) {
			console.log('err: ');
			console.log(error);
			return fail(400, {
				error: true,
			});
		}
		throw redirect(303, '/dashboard');
	}

};