import { collection, onSnapshot, query } from 'firebase/firestore';
import { getContext, hasContext, setContext } from 'svelte';
import { Transaction } from '$lib/models/types';
import { db } from '$lib/firebase/firebase.client';
import { safeParse } from 'valibot';
import { session } from '$lib/store/session';
import { writable } from 'svelte/store';

const TRANSACTIONS = Symbol('transactions');

// TODO: validate correctness
function initStore() {
    const store = writable<Transaction[]>([]);
    const { set, subscribe, update } = store;

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

export function get() {
    if (!hasContext(TRANSACTIONS)) throw new Error('Failed to initialize editing store');
    return getContext<Store>(TRANSACTIONS);
}
