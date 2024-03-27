<script lang="ts">
    import { Accordion } from '@skeletonlabs/skeleton';
    import Summary from './Summary.svelte';
    import Transactions from './Transactions.svelte';
    import { getTransactionStore } from '$lib/store/database';
    import groupBy from 'object.groupby';

    const transactions = getTransactionStore();

    // Placeholder data
    const income = 1430;
    const expenses = 870;
    const balance = income - expenses;

    $: records = groupBy($transactions, ({ date }) => date.getDate());
</script>

<div class="flex flex-col items-center gap-4 p-10">
    <Summary {income} {expenses} {balance} />
    <Accordion class="max-w-screen-sm text-xs" spacing={'space-y-4'} regionCaret={'hidden'} hover="">
        {#each Object.values(records) as entries, id}
            <Transactions {entries} {id} />
        {/each}
    </Accordion>
</div>
