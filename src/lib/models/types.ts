import { type Output, array, date, enum_, maxLength, number, object, optional, safeInteger, string } from 'valibot';

export enum TransactionType {
    Income = 'income',
    Expense = 'expense',
    Transfer = 'transfer',
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
    red: 'bg-red-900',
    amber: 'bg-amber-900',
    green: 'bg-green-900',
    teal: 'bg-teal-900',
    cyan: 'bg-cyan-900',
    blue: 'bg-blue-900',
    indigo: 'bg-indigo-900',
    purple: 'bg-purple-900',
    fuchsia: 'bg-fuchsia-900',
    rose: 'bg-rose-900',
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

export const Transaction = object({
    type: enum_(TransactionType),
    amount: number([safeInteger()]),
    date: date(),
    category: string([maxLength(30)]),
    wallet: string([maxLength(30)]),
    description: optional(string([maxLength(50)])),
});

export type Transaction = Output<typeof Transaction>;
