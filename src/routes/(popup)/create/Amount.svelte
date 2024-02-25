<script lang="ts">
    export let amount: number;
</script>

<div class="input-label">Amount</div>
<div class="input-group input-group-divider grid-cols-[auto_1fr]">
    <div class="input-group-shim">₱</div>
    <input bind:value={amount} class="py-1 text-sm" type="number" />
</div>
