import { getContext, hasContext, setContext } from 'svelte';
import { get as getStore, writable } from 'svelte/store';
import { Wallet } from '$lib/models/types';

const EDITING = Symbol('editing');

function initStore() {
    const store = writable<Partial<Wallet>>({});
    const { set, subscribe } = store;

    function values() {
        return getStore(store);
    }

    function save(transaction: Wallet) {
        set(transaction);
    }

    function reset() {
        set({});
    }

    return {
        save,
        set,
        subscribe,
        reset,
        values,
    };
}

type Store = ReturnType<typeof initStore>;

export function init() {
    setContext(EDITING, initStore() satisfies Store);
}

export function get() {
    if (!hasContext(EDITING)) throw new Error('Editing store not initialized');
    return getContext<Store>(EDITING);
}
