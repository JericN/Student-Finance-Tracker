export const prerender = true;
export const ssr = false;
export const trailingSlash = 'always';

import { get } from 'svelte/store';
import { redirect } from '@sveltejs/kit';
import { session } from '$lib/store/user';

export async function load({ parent, url }) {
    await parent();
    const user = get(session);
    const authPath = /^\/auth\/.*/.test(url.pathname);
    if (!user.auth && !authPath) redirect(302, '/auth/login/');
    if (user.auth && authPath) redirect(302, '/user/dashboard/');
}
