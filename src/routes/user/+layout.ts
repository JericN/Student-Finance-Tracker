import * as FilterStore from '$lib/store/filter';

export async function load({ parent }) {
    await parent();
    await FilterStore.load();
}
