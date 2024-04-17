<script lang="ts">
    import 'chartjs-adapter-date-fns';
    import {
        CategoryScale,
        Chart,
        type ChartData,
        type ChartOptions,
        type ChartType,
        Legend,
        LineController,
        LineElement,
        LinearScale,
        PointElement,
        TimeScale,
        Tooltip,
    } from 'chart.js';
    import { afterUpdate, onDestroy, onMount } from 'svelte';

    Chart.register(CategoryScale, LineController, LineElement, LinearScale, PointElement, Legend, TimeScale, Tooltip);

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

<canvas bind:this={chartCanvas}></canvas>
