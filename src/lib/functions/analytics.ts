import { Transaction, TransactionType } from '$lib/models/sft';
import { getCategoryStore, getWalletStore } from '$lib/store/database';
import { StackedData } from '$lib/models/types';

// return array of days from 7 days before today
function getDays(range: number) {
    const days = [];
    for (let i = 0; i < range; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        d.setHours(0, 0, 0, 0);
        days.push(d);
    }
    return days;
}

export function makeInterval(interval: string) {
    switch (interval) {
        case 'week':
            return getDays(7);
        case 'month':
            return getDays(30);
        case 'year':
            return getDays(365);
        default:
            throw new Error('Invalid interval');
    }
}

function filterDate(data: Transaction[], range: string): Transaction[] {
    const limit = new Date();
    switch (range) {
        case 'week':
            limit.setDate(limit.getDate() - 7);
            return data.filter(({ date }) => date > limit);
        case 'month':
            limit.setDate(limit.getDate() - 30);
            return data.filter(({ date }) => date > limit);
        case 'year':
            limit.setDate(limit.getDate() - 365);
            return data.filter(({ date }) => date > limit);
        default:
            return data;
    }
}

function renameKeys(data: StackedData, group: string): StackedData {
    if (group === 'category') {
        const categoryStore = getCategoryStore();
        return Object.keys(data).reduce((acc, key) => {
            acc[categoryStore.find(key)?.name || 'Unknown'] = data[key];
            return acc;
        }, {} as StackedData);
    }
    if (group === 'wallet') {
        const walletStore = getWalletStore();
        return Object.keys(data).reduce((acc, key) => {
            acc[walletStore.find(key)?.name || 'Unknown'] = data[key];
            return acc;
        }, {} as StackedData);
    }
    return data;
}

/**
 * Transform data into a aggregated time series data compatible with chartjs.
 * @param data - The data to transform of type {@linkcode Transaction}.
 * @param group - The property used for grouping the data (`type`, `categoryId`, `walletId`).
 * @param range - The date range for filtering the data (`week`, `month`, `year`).
 * @returns An object containing the grouped data and the interval of dates.
 */
export function makeTimeSeriesType(data: Transaction[], range: string): StackedData {
    // filter data by date cutoff
    data = filterDate(data, range);

    // get groups and interval
    const groups = [TransactionType.Income, TransactionType.Expense];
    const interval = makeInterval(range);

    // initialize result object
    const result = {} as StackedData;
    for (const group of groups) {
        result[group] = {};
        for (const day of interval) result[group][day.toDateString()] = 0;
    }

    // aggregate data to result object
    for (const entry of data) {
        const day = entry.date.toDateString();
        const entryGroup = entry.type;
        result[entryGroup][day] += entry.amount;
    }

    return result;
}

export function makeTimeSeriesCategory(
    data: Transaction[],
    range: string,
): {
    income: StackedData;
    expense: StackedData;
} {
    // filter data by date cutoff
    data = filterDate(data, range);

    // get groups and interval
    const categories = getCategoryStore().values();
    const interval = makeInterval(range);

    // initialize result object
    const incomeData = {} as StackedData;
    const expenseData = {} as StackedData;
    for (const category of categories) {
        const { id } = category;
        if (category.type === TransactionType.Income) {
            incomeData[id] = {};
            for (const day of interval) incomeData[id][day.toDateString()] = 0;
        } else if (category.type === TransactionType.Expense) {
            expenseData[id] = {};
            for (const day of interval) expenseData[id][day.toDateString()] = 0;
        }
    }

    // aggregate data to result object
    for (const entry of data) {
        const day = entry.date.toDateString();
        const entryGroup = String(entry.categoryId);
        if (entry.type === TransactionType.Income) incomeData[entryGroup][day] += entry.amount;
        if (entry.type === TransactionType.Expense) expenseData[entryGroup][day] += entry.amount;
    }

    // rename ids to names if applicable
    const income = renameKeys(incomeData, 'category');
    const expense = renameKeys(expenseData, 'category');

    return { income, expense };
}

export function makeTimeSeriesWallet(
    data: Transaction[],
    range: string,
): {
    income: StackedData;
    expense: StackedData;
} {
    // filter data by date cutoff
    data = filterDate(data, range);

    // get groups and interval
    const wallets = getWalletStore().values();
    const interval = makeInterval(range);

    // initialize result object
    const incomeData = {} as StackedData;
    const expenseData = {} as StackedData;
    for (const wallet of wallets) {
        const { id } = wallet;
        incomeData[id] = {};
        expenseData[id] = {};
        for (const day of interval) {
            incomeData[id][day.toDateString()] = 0;
            expenseData[id][day.toDateString()] = 0;
        }
    }

    // aggregate data to result object
    for (const entry of data) {
        const day = entry.date.toDateString();
        const entryGroup = String(entry.walletId);
        if (entry.type === TransactionType.Income) incomeData[entryGroup][day] += entry.amount;
        if (entry.type === TransactionType.Expense) expenseData[entryGroup][day] += entry.amount;
    }

    // rename ids to names if applicable
    const income = renameKeys(incomeData, 'wallet');
    const expense = renameKeys(expenseData, 'wallet');

    return { income, expense };
}
