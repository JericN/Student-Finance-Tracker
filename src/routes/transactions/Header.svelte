<script lang="ts">
    import Day from '$lib/components/Day.svelte';

    export let date: number;
    export let income: string;
    export let expenses: string;
</script>

<div class="grid w-full grid-cols-thead items-center text-white">
    <div class="pr-2 text-right font-bold">{date}</div>
    <Day {date} />
    <div>{income}</div>
    <div>{expenses}</div>
</div>
