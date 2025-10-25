
import { redirect, type Handle } from "@sveltejs/kit";
import PocketBase from "pocketbase";
import type { Auth } from "./app";

export const handle: Handle = async ({ event, resolve }) => {
  const url: string = "https://ragnarock-v2.pockethost.io";

  event.locals.pb = new PocketBase(url); // new pocketbase instance
  event.locals.pb.authStore.loadFromCookie(
    event.request.headers.get("cookie") || "",
  ); // checkes if there is a current authstore in the cookies

  try {
    // checks if the authstore loaded from cookies isvalid
    if (event.locals.pb.authStore.isValid) {
      await event.locals.pb.collection("users").authRefresh(); // refreshes the authStore
      event.locals.user = event.locals.pb.authStore.record as Auth; // set the locals.user to the authStore authRecord
    }
  } catch (error) {
    console.log(error)
    event.locals.pb.authStore.clear(); // cleres the authStore
    event.locals.user = null; // set the locals.user to null
  }

  const response = await resolve(event);

  // sets the new cookie with the new authStore
  response.headers.set(
    "set-cookie",
    event.locals.pb.authStore.exportToCookie({
      httpOnly: false,
      secure: false,
      sameSite: "lax",
    }),
  );

  return response;
};