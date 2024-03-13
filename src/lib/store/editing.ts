import { Transaction, TransactionType } from '$lib/models/types';
import { getContext, hasContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

const EDITING = Symbol('editing');

const initial = {
    id: '',
    timestamp: new Date(),
    date: new Date(),
    category: '',
    description: '',
    type: TransactionType.Expense,
    amount: 0,
    wallet: '',
} satisfies Transaction;

function initStore() {
    const editing = writable<Transaction>(structuredClone(initial));
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
    if (!hasContext(EDITING)) throw new Error('Failed to initialize editing store');
    return getContext<Store>(EDITING);
}
