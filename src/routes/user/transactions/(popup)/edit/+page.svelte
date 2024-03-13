<script lang="ts">
    import * as editStore from '$lib/store/editing';
    import { type ToastSettings, getToastStore } from '@skeletonlabs/skeleton';
    import { pick, safeParse } from 'valibot';
    import Amount from '$lib/components/transaction/Amount.svelte';
    import Button from '$lib/components/Button.svelte';
    import Calendar from '$lib/components/transaction/Calendar.svelte';
    import Card from '$lib/components/Card.svelte';
    import Category from '$lib/components/transaction/Category.svelte';
    import Description from '$lib/components/transaction/Description.svelte';
    import { Transaction } from '$lib/models/types';
    import Type from '$lib/components/transaction/Type.svelte';
    import Wallet from '$lib/components/transaction/Wallet.svelte';
    import { goto } from '$app/navigation';
    import { onDestroy } from 'svelte';

    const toastStore = getToastStore();
    const editing = editStore.get();

    // TODO: move categories to a store
    // TODO: use proper icons
    const categories = {
        Food: '🍔',
        House: '🏠',
        Transpo: '🚌',
        Gift: '🎁',
        Allowance: '💵',
        Savings: '💰',
        Other: '📦',
    };

    // TODO: move accounts to a store
    const wallets = ['Bank', 'Cash', 'GCash', 'Shared'];

    function t(message: string): ToastSettings {
        return {
            message: message,
            timeout: 2000,
            background: 'variant-filled-error',
        };
    }

    // TODO: send post request to server
    function update() {
        if (!safeParse(pick(Transaction, ['amount']), { amount: $editing.amount }).success) {
            toastStore.trigger(t('Invalid amount'));
            return;
        }
        if (!safeParse(pick(Transaction, ['date']), { date: $editing.date }).success) {
            toastStore.trigger(t('Invalid date'));
            return;
        }
        if (!safeParse(pick(Transaction, ['category']), { category: $editing.category }).success) {
            toastStore.trigger(t('Invalid category'));
            return;
        }
        if (!safeParse(pick(Transaction, ['wallet']), { wallet: $editing.wallet }).success) {
            toastStore.trigger(t('Invalid wallet'));
            return;
        }
        if (!safeParse(pick(Transaction, ['description']), { description: $editing.description }).success) {
            toastStore.trigger(t('Invalid description'));
            return;
        }
        if (!safeParse(pick(Transaction, ['type']), { type: $editing.type }).success) {
            toastStore.trigger(t('Invalid type'));
            return;
        }
        goto('/user/transactions');
        toastStore.trigger(t('Transaction saved'));
    }

    function remove() {
        goto('/user/transactions');
        toastStore.trigger(t('Transaction removed'));
    }

    onDestroy(() => {
        editing.reset();
    });
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
    <Card width="w-full max-w-sm min-w-72">
        <div class="grid grid-cols-[auto_1fr] place-items-center gap-2">
            <Type bind:type={$editing.type} />
            <Amount bind:amount={$editing.amount} />
            <Calendar bind:date={$editing.date} />
            <Category {categories} bind:category={$editing.category} />
            <Wallet {wallets} bind:wallet={$editing.wallet} />
        </div>
        <Description bind:description={$editing.description} />
    </Card>
    <div class="flex gap-4">
        <Button on:click={() => update()}>
            <span class="px-4 font-bold text-dark"> UPDATE </span>
        </Button>
        <Button on:click={() => remove()}>
            <span class="px-4 font-bold text-dark"> REMOVE </span>
        </Button>
    </div>
</div>
