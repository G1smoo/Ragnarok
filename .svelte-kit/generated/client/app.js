export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14')
];

export const server_loads = [0];

export const dictionary = {
		"/": [2],
		"/dashboard": [~3],
		"/dashboard/runs": [~4],
		"/dashboard/runs/[id]": [~5],
		"/dashboard/runs/[id]/posts/[postId]": [~6],
		"/dashboard/teams": [~7],
		"/dashboard/teams/[id]": [~8],
		"/forgot-password": [~9],
		"/reset-password": [~10],
		"/signin": [~11],
		"/signup": [~12],
		"/sub/helper": [~13],
		"/sub/team": [~14]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';