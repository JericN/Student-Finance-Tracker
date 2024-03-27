<script lang="ts">
    import Button from '$lib/components/Button.svelte';
    import { TransactionType } from '$lib/models/types';
    import { getCategoryEditStore } from '$lib/store/forms';
    import { getCategoryStore } from '$lib/store/database';
    import { goto } from '$app/navigation';

    const categoryStore = getCategoryStore();
    const forms = getCategoryEditStore();

    function editTemplate(id: number) {
        forms.set(structuredClone($categoryStore[id]));
        goto('/user/users/categories/edit/');
    }

    function addTemplate() {
        goto('/user/users/categories/create/');
    }
</script>

<div class="flex h-full flex-col items-center gap-2 p-10">
    <Button width="max-w-52" layout="justify-between" padding="px-4 py-3" on:click={addTemplate}>
        <div class="text-4x1 font-bold text-dark">Add Category</div>
        <div>➕</div>
    </Button>

    {#each $categoryStore as { name, icon, type }, id}
        <Button
            width="max-w-screen-sm"
            padding="p-4"
            layout="justify-between"
            accent={type === TransactionType.Expense ? 'bg-expense' : 'bg-income'}
            on:click={() => editTemplate(id)}
        >
            <div class="border-small size-8 bg-surface-400 p-0.5">{icon}</div>
            <div class="text-2xl font-bold text-dark">{name}</div>
        </Button>
    {/each}
</div>
