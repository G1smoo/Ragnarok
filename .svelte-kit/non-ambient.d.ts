
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
		RouteId(): "/" | "/dashboard" | "/signin" | "/signup" | "/sub" | "/sub/helper" | "/sub/team" | "/sub/team/[subteam]";
		RouteParams(): {
			"/sub/team/[subteam]": { subteam: string }
		};
		LayoutParams(): {
			"/": { subteam?: string };
			"/dashboard": Record<string, never>;
			"/signin": Record<string, never>;
			"/signup": Record<string, never>;
			"/sub": { subteam?: string };
			"/sub/helper": Record<string, never>;
			"/sub/team": { subteam?: string };
			"/sub/team/[subteam]": { subteam: string }
		};
		Pathname(): "/" | "/dashboard" | "/dashboard/" | "/signin" | "/signin/" | "/signup" | "/signup/" | "/sub" | "/sub/" | "/sub/helper" | "/sub/helper/" | "/sub/team" | "/sub/team/" | `/sub/team/${string}` & {} | `/sub/team/${string}/` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/robots.txt" | string & {};
	}
}