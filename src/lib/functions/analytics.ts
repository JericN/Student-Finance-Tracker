import { NameNumber, StackedData } from '$lib/models/types';
import { Transaction, TransactionType } from '$lib/models/sft';
import { getCategoryStore, getWalletStore } from '$lib/store/database';

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

function renameKeys(data: StackedData | NameNumber, group: string): StackedData | NameNumber {
    if (group === 'category') {
        const categoryStore = getCategoryStore();
        return Object.keys(data).reduce(
            (acc, key) => {
                acc[categoryStore.find(key)?.name || 'Unknown'] = data[key];
                return acc;
            },
            {} as StackedData | NameNumber,
        );
    }
    if (group === 'wallet') {
        const walletStore = getWalletStore();
        return Object.keys(data).reduce(
            (acc, key) => {
                acc[walletStore.find(key)?.name || 'Unknown'] = data[key];
                return acc;
            },
            {} as StackedData | NameNumber,
        );
    }
    return data;
}

/**
 * Transform data into an aggregated time series by `Type`, compatible with Chart.js.
 * @param data - The data to transform of type {@linkcode Transaction}.
 * @param range - The range for filtering the data (`week`, `month`, `year`).
 * @returns The {@linkcode StackedData} representing the time series.
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

/**
 * Transform data into an aggregated time series by `Category`, compatible with Chart.js.
 * @param data - The data to transform of type {@linkcode Transaction}.
 * @param range - The range for filtering the data (`week`, `month`, `year`).
 * @returns The {@linkcode StackedData} object representing the time series for income and expense.
 */
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
    const income = renameKeys(incomeData, 'category') as StackedData;
    const expense = renameKeys(expenseData, 'category') as StackedData;

    return { income, expense };
}

/**
 * Transform data into an aggregated time series by `Wallet`, compatible with Chart.js.
 * @param data - The data to transform of type {@linkcode Transaction}.
 * @param range - The date for filtering the data (`week`, `month`, `year`).
 * @returns The {@linkcode StackedData} object representing the time series for income and expense.
 */
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
    const income = renameKeys(incomeData, 'wallet') as StackedData;
    const expense = renameKeys(expenseData, 'wallet') as StackedData;

    return { income, expense };
}

/**
 * Transform data by `Category`, compatible with Chart.js.
 * @param {Transaction[]} data - The data to transform of type {@linkcode Transaction}.
 * @param {string} range - The range for filtering the data (`week`, `month`, `year`).
 * @returns The {@linkcode NameNumber} object representing income and expense categories.
 */
export function makePieCategory(data: Transaction[], range: string): { income: NameNumber; expense: NameNumber } {
    // filter data by date cutoff
    data = filterDate(data, range);

    // get groups
    const categories = getCategoryStore().values();

    // initialize result object
    const incomeData = {} as NameNumber;
    const expenseData = {} as NameNumber;

    // initialize result object
    for (const category of categories) {
        const { id } = category;
        const { type } = category;

        if (type === TransactionType.Income) incomeData[id] = 0;
        if (type === TransactionType.Expense) expenseData[id] = 0;
    }

    // aggregate data to result object
    for (const entry of data) {
        const entryGroup = String(entry.categoryId);
        if (entry.type === TransactionType.Income) incomeData[entryGroup] += entry.amount;
        if (entry.type === TransactionType.Expense) expenseData[entryGroup] += entry.amount;
    }

    // rename ids to names if applicable
    const income = renameKeys(incomeData, 'category') as NameNumber;
    const expense = renameKeys(expenseData, 'category') as NameNumber;

    return { income, expense };
}

export function makeCategoryList(data: { income: NameNumber; expense: NameNumber }) {
    const categoryStore = getCategoryStore();

    const totalIncome = Object.values(data.income).reduce((acc, val) => acc + val, 0);
    const totalExpense = Object.values(data.expense).reduce((acc, val) => acc + val, 0);
    const income = Object.entries(data.income).map(([name, amount]) => {
        return {
            name,
            amount,
            icon: categoryStore.findByName(name)?.icon || 'x',
            percent: (amount / totalIncome) * 100,
        };
    });
    const expense = Object.entries(data.expense).map(([name, amount]) => {
        return {
            name,
            amount,
            icon: categoryStore.findByName(name)?.icon || 'x',
            percent: Math.round((amount / totalExpense) * 100),
        };
    });
    return { income, expense };
}
