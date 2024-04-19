<script lang="ts">
    import { type ChartData, type ChartOptions } from 'chart.js';
    import Chart from '$lib/charts/Chart.svelte';
    import { StackedData } from '$lib/models/types';

    export let dataset: StackedData;
    export let interval: Date[];

    $: data = {
        labels: interval,
        datasets: Object.entries(dataset).map(([label, data], i) => ({
            label,
            data: Object.values(data),
            borderColor: `hsl(${(i * 200) / Object.keys(dataset).length}, 45%, 70%)`,
            backgroundColor: `hsl(${(i * 200) / Object.keys(dataset).length}, 45%, 60%)`,
            borderWidth: 2,
            pointBorderWidth: 0,
        })),
    } satisfies ChartData<'line'>;

    $: options = {
        maintainAspectRatio: false,
        plugins: { legend: { display: true, position: 'bottom' } },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    color: '#242c46',
                    font: { size: 8, family: 'ShantellSans', weight: 'bold' },
                    minRotation: 0,
                    maxRotation: 90,
                },
                type: 'time',
                time: {
                    unit: 'day',
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
    // $: options = { plugins: { title: { display: title.length > 0, text: title } } } satisfies ChartOptions<'line'>;
</script>

<Chart type="line" {data} {options} />
