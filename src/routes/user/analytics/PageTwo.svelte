<script lang="ts">
    import { Card } from '$lib/components/modules';
    import type { StackedData } from '$lib/models/types';
    import StackedLineChart from '$lib/charts/StackedLineChart.svelte';

    export let typeData: StackedData;
    export let wallet: { income: StackedData; expense: StackedData };
    export let category: { income: StackedData; expense: StackedData };
    export let interval: Date[];
    export let currentType: string;
</script>

<div class="flex flex-col gap-2 text-center text-xl font-bold">
    <div class="-mb-2">Summary</div>
    <Card padding="p-0">
        <StackedLineChart dataset={typeData} {interval} />
    </Card>
    <div class="-mb-2">Wallets</div>
    <Card padding="p-0">
        <StackedLineChart dataset={currentType === 'Income' ? wallet.income : wallet.expense} {interval} />
    </Card>
    <div class="-mb-2">Categories</div>
    <Card padding="p-0">
        <StackedLineChart dataset={currentType === 'Income' ? category.income : category.expense} {interval} />
    </Card>
</div>
