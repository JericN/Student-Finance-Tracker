import { Record } from '$lib/models/types';
import { parse } from 'valibot';
import { records } from '$lib/data/dummy';

export async function load({ parent }) {
    await parent();
    const transactions = parse(Record, records);
    return { transactions };
}
