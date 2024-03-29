import { Filters, TransactionType } from '$lib/models/types';
import { get, writable } from 'svelte/store';
import { getCategories, getWallets } from '$lib/firebase/database';

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
    const store = writable<Filters>(structuredClone(initial));

    const { set, subscribe } = store;

    function values() {
        return get(store);
    }

    async function reset() {
        const categories = await getCategories();
        const wallets = await getWallets();
        initial.categoryIds = categories.map(c => c.id);
        initial.walletIds = wallets.map(w => w.id);
        set(structuredClone(initial));
    }

    return {
        set,
        subscribe,
        values,
        reset,
    };
}

export const filterStore = initStore();

export async function load() {
    const categories = await getCategories();
    const wallets = await getWallets();
    initial.categoryIds = categories.map(c => c.id);
    initial.walletIds = wallets.map(w => w.id);
    filterStore.set(structuredClone(initial));
}
