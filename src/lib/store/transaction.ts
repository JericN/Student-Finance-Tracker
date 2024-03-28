import { collection, onSnapshot, query } from 'firebase/firestore';
import { getContext, hasContext, setContext } from 'svelte';
import { Transaction } from '$lib/models/types';
import { db } from '$lib/firebase/firebase.client';
import { filterStore } from '$lib/store/filter';
import { getTransactions } from '$lib/firebase/database';
import { safeParse } from 'valibot';
import { session } from '$lib/store/session';
import { writable } from 'svelte/store';

const TRANSACTIONS = Symbol('transactions');

function initStore() {
    const store = writable<Transaction[]>([]);
    const { subscribe } = store;

    function setData(data: Transaction[]) {
        const filters = filterStore.values();
        const filtered = data.filter(({ type, amount, date, categoryId, walletId }) => {
            return (
                (filters.amountMin === null || amount >= filters.amountMin) &&
                (filters.amountMax === null || amount <= filters.amountMax) &&
                (filters.dateStart === null || date >= filters.dateStart) &&
                (filters.dateEnd === null || date <= filters.dateEnd) &&
                (typeof filters.categoryIds === 'undefined' || filters.categoryIds.includes(categoryId)) &&
                (typeof filters.walletIds === 'undefined' || filters.walletIds.includes(walletId)) &&
                (typeof filters.types === 'undefined' || filters.types.includes(type))
            );
        });
        store.set(filtered);
    }

    async function updateData() {
        const transactions = await getTransactions();
        setData(transactions);
    }

    const q = query(collection(db, `UserData/${session.uid()}/transactions`));
    const unsubscribe = onSnapshot(q, querySnap => {
        const transactions: Transaction[] = [];
        if (querySnap.metadata.hasPendingWrites) return;
        querySnap.forEach(doc => {
            const value = { ...doc.data(), id: doc.id };
            const json = safeParse(Transaction, value);
            if (json.success) transactions.push(json.output);
            else throw new Error('Failed parsing transaction');
        });
        setData(transactions);
    });

    return {
        subscribe,
        updateData,
        unsubscribe,
    };
}

type Store = ReturnType<typeof initStore>;

export function init() {
    setContext(TRANSACTIONS, initStore() satisfies Store);
}

export function getTransactionStore() {
    if (!hasContext(TRANSACTIONS)) throw new Error('Failed to initialize editing store');
    return getContext<Store>(TRANSACTIONS);
}
