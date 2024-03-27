<script lang="ts">
    import { Amount, Description, Name } from '$lib/components/forms';
    import { type ModalSettings, getModalStore, getToastStore } from '@skeletonlabs/skeleton';
    import { Wallet, WalletForm } from '$lib/models/types';
    import { error, success } from '$lib/funcs/toast';
    import { parse, pick, safeParse } from 'valibot';
    import { removeWallet, updateWallet } from '$lib/firebase/database';
    import Button from '$lib/components/Button.svelte';
    import Card from '$lib/components/Card.svelte';
    import { getWalletEditStore } from '$lib/store/forms';
    import { onDestroy } from 'svelte';

    const toastStore = getToastStore();
    const modalStore = getModalStore();
    const forms = getWalletEditStore();

    async function remove(flag: boolean) {
        if (!flag) return;
        try {
            const { id } = parse(pick(Wallet, ['id']), { id: $forms.id });
            await removeWallet(id);
            // goto('/user/users/wallets');
            // FIXME: This is a temporary fix until we have a proper way to navigate
            window.history.back();
            forms.reset();
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
            const result = safeParse(pick(WalletForm, [property]), { [property]: $forms[property] });
            if (!result.success) {
                toastStore.trigger(error(`Invalid ${property}`));
                return;
            }
        }

        try {
            await updateWallet(parse(Wallet, $forms));
            // goto('/user/users/wallets');
            // FIXME: This is a temporary fix until we have a proper way to navigate
            window.history.back();
            forms.reset();
            toastStore.trigger(success('Wallet updated'));
        } catch (_) {
            toastStore.trigger(error('Failed to update wallet'));
        }
    }

    onDestroy(() => {
        forms.reset();
    });
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
    <Card width="w-full max-w-sm min-w-72">
        <div class="grid grid-cols-[auto_1fr] place-items-center gap-2">
            <Name bind:name={$forms.name} />
            <Amount bind:amount={$forms.amount} />
        </div>
        <Description bind:description={$forms.description} />
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
