<script lang="ts">
    import DateFilter from './DateFilter.svelte';
    export let start: Date | null;
    export let end: Date | null;
</script>

<div class="grid grid-cols-2 gap-2">
    <div class="font-bold">Start</div>
    <div class="font-bold">End</div>
    <DateFilter bind:date={start} max={end} />
    <DateFilter bind:date={end} min={start} />
</div>
