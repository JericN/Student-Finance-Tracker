<script lang="ts">
    import { Amount, Category, Description, Name, Type, Wallet } from '$lib/components/forms';
    import { Button, Card } from '$lib/components/modules';
    import { error, success } from '$lib/funcs/toast';
    import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
    import { parse, pick, safeParse } from 'valibot';
    import { removeTemplate, updateTemplate } from '$lib/firebase/database';
    import { Template } from '$lib/models/types';
    import { categories } from '$lib/data/preference';
    import { getTemplateEditStore } from '$lib/store/forms';
    import { getWalletStore } from '$lib/store/database';

    const modalStore = getModalStore();
    const toastStore = getToastStore();
    const walletStore = getWalletStore();
    const forms = getTemplateEditStore();

    async function update() {
        const properties: (keyof Template)[] = ['name', 'type', 'amount', 'category', 'wallet', 'description'];

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
            <Category {categories} bind:selected={$forms.category} />
            <Wallet {wallets} bind:selected={$forms.wallet} />
        </div>
        <Description bind:description={$forms.description} />
    </Card>
    <div class="flex w-full">
        <Button width="w-full" accent="bg-income" on:click={update}>UPDATE</Button>
        <Button width="w-full" accent="bg-expense" on:click={removeHandler}>REMOVE</Button>
    </div>
</div>
