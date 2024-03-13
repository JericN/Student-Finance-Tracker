import { getContext, hasContext, setContext } from 'svelte';
import { get as getStore, writable } from 'svelte/store';
import { Transaction } from '$lib/models/types';

const EDITING = Symbol('editing');

function initStore() {
    const store = writable<Partial<Transaction>>({});
    const { set, subscribe } = store;

    function values() {
        return getStore(store);
    }

    function save(transaction: Transaction) {
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
    if (!hasContext(EDITING)) throw new Error('Failed to initialize editing store');
    return getContext<Store>(EDITING);
}
