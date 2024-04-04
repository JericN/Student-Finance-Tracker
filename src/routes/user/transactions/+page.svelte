<script lang="ts">
    import { Accordion, getModalStore } from '@skeletonlabs/skeleton';
    import { getTotalExpenses, getTotalIncome, groupTransactions } from '$lib/functions/helper';
    import { Button } from '$lib/components/modules';
    import Summary from './Summary.svelte';
    import Transactions from './Transactions.svelte';
    import { getTransactionStore } from '$lib/store/transaction';

    const modalStore = getModalStore();
    const transactionStore = getTransactionStore();

    function showFilters() {
        modalStore.trigger({ type: 'component', component: 'filter', title: 'Filters' });
    }

    $: transactions = groupTransactions($transactionStore);
    $: income = getTotalIncome($transactionStore);
    $: expenses = getTotalExpenses($transactionStore);
    $: balance = income - expenses;
</script>

<div class="flex flex-col items-center gap-4 p-10">
    <Summary {income} {expenses} {balance} />
    <Button text="text-xs" width="w-fit" on:click={showFilters}>Filters</Button>
    <Accordion class="max-w-screen-sm text-xs" spacing={'space-y-4'} regionCaret={'hidden'} hover="">
        {#each Object.entries(transactions) as [time, entries], id}
            <Transactions {time} {entries} {id} />
        {/each}
    </Accordion>
</div>
