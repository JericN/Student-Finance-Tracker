<script lang="ts">
    import { getTotalExpenses, getTotalIncome, groupTransactions } from '$lib/funcs/helper';
    import { Accordion } from '@skeletonlabs/skeleton';
    import Summary from './Summary.svelte';
    import Transactions from './Transactions.svelte';
    import { getTransactionStore } from '$lib/store/transactions';

    const transactionStore = getTransactionStore();

    $: transactions = groupTransactions($transactionStore);
    $: income = getTotalIncome($transactionStore);
    $: expenses = getTotalExpenses($transactionStore);
    $: balance = income - expenses;
</script>

<div class="flex flex-col items-center gap-4 p-10">
    <Summary {income} {expenses} {balance} />
    <Accordion class="max-w-screen-sm text-xs" spacing={'space-y-4'} regionCaret={'hidden'} hover="">
        {#each Object.entries(transactions) as [time, entries], id}
            <Transactions {time} {entries} {id} />
        {/each}
    </Accordion>
</div>
