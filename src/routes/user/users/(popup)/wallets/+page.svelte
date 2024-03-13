<script lang="ts">
    import * as editStore from '$lib/store/editingWallet';
    import Card from '$lib/components/Card.svelte';
    import { type Wallet } from '$lib/models/types';
    //import dummy data
    import { wallets as dummyData } from '$lib/data/dummy';
    import SettingsCard from '../../SettingsCard.svelte';
    import { CreditCard } from '@steeze-ui/heroicons';
    import { Icon } from '@steeze-ui/svelte-icon';
    import { currency } from '$lib/funcs/helper';
    import { goto } from '$app/navigation';

    let deviceWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        deviceWidth = window.innerWidth;
    });

    function update(deviceWidth: number): string {
        switch (true) {
            case deviceWidth > 440:
                return 'w-2/4';
            default:
                return 'w-3/4';
        }
    }

    $: cardWidth = update(deviceWidth);

    const editing = editStore.get();

    function edit(entries: Wallet) {
        editing.set(entries);
        goto('/user/users/wallets/edit/');
    }

    export let wallets: Wallet[] = dummyData;
</script>

<div class="flex h-full flex-col items-center justify-center gap-10">
    <div class="text-xl font-bold">Wallets</div>

    <SettingsCard title="Add a wallet" link="create">
        <div class="h-8 w-8 rounded-lg border-2 bg-surface-300">➕</div>
    </SettingsCard>

    {#each wallets as { name, amount, description }, id}
        <a class={cardWidth} href={null} on:click={() => edit(wallets[id])}>
            <Card width="w-full flex-none" padding="px-6">
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
            </Card>
        </a>
    {/each}
</div>
