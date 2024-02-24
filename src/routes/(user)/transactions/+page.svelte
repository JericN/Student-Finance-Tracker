<script lang="ts">
    import { Accordion } from '@skeletonlabs/skeleton';
    import Summary from './Summary.svelte';
    import Transaction from './Transaction.svelte';
    import groupBy from 'object.groupby';
    import { records } from '$lib/data/dummy';

    // Placeholder data
    const income = 1430;
    const expenses = 870;
    const balance = income - expenses;
    const transactions = groupBy(records, ({ date }) => date);
</script>

<div class="flex flex-col items-center gap-10 p-10">
    <Summary {income} {expenses} {balance} />
    <Accordion class="max-w-screen-sm text-xs" spacing={'space-y-4'} regionCaret={'hidden'} hover="">
        {#each Object.values(transactions) as entries, id}
            <Transaction {entries} {id} />
        {/each}
    </Accordion>
</div>
