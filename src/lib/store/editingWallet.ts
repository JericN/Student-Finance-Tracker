import { getContext, hasContext, setContext } from 'svelte';
import { Wallet } from '$lib/models/types';
import { writable } from 'svelte/store';

const EDITING = Symbol('editing');

const initial = {
    id: 0,
    description: '',
    amount: 0,
    name: '',
} satisfies Wallet;

function initStore() {
    const editing = writable<Wallet>(structuredClone(initial));
    function reset() {
        editing.set(structuredClone(initial));
    }
    return {
        ...editing,
        reset,
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
