<script lang="ts">
    import { Amount, Description, Name } from '$lib/components/forms';
    import { error, success } from '$lib/funcs/toast';
    import { parse, pick, safeParse } from 'valibot';
    import Button from '$lib/components/Button.svelte';
    import Card from '$lib/components/Card.svelte';
    import { WalletForm } from '$lib/models/types';
    import { addWallet } from '$lib/firebase/database';
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { getWalletCreateStore } from '$lib/store/forms';

    const toastStore = getToastStore();
    const forms = getWalletCreateStore();

    async function create() {
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
            await addWallet(parse(WalletForm, $forms));
            // goto('/user/users/wallets');
            // FIXME: This is a temporary fix until we have a proper way to navigate
            window.history.back();
            forms.reset();
            toastStore.trigger(success('Wallet added'));
        } catch (_) {
            toastStore.trigger(error('Failed to add wallet'));
        }
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
    <Button on:click={() => create()}>
        <span class="px-4 font-bold text-dark"> SAVE </span>
    </Button>
</div>
