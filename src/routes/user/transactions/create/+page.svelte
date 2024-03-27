<script lang="ts">
    import { Amount, Calendar, Category, Description, Type, Wallet } from '$lib/components/forms';
    import { Button, Card } from '$lib/components/modules';
    import { error, success } from '$lib/funcs/toast';
    import { getCategoryStore, getWalletStore } from '$lib/store/database';
    import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
    import { parse, pick, safeParse } from 'valibot';
    import Template from './Template.svelte';
    import { TransactionForm } from '$lib/models/types';
    import { addTransaction } from '$lib/firebase/database';
    import { getTransactionCreateStore } from '$lib/store/forms';
    import { goto } from '$app/navigation';

    // skeleton stores
    const modalStore = getModalStore();
    const toastStore = getToastStore();

    // data stores
    const categoryStore = getCategoryStore();
    const walletStore = getWalletStore();
    const forms = getTransactionCreateStore();

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

    function showTemplates() {
        modalStore.trigger({
            type: 'component',
            component: { ref: Template },
            title: 'Templates',
        });
    }

    function reset() {
        forms.reset();
    }

    $: categories = $categoryStore.reduce((acc: { [key: string]: string }, category) => {
        acc[category.name] = category.icon;
        return acc;
    }, {});

    $: wallets = $walletStore.map(wallet => wallet.name);
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
    <div class="flex w-full min-w-72 max-w-sm justify-between">
        <Button padding="p-1" width="w-full" accent="bg-income" on:click={showTemplates}>Templates</Button>
        <Button padding="p-1" width="w-full" accent="bg-expense" on:click={reset}>Reset</Button>
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
    <Button on:click={submit}>SAVE</Button>
</div>
