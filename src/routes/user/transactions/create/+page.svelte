<script lang="ts">
    import * as FormStore from '$lib/store/forms';
    import { Amount, Calendar, Category, Description, Type, Wallet } from '$lib/components/forms';
    import { categories, wallets } from '$lib/data/preference';
    import { error, success } from '$lib/funcs/toast';
    import { parse, pick, safeParse } from 'valibot';
    import Button from '$lib/components/Button.svelte';
    import Card from '$lib/components/Card.svelte';
    import { Record } from '$lib/models/types';
    import Template from './Template.svelte';
    import { addTransaction } from '$lib/firebase/database';
    import { getToastStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
    import { goto } from '$app/navigation';
    import { ListBox, ListBoxItem, getModalStore } from '@skeletonlabs/skeleton';

    const modalStore = getModalStore();
    const toastStore = getToastStore();
    const createStore = FormStore.transactionCreate();

    const modalComponent: ModalComponent = { ref: Template };

    const modal: ModalSettings = {
        type: 'component',
        component: modalComponent,
        title: 'Templates',
        response: r => {
            console.log(r);
        },
    };

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
    <div class="self-end">
        <Button font="text-sm font-bold text-dark" on:click={() => modalStore.trigger(modal)}>Templates</Button>
    </div>
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
