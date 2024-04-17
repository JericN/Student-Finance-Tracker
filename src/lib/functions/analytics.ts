import { AnalysisParams, StackedData } from '$lib/models/types';
import { getCategoryStore, getWalletStore } from '$lib/store/database';
import { Transaction } from '$lib/models/sft';
import { getDefault } from '$lib/store/filter';

// return array of days from 7 days before today
function getDays() {
    const days = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        d.setHours(0, 0, 0, 0);
        days.push(d);
    }
    return days;
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

function generateLabels(group: keyof Transaction) {
    const { types, categoryIds, walletIds } = getDefault();
    switch (group) {
        case 'type':
            return types;
        case 'categoryId':
            return categoryIds;
        case 'walletId':
            return walletIds;
        default:
            throw new Error('Invalid group');
    }
}

function renameKeys(data: StackedData, group: keyof Transaction): StackedData {
    if (group === 'categoryId') {
        const categoryStore = getCategoryStore();
        return Object.keys(data).reduce((acc, key) => {
            acc[categoryStore.find(key)?.name || 'Unknown'] = data[key];
            return acc;
        }, {} as StackedData);
    }
    if (group === 'walletId') {
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
export function makeTimeSeries({ data, group, range }: AnalysisParams): { data: StackedData; interval: Date[] } {
    // filter data by date cutoff
    data = filterDate(data, range);

    // get groups and interval
    const groups = generateLabels(group);
    const interval = getDays();

    // initialize result object
    const result = {} as StackedData;
    for (const group of groups) {
        result[group] = {};
        for (const day of interval) result[group][day.toDateString()] = 0;
    }

    // aggregate data to result object
    for (const entry of data) {
        const day = entry.date.toDateString();
        const entryGroup = String(entry[group]);
        result[entryGroup][day] += entry.amount;
    }

    // rename ids to names if applicable
    const final = renameKeys(result, group);

    return { data: final, interval };
}
