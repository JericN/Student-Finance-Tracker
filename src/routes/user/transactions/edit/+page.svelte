<script lang="ts">
    import { Amount, Calendar, Category, Description, Type, Wallet } from '$lib/components/forms';
    import { type ModalSettings, getModalStore, getToastStore } from '@skeletonlabs/skeleton';
    import { Transaction, TransactionForm } from '$lib/models/types';
    import { error, success } from '$lib/funcs/toast';
    import { parse, pick, safeParse } from 'valibot';
    import { removeTransaction, updateTransaction } from '$lib/firebase/database';
    import Button from '$lib/components/Button.svelte';
    import Card from '$lib/components/Card.svelte';
    import { categories } from '$lib/data/preference';
    import { getTransactionEditStore } from '$lib/store/forms';
    import { getWalletStore } from '$lib/store/database';
    import { goto } from '$app/navigation';
    import { onDestroy } from 'svelte';

    const modalStore = getModalStore();
    const toastStore = getToastStore();
    const walletStore = getWalletStore();
    const forms = getTransactionEditStore();

    async function update() {
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
            await updateTransaction(parse(Transaction, $forms));
            goto('/user/transactions');
            forms.reset();
            toastStore.trigger(success('Transaction updated'));
        } catch (_) {
            toastStore.trigger(error('Failed to update transaction'));
        }
    }

    async function remove(r: boolean) {
        try {
            if (r) {
                const { id } = parse(pick(Transaction, ['id']), { id: $forms.id });
                await removeTransaction(id);
                goto('/user/transactions');
                forms.reset();
                toastStore.trigger(success('Transaction removed'));
            }
        } catch (_) {
            toastStore.trigger(error('Failed to remove transaction'));
        }
    }

    const modal: ModalSettings = {
        type: 'confirm',
        title: 'Please Confirm',
        body: 'Are you sure you wish to remove this transaction?',
        response: (r: boolean) => remove(r),
    };

    onDestroy(() => {
        forms.reset();
    });

    $: wallets = $walletStore.map(wallet => wallet.name);
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
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
    <div class="flex gap-4">
        <Button on:click={() => update()}>
            <span class="px-4 font-bold text-dark"> UPDATE </span>
        </Button>
        <Button on:click={() => modalStore.trigger(modal)}>
            <span class="px-4 font-bold text-dark"> REMOVE </span>
        </Button>
    </div>
</div>
