<script lang="ts">
    import * as editStore from '$lib/store/editingWallet';
    import Card from '$lib/components/Card.svelte';
    import { CreditCard } from '@steeze-ui/heroicons';
    import { Icon } from '@steeze-ui/svelte-icon';
    import Entry from '../Entry.svelte';
    import { type Wallet } from '$lib/models/types';
    import { currency } from '$lib/funcs/helper';
    import { wallets as dummyData } from '$lib/data/dummy';
    import { goto } from '$app/navigation';

    const editing = editStore.get();

    function edit(entries: Wallet) {
        editing.set(entries);
        goto('/user/users/wallets/edit/');
    }

    export let wallets: Wallet[] = dummyData;
</script>

<div class="flex h-full flex-col items-center justify-center gap-10 p-10">
    <Entry title="Add a wallet" link="create">
        <div class="h-8 w-8 rounded-lg border-2 bg-surface-300">➕</div>
    </Entry>

    {#each wallets as { name, amount, description }, id}
        <Card width="max-w-screen-sm" padding="px-6">
            <a href={null} on:click={() => edit(wallets[id])}>
                <div class="flex justify-between text-dark">
                    <div class="flex flex-col items-center">
                        <Icon src={CreditCard} class="w-8" />
                        <div class="text-xs font-bold">{name}</div>
                    </div>
                    <div class="my-auto text-2xl font-bold">
                        {currency(amount)}
                    </div>
                </div>
                <div class="flex flex-col items-center">
                    <div class="text-s">{description ?? ''}</div>
                </div>
            </a>
        </Card>
    {/each}
</div>
