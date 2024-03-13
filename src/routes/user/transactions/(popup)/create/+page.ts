import { get } from 'svelte/store';
import { goto } from '$app/navigation';
import { session } from '$lib/store/session';

export async function load({ parent }) {
    await parent();
    const { loggedIn } = get(session);
    if (!loggedIn) goto('/auth/login');
}
