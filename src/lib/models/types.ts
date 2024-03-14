import {
    type Output,
    boolean,
    coerce,
    date,
    email,
    enum_,
    length,
    maxLength,
    maxValue,
    minLength,
    minValue,
    nullish,
    number,
    object,
    omit,
    optional,
    partial,
    safeInteger,
    string,
} from 'valibot';
import { Timestamp } from 'firebase/firestore';

export enum TransactionType {
    Income = 'Income',
    Expense = 'Expense',
    Transfer = 'Transfer',
}

const DateSchema = coerce(date([minValue(new Date(2000, 0, 1)), maxValue(new Date(2100, 0, 1))]), input => {
    if (input instanceof Date) return new Date(input);
    if (input instanceof Timestamp) return input.toDate();
    throw new Error('Failed parsing date');
});

export const Transaction = object({
    id: string([length(20)]),
    createdAt: DateSchema,
    updatedAt: DateSchema,
    type: enum_(TransactionType),
    amount: number([safeInteger(), minValue(1)]),
    date: DateSchema,
    category: string([maxLength(30)]),
    wallet: string([maxLength(30)]),
    description: optional(string([maxLength(50)]), ''),
});
export type Transaction = Output<typeof Transaction>;

// This is used for validating a new transaction
export const Record = omit(Transaction, ['id', 'createdAt', 'updatedAt']);
export type Record = Output<typeof Record>;
export const PartialRecord = partial(Record);
export type PartialRecord = Output<typeof Record>;

// This is used for validating a transaction template
export const Template = object({
    id: string([length(20)]),
    createdAt: DateSchema,
    updatedAt: DateSchema,
    name: string([minLength(3), maxLength(30)]),
    type: enum_(TransactionType),
    amount: number([safeInteger(), minValue(1)]),
    category: string([maxLength(30)]),
    wallet: string([maxLength(30)]),
    description: optional(string([maxLength(50)]), ''),
});
export type Template = Output<typeof Template>;

export const TemplateForms = omit(Template, ['id', 'createdAt', 'updatedAt']);
export type TemplateForms = Output<typeof TemplateForms>;
export type PartialTemplateForms = Partial<Output<typeof TemplateForms>>;

export const Wallet = object({
    id: string([length(20)]),
    name: string([minLength(3), maxLength(30)]),
    amount: number([safeInteger(), minValue(0)]),
    description: optional(string([maxLength(50)])),
});
export type Wallet = Output<typeof Wallet>;

export const WalletRecord = omit(Wallet, ['id']);
export type WalletRecord = Output<typeof WalletRecord>

export const Session = object({
    loggedIn: boolean(),
    username: nullish(string()),
    email: nullish(string([email()])),
    uid: nullish(string()),
});
export type Session = Output<typeof Session>;

// TODO: move this
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

// TODO: move this
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
