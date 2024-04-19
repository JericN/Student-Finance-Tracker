import { Transaction } from '$lib/models/sft';
import groupBy from 'object.groupby';

const currencyOptions = { style: 'currency', currency: 'PHP', minimumFractionDigits: 0, maximumFractionDigits: 2 };

export function currency(value: number) {
    return value.toLocaleString('en-US', currencyOptions);
}

export function hasValidDecimalPlaces(value: number) {
    const strInput = String(value).split('.')
    if (strInput.length === 1)
        return true;
    return strInput[1].length < 3;
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
