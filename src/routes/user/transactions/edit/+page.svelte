<script lang="ts">
    import { Amount, Calendar, Category, Description, Type, Wallet as WalletForm } from '$lib/components/forms';
    import { Button, Card } from '$lib/components/modules';
    import { Transaction, TransactionForm, Wallet } from '$lib/models/types';
    import { error, success } from '$lib/functions/toast';
    import { getCategoryStore, getWalletStore } from '$lib/store/database';
    import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
    import { parse, pick, safeParse } from 'valibot';
    import { removeTransaction, updateTransaction, updateWallet } from '$lib/firebase/database';
    import { getTransactionEditStore } from '$lib/store/forms';
    import { getTransactionStore } from '$lib/store/transaction';
    import { goto } from '$app/navigation';

    const modalStore = getModalStore();
    const toastStore = getToastStore();
    const categoryStore = getCategoryStore();
    const walletStore = getWalletStore();
    const transactionStore = getTransactionStore();
    const forms = getTransactionEditStore();

    async function update() {
        const properties: (keyof TransactionForm)[] = [
            'type',
            'amount',
            'date',
            'categoryId',
            'walletId',
            'description',
        ];

        for (const property of properties) {
            const result = safeParse(pick(TransactionForm, [property]), { [property]: $forms[property] });
            if (!result.success) {
                toastStore.trigger(error(`Invalid ${property}`));
                return;
            }
        }

        try {
            // undo outdated transaction on wallet
            const transaction = $transactionStore.find(t => t.id === $forms.id)!;
            const prevWallet = structuredClone($walletStore.find(w => w.id === transaction.walletId));
            if (prevWallet){
                if (transaction.type === 'Expense')
                    prevWallet.amount = (prevWallet.amount * 100) + (transaction.amount * 100);
                else 
                    prevWallet.amount = (prevWallet.amount * 100) - (transaction.amount * 100);
                prevWallet.amount /= 100;
                await updateWallet(parse(Wallet, prevWallet));
            }
            // update wallet based on current input to form
            const wallet = (transaction.walletId === $forms.walletId) ? prevWallet : structuredClone($walletStore.find(w => w.id === $forms.walletId));
            if (wallet){
                if ($forms.type === 'Expense')
                    wallet.amount =  (wallet.amount * 100) - ($forms.amount! * 100);
                else 
                    wallet.amount = (wallet.amount * 100) + ($forms.amount! * 100);
                wallet.amount /= 100;
                await updateWallet(parse(Wallet, wallet));
            }
            await updateTransaction(parse(Transaction, $forms));
            goto('/user/transactions');
            forms.reset();
            toastStore.trigger(success('Transaction updated'));
        } catch (_) {
            toastStore.trigger(error('Failed to update transaction'));
        }
    }

    async function remove() {
        try {
            const { id } = parse(pick(Transaction, ['id']), { id: $forms.id });
            const wallet = structuredClone($walletStore.find(w => w.id === $forms.walletId));
            if (wallet){
                if ($forms.type === 'Expense')
                    wallet.amount =  (wallet.amount * 100) + ($forms.amount! * 100);
                else 
                    wallet.amount =  (wallet.amount * 100) - ($forms.amount! * 100);
                wallet.amount /= 100;
            }
            await updateWallet(parse(Wallet, wallet));
            await removeTransaction(id);
            goto('/user/transactions');
            forms.reset();
            toastStore.trigger(success('Transaction removed'));
        } catch (_) {
            toastStore.trigger(error('Failed to remove transaction'));
        }
    }

    function removeHandler() {
        modalStore.trigger({
            type: 'confirm',
            title: 'Please Confirm',
            body: 'Are you sure you wish to remove this transaction?',
            response: (res: boolean) => {
                if (res) remove();
            },
        });
    }
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
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
    <div class="flex gap-4">
        <Button on:click={update}>UPDATE</Button>
        <Button on:click={removeHandler}>REMOVE</Button>
    </div>
</div>
