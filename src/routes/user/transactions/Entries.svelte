<script lang="ts">
    import { type Transaction } from '$lib/models/types';
    import { currency } from '$lib/functions/helper';
    import { getCategoryStore } from '$lib/store/database';
    import { getTransactionEditStore } from '$lib/store/forms';
    import { goto } from '$app/navigation';

    export let entries: Transaction[];

    const categories = getCategoryStore();
    const forms = getTransactionEditStore();

    function edit(id: number) {
        forms.set(structuredClone(entries[id]));
        goto('/user/transactions/edit/');
    }

    function findCategoryName(id: string) {
        return categories.find(id)?.name || 'Unknown';
    }

    function findCategoryIcon(id: string) {
        return categories.find(id)?.icon || '❓';
    }
</script>

<div class="border-bottom -my-2 flex flex-col gap-2 bg-light p-2">
    {#each entries as { type, categoryId, amount, description }, id}
        <a
            href={null}
            class="grid cursor-pointer select-none grid-cols-tbody items-center text-dark hover:text-primary-500"
            on:click={() => edit(id)}
        >
            <div>{findCategoryIcon(categoryId)}</div>
            <div>{findCategoryName(categoryId)}</div>
            <div class="truncate text-2xs">{description}</div>
            <div class="text-income">{type === 'Income' ? currency(amount) : '-'}</div>
            <div class="text-expense">{type === 'Expense' ? currency(amount) : '-'}</div>
        </a>
    {/each}
</div>
