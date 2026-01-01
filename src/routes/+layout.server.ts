import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
    if(locals.user){
        return {
            currentUser: locals.user,
            token: locals.pb.authStore.token,
        };
    };
}) satisfies LayoutServerLoad;