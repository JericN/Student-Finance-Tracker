<script lang="ts">
    import { Button, CardButton } from '$lib/components/modules';
    import { TransactionType } from '$lib/models/types';
    import { currency } from '$lib/funcs/helper';
    import { getTemplateEditStore } from '$lib/store/forms';
    import { getTemplateStore } from '$lib/store/database';
    import { goto } from '$app/navigation';

    const templateStore = getTemplateStore();
    const forms = getTemplateEditStore();

    function add() {
        goto('/user/users/templates/create/');
    }

    function edit(id: number) {
        forms.set(structuredClone($templateStore[id]));
        goto('/user/users/templates/edit/');
    }
</script>

<div class="flex h-full flex-col items-center gap-2 p-10">
    <Button on:click={add}>Add Template ➕</Button>

    {#each $templateStore as { name, type, amount, category, wallet }, id}
        <CardButton accent={type === TransactionType.Expense ? 'bg-expense' : 'bg-income'} on:click={() => edit(id)}>
            <div class="grid w-full grid-cols-[1fr_auto] grid-rows-[1fr_auto] gap-2 text-xs text-dark">
                <div class="text-left text-xl font-bold">{name}</div>
                <div class="place-self-end text-sm font-bold">{currency(amount)}</div>
                <div class="flex gap-2">
                    <div>📦 {category}</div>
                    <div>💰 {wallet}</div>
                </div>
                <div>{type}</div>
            </div>
        </CardButton>
    {/each}
</div>
