import { type Output, array, keyof, number, object, record, safeInteger, string } from 'valibot';
import { Transaction } from './sft';

export const NameCount = record(number([safeInteger()]));
export type NameCount = Output<typeof NameCount>;

export const NameNumber = record(number());
export type NameNumber = Output<typeof NameNumber>;

export const StackedData = record(record(number()));
export type StackedData = Output<typeof StackedData>;

// export const StackedDate = array(object({ group: string(), x: date(), y: number() }));
// export type StackedDate = Output<typeof StackedDate>;
// type TS = {
//     data: Transaction[];
//     group: keyof Transaction;
//     range: string;
// };

export const AnalysisParams = object({ data: array(Transaction), group: keyof(Transaction), range: string() });
export type AnalysisParams = Output<typeof AnalysisParams>;
