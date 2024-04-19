<script lang="ts">
    import 'chartjs-adapter-date-fns';
    import {
        ArcElement,
        BarController,
        BarElement,
        CategoryScale,
        Chart,
        type ChartData,
        type ChartOptions,
        type ChartType,
        Legend,
        LineController,
        LineElement,
        LinearScale,
        PieController,
        PointElement,
        TimeScale,
        Tooltip,
    } from 'chart.js';
    import { afterUpdate, onDestroy, onMount } from 'svelte';

    Chart.register(
        ArcElement,
        BarController,
        BarElement,
        CategoryScale,
        LineController,
        LineElement,
        LinearScale,
        PieController,
        PointElement,
        Legend,
        TimeScale,
        Tooltip,
    );

    export let data: ChartData;
    export let options: ChartOptions = {};
    export let type: ChartType;

    let chartCanvas: HTMLCanvasElement;
    let chart = null as Chart | null;

    onMount(() => {
        chart = new Chart(chartCanvas, {
            type,
            data,
            options,
        });
    });

    afterUpdate(() => {
        if (!chart) return;
        chart.data = data;
        chart.update();
    });

    onDestroy(() => {
        if (chart) chart.destroy();
        chart = null;
    });
</script>

<div class="relative h-full w-full p-2">
    <canvas bind:this={chartCanvas}></canvas>
</div>
