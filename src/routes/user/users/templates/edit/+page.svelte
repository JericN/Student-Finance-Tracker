<script lang="ts">
    import * as FormStore from '$lib/store/forms';
    import * as walletStore from '$lib/store/wallet';
    import { Amount, Category, Description, Type, Wallet } from '$lib/components/forms';
    import { type ModalSettings, getModalStore, getToastStore } from '@skeletonlabs/skeleton';
    import { error, success } from '$lib/funcs/toast';
    import { parse, pick, safeParse } from 'valibot';
    import { removeTemplate, updateTemplate } from '$lib/firebase/database';
    import Button from '$lib/components/Button.svelte';
    import Card from '$lib/components/Card.svelte';
    import Name from '$lib/components/forms/Name.svelte';
    import { Template } from '$lib/models/types';
    import { categories } from '$lib/data/preference';
    import { goto } from '$app/navigation';
    import { onDestroy } from 'svelte';

    const toastStore = getToastStore();
    const walletList = walletStore.get();

    $: wallets = $walletList.map(wallet => wallet.name);
    const forms = FormStore.templateEdit();

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
            // goto('/user/users/templates/');
            // FIXME: This is a temporary fix until we have a proper way to navigate
            window.history.back();
            forms.reset();
            toastStore.trigger(success('Template updated'));
        } catch (_) {
            toastStore.trigger(error('Failed to update Template'));
        }
    }

    async function remove(flag: boolean) {
        if (!flag) return;
        try {
            const { id } = parse(pick(Template, ['id']), { id: $forms.id });
            await removeTemplate(id);
            // goto('/user/users/templates/');
            // FIXME: This is a temporary fix until we have a proper way to navigate
            window.history.back();
            forms.reset();
            toastStore.trigger(success('Template removed'));
        } catch (_) {
            toastStore.trigger(error('Failed to remove template'));
        }
    }

    const modalStore = getModalStore();

    const modal: ModalSettings = {
        type: 'confirm',
        title: 'Please Confirm',
        body: 'Are you sure you wish to remove this template?',
        response: (r: boolean) => remove(r),
    };

    onDestroy(() => {
        forms.reset();
    });
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
    <Card width="w-full max-w-sm min-w-72">
        <div class="grid grid-cols-[auto_1fr] place-items-center gap-2">
            <Type bind:type={$forms.type} />
            <Name bind:name={$forms.name} />
            <Amount bind:amount={$forms.amount} />
            <Category {categories} bind:category={$forms.category} />
            <Wallet {wallets} bind:wallet={$forms.wallet} />
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
