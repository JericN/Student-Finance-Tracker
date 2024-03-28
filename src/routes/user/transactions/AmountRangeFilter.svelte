<script lang="ts">
    export let min: number | null;
    export let max: number | null;
</script>

<div class="grid grid-cols-2 gap-2">
    <div class="font-bold">min</div>
    <div class="font-bold">max</div>
    <input bind:value={min} type="number" class="input" placeholder="min" />
    <input bind:value={max} type="number" class="input" placeholder="max" />
</div>
