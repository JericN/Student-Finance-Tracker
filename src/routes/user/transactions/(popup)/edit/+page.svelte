<script lang="ts">
    import * as EditStore from '$lib/store/editing';
    import { type ModalSettings, getModalStore, getToastStore } from '@skeletonlabs/skeleton';
    import { Record, Transaction } from '$lib/models/types';
    import { categories, wallets } from '$lib/data/preference';
    import { error, success } from '$lib/funcs/toast';
    import { parse, pick, safeParse } from 'valibot';
    import { removeTransaction, updateTransaction } from '$lib/firebase/database';
    import Amount from '$lib/components/transaction/Amount.svelte';
    import Button from '$lib/components/Button.svelte';
    import Calendar from '$lib/components/transaction/Calendar.svelte';
    import Card from '$lib/components/Card.svelte';
    import Category from '$lib/components/transaction/Category.svelte';
    import Description from '$lib/components/transaction/Description.svelte';
    import Type from '$lib/components/transaction/Type.svelte';
    import Wallet from '$lib/components/transaction/Wallet.svelte';
    import { goto } from '$app/navigation';
    import { onDestroy } from 'svelte';

    const toastStore = getToastStore();
    const editStore = EditStore.get();

    async function update() {
        const properties: (keyof Record)[] = ['type', 'amount', 'date', 'category', 'wallet', 'description'];
        for (const property of properties) {
            const result = safeParse(pick(Record, [property]), { [property]: $editStore[property] });
            if (!result.success) {
                toastStore.trigger(error(`Invalid ${property}`));
                return;
            }
        }

        try {
            await updateTransaction(parse(Transaction, $editStore));
            goto('/user/transactions');
            editStore.reset();
            toastStore.trigger(success('Transaction updated'));
        } catch (_) {
            toastStore.trigger(error('Failed to update transaction'));
        }
    }

    async function remove(r: boolean) {
        try {
            if (r) {
                const { id } = parse(pick(Transaction, ['id']), { id: $editStore.id });
                await removeTransaction(id);
                goto('/user/transactions');
                editStore.reset();
                toastStore.trigger(success('Transaction removed'));
            }
        } catch (_) {
            toastStore.trigger(error('Failed to remove transaction'));
        }
    }

    const modalStore = getModalStore();

    const modal: ModalSettings = {
        type: 'confirm',
        title: 'Please Confirm',
        body: 'Are you sure you wish to remove this transaction?',
        response: (r: boolean) => remove(r),
    };

    onDestroy(() => {
        editStore.reset();
    });
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
    <Card width="w-full max-w-sm min-w-72">
        <div class="grid grid-cols-[auto_1fr] place-items-center gap-2">
            <Type bind:type={$editStore.type} />
            <Amount bind:amount={$editStore.amount} />
            <Calendar bind:date={$editStore.date} />
            <Category {categories} bind:category={$editStore.category} />
            <Wallet {wallets} bind:wallet={$editStore.wallet} />
        </div>
        <Description bind:description={$editStore.description} />
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
