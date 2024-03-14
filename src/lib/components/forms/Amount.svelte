<script lang="ts">
    export let amount: number | undefined;
    let flag = false;
</script>

<div class="input-label">Amount</div>
<div class={`${flag && 'border-red-500 dark:border-red-500'} input-group input-group-divider grid-cols-[auto_1fr]`}>
    <div class="input-group-shim">₱</div>
    <input
        bind:value={amount}
        class="py-1 text-sm"
        type="number"
        placeholder="0.00"
        on:change={() => {
            flag = (amount || 0) <= 0;
        }}
    />
</div>
