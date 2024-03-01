<script lang="ts">
    import { Accordion } from '@skeletonlabs/skeleton';
    import Summary from './Summary.svelte';
    import Transaction from './Transaction.svelte';
    import groupBy from 'object.groupby';

    export let data;
    $: ({ transactions } = data);

    // Placeholder data
    const income = 1430;
    const expenses = 870;
    const balance = income - expenses;

    $: records = transactions ? groupBy(transactions, ({ date }) => date.getDate()) : {};
</script>

<div class="flex flex-col items-center gap-4 p-10">
    <Summary {income} {expenses} {balance} />
    <Accordion class="max-w-screen-sm text-xs" spacing={'space-y-4'} regionCaret={'hidden'} hover="">
        {#each Object.values(records) as entries, id}
            <Transaction {entries} {id} />
        {/each}
    </Accordion>
</div>
