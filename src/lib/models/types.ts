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
