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
    import PageOne from './PageOne.svelte';
    import PageTwo from './PageTwo.svelte';
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
    $: typeData = makeTimeSeriesType($transactionStore, currentRange, selectedWallet);
    $: wallet = makeTimeSeriesWallet($transactionStore, currentRange);
    $: category = makeTimeSeriesCategory($transactionStore, currentRange, selectedWallet);
    $: pie = makePieCategory($transactionStore, currentRange, selectedWallet);

    let page = 0;
</script>

<div class="mb-6 flex flex-col items-center justify-between p-10">
    <TabGroup border="hidden" class="w-full max-w-screen-sm">
        <div slot="panel" class="space-y-2">
            <!-- Filter Group -->
            <Type bind:type={currentType} hideLabel />
            <div class="flex w-full gap-2 pb-4">
                <Select bind:selected={currentRange} list={rangeList} />
                <Select bind:selected={selectedWallet} list={walletList} />
            </div>

            <!-- Page Render -->
            {#if page === 0}
                <PageOne {pie} {currentType} />
            {:else if page === 1}
                <PageTwo {typeData} {wallet} {category} {interval} {currentType} />
            {/if}

            <!-- Navigation Group -->
            <div class="absolute inset-x-0 bottom-16 flex justify-center">
                <Tab bind:group={page} name="Page1" value={0}>Page 1</Tab>
                <Tab bind:group={page} name="Page2" value={1}>Page 2</Tab>
            </div>
        </div>
    </TabGroup>
</div>
