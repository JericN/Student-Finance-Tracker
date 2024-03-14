<script lang="ts">
    import * as FormStore from '$lib/store/forms';
    import * as templateStore from '$lib/store/template';
    import Button from '$lib/components/Button.svelte';
    import { TransactionType } from '$lib/models/types';
    import { currency } from '$lib/funcs/helper';
    import { goto } from '$app/navigation';

    const editStore = FormStore.templateEdit();
    const templates = templateStore.get();

    function editTemplate(id: number) {
        editStore.set(structuredClone($templates[id]));
        goto('/user/users/templates/edit/');
    }

    function addTemplate() {
        goto('/user/users/templates/create/');
    }
</script>

<div class="flex h-full flex-col items-center gap-2 p-10">
    <Button width="max-w-52" layout="justify-between" padding="px-4 py-3" on:click={addTemplate}>
        <div class="text-4x1 font-bold text-dark">Add Template</div>
        <div>➕</div>
    </Button>

    {#each $templates as { name, type, amount, category, wallet }, id}
        <Button
            width="max-w-screen-sm"
            padding="p-4"
            accent={type === TransactionType.Expense ? 'bg-expense' : 'bg-income'}
            on:click={() => editTemplate(id)}
        >
            <div class="grid w-full grid-cols-[1fr_auto] grid-rows-[1fr_auto] gap-2 text-xs text-dark">
                <div class="text-left text-xl font-bold">{name}</div>
                <div class="place-self-end text-sm font-bold">{currency(amount)}</div>
                <div class="flex gap-2">
                    <div>📦 {category}</div>
                    <div>💰 {wallet}</div>
                </div>
                <div>{type}</div>
            </div>
        </Button>
    {/each}
</div>
