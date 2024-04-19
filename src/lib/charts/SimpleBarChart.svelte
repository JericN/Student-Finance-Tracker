<script lang="ts">
    import { type ChartData, type ChartOptions } from 'chart.js';
    import Chart from '$lib/charts/Chart.svelte';
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
            },
        ],
    } satisfies ChartData<'bar'>;

    $: options = {
        plugins: { legend: { display: false } },
    } as ChartOptions<'bar'>;
</script>

<Chart type="bar" {data} {options} />
