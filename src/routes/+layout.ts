export const prerender = true;
export const ssr = false;
export const trailingSlash = 'always';

import { get } from 'svelte/store';
import { redirect } from '@sveltejs/kit';
import { session } from '$lib/store/user';

export function load({ url }) {
    const user = get(session);
    const authPath = /^\/auth\/.*/.test(url.pathname);
    if (!user.auth && !authPath) redirect(302, '/auth/login/');
    if (user.auth && authPath) redirect(302, '/user/dashboard/');
    if (url.pathname === '/') redirect(302, '/auth/login/');
}
