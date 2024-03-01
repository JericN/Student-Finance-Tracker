<script lang="ts">
    import * as createStore from '$lib/store/creating';
    import { type ToastSettings, getToastStore } from '@skeletonlabs/skeleton';
    import { pick, safeParse } from 'valibot';
    import Amount from '../Amount.svelte';
    import Button from '$lib/components/Button.svelte';
    import Calendar from '../Calendar.svelte';
    import Card from '$lib/components/Card.svelte';
    import Category from '../Category.svelte';
    import Description from '../Description.svelte';
    import { Transaction } from '$lib/models/types';
    import Type from '../Type.svelte';
    import Wallet from '../Wallet.svelte';
    import { goto } from '$app/navigation';

    const toastStore = getToastStore();
    const cstore = createStore.get();

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
    function create() {
        if (!safeParse(pick(Transaction, ['amount']), { amount: $cstore.amount }).success) {
            toastStore.trigger(t('Invalid amount'));
            return;
        }
        if (!safeParse(pick(Transaction, ['date']), { date: $cstore.date }).success) {
            toastStore.trigger(t('Invalid date'));
            return;
        }
        if (!safeParse(pick(Transaction, ['category']), { category: $cstore.category }).success) {
            toastStore.trigger(t('Invalid category'));
            return;
        }
        if (!safeParse(pick(Transaction, ['wallet']), { wallet: $cstore.wallet }).success) {
            toastStore.trigger(t('Invalid wallet'));
            return;
        }
        if (!safeParse(pick(Transaction, ['description']), { description: $cstore.description }).success) {
            toastStore.trigger(t('Invalid description'));
            return;
        }
        if (!safeParse(pick(Transaction, ['type']), { type: $cstore.type }).success) {
            toastStore.trigger(t('Invalid type'));
            return;
        }
        goto('/user/transactions');
        cstore.reset();
        toastStore.trigger(t('Transaction saved'));
    }
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
    <Card width="w-full max-w-sm min-w-72">
        <div class="grid grid-cols-[auto_1fr] place-items-center gap-2">
            <Type bind:type={$cstore.type} />
            <Amount bind:amount={$cstore.amount} />
            <Calendar bind:date={$cstore.date} />
            <Category {categories} bind:category={$cstore.category} />
            <Wallet {wallets} bind:wallet={$cstore.wallet} />
        </div>
        <Description bind:description={$cstore.description} />
    </Card>
    <Button on:click={() => create()}>
        <span class="px-4 font-bold text-dark"> SAVE </span>
    </Button>
</div>
