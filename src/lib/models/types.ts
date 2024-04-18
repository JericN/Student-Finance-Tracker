import { type Output, number, record } from 'valibot';

export const StackedData = record(record(number()));
export type StackedData = Output<typeof StackedData>;
