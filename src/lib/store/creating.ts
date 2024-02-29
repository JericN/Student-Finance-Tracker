import { Record, TransactionType } from '$lib/models/types';
import { getContext, hasContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

const CREATING = Symbol('creating');

const initial = {
    id: 0,
    date: new Date(),
    category: '',
    description: '',
    type: TransactionType.Expense,
    amount: 0,
    wallet: '',
} satisfies Record[0];

function initStore() {
    const creating = writable<Record[0]>(structuredClone(initial));
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