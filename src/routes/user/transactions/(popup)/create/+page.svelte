<script lang="ts">
    import { type ToastSettings, getToastStore } from '@skeletonlabs/skeleton';
    import { Transaction, TransactionType } from '$lib/models/types';
    import { pick, safeParse } from 'valibot';
    import Amount from './Amount.svelte';
    import Button from '$lib/components/Button.svelte';
    import Calendar from './Calendar.svelte';
    import Card from '$lib/components/Card.svelte';
    import Category from './Category.svelte';
    import Description from './Description.svelte';
    import Type from './Type.svelte';
    import Wallet from './Wallet.svelte';
    import { goto } from '$app/navigation';

    const toastStore = getToastStore();

    // TODO: move categories to a store
    // TODO: use proper icons
    const categories = {
        Transportation: '🚌',
        Entertainment: '🎮',
        Utilities: '💡',
        Food: '🍔',
        Health: '🏥',
        Education: '📚',
        Other: '📦',
    };

    // TODO: move accounts to a store
    const wallets = ['Bank', 'Cash', 'GCash', 'Shared'];

    // FIXME: use better date system
    let amount: number;
    let [pdate] = new Date().toISOString().split('T');
    let category: string;
    let wallet: string;
    let description: string;
    let type = TransactionType.Expense;
    $: date = new Date(pdate);

    function t(message: string): ToastSettings {
        return {
            message: message,
            timeout: 2000,
            background: 'variant-filled-error',
        };
    }

    // TODO: send post request to server
    function create() {
        if (!safeParse(pick(Transaction, ['amount']), { amount }).success) {
            toastStore.trigger(t('Invalid amount'));
            return;
        }
        if (!safeParse(pick(Transaction, ['date']), { date }).success) {
            toastStore.trigger(t('Invalid date'));
            return;
        }
        if (!safeParse(pick(Transaction, ['category']), { category }).success) {
            toastStore.trigger(t('Invalid category'));
            return;
        }
        if (!safeParse(pick(Transaction, ['wallet']), { wallet }).success) {
            toastStore.trigger(t('Invalid wallet'));
            return;
        }
        if (!safeParse(pick(Transaction, ['description']), { description }).success) {
            toastStore.trigger(t('Invalid description'));
            return;
        }
        if (!safeParse(pick(Transaction, ['type']), { type }).success) {
            toastStore.trigger(t('Invalid type'));
            return;
        }
        goto('/user/transactions');
        toastStore.trigger(t('Transaction saved'));
    }
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
    <Card width="w-full max-w-sm min-w-72">
        <div class="grid grid-cols-[auto_1fr] place-items-center gap-2">
            <Type bind:type />
            <Amount bind:amount />
            <Calendar bind:pdate />
            <Category {categories} bind:category />
            <Wallet {wallets} bind:wallet />
        </div>
        <Description bind:description />
    </Card>
    <Button on:click={() => create()}>
        <span class="px-4 font-bold text-dark"> SAVE </span>
    </Button>
</div>
