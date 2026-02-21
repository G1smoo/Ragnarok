import { redirect } from "@sveltejs/kit";
const load = (async ({ locals }) => {
  if (!locals.user) {
    throw redirect(303, "/");
  } else {
    return {
      currentUser: locals.user,
      token: locals.pb.authStore.token
    };
  }
});
export {
  load
};
