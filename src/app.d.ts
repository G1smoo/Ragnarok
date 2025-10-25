// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import PocketBase, { type AuthRecord } from "pocketbase";

declare global {
  namespace App {
    interface Platform {
      env: Env;
      cf: CfProperties;
      ctx: ExecutionContext;
    }
    interface Auth extends AuthRecord {
      id: string;
      collectionId: string;
      collectionName: string;
      username: string;
      verified: boolean;
      emailVisibility: boolean;
      email: string;
      isTeam: boolean,
      year: string,
      created: string;
      updated: string;
    }
    interface Locals {
      pb: PocketBase;
      user: Auth | null;
    }
  }
}

export { Auth, Locals };