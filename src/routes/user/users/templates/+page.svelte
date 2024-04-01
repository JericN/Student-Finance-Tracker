<script lang="ts">
    import { Button, CardButton } from '$lib/components/modules';
    import { getCategoryStore, getTemplateStore, getWalletStore } from '$lib/store/database';
    import { TransactionType } from '$lib/models/types';
    import { currency } from '$lib/funcs/helper';
    import { getTemplateEditStore } from '$lib/store/forms';
    import { goto } from '$app/navigation';

    const categoryStore = getCategoryStore();
    const templateStore = getTemplateStore();
    const walletStore = getWalletStore();
    const forms = getTemplateEditStore();

    function add() {
        goto('/user/users/templates/create/');
    }

    function edit(id: number) {
        forms.set(structuredClone($templateStore[id]));
        goto('/user/users/templates/edit/');
    }

    function getCategory(id: string) {
        return categoryStore.find(id)?.name || 'Unknown';
    }

    function getWallet(id: string) {
        return walletStore.find(id)?.name || 'Unknown';
    }

    function getCategoryIcon(id: string) {
        return categoryStore.find(id)?.icon || '❓';
    }
</script>

<div class="flex h-full flex-col items-center gap-2 p-10">
    <Button on:click={add}>Add Template ➕</Button>

    {#each $templateStore as { name, type, amount, categoryId, walletId }, id}
        <CardButton accent={type === TransactionType.Expense ? 'bg-expense' : 'bg-income'} on:click={() => edit(id)}>
            <div class="grid w-full grid-cols-[1fr_auto] grid-rows-[1fr_auto] gap-2 text-xs text-dark">
                <div class="text-left text-xl font-bold">{name}</div>
                <div class="place-self-end text-sm font-bold">{currency(amount)}</div>
                <div class="flex items-center gap-2">
                    <div class="border-small bg-surface-900 px-2 text-xs text-white">{getWallet(walletId)}</div>
                    <div>
                        <span>{getCategoryIcon(categoryId)}</span>
                        <span>{getCategory(categoryId)}</span>
                    </div>
                </div>
                <div>{type}</div>
            </div>
        </CardButton>
    {/each}
</div>
