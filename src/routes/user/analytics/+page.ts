import { get } from 'svelte/store';
import { getWallets } from '$lib/firebase/database.js';
import { goto } from '$app/navigation';
import { session } from '$lib/store/session';

export async function load({ parent }) {
    await parent();
    const wallets = await getWallets();
    const { loggedIn } = get(session);
    if (!loggedIn) goto('/auth/login');
    return { wallets };
}
