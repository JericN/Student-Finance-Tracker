<script lang="ts">
    export let quantity: number = 1;
    let flag = false;
</script>

<div class="input-label">Quantity</div>
<div class="grid grid-cols-3 gap-4">
    <button class="h-8 w-8 rounded-lg border-2 bg-surface-300" on:click={() => (quantity > 1) ? quantity-- : quantity}> − </button>
    <div class={`${flag && 'border-red-500 dark:border-red-500'} input-group input-group-divider grid-rows-[auto_1fr]`}>
        <input
            bind:value={quantity}
            class="py-1 text-sm"
            type="number"
            on:change={() => {
                flag = (quantity || 0) <= 0;
            }}
        />
    </div>
    <button class="h-8 w-8 rounded-lg border-2 bg-surface-300" on:click={() => quantity++}> ➕ </button>
</div>
