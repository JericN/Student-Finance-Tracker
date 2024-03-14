<!-- <script lang="ts">
    import * as createStore from '$lib/store/createTransaction';
    import { categories, wallets } from '$lib/data/preference';
    import { error, success } from '$lib/funcs/toast';
    import { parse, pick, safeParse } from 'valibot';
    import Amount from '$lib/components/forms/Amount.svelte';
    import Button from '$lib/components/Button.svelte';
    import Calendar from '$lib/components/forms/Calendar.svelte';
    import Card from '$lib/components/Card.svelte';
    import Category from '$lib/components/forms/Category.svelte';
    import Description from '$lib/components/forms/Description.svelte';
    import { Template } from '$lib/models/types';
    import Type from '$lib/components/forms/Type.svelte';
    import Wallet from '$lib/components/forms/Wallet.svelte';
    import { addTransaction } from '$lib/firebase/database';
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { goto } from '$app/navigation';

    const toastStore = getToastStore();
    const cstore = createStore.get();

    async function submit() {
        const properties: (keyof Template)[] = ['name', 'type', 'amount', 'category', 'wallet', 'description'];

        for (const property of properties) {
            const result = safeParse(pick(Template, [property]), { [property]: $cstore[property] });
            if (!result.success) {
                toastStore.trigger(error(`Invalid ${property}`));
                return;
            }
        }

        try {
            await addTransaction(parse(Template, $cstore));
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
            <Category {categories} bind:category={$cstore.category} />
            <Wallet {wallets} bind:wallet={$cstore.wallet} />
        </div>
        <Description bind:description={$cstore.description} />
    </Card>
    <Button on:click={() => submit()}>
        <span class="px-4 font-bold text-dark"> SAVE </span>
    </Button>
</div> -->
