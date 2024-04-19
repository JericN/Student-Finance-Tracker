<script lang="ts">
    import { Amount, Category, Description, Name, Type, Wallet } from '$lib/components/forms';
    import { Button, Card } from '$lib/components/modules';
    import { error, success } from '$lib/functions/toast';
    import { getCategoryStore, getWalletStore } from '$lib/store/database';
    import { parse, pick, safeParse } from 'valibot';
    import { TemplateForm } from '$lib/models/sft';
    import { addTemplate } from '$lib/firebase/database';
    import { getTemplateCreateStore } from '$lib/store/forms';
    import { getToastStore } from '@skeletonlabs/skeleton';

    const toastStore = getToastStore();
    const categoryStore = getCategoryStore();
    const walletStore = getWalletStore();
    const forms = getTemplateCreateStore();

    async function submit() {
        const properties: (keyof TemplateForm)[] = ['name', 'type', 'amount', 'categoryId', 'walletId', 'description'];

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
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
    <Card width="w-full max-w-sm min-w-72">
        <div class="grid grid-cols-[auto_1fr] place-items-center gap-2">
            <Type bind:type={$forms.type} />
            <Name bind:name={$forms.name} />
            <Amount bind:amount={$forms.amount} />
            <Category categories={$categoryStore} type={$forms.type} bind:selected={$forms.categoryId} />
            <Wallet wallets={$walletStore} bind:selected={$forms.walletId} />
        </div>
        <Description bind:description={$forms.description} />
    </Card>
    <Button on:click={submit}>SAVE</Button>
</div>
