<script lang="ts">
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
        Tooltip,
    } from 'chart.js';
    import { afterUpdate, onDestroy, onMount } from 'svelte';

    Chart.register(CategoryScale, LineController, LineElement, LinearScale, PointElement, Legend, Tooltip);

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
