<script lang="ts">
    import Card from '$lib/components/Card.svelte';
    import { ProgressBar } from '@skeletonlabs/skeleton';
    import { currency } from '$lib/funcs/helper';

    export let balance: number;
    export let maxBalance: number;
</script>

<Card width="w-full max-w-sm" background="bg-primary-800" accent="slate">
    <div class="flex h-32 flex-col items-center justify-center text-surface-50">
        <div class="mt-4 text-xs">Budget Left</div>
        <div class="text-5xl font-bold">{currency(balance)}</div>
        <ProgressBar
            class="mt-5 scale-x-95"
            meter="bg-surface-50"
            track="bg-surface-900"
            height="h-2"
            value={balance}
            max={maxBalance}
        />
    </div>
</Card>
