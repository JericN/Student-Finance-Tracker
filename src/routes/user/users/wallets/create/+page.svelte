<script lang="ts">
    import * as createStore from '$lib/store/creatingWallet';
    import { type ToastSettings, getToastStore } from '@skeletonlabs/skeleton';
    import { pick, safeParse } from 'valibot';
    import Amount from '$lib/components/transaction/Amount.svelte';
    import Button from '$lib/components/Button.svelte';
    import Card from '$lib/components/Card.svelte';
    import Description from '$lib/components/transaction/Description.svelte';
    import Name from '$lib/components/transaction/Name.svelte';
    import { Wallet } from '$lib/models/types';
    import { goto } from '$app/navigation';

    const toastStore = getToastStore();
    const cstore = createStore.get();

    function t(message: string): ToastSettings {
        return {
            message: message,
            timeout: 2000,
            background: 'variant-filled-error',
        };
    }

    // TODO: send post request to server
    function create() {
        if (!safeParse(pick(Wallet, ['name']), { name: $cstore.name }).success) {
            toastStore.trigger(t('Invalid wallet name'));
            return;
        }
        if (!safeParse(pick(Wallet, ['amount']), { amount: $cstore.amount }).success) {
            toastStore.trigger(t('Invalid amount'));
            return;
        }
        if (!safeParse(pick(Wallet, ['description']), { description: $cstore.description }).success) {
            toastStore.trigger(t('Invalid description'));
            return;
        }
        goto('/user/users/wallets');
        cstore.reset();
        toastStore.trigger(t('Wallet added'));
    }
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
    <Card width="w-full max-w-sm min-w-72">
        <div class="grid grid-cols-[auto_1fr] place-items-center gap-2">
            <Name bind:name={$cstore.name} />
            <Amount bind:amount={$cstore.amount} />
        </div>
        <Description bind:description={$cstore.description} />
    </Card>
    <Button on:click={() => create()}>
        <span class="px-4 font-bold text-dark"> SAVE </span>
    </Button>
</div>
