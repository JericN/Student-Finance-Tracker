<script lang="ts">
    import Card from '$lib/components/Card.svelte';
    import { ChevronDoubleLeft as Left} from '@steeze-ui/heroicons';
    import { CreditCard } from '@steeze-ui/heroicons';
    import { Icon } from '@steeze-ui/svelte-icon';
    import { currency } from '$lib/funcs/helper';

    export let wallets: Record<string, number> = {
        Bank: 24200,
        Cash: 1200,
        GCash: 500,
        Shared: 6850,
    };
</script>

<a href="/user/users">
    <button class="w-7 mt-3 ml-3">
        <Icon src={Left} class="stroke-2" />
    </button>
</a>

<div class="flex h-full flex-col items-center justify-center gap-10">
    <div class="text-xl font-bold">Wallets</div>
    {#each Object.entries(wallets) as [name, value]}
        <Card width="w-2/4 flex-none" padding="px-6">
            <div class="flex justify-between text-dark">
                <div class="flex flex-col items-center">
                    <Icon src={CreditCard} class="w-8" />
                    <div class="text-xs font-bold">{name}</div>
                </div>
                <div class="my-auto text-2xl font-bold">
                    {currency(value)}
                </div>
            </div>
        </Card>
    {/each}
</div>
