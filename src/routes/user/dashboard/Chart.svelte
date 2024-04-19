<script lang="ts">
    import { Card } from '$lib/components/modules';
    import LineChart from '$lib/charts/SimpleLineChart.svelte';

    // TODO: should fetch the most recent transactions
    export let dataset: Record<string, number>;
</script>

<div class="w-full max-w-sm">
    <div class="text-center font-bold">EXPENSES</div>
    <Card>
        <LineChart {dataset} />
    </Card>
</div>
