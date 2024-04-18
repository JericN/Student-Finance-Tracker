import {
    type Output,
    array,
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
    nullable,
    nullish,
    number,
    object,
    omit,
    optional,
    partial,
    regex,
    safeInteger,
    string,
} from 'valibot';
import { Timestamp } from 'firebase/firestore';

const DateSchema = coerce(date([minValue(new Date(2000, 0, 1)), maxValue(new Date(2100, 0, 1))]), input => {
    if (input instanceof Date) return new Date(input);
    if (input instanceof Timestamp) return input.toDate();
    throw new Error('Failed parsing date');
});

export enum TransactionType {
    Income = 'Income',
    Expense = 'Expense',
    Transfer = 'Transfer',
}

// Defines the schema for validating a transaction object in the database.
export const Transaction = object({
    id: string([length(20)]),
    createdAt: DateSchema,
    updatedAt: DateSchema,
    type: enum_(TransactionType),
    amount: number([safeInteger(), minValue(1)]),
    date: DateSchema,
    categoryId: string([maxLength(30)]),
    walletId: string([maxLength(30)]),
    description: optional(string([maxLength(200)]), ''),
});
export type Transaction = Output<typeof Transaction>;

// Defines the schema for validating a transaction object from input forms
export const TransactionForm = omit(Transaction, ['id', 'createdAt', 'updatedAt']);
export type TransactionForm = Output<typeof TransactionForm>;

// Defines the schema for validating a partial transaction object from an input form,
export const PartialTransactionForm = partial(TransactionForm);
export type PartialTransactionForm = Output<typeof TransactionForm>;

// Defines the schema for validating a transaction template in the database.
export const Template = object({
    id: string([length(20)]),
    createdAt: DateSchema,
    updatedAt: DateSchema,
    name: string([minLength(3), maxLength(12)]),
    type: enum_(TransactionType),
    amount: number([safeInteger(), minValue(1)]),
    categoryId: string([maxLength(30)]),
    walletId: string([maxLength(30)]),
    description: optional(string([maxLength(50)])),
});
export type Template = Output<typeof Template>;

// Defines the schema for validating a transaction template from input forms
export const TemplateForm = omit(Template, ['id', 'createdAt', 'updatedAt']);
export type TemplateForm = Output<typeof TemplateForm>;

// Defines the schema for validating a wallet object in the database.
export const Wallet = object({
    id: string([length(20)]),
    createdAt: DateSchema,
    updatedAt: DateSchema,
    name: string([minLength(1), maxLength(10), regex(/[a-zA-Z]/)]),
    amount: number([safeInteger()]),
    description: optional(string([maxLength(50)])),
});
export type Wallet = Output<typeof Wallet>;

// Defines the schema for validating a wallet object from input forms
export const WalletForm = omit(Wallet, ['id', 'createdAt', 'updatedAt']);
export type WalletForm = Output<typeof WalletForm>;

// Defines the schema for validating a category object in the database.
export const Category = object({
    id: string([length(20)]),
    createdAt: DateSchema,
    updatedAt: DateSchema,
    type: enum_(TransactionType),
    name: string([minLength(3), maxLength(10)]),
    icon: string([minLength(1), maxLength(10)]),
    description: optional(string([maxLength(50)])),
});
export type Category = Output<typeof Category>;

// Defines the schema for validating a category object from input forms
export const CategoryForm = omit(Category, ['id', 'createdAt', 'updatedAt']);
export type CategoryForm = Output<typeof CategoryForm>;

// Defines the session object for the client
export const Session = object({
    loggedIn: boolean(),
    username: nullish(string()),
    email: nullish(string([email()])),
    uid: nullish(string()),
});
export type Session = Output<typeof Session>;

// Defines transaction filters schema
export const Filters = object({
    amountMin: nullable(number([safeInteger()])),
    amountMax: nullable(number([safeInteger()])),
    dateStart: nullable(DateSchema),
    dateEnd: nullable(DateSchema),
    categoryIds: array(string([maxLength(20)])),
    walletIds: array(string([maxLength(20)])),
    types: array(enum_(TransactionType)),
});
export type Filters = Output<typeof Filters>;

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
