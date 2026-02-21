
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/dashboard" | "/dashboard/runs" | "/dashboard/runs/[id]" | "/dashboard/runs/[id]/posts" | "/dashboard/runs/[id]/posts/[postId]" | "/dashboard/teams" | "/dashboard/teams/[id]" | "/forgot-password" | "/reset-password" | "/signin" | "/signout" | "/signup" | "/sub" | "/sub/helper" | "/sub/team";
		RouteParams(): {
			"/dashboard/runs/[id]": { id: string };
			"/dashboard/runs/[id]/posts": { id: string };
			"/dashboard/runs/[id]/posts/[postId]": { id: string; postId: string };
			"/dashboard/teams/[id]": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string; postId?: string };
			"/dashboard": { id?: string; postId?: string };
			"/dashboard/runs": { id?: string; postId?: string };
			"/dashboard/runs/[id]": { id: string; postId?: string };
			"/dashboard/runs/[id]/posts": { id: string; postId?: string };
			"/dashboard/runs/[id]/posts/[postId]": { id: string; postId: string };
			"/dashboard/teams": { id?: string };
			"/dashboard/teams/[id]": { id: string };
			"/forgot-password": Record<string, never>;
			"/reset-password": Record<string, never>;
			"/signin": Record<string, never>;
			"/signout": Record<string, never>;
			"/signup": Record<string, never>;
			"/sub": Record<string, never>;
			"/sub/helper": Record<string, never>;
			"/sub/team": Record<string, never>
		};
		Pathname(): "/" | "/dashboard" | "/dashboard/" | "/dashboard/runs" | "/dashboard/runs/" | `/dashboard/runs/${string}` & {} | `/dashboard/runs/${string}/` & {} | `/dashboard/runs/${string}/posts` & {} | `/dashboard/runs/${string}/posts/` & {} | `/dashboard/runs/${string}/posts/${string}` & {} | `/dashboard/runs/${string}/posts/${string}/` & {} | "/dashboard/teams" | "/dashboard/teams/" | `/dashboard/teams/${string}` & {} | `/dashboard/teams/${string}/` & {} | "/forgot-password" | "/forgot-password/" | "/reset-password" | "/reset-password/" | "/signin" | "/signin/" | "/signout" | "/signout/" | "/signup" | "/signup/" | "/sub" | "/sub/" | "/sub/helper" | "/sub/helper/" | "/sub/team" | "/sub/team/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/robots.txt" | string & {};
	}
}