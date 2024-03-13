import { auth, initializeFirebase } from '$lib/firebase/firebase.client';
import { onAuthStateChanged } from 'firebase/auth';
import { session } from '$lib/store/session';

export const prerender = true;
export const ssr = false;
export const trailingSlash = 'always';

export async function load() {
    try {
        initializeFirebase();
    } catch (error) {
        throw new Error('Failed to initialize Firebase');
    }

    function getAuthUser() {
        return new Promise(resolve => {
            onAuthStateChanged(auth, user => {
                if (!user) session.clear();
                else session.create(user);
                resolve(true);
            });
        });
    }

    await getAuthUser();
}
