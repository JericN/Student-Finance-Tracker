import { get, writable } from 'svelte/store';
import { Session } from '$lib/models/types';
import type { User } from 'firebase/auth';

const initial: Session = {
    loggedIn: false,
    username: null,
    email: null,
    uid: null,
};

function initStore() {
    const store = writable<Session>(initial);

    const { set, subscribe } = store;

    function create(user: User) {
        const session = {
            loggedIn: true,
            uid: user.uid,
            username: user.displayName,
            email: user.email,
        } satisfies Session;

        set(session);
    }

    function clear() {
        set(initial);
    }

    function values(): Session {
        return get(store);
    }

    function uid() {
        return get(store).uid;
    }

    return {
        create,
        clear,
        subscribe,
        uid,
        values,
    };
}

type Store = ReturnType<typeof initStore>;

export const session: Store = initStore();
