import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { any, z } from 'zod';
import { error } from 'console';

const userSchema = z.object({
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

		const data = Object.fromEntries(await request.formData());

		const createData = userSchema.safeParse(data);

		console.log(createData)

		if(!createData.success){
			const errors = createData.error.errors.map((error) => {
				return {
					field: error.path[0],
					message: error.message
				}
			})
			return fail(400, { error: true , errors})
		}

		try {
			const newUser = await locals.pb.collection('users').create(createData.data)
			const {token, record} = await locals.pb.collection('users').authWithPassword(createData.data.email, createData.data.password)
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