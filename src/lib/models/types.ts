import { type Output, array, number, object, safeInteger, string } from 'valibot';

export enum TransactionType {
    Income,
    Expense,
    Transfer,
}

export const Record = array(
    object({
        date: number([safeInteger()]),
        category: string(),
        description: string(),
        type: string(),
        amount: number([safeInteger()]),
    }),
);

export type Record = Output<typeof Record>;

export const colors = {
    slate: 'bg-slate-700 active:bg-slate-600',
    red: 'bg-red-900 active:bg-red-800',
    amber: 'bg-amber-900 active:bg-amber-800',
    green: 'bg-green-900 active:bg-green-800',
    teal: 'bg-teal-900 active:bg-teal-800',
    cyan: 'bg-cyan-900 active:bg-cyan-800',
    blue: 'bg-blue-900 active:bg-blue-800',
    indigo: 'bg-indigo-900 active:bg-indigo-800',
    purple: 'bg-purple-900 active:bg-purple-800',
    fuchsia: 'bg-fuchsia-900 active:bg-fuchsia-800',
    rose: 'bg-rose-900 active:bg-rose-800',
    surface: 'bg-surface-700 active:bg-surface-600',
    primary: 'bg-primary-900 active:bg-primary-800',
    secondary: 'bg-secondary-900 active:bg-secondary-800',
    success: 'bg-success-900 active:bg-success-800',
};

export type Colors = keyof typeof colors;

export enum days {
    Sun,
    Mon,
    Tue,
    Wed,
    Thu,
    Fri,
    Sat,
}

export type Days = (typeof days)[number];
