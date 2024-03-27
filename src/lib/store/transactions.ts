import { Filters, Transaction, TransactionType } from '$lib/models/types';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { getContext, hasContext, setContext } from 'svelte';
import { db } from '$lib/firebase/firebase.client';
import { safeParse } from 'valibot';
import { session } from '$lib/store/session';
import { writable } from 'svelte/store';

const TRANSACTIONS = Symbol('transactions');

// TODO: validate correctness
function initStore() {
    const store = writable<Transaction[]>([]);
    const { subscribe, update } = store;

    const _filters: Filters = {
        amountMin: 0,
        amountMax: 100000,
        dateStart: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        dateEnd: new Date(),
        categoryIds: ['0SZUHNemVBPUfaVSKWW7', '9ebeHOEbveOUU9S8PaHO', 'CEovGujCSJI7QItCQJ7m', 'vVei2Kivk78M8zRn4ViK'],
        walletIds: ['00QEHRjC0NEPqwPzO39M', 'clxuW9LJnHka8RWIEXj1', 'iNcRmHAcGnP3Jcf6UN4F'],
        types: [TransactionType.Expense, TransactionType.Income],
    };

    function set(data: Transaction[]) {
        const filtered = data.filter(({ type, amount, date, categoryId, walletId }) => {
            return (
                (typeof _filters.amountMin === 'undefined' || amount >= _filters.amountMin) &&
                (typeof _filters.amountMax === 'undefined' || amount <= _filters.amountMax) &&
                (typeof _filters.dateStart === 'undefined' || date >= _filters.dateStart) &&
                (typeof _filters.dateEnd === 'undefined' || date <= _filters.dateEnd) &&
                (typeof _filters.categoryIds === 'undefined' || _filters.categoryIds.includes(categoryId)) &&
                (typeof _filters.walletIds === 'undefined' || _filters.walletIds.includes(walletId)) &&
                (typeof _filters.types === 'undefined' || _filters.types.includes(type))
            );
        });
        store.set(filtered);
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
        set(transactions);
    });

    return {
        set,
        subscribe,
        update,
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
