import { getContext, hasContext, setContext } from 'svelte';
import { get as getStore, writable } from 'svelte/store';
import { Record } from '$lib/models/types';

const CREATING = Symbol('creating');

function initStore() {
    const store = writable<Partial<Record>>({});
    const { set, subscribe } = store;

    function values() {
        return getStore(store);
    }

    function reset() {
        set({});
    }

    return {
        set,
        subscribe,
        values,
        reset,
    };
}

type Store = ReturnType<typeof initStore>;

export function init() {
    setContext(CREATING, initStore() satisfies Store);
}

export function get() {
    if (!hasContext(CREATING)) throw new Error('Editing store not initialized');
    return getContext<Store>(CREATING);
}
