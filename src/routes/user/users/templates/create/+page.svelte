<script lang="ts">
    import { Amount, Category, Description, Name, Type, Wallet } from '$lib/components/forms';
    import { Button, Card } from '$lib/components/modules';
    import { error, success } from '$lib/funcs/toast';
    import { getCategoryStore, getWalletStore } from '$lib/store/database';
    import { parse, pick, safeParse } from 'valibot';
    import { TemplateForm } from '$lib/models/types';
    import { addTemplate } from '$lib/firebase/database';
    import { getTemplateCreateStore } from '$lib/store/forms';
    import { getToastStore } from '@skeletonlabs/skeleton';

    const toastStore = getToastStore();
    const categoryStore = getCategoryStore();
    const walletStore = getWalletStore();
    const forms = getTemplateCreateStore();

    async function submit() {
        const properties: (keyof TemplateForm)[] = ['name', 'type', 'amount', 'category', 'wallet', 'description'];

        // validate the form
        for (const property of properties) {
            const result = safeParse(pick(TemplateForm, [property]), { [property]: $forms[property] });
            if (!result.success) {
                toastStore.trigger(error(`Invalid ${property}`));
                return;
            }
        }
        try {
            await addTemplate(parse(TemplateForm, $forms));
            // FIXME: Temporary fix until we have a proper way to navigate
            window.history.back();
            forms.reset();
            toastStore.trigger(success('Template added'));
        } catch (_) {
            toastStore.trigger(error('Failed to add Template'));
        }
    }

    $: categories = $categoryStore.reduce((acc: { [key: string]: string }, category) => {
        acc[category.name] = category.icon;
        return acc;
    }, {});

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
