import { getContext, hasContext, setContext } from 'svelte';
import { Wallet } from '$lib/models/types';
import { writable } from 'svelte/store';

const CREATING = Symbol('creating');

const initial = {
    id: 0,
    description: '',
    amount: 0,
    name: '',
} satisfies Wallet;

function initStore() {
    const creating = writable<Wallet>(structuredClone(initial));
    function reset() {
        creating.set(structuredClone(initial));
    }
    return {
        ...creating,
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
