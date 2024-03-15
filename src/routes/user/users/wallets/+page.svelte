<script lang="ts">
    import * as FormStore from '$lib/store/forms';
    import * as walletStore from '$lib/store/wallet';
    import Card from '$lib/components/Card.svelte';
    import { CreditCard } from '@steeze-ui/heroicons';
    import { Icon } from '@steeze-ui/svelte-icon';
    import { type Wallet } from '$lib/models/types';
    import { currency } from '$lib/funcs/helper';
    import { goto } from '$app/navigation';

    const walletList = walletStore.get();
    const editStore = FormStore.walletEdit();

    function edit(entry: Wallet) {
        editStore.set(structuredClone(entry));
        goto('/user/users/wallets/edit/');
    }

    function add() {
        goto('/user/users/wallets/create/');
    }
</script>

<div class="flex h-full flex-col items-center gap-2 p-10">
    <Card width="max-w-sm" accent="bg-expense">
        <button class="flex w-full items-center justify-between" on:click={add}>
            <div class="text-4x1 font-bold text-dark">Add Wallet</div>
            <div class="border-small border-surface-300 p-[1px]">➕</div>
        </button>
    </Card>

    {#each $walletList as { name, amount }, id}
        <Card width="max-w-screen-sm" padding="px-6">
            <a href={null} on:click={() => edit($walletList[id])}>
                <div class="flex justify-between text-dark">
                    <div class="flex flex-col items-center">
                        <Icon src={CreditCard} class="w-8" />
                        <div class="text-xs font-bold">{name}</div>
                    </div>
                    <div class="my-auto text-2xl font-bold">
                        {currency(amount)}
                    </div>
                </div>
            </a>
        </Card>
    {/each}
</div>
