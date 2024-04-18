<script lang="ts">
    import StackedLineChart from '$lib/charts/StackedLineChart.svelte';
    import { getTransactionStore } from '$lib/store/transaction';
    import {
        makeInterval,
        makeTimeSeriesCategory,
        makeTimeseriesType,
        makeTimeSeriesWallet,
    } from '$lib/functions/analytics';

    const transactionStore = getTransactionStore();

    $: interval = makeInterval('week');
    $: typeData = makeTimeseriesType($transactionStore, 'week');
    $: ({ incomeWallet, expenseWallet } = makeTimeSeriesWallet($transactionStore, 'week'));
    $: ({ incomeCategory, expenseCategory } = makeTimeSeriesCategory($transactionStore, 'week'));
</script>

<div class="grid h-full w-full grid-cols-2 grid-rows-3 gap-2">
    <div class="col-span-2">
        <StackedLineChart dataset={typeData} {interval} />
    </div>
    <StackedLineChart dataset={incomeWallet} {interval} />
    <StackedLineChart dataset={expenseWallet} {interval} />
    <StackedLineChart dataset={incomeCategory} {interval} />
    <StackedLineChart dataset={expenseCategory} {interval} />
</div>
