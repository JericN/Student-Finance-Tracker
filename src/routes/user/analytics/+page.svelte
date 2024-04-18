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
    import { getWalletStore } from '$lib/store/database';
    import { onMount } from 'svelte';
    import { getWallets } from '$lib/firebase/database';

    export let data;
    $: ({ wallets } = data);

    const transactionStore = getTransactionStore();

    // TODO: dont use hardcoded values here
    const types = [
        {
            key: 'Income',
            value: 'Income',
        },
        {
            key: 'Expense',
            value: 'Expense',
        },
    ];
    let currentType = 'Expense';

    $: walletList = wallets
        .map(wallet => {
            return { key: wallet.name, value: wallet.id };
        })
        .concat({ key: 'All', value: 'All' });
    let selectedWallet = 'All';

    $: interval = makeInterval('week');
    $: typeData = makeTimeSeriesType($transactionStore, 'week');
    $: wallet = makeTimeSeriesWallet($transactionStore, 'week');
    $: category = makeTimeSeriesCategory($transactionStore, 'week');
    $: pie = makePieCategory($transactionStore, 'week', selectedWallet);

    console.log(interval, typeData, wallet, category, pie);
</script>

{#if wallets}
    <div class="flex flex-col items-center gap-4 p-10">
        <Radio bind:select={currentType} list={types} />
        <Radio bind:select={selectedWallet} list={walletList} />
        <div class="max-w-screen-sm">
            <PieChart dataset={currentType === 'Income' ? pie.income : pie.expense} />
        </div>
        <CategoryList data={pie} {currentType} />
    </div>
{/if}
