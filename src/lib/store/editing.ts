import { Record, TransactionType } from '$lib/models/types';
import { getContext, hasContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

const EDITING = Symbol('editing');

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
    const editing = writable<Record[0]>(structuredClone(initial));
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
