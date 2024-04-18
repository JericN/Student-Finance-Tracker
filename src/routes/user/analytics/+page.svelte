<script lang="ts">
    import {
        makeInterval,
        makePieCategory,
        makeTimeSeriesCategory,
        makeTimeSeriesType,
        makeTimeSeriesWallet,
    } from '$lib/functions/analytics';
    import StackedLineChart from '$lib/charts/StackedLineChart.svelte';
    import PieChart from '$lib/charts/PieChart.svelte';
    import { getTransactionStore } from '$lib/store/transaction';

    const transactionStore = getTransactionStore();

    $: interval = makeInterval('week');
    $: typeData = makeTimeSeriesType($transactionStore, 'week');
    $: wallet = makeTimeSeriesWallet($transactionStore, 'week');
    $: category = makeTimeSeriesCategory($transactionStore, 'week');
    $: pie = makePieCategory($transactionStore, 'week');
</script>

<div class="grid h-full w-full grid-cols-2 grid-rows-4 gap-2">
    <div class="col-span-2">
        <StackedLineChart dataset={typeData} {interval} />
    </div>
    <StackedLineChart dataset={wallet.income} {interval} />
    <StackedLineChart dataset={wallet.expense} {interval} />
    <StackedLineChart dataset={category.income} {interval} />
    <StackedLineChart dataset={category.expense} {interval} />
    <PieChart dataset={pie.income} />
    <PieChart dataset={pie.expense} />
</div>
