<script lang="ts">
    import Day from '$lib/components/Day.svelte';

    export let date: number;
    export let income: string;
    export let expenses: string;
</script>

<div class="grid grid-cols-thead items-center text-surface-50">
    <div class="pr-2 text-right font-extrabold">{date}</div>
    <Day {date} />
    <div>{income}</div>
    <div>{expenses}</div>
</div>
