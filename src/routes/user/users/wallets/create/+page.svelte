<script lang="ts">
    import { Amount, Description, Name } from '$lib/components/forms';
    import { Button, Card } from '$lib/components/modules';
    import { error, success } from '$lib/functions/toast';
    import { parse, pick, safeParse } from 'valibot';
    import { WalletForm } from '$lib/models/sft';
    import { addWallet } from '$lib/firebase/database';
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { getWalletCreateStore } from '$lib/store/forms';

    const toastStore = getToastStore();
    const forms = getWalletCreateStore();

    async function submit() {
        const properties: (keyof WalletForm)[] = ['name', 'amount', 'description'];

        for (const property of properties) {
            const result = safeParse(pick(WalletForm, [property]), { [property]: $forms[property] });
            if (!result.success) {
                toastStore.trigger(error(`Invalid ${property}`));
                return;
            }
        }

        try {
            await addWallet(parse(WalletForm, $forms));
            // FIXME: Temporary fix until we have a proper way to navigate
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
    <Button on:click={submit}>SAVE</Button>
</div>
