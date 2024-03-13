<script lang="ts">
    import { Accordion } from '@skeletonlabs/skeleton';
    import Summary from './Summary.svelte';
    import { Transaction } from '$lib/models/types';
    import Transactions from './Transactions.svelte';
    import { getTransactions } from '$lib/firebase/database';
    import groupBy from 'object.groupby';

    // Placeholder data
    const income = 1430;
    const expenses = 870;
    const balance = income - expenses;

    let records: Record<number, Transaction[]> = {};
    async function update() {
        const data: Transaction[] = await getTransactions();
        records = data ? groupBy(data, ({ date }) => date.getDate()) : {};
    }
</script>

<div class="flex flex-col items-center gap-4 p-10">
    <button on:click={update}>add test</button>
    <Summary {income} {expenses} {balance} />
    <Accordion class="max-w-screen-sm text-xs" spacing={'space-y-4'} regionCaret={'hidden'} hover="">
        {#each Object.values(records) as entries, id}
            <Transactions {entries} {id} />
        {/each}
    </Accordion>
</div>
