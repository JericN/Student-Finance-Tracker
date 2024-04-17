<script lang="ts">
    import StackedLineChart from '$lib/charts/StackedLineChart.svelte';
    import { getTransactionStore } from '$lib/store/transaction';
    import { makeTimeSeries } from '$lib/functions/analytics';

    const transactionStore = getTransactionStore();

    $: ({ data, interval } = makeTimeSeries({ data: $transactionStore, group: 'type', range: 'week' }));
</script>

<div>
    <StackedLineChart dataset={data} {interval} />
</div>
