<script lang="ts">
    import Card from '$lib/components/Card.svelte';
    import LineChart from '$lib/charts/LineChart.svelte';

    // TODO: should fetch the most recent transactions
    export let dataset: Record<string, number>;
</script>

<div class="w-full max-w-sm">
    <div class="text-center font-bold">EXPENSES</div>
    <Card>
        <LineChart {dataset} />
    </Card>
</div>
