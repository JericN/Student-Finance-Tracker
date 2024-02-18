import { POSTGRES_URL } from '$lib/server/env';
import pg from 'postgres';

const sql = pg(POSTGRES_URL);

export async function getTest() {
    const [first, ...rest] = await sql`SELECT count(*) result FROM mytable;`;
    if (rest.length > 0) throw new Error('More than one row returned');
    return first.result;
}
