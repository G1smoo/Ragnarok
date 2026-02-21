import { fail } from "@sveltejs/kit";
import { z } from "zod";
const emailSchema = z.object({
  email: z.string().trim().email().min(1)
});
const load = (async ({ locals }) => {
});
const actions = {
  request: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData());
    const parsed = emailSchema.safeParse(data);
    if (!parsed.success) {
      return fail(400, { error: true, errors: parsed.error.issues.map((e) => ({ field: e.path[0], message: e.message })) });
    }
    try {
      await locals.pb.collection("users").requestPasswordReset(parsed.data.email);
    } catch (err) {
      console.log(err);
    }
    return { success: true };
  }
};
export {
  actions,
  load
};
