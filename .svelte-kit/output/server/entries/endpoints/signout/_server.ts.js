import { redirect } from "@sveltejs/kit";
const POST = async ({ locals }) => {
  locals.pb.authStore.clear();
  locals.user = null;
  throw redirect(303, "/");
};
export {
  POST
};
