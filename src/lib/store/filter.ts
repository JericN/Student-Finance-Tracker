import { Filters, TransactionType } from '$lib/models/sft';
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

    return {
        set,
        subscribe,
        values,
    };
}

export const filterStore = initStore();

// FIXME: This is a temporary solution to load default filters
export async function loadDefault() {
    const categories = await getCategories();
    const wallets = await getWallets();
    initial.categoryIds = categories.map(c => c.id);
    initial.walletIds = wallets.map(w => w.id);
    filterStore.set(structuredClone(initial));
}

export function getDefault(): Filters {
    return structuredClone(initial);
}
