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
    slate: 'bg-slate-700 hover:bg-slate-600',
    red: 'bg-red-900 hover:bg-red-800',
    amber: 'bg-amber-900 hover:bg-amber-800',
    green: 'bg-green-900 hover:bg-green-800',
    teal: 'bg-teal-900 hover:bg-teal-800',
    cyan: 'bg-cyan-900 hover:bg-cyan-800',
    blue: 'bg-blue-900 hover:bg-blue-800',
    indigo: 'bg-indigo-900 hover:bg-indigo-800',
    purple: 'bg-purple-900 hover:bg-purple-800',
    fuchsia: 'bg-fuchsia-900 hover:bg-fuchsia-800',
    rose: 'bg-rose-900 hover:bg-rose-800',
    surface: 'bg-surface-900 hover:bg-surface-800',
};

export type Colors = keyof typeof colors;
