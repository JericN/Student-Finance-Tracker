<script lang="ts">
    import * as FormStore from '$lib/store/forms';
    import { Amount, Description, Name } from '$lib/components/forms';
    import { type ModalSettings, type ToastSettings, getModalStore, getToastStore } from '@skeletonlabs/skeleton';
    import { Wallet, WalletForm } from '$lib/models/types';
    import { error, success } from '$lib/funcs/toast';
    import { parse, pick, safeParse } from 'valibot';
    import { removeWallet, updateWallet } from '$lib/firebase/database';
    import Button from '$lib/components/Button.svelte';
    import Card from '$lib/components/Card.svelte';
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

    async function remove(flag: boolean) {
        if (!flag) return;
        try {
            const { id } = parse(pick(Wallet, ['id']), { id: $editStore.id });
            await removeWallet(id);
            // goto('/user/users/wallets');
            // FIXME: This is a temporary fix until we have a proper way to navigate
            window.history.back();
            editStore.reset();
            toastStore.trigger(success('Wallet removed'));
        } catch (_) {
            toastStore.trigger(error('Failed to remove wallet'));
        }
    }

    const modal: ModalSettings = {
        type: 'confirm',
        title: 'Please Confirm',
        body: 'Are you sure you wish to remove this wallet?',
        response: (r: boolean) => remove(r),
    };

    async function update() {
        const properties: (keyof WalletForm)[] = ['name', 'amount', 'description'];

        // validate the form
        for (const property of properties) {
            const result = safeParse(pick(WalletForm, [property]), { [property]: $editStore[property] });
            if (!result.success) {
                toastStore.trigger(error(`Invalid ${property}`));
                return;
            }
        }

        try {
            await updateWallet(parse(Wallet, $editStore));
            // goto('/user/users/wallets');
            // FIXME: This is a temporary fix until we have a proper way to navigate
            window.history.back();
            editStore.reset();
            toastStore.trigger(t('Wallet updated'));
        } catch (_) {
            toastStore.trigger(error('Failed to update wallet'));
        }
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
