import { getTransactions } from '$lib/firebase/database';

export async function load({ parent }) {
    await parent();

    const transactions = await getTransactions();

    return {
        transactions,
    };
}
