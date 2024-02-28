<script lang="ts">
    import { type ChartData, type ChartOptions } from 'chart.js';
    import Card from '$lib/components/Card.svelte';
    import Chart from '$lib/charts/Chart.svelte';

    export let dataset: Record<string, number>;

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
    const options = {
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { grid: { display: false }, ticks: { color: 'black', font: { size: 10 } } },
            y: { grid: { lineWidth: 1 }, ticks: { color: 'black', font: { size: 10 } } },
        },
    } as ChartOptions<'line'>;
</script>

<Card width="">
    <div class="p-2">
        <Chart type="line" {data} {options} />
    </div>
</Card>
