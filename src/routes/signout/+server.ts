import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    return new Response();
};

export const POST: RequestHandler = async ({ locals }) => {
    locals.pb.authStore.clear();
    locals.user = null;

    throw redirect(303, '/')
    
}  