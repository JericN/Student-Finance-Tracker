import * as FilterStore from '$lib/store/filter';
import { getCategories, getWallets } from '$lib/firebase/database';

export async function load({ parent }) {
    await parent();
    const categories = await getCategories();
    const wallets = await getWallets();
    FilterStore.load(categories, wallets);
}
