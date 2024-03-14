<script lang="ts">
    import * as FormStore from '$lib/store/forms';
    import { Cloud } from '@steeze-ui/heroicons';
    import { Icon } from '@steeze-ui/svelte-icon';
    import { type Transaction } from '$lib/models/types';
    import { currency } from '$lib/funcs/helper';
    import { goto } from '$app/navigation';

    export let entries: Transaction[];

    const editStore = FormStore.transactionEdit();

    function edit(entry: Transaction) {
        editStore.set(structuredClone(entry));
        goto('/user/transactions/edit/');
    }
</script>

<div class="border-bottom -my-2 flex flex-col gap-2 bg-light p-2">
    {#each entries as { type, category, amount, description }, id}
        <a
            href={null}
            class="grid cursor-pointer select-none grid-cols-tbody items-center text-dark hover:text-primary-500"
            on:click={() => edit(entries[id])}
        >
            <Icon src={Cloud} class="size-3" />
            <div>{category}</div>
            <div class="truncate text-2xs">{description}</div>
            <div class="text-income">{type === 'Income' ? currency(amount) : '-'}</div>
            <div class="text-expense">{type === 'Expense' ? currency(amount) : '-'}</div>
        </a>
    {/each}
</div>
