<script lang="ts">
    import { Amount, Calendar, Category, Description, Type, Wallet as WalletForm } from '$lib/components/forms';
    import { Button, Card } from '$lib/components/modules';
    import { TransactionForm, Wallet } from '$lib/models/types';
    import { addTransaction, updateWallet } from '$lib/firebase/database';
    import { error, success } from '$lib/functions/toast';
    import { getCategoryStore, getWalletStore } from '$lib/store/database';
    import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
    import { parse, pick, safeParse } from 'valibot';
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
        const properties: (keyof TransactionForm)[] = [
            'type',
            'amount',
            'date',
            'categoryId',
            'walletId',
            'description',
        ];

        // validate the form
        for (const property of properties) {
            const result = safeParse(pick(TransactionForm, [property]), { [property]: $forms[property] });
            if (!result.success) {
                toastStore.trigger(error(`Invalid ${property}`));
                return;
            }
        }

        try {
            const wallet = structuredClone($walletStore.find(w => w.id === $forms.walletId));
            if ($forms.type === 'Expense')
                wallet.amount = (wallet.amount * 100) - ($forms.amount * 100);
            else 
                wallet.amount = (wallet.amount * 100) + ($forms.amount * 100);
            wallet.amount /= 100;
            await updateWallet(parse(Wallet, wallet));
            await addTransaction(parse(TransactionForm, $forms));
            goto('/user/transactions');
            forms.reset();
            toastStore.trigger(success('Transaction added'));
        } catch (_) {
            toastStore.trigger(error('Failed to add transaction'));
        }
    }

    function showTemplates() {
        modalStore.trigger({ type: 'component', component: 'template', title: 'Templates' });
    }

    function reset() {
        forms.reset();
    }
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
            <Category categories={$categoryStore} bind:selected={$forms.categoryId} />
            <WalletForm wallets={$walletStore} bind:selected={$forms.walletId} />
        </div>
        <Description bind:description={$forms.description} />
    </Card>
    <Button on:click={submit}>SAVE</Button>
</div>
