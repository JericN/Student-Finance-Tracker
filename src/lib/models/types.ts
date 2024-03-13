import {
    type Output,
    array,
    boolean,
    date,
    enum_,
    minLength,
    maxLength,
    maxValue,
    minValue,
    number,
    object,
    optional,
    safeInteger,
    string,
} from 'valibot';

export enum TransactionType {
    Income = 'income',
    Expense = 'expense',
    Transfer = 'transfer',
}

export const Record = array(
    object({
        amount: number([safeInteger(), minValue(1)]),
        category: string([maxLength(30)]),
        date: date([minValue(new Date(2000, 0, 1)), maxValue(new Date(2100, 0, 1))]),
        description: optional(string([maxLength(50)])),
        id: number([safeInteger()]),
        type: enum_(TransactionType),
        wallet: string([maxLength(30)]),
    }),
);

export type Record = Output<typeof Record>;

export const User = object({
    id: number(),
    name: string(),
    email: string(),
    auth: boolean(),
});

export type User = Output<typeof User>;

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
    amount: number([safeInteger(), minValue(1)]),
    date: date([minValue(new Date(2000, 0, 1)), maxValue(new Date(2100, 0, 1))]),
    category: string([maxLength(30)]),
    wallet: string([maxLength(30)]),
    description: optional(string([maxLength(50)])),
});

export type Transaction = Output<typeof Transaction>;

export const Wallet = object({
    name: string([minLength(1),maxLength(30)]),
    amount: number([safeInteger(), minValue(1)]),
    description: optional(string([maxLength(50)])),
});

export type Wallet = Output<typeof Wallet>;