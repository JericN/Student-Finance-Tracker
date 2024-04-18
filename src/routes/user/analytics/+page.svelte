<script lang="ts">
    import { Select, Type } from '$lib/components/forms';
    import { Tab, TabGroup } from '@skeletonlabs/skeleton';
    import {
        makeInterval,
        makePieCategory,
        makeTimeSeriesCategory,
        makeTimeSeriesType,
        makeTimeSeriesWallet,
    } from '$lib/functions/analytics';
    import { Card } from '$lib/components/modules';
    import CategoryList from './CategoryList.svelte';
    import PieChart from '$lib/charts/PieChart.svelte';
    import StackedLineChart from '$lib/charts/StackedLineChart.svelte';
    import { TransactionType } from '$lib/models/sft';
    import { getTransactionStore } from '$lib/store/transaction';

    export let data;
    $: ({ wallets } = data);

    const transactionStore = getTransactionStore();

    let currentType = TransactionType.Expense;

    // TODO: dont use hardcoded values here
    const rangeList = ['Week', 'Month', 'Year'];
    let currentRange = 'Week';

    $: walletList = ['All'].concat(wallets.map(wallet => wallet.name));
    let selectedWallet = 'All';

    $: interval = makeInterval(currentRange);
    $: typeData = makeTimeSeriesType($transactionStore, currentRange);
    $: wallet = makeTimeSeriesWallet($transactionStore, currentRange);
    $: category = makeTimeSeriesCategory($transactionStore, currentRange);
    $: pie = makePieCategory($transactionStore, currentRange, selectedWallet);

    let page = 0;
</script>

<TabGroup class="mb-6">
    <div slot="panel" class="flex flex-col items-center gap-2 p-10">
        <Type bind:type={currentType} hideLabel />
        <div class="mb-4 flex w-full gap-2">
            <Select bind:selected={currentRange} list={rangeList} />
            <Select bind:selected={selectedWallet} list={walletList} />
        </div>
        {#if page === 0}
            <PieChart dataset={currentType === 'Income' ? pie.income : pie.expense} />
            <CategoryList data={pie} {currentType} />
        {:else if page === 1}
            <div class="-mb-2 text-xl font-bold">Summary</div>
            <Card padding="p-0">
                <StackedLineChart dataset={typeData} {interval} />
            </Card>
            <div class="-mb-2 text-xl font-bold">Wallets</div>
            <Card padding="p-0">
                <StackedLineChart dataset={currentType === 'Income' ? wallet.income : wallet.expense} {interval} />
            </Card>
            <div class="-mb-2 text-xl font-bold">Categories</div>
            <Card padding="p-0">
                <StackedLineChart dataset={currentType === 'Income' ? category.income : category.expense} {interval} />
            </Card>
        {/if}

        <div class="absolute inset-x-0 bottom-16 flex justify-center">
            <Tab bind:group={page} name="Page1" value={0}>Page 1</Tab>
            <Tab bind:group={page} name="Page2" value={1}>Page 2</Tab>
        </div>
    </div>
</TabGroup>
