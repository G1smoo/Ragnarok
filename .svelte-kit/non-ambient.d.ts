
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
		RouteId(): "/" | "/dashboard" | "/signin" | "/signout" | "/signup" | "/sub" | "/sub/helper" | "/sub/team";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/dashboard": Record<string, never>;
			"/signin": Record<string, never>;
			"/signout": Record<string, never>;
			"/signup": Record<string, never>;
			"/sub": Record<string, never>;
			"/sub/helper": Record<string, never>;
			"/sub/team": Record<string, never>
		};
		Pathname(): "/" | "/dashboard" | "/dashboard/" | "/signin" | "/signin/" | "/signout" | "/signout/" | "/signup" | "/signup/" | "/sub" | "/sub/" | "/sub/helper" | "/sub/helper/" | "/sub/team" | "/sub/team/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/robots.txt" | string & {};
	}
}