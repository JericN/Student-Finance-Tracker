<script lang="ts">
    import {
        makeInterval,
        makePieCategory,
        makeTimeSeriesCategory,
        makeTimeSeriesType,
        makeTimeSeriesWallet,
    } from '$lib/functions/analytics';
    import CategoryList from './CategoryList.svelte';
    import PieChart from '$lib/charts/PieChart.svelte';
    import { Radio } from '$lib/components/forms';
    import { getTransactionStore } from '$lib/store/transaction';

    const transactionStore = getTransactionStore();

    $: interval = makeInterval('week');
    $: typeData = makeTimeSeriesType($transactionStore, 'week');
    $: wallet = makeTimeSeriesWallet($transactionStore, 'week');
    $: category = makeTimeSeriesCategory($transactionStore, 'week');
    $: pie = makePieCategory($transactionStore, 'week');

    console.log(interval, typeData, wallet, category, pie);

    const types = ['Income', 'Expense'];
    let current = 'Expense';
</script>

<div class="flex flex-col items-center gap-4 p-10">
    <Radio bind:select={current} list={types} />
    <div class="max-w-screen-sm">
        <PieChart dataset={current === 'Income' ? pie.income : pie.expense} />
    </div>
    <CategoryList data={pie} {current} />
</div>
