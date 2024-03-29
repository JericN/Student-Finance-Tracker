<script lang="ts">
    import { Button, CardButton } from '$lib/components/modules';
    import { CreditCard } from '@steeze-ui/heroicons';
    import { Icon } from '@steeze-ui/svelte-icon';
    import { currency } from '$lib/functions/helper';
    import { getWalletEditStore } from '$lib/store/forms';
    import { getWalletStore } from '$lib/store/database';
    import { goto } from '$app/navigation';

    const walletStore = getWalletStore();
    const forms = getWalletEditStore();

    function add() {
        goto('/user/users/wallets/create/');
    }

    function edit(id: number) {
        forms.set(structuredClone($walletStore[id]));
        goto('/user/users/wallets/edit/');
    }
</script>

<div class="flex h-full flex-col items-center gap-2 p-10">
    <Button on:click={add}>Add Wallet ➕</Button>
    {#each $walletStore as { name, amount }, id}
        <CardButton layout="justify-between" font="font-bold" on:click={() => edit(id)}>
            <div class="flex flex-col items-center">
                <Icon src={CreditCard} class="w-8" />
                <div class="text-xs">{name}</div>
            </div>
            <div class="my-auto text-2xl">
                {currency(amount)}
            </div>
        </CardButton>
    {/each}
</div>
