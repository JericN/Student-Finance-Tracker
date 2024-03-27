<script lang="ts">
    import { Amount, Description, Name } from '$lib/components/forms';
    import { Button, Card } from '$lib/components';
    import { Wallet, WalletForm } from '$lib/models/types';
    import { error, success } from '$lib/funcs/toast';
    import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
    import { parse, pick, safeParse } from 'valibot';
    import { removeWallet, updateWallet } from '$lib/firebase/database';
    import { getWalletEditStore } from '$lib/store/forms';

    const toastStore = getToastStore();
    const modalStore = getModalStore();
    const forms = getWalletEditStore();

    async function update() {
        const properties: (keyof WalletForm)[] = ['name', 'amount', 'description'];

        for (const property of properties) {
            const result = safeParse(pick(WalletForm, [property]), { [property]: $forms[property] });
            if (!result.success) {
                toastStore.trigger(error(`Invalid ${property}`));
                return;
            }
        }

        try {
            await updateWallet(parse(Wallet, $forms));
            // FIXME: Temporary fix until we have a proper way to navigate
            window.history.back();
            forms.reset();
            toastStore.trigger(success('Wallet updated'));
        } catch (_) {
            toastStore.trigger(error('Failed to update wallet'));
        }
    }

    async function remove() {
        try {
            const { id } = parse(pick(Wallet, ['id']), { id: $forms.id });
            await removeWallet(id);
            // FIXME: Temporary fix until we have a proper way to navigate
            window.history.back();
            forms.reset();
            toastStore.trigger(success('Wallet removed'));
        } catch (_) {
            toastStore.trigger(error('Failed to remove wallet'));
        }
    }

    function removeHandler() {
        modalStore.trigger({
            type: 'confirm',
            title: 'Please Confirm',
            body: 'Are you sure you wish to remove this wallet?',
            response: (res: boolean) => {
                if (res) remove();
            },
        });
    }
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
        <Button on:click={update}>UPDATE</Button>
        <Button on:click={removeHandler}>REMOVE</Button>
    </div>
</div>
