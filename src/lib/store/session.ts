import { Session } from '$lib/models/types';
import { writable } from 'svelte/store';

const initial: Session = {
    user: null,
    loggedIn: false,
};
function init() {
    const store = writable<Session>(initial);

    const { subscribe, update } = store;

    function setUser(user: Session['user']) {
        update(state => {
            state.user = user;
            state.loggedIn = Boolean(user);
            return state;
        });
    }
    function removeUser() {
        update(state => {
            state.user = null;
            state.loggedIn = false;
            return state;
        });
    }

    return {
        subscribe,
        setUser,
        removeUser,
    };
}

type Store = ReturnType<typeof init>;

export const session: Store = init();
