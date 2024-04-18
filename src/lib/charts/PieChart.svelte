<script lang="ts">
    import Chart from '$lib/charts/Chart.svelte';
    import { type ChartData } from 'chart.js';
    import type { NameNumber } from '$lib/models/types';

    export let dataset: NameNumber;

    $: data = {
        labels: Object.keys(dataset),
        datasets: [
            {
                data: Object.values(dataset),
                backgroundColor: Object.keys(dataset).map(
                    (_, i) => `hsl(${(i * 200) / Object.keys(dataset).length}, 45%, 60%)`,
                ),
                borderColor: '#294665',
                borderWidth: 3,
                borderRadius: 4,
                hoverOffset: 20,
                spacing: 4,
            },
        ],
    } satisfies ChartData<'doughnut'>;
</script>

<Chart type="doughnut" {data} />
