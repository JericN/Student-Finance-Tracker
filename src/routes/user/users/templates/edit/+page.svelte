<script lang="ts">
    import { Amount, Category, Description, Name, Type, Wallet } from '$lib/components/forms';
    import { Button, Card } from '$lib/components/modules';
    import { error, success } from '$lib/funcs/toast';
    import { getCategoryStore, getWalletStore } from '$lib/store/database';
    import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
    import { parse, pick, safeParse } from 'valibot';
    import { removeTemplate, updateTemplate } from '$lib/firebase/database';
    import { Template } from '$lib/models/types';
    import { getTemplateEditStore } from '$lib/store/forms';

    const modalStore = getModalStore();
    const toastStore = getToastStore();
    const categoryStore = getCategoryStore();
    const walletStore = getWalletStore();
    const forms = getTemplateEditStore();

    async function update() {
        const properties: (keyof Template)[] = ['name', 'type', 'amount', 'categoryId', 'walletId', 'description'];

        for (const property of properties) {
            const result = safeParse(pick(Template, [property]), { [property]: $forms[property] });
            if (!result.success) {
                toastStore.trigger(error(`Invalid ${property}`));
                return;
            }
        }
        try {
            await updateTemplate(parse(Template, $forms));
            // FIXME: Temporary fix until we have a proper way to navigate
            window.history.back();
            forms.reset();
            toastStore.trigger(success('Template updated'));
        } catch (_) {
            toastStore.trigger(error('Failed to update Template'));
        }
    }

    async function remove() {
        try {
            const { id } = parse(pick(Template, ['id']), { id: $forms.id });
            await removeTemplate(id);
            // FIXME: Temporary fix until we have a proper way to navigate
            window.history.back();
            forms.reset();
            toastStore.trigger(success('Template removed'));
        } catch (_) {
            toastStore.trigger(error('Failed to remove template'));
        }
    }

    function removeHandler() {
        modalStore.trigger({
            type: 'confirm',
            title: 'Please Confirm',
            body: 'Are you sure you wish to remove this template?',
            response: (res: boolean) => {
                if (res) remove();
            },
        });
    }

    $: wallets = $walletStore.map(wallet => wallet.name);
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
    <Card width="w-full max-w-sm min-w-72">
        <div class="grid grid-cols-[auto_1fr] place-items-center gap-2">
            <Type bind:type={$forms.type} />
            <Name bind:name={$forms.name} />
            <Amount bind:amount={$forms.amount} />
            <Category categories={$categoryStore} bind:selected={$forms.categoryId} />
            <Wallet {wallets} bind:selected={$forms.walletId} />
        </div>
        <Description bind:description={$forms.description} />
    </Card>
    <div class="flex w-full min-w-72 max-w-sm">
        <Button width="w-full" accent="bg-income" on:click={update}>UPDATE</Button>
        <Button width="w-full" accent="bg-expense" on:click={removeHandler}>REMOVE</Button>
    </div>
</div>
