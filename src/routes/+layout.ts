import { auth, initializeFirebase } from '$lib/firebase.client';
import { User } from '$lib/models/types';
import { browser } from '$app/environment';
import { onAuthStateChanged } from 'firebase/auth';
import { safeParse } from 'valibot';
import { session } from '$lib/store/session';

export const prerender = true;
export const ssr = false;
export const trailingSlash = 'always';

export async function load() {
    if (browser)
        try {
            initializeFirebase();
        } catch (error) {
            throw new Error('Failed to initialize Firebase');
        }

    function getAuthUser() {
        return new Promise(resolve => {
            onAuthStateChanged(auth, user => {
                const data = safeParse(User, user);
                if (data.success) {
                    session.setUser(data.output);
                    resolve(true);
                } else {
                    session.removeUser();
                    resolve(false);
                }
            });
        });
    }
    await getAuthUser();
}
