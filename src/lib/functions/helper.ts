import { Transaction } from '$lib/models/types';
import groupBy from 'object.groupby';

const currencyOptions = { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 };

export function currency(value: number) {
    return value.toLocaleString('en-US', currencyOptions);
}

export function groupTransactions(transactions: Transaction[]) {
    const transactionByDate = groupBy(transactions, ({ date }) => date.getTime());
    return Object.fromEntries(Object.entries(transactionByDate).sort(([a], [b]) => Number(a) - Number(b)));
}

export function getTotalIncome(transactions: Transaction[]) {
    return transactions.reduce((acc, { amount, type }) => (type === 'Income' ? acc + amount : acc), 0);
}

export function getTotalExpenses(transactions: Transaction[]) {
    return transactions.reduce((acc, { amount, type }) => (type === 'Expense' ? acc + amount : acc), 0);
}