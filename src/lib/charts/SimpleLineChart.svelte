<script lang="ts">
    import { type ChartData, type ChartOptions } from 'chart.js';
    import Chart from '$lib/charts/Chart.svelte';
    import type { NameCount } from '$lib/models/types';

    export let dataset: NameCount;

    $: data = {
        labels: Object.keys(dataset),
        datasets: [
            {
                label: 'Count',
                data: Object.values(dataset),
                backgroundColor: '#ffffff',
                borderColor: '#448e32',
                borderWidth: 2,
            },
        ],
    } as ChartData<'line'>;

    // TODO: have parent pass these options
    $: options = {
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    color: '#242c46',
                    font: { size: 10, family: 'ShantellSans', weight: 'bold' },
                },
            },
            y: {
                grid: { lineWidth: 1 },
                ticks: {
                    color: '#242c46',
                    font: {
                        size: 8,
                        family: 'ShantellSans',
                    },
                },
            },
        },
    } as ChartOptions<'line'>;
</script>

<Chart type="line" {data} {options} />
