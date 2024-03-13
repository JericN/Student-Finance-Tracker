<script lang="ts">
    import * as createStore from '$lib/store/creating';
    import { error, success } from '$lib/funcs/toast';
    import { parse, pick, safeParse } from 'valibot';
    import Amount from '$lib/components/transaction/Amount.svelte';
    import Button from '$lib/components/Button.svelte';
    import Calendar from '$lib/components/transaction/Calendar.svelte';
    import Card from '$lib/components/Card.svelte';
    import Category from '$lib/components/transaction/Category.svelte';
    import Description from '$lib/components/transaction/Description.svelte';
    import { Record } from '$lib/models/types';
    import Type from '$lib/components/transaction/Type.svelte';
    import Wallet from '$lib/components/transaction/Wallet.svelte';
    import { addTransaction } from '$lib/firebase/database';
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { goto } from '$app/navigation';

    const toastStore = getToastStore();
    const cstore = createStore.get();

    async function submit() {
        const properties: (keyof Record)[] = ['type', 'amount', 'date', 'category', 'wallet', 'description'];

        for (const property of properties) {
            const result = safeParse(pick(Record, [property]), { [property]: $cstore[property] });
            if (!result.success) {
                toastStore.trigger(error(`Invalid ${property}`));
                return;
            }
        }

        try {
            await addTransaction(parse(Record, $cstore));
            goto('/user/transactions');
            cstore.reset();
            toastStore.trigger(success('Transaction added'));
        } catch (_) {
            toastStore.trigger(error('Failed to add transaction'));
        }
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
    <Button on:click={() => submit()}>
        <span class="px-4 font-bold text-dark"> SAVE </span>
    </Button>
</div>
