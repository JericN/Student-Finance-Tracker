<script lang="ts">
    import { Amount, Category, Description, Name, Type, Wallet } from '$lib/components/forms';
    import { Button, Card } from '$lib/components';
    import { error, success } from '$lib/funcs/toast';
    import { parse, pick, safeParse } from 'valibot';
    import { TemplateForms } from '$lib/models/types';
    import { addTemplate } from '$lib/firebase/database';
    import { categories } from '$lib/data/preference';
    import { getTemplateCreateStore } from '$lib/store/forms';
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { getWalletStore } from '$lib/store/database';

    const toastStore = getToastStore();
    const walletStore = getWalletStore();
    const forms = getTemplateCreateStore();

    async function submit() {
        const properties: (keyof TemplateForms)[] = ['name', 'type', 'amount', 'category', 'wallet', 'description'];

        // validate the form
        for (const property of properties) {
            const result = safeParse(pick(TemplateForms, [property]), { [property]: $forms[property] });
            if (!result.success) {
                toastStore.trigger(error(`Invalid ${property}`));
                return;
            }
        }
        try {
            await addTemplate(parse(TemplateForms, $forms));
            // FIXME: Temporary fix until we have a proper way to navigate
            window.history.back();
            forms.reset();
            toastStore.trigger(success('Template added'));
        } catch (_) {
            toastStore.trigger(error('Failed to add Template'));
        }
    }

    $: wallets = $walletStore.map(wallet => wallet.name);
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
    <Card width="w-full max-w-sm min-w-72">
        <div class="grid grid-cols-[auto_1fr] place-items-center gap-2">
            <Type bind:type={$forms.type} />
            <Name bind:name={$forms.name} />
            <Amount bind:amount={$forms.amount} />
            <Category {categories} bind:selected={$forms.category} />
            <Wallet {wallets} bind:selected={$forms.wallet} />
        </div>
        <Description bind:description={$forms.description} />
    </Card>
    <Button on:click={submit}>SAVE</Button>
</div>
