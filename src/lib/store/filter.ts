import { Category, Filters, TransactionType, Wallet } from '$lib/models/types';
import { get, writable } from 'svelte/store';

const initial: Filters = {
    amountMin: null,
    amountMax: null,
    dateStart: null,
    dateEnd: null,
    categoryIds: [],
    walletIds: [],
    types: [TransactionType.Expense, TransactionType.Income, TransactionType.Transfer],
};

export function initStore() {
    const store = writable<Filters>(initial);

    const { set, subscribe } = store;

    function values() {
        return get(store);
    }

    return {
        set,
        subscribe,
        values,
    };
}

export function load(categories: Category[], wallets: Wallet[]) {
    initial.categoryIds = categories.map(c => c.id);
    initial.walletIds = wallets.map(w => w.id);
}

export const filterStore = initStore();
