export const prerender = false;

import { getTest } from '$lib/server/database';

export async function load() {
    const [test] = await Promise.all([getTest()]);
    return {
        test,
    };
}
