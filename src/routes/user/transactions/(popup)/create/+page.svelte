<script lang="ts">
    import * as walletStore from '$lib/store/wallet';
    import * as FormStore from '$lib/store/forms';
    import { categories } from '$lib/data/preference';
    import { error, success } from '$lib/funcs/toast';
    import { parse, pick, safeParse } from 'valibot';
    import Amount from '$lib/components/forms/Amount.svelte';
    import Button from '$lib/components/Button.svelte';
    import Calendar from '$lib/components/forms/Calendar.svelte';
    import Card from '$lib/components/Card.svelte';
    import Category from '$lib/components/forms/Category.svelte';
    import Description from '$lib/components/forms/Description.svelte';
    import { Record } from '$lib/models/types';
    import Type from '$lib/components/forms/Type.svelte';
    import Wallet from '$lib/components/forms/Wallet.svelte';
    import { addTransaction } from '$lib/firebase/database';
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { goto } from '$app/navigation';

    const toastStore = getToastStore();
    const createStore = FormStore.transactionCreate();
    const walletList = walletStore.get()

    $: wallets = $walletList.map((wallet)=>wallet.name);

    async function submit() {
        const properties: (keyof Record)[] = ['type', 'amount', 'date', 'category', 'wallet', 'description'];

        for (const property of properties) {
            const result = safeParse(pick(Record, [property]), { [property]: $createStore[property] });
            if (!result.success) {
                toastStore.trigger(error(`Invalid ${property}`));
                return;
            }
        }

        try {
            await addTransaction(parse(Record, $createStore));
            goto('/user/transactions');
            createStore.reset();
            toastStore.trigger(success('Transaction added'));
        } catch (_) {
            toastStore.trigger(error('Failed to add transaction'));
        }
    }
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
    <Card width="w-full max-w-sm min-w-72">
        <div class="grid grid-cols-[auto_1fr] place-items-center gap-2">
            <Type bind:type={$createStore.type} />
            <Amount bind:amount={$createStore.amount} />
            <Calendar bind:date={$createStore.date} />
            <Category {categories} bind:category={$createStore.category} />
            <Wallet {wallets} bind:wallet={$createStore.wallet} />
        </div>
        <Description bind:description={$createStore.description} />
    </Card>
    <Button on:click={() => submit()}>
        <span class="px-4 font-bold text-dark"> SAVE </span>
    </Button>
</div>
