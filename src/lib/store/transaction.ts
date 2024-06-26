import { collection, onSnapshot, query } from 'firebase/firestore';
import { getContext, hasContext, setContext } from 'svelte';
import { getTransactions, updateBudgetAmount } from '$lib/firebase/database';
import { Transaction } from '$lib/models/sft';
import { db } from '$lib/firebase/firebase.client';
import { filterStore } from '$lib/store/filter';
import { safeParse } from 'valibot';
import { session } from '$lib/store/session';
import { writable } from 'svelte/store';

const TRANSACTIONS = Symbol('transactions');

function updateBudget(transactions: Transaction[]) {
    const expenses = transactions.filter(({ type }) => type === 'Expense');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayExpenses = expenses.filter(({ date }) => date.getTime() === today.getTime());
    const totalTodayExpenses = todayExpenses.reduce((acc, { amount }) => acc + amount, 0);
    updateBudgetAmount(totalTodayExpenses);
}

function initStore() {
    const store = writable<Transaction[]>([]);
    const { subscribe } = store;

    // FIXME: do not filter removed categories and wallets
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
        updateBudget(transactions);
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
