<script lang="ts">
    import * as FormStore from '$lib/store/forms';
    import { type ModalSettings, type ToastSettings, getModalStore, getToastStore } from '@skeletonlabs/skeleton';
    import { pick, safeParse } from 'valibot';
    import Amount from '$lib/components/forms/Amount.svelte';
    import Button from '$lib/components/Button.svelte';
    import Card from '$lib/components/Card.svelte';
    import Description from '$lib/components/forms/Description.svelte';
    import Name from '$lib/components/forms/Name.svelte';
    import { Wallet } from '$lib/models/types';
    import { goto } from '$app/navigation';
    import { onDestroy } from 'svelte';

    const toastStore = getToastStore();
    const modalStore = getModalStore();
    const editStore = FormStore.walletEdit();

    function t(message: string): ToastSettings {
        return {
            message: message,
            timeout: 2000,
            background: 'variant-filled-error',
        };
    }

    function remove(r: boolean) {
        if (r) {
            goto('/user/users/wallets');
            toastStore.trigger(t('Wallet removed'));
        }
    }

    const modal: ModalSettings = {
        type: 'confirm',
        title: 'Please Confirm',
        body: 'Are you sure you wish to remove this wallet?',
        response: (r: boolean) => remove(r),
    };

    // TODO: send post request to server
    function update() {
        if (!safeParse(pick(Wallet, ['name']), { name: $editStore.name }).success) {
            toastStore.trigger(t('Invalid wallet name'));
            return;
        }
        if (!safeParse(pick(Wallet, ['amount']), { amount: $editStore.amount }).success) {
            toastStore.trigger(t('Invalid amount'));
            return;
        }
        if (!safeParse(pick(Wallet, ['description']), { description: $editStore.description }).success) {
            toastStore.trigger(t('Invalid description'));
            return;
        }
        goto('/user/users/wallets');
        editStore.reset();
        toastStore.trigger(t('Wallet added'));
    }

    onDestroy(() => {
        editStore.reset();
    });
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
    <Card width="w-full max-w-sm min-w-72">
        <div class="grid grid-cols-[auto_1fr] place-items-center gap-2">
            <Name bind:name={$editStore.name} />
            <Amount bind:amount={$editStore.amount} />
        </div>
        <Description bind:description={$editStore.description} />
    </Card>
    <div class="flex gap-4">
        <Button on:click={() => update()}>
            <span class="px-4 font-bold text-dark"> UPDATE </span>
        </Button>
        <Button on:click={() => modalStore.trigger(modal)}>
            <span class="px-4 font-bold text-dark"> REMOVE </span>
        </Button>
    </div>
</div>
