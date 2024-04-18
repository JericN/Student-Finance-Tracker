import { type Output, number, record, safeInteger } from 'valibot';

export const NameCount = record(number([safeInteger()]));
export type NameCount = Output<typeof NameCount>;

export const NameNumber = record(number());
export type NameNumber = Output<typeof NameNumber>;

export const StackedData = record(record(number()));
export type StackedData = Output<typeof StackedData>;
