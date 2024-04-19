<script lang="ts">
    import { makeInterval, makeTimeSeriesType } from '$lib/functions/analytics';
    import { Card } from '$lib/components/modules';
    import SimpleLineChart from '$lib/charts/SimpleLineChart.svelte';
    import { getTransactionStore } from '$lib/store/transaction';

    const transactionStore = getTransactionStore();

    $: interval = makeInterval('Week');
    $: typeData = makeTimeSeriesType($transactionStore, 'Week', 'All');
</script>

<div class="w-full max-w-sm">
    <div class="text-center font-bold">EXPENSES</div>
    <Card padding="p-0">
        <SimpleLineChart dataset={typeData.Expense} {interval} />
    </Card>
</div>
