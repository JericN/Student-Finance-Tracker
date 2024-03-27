<script lang="ts">
    import { Amount, Calendar, Category, Description, Type, Wallet } from '$lib/components/forms';
    import { type ModalSettings, getModalStore, getToastStore } from '@skeletonlabs/skeleton';
    import { error, success } from '$lib/funcs/toast';
    import { parse, pick, safeParse } from 'valibot';
    import Button from '$lib/components/Button.svelte';
    import Card from '$lib/components/Card.svelte';
    import Template from './Template.svelte';
    import { TransactionForm } from '$lib/models/types';
    import { addTransaction } from '$lib/firebase/database';
    import { categories } from '$lib/data/preference';
    import { getTransactionCreateStore } from '$lib/store/forms';
    import { getWalletStore } from '$lib/store/database';
    import { goto } from '$app/navigation';

    // skeleton stores
    const modalStore = getModalStore();
    const toastStore = getToastStore();

    // data stores
    const walletStore = getWalletStore();
    const forms = getTransactionCreateStore();

    const modal: ModalSettings = {
        type: 'component',
        component: { ref: Template },
        title: 'Templates',
    };

    async function submit() {
        const properties: (keyof TransactionForm)[] = ['type', 'amount', 'date', 'category', 'wallet', 'description'];

        // validate the form
        for (const property of properties) {
            const result = safeParse(pick(TransactionForm, [property]), { [property]: $forms[property] });
            if (!result.success) {
                toastStore.trigger(error(`Invalid ${property}`));
                return;
            }
        }

        try {
            await addTransaction(parse(TransactionForm, $forms));
            goto('/user/transactions');
            forms.reset();
            toastStore.trigger(success('Transaction added'));
        } catch (_) {
            toastStore.trigger(error('Failed to add transaction'));
        }
    }

    $: wallets = $walletStore.map(wallet => wallet.name);
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
    <div class="self-end">
        <Button font="text-sm font-bold text-dark" on:click={() => modalStore.trigger(modal)}>Templates</Button>
    </div>
    <Card width="w-full max-w-sm min-w-72">
        <div class="grid grid-cols-[auto_1fr] place-items-center gap-2">
            <Type bind:type={$forms.type} />
            <Amount bind:amount={$forms.amount} />
            <Calendar bind:date={$forms.date} />
            <Category {categories} bind:selected={$forms.category} />
            <Wallet {wallets} bind:selected={$forms.wallet} />
        </div>
        <Description bind:description={$forms.description} />
    </Card>
    <Button on:click={() => submit()}>
        <span class="px-4 font-bold text-dark"> SAVE </span>
    </Button>
</div>
