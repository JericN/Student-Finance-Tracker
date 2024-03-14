<script lang="ts">
    import * as FormStore from '$lib/store/forms';
    import { Amount, Description, Name } from '$lib/components/forms';
    import { type ToastSettings, getToastStore } from '@skeletonlabs/skeleton';
    import { pick, safeParse } from 'valibot';
    import Button from '$lib/components/Button.svelte';
    import Card from '$lib/components/Card.svelte';
    import { Wallet } from '$lib/models/types';
    import { goto } from '$app/navigation';

    const toastStore = getToastStore();
    const createStore = FormStore.walletCreate();

    function t(message: string): ToastSettings {
        return {
            message: message,
            timeout: 2000,
            background: 'variant-filled-error',
        };
    }

    // TODO: send post request to server
    function create() {
        if (!safeParse(pick(Wallet, ['name']), { name: $createStore.name }).success) {
            toastStore.trigger(t('Invalid wallet name'));
            return;
        }
        if (!safeParse(pick(Wallet, ['amount']), { amount: $createStore.amount }).success) {
            toastStore.trigger(t('Invalid amount'));
            return;
        }
        if (!safeParse(pick(Wallet, ['description']), { description: $createStore.description }).success) {
            toastStore.trigger(t('Invalid description'));
            return;
        }
        goto('/user/users/wallets');
        createStore.reset();
        toastStore.trigger(t('Wallet added'));
    }
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
    <Card width="w-full max-w-sm min-w-72">
        <div class="grid grid-cols-[auto_1fr] place-items-center gap-2">
            <Name bind:name={$createStore.name} />
            <Amount bind:amount={$createStore.amount} />
        </div>
        <Description bind:description={$createStore.description} />
    </Card>
    <Button on:click={() => create()}>
        <span class="px-4 font-bold text-dark"> SAVE </span>
    </Button>
</div>
