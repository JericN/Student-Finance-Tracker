<script lang="ts">
    import { Accordion } from '@skeletonlabs/skeleton';
    import Summary from './Summary.svelte';
    import Transactions from './Transactions.svelte';
    import { currency } from '$lib/funcs/helper';
    import { getTransactionStore } from '$lib/store/database';
    import groupBy from 'object.groupby';

    const transactionStore = getTransactionStore();
    $: transactionByDate = groupBy($transactionStore, ({ date }) => date.getDate());

    $: income = $transactionStore.reduce((acc, { amount, type }) => (type === 'Income' ? acc + amount : acc), 0);
    $: expenses = $transactionStore.reduce((acc, { amount, type }) => (type === 'Expense' ? acc + amount : acc), 0);
    $: balance = income - expenses;
</script>

<div class="flex flex-col items-center gap-4 p-10">
    <Summary {income} {expenses} {balance} />
    <Accordion class="max-w-screen-sm text-xs" spacing={'space-y-4'} regionCaret={'hidden'} hover="">
        {#each Object.values(transactionByDate) as entries, id}
            <Transactions {entries} {id} />
        {/each}
    </Accordion>
</div>
