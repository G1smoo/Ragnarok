import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { z } from 'zod';

const userSchema = z.object({
	email: z.string().trim().email().min(1),
	password: z.string().trim().min(8),
});

export const load = (async ({ locals }) => {
	if (locals.user) {
		throw redirect(303, '/dashboard');
	}
}) satisfies PageServerLoad;

export const actions = {

	signin: async ({locals, request}) => {

		const data = Object.fromEntries(await request.formData());

		const createData = userSchema.safeParse(data);

		if(!createData.success){
			const errors = createData.error.issues.map((issue) => ({
				field: issue.path[0],
				message: issue.message
			}));
			return fail(400, { error: true, errors })
		}

		try {
			await locals.pb.collection('users').authWithPassword(createData.data.email, createData.data.password)
		} catch (error) {
			console.log('err: ');
			console.log(error);
			return fail(400, { error: true, errors: null });
		}
		throw redirect(303, '/dashboard');
	}

};