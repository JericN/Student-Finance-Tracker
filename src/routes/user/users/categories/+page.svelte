<script lang="ts">
    import { Button, CardButton } from '$lib/components';
    import { TransactionType } from '$lib/models/types';
    import { getCategoryEditStore } from '$lib/store/forms';
    import { getCategoryStore } from '$lib/store/database';
    import { goto } from '$app/navigation';

    const categoryStore = getCategoryStore();
    const forms = getCategoryEditStore();

    function add() {
        goto('/user/users/categories/create/');
    }

    function edit(id: number) {
        forms.set(structuredClone($categoryStore[id]));
        goto('/user/users/categories/edit/');
    }
</script>

<div class="flex h-full flex-col items-center gap-2 p-10">
    <Button on:click={add}>Add Category ➕</Button>
    {#each $categoryStore as { name, icon, type }, id}
        <CardButton
            layout="justify-between"
            accent={type === TransactionType.Expense ? 'bg-expense' : 'bg-income'}
            on:click={() => edit(id)}
        >
            <div class="border-small size-8 bg-surface-400 p-0.5">{icon}</div>
            <div class="text-2xl font-bold text-dark">{name}</div>
        </CardButton>
    {/each}
</div>
