<script lang="ts">
    import Day from '$lib/components/Day.svelte';
    import { currency } from '$lib/funcs/helper';

    export let time: string;
    export let income: number;
    export let expenses: number;

    $: date = new Date(Number(time));
    $: day = date.getDate();
    $: month = date.toLocaleString('en-US', { month: 'long' });
    $: year = date.getFullYear();
</script>

<div class="grid grid-cols-thead items-center text-light">
    <Day {day} />
    <div class="pl-1 text-left font-extrabold">{day}</div>
    <div class="mt-1 text-2xs">{month}, {year}</div>
    <div>{currency(income)}</div>
    <div>{currency(expenses)}</div>
</div>
