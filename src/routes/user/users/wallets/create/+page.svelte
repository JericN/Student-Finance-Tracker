<script lang="ts">
    import * as FormStore from '$lib/store/forms';
    import { Amount, Description, Name } from '$lib/components/forms';
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { error, success } from '$lib/funcs/toast';
    import { parse, pick, safeParse } from 'valibot';
    import Button from '$lib/components/Button.svelte';
    import Card from '$lib/components/Card.svelte';
    import { addWallet } from '$lib/firebase/database';
    import { WalletRecord } from '$lib/models/types';
    import { goto } from '$app/navigation';

    const toastStore = getToastStore();
    const createStore = FormStore.walletCreate();

    // TODO: send post request to server
    async function create() {
        const properties: (keyof WalletRecord)[] = [ 'name', 'amount', 'description'];
        
        for (const property of properties) {
            const result = safeParse(pick(WalletRecord, [property]), { [property]: $createStore[property] });
            if (!result.success) {
                toastStore.trigger(error(`Invalid ${property}`));
                return;
            }
        }

        try {
            await addWallet(parse(WalletRecord, $createStore));
            goto('/user/users/wallets');
            createStore.reset();
            toastStore.trigger(success('Wallet added'));
        } catch (_) {
            toastStore.trigger(error('Failed to add wallet'));
        }
    }
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
    <Card width="w-full max-w-sm min-w-72">
        <div class="grid grid-cols-[auto_1fr] place-items-center gap-2">
            <Name bind:name={$createStore.name} />
            <Amount bind:amount={$createStore.amount} />
        </div>
        <Description bind:description={$createStore.description} />
    </Card>
    <Button on:click={() => create()}>
        <span class="px-4 font-bold text-dark"> SAVE </span>
    </Button>
</div>
