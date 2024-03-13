import { Wallets } from '$lib/models/types';
import { getContext, hasContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

const EDITING = Symbol('editing');

const initial = {
    id: 0,
    description: '',
    amount: 0,
    name: '',
} satisfies Wallets[0];

function initStore() {
    const editing = writable<Wallets[0]>(structuredClone(initial));
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
