<script lang="ts">
    import Card from '$lib/components/Card.svelte';
    import { ProgressBar } from '@skeletonlabs/skeleton';
    import { currency } from '$lib/funcs/helper';

    export let balance: number;
    export let maxBalance: number;
</script>

<Card width="w-full max-w-sm" background="bg-primary-800" accent="bg-surface-700">
    <div class="flex h-28 flex-col items-center justify-center text-light">
        <div class="mt-2 text-xs">Budget Left</div>
        <div class="text-5xl font-bold">{currency(balance)}</div>
        <ProgressBar class="mt-8" meter="bg-light" track="bg-dark" value={balance} max={maxBalance} />
    </div>
</Card>
