<script lang="ts">
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import { TransactionType } from '$lib/models/sft';

    export let type: TransactionType = TransactionType.Expense;
</script>

<div class="input-label">Type</div>
<ListBox class="border-default grid w-full grid-cols-2 text-center text-sm text-dark" spacing="space-y-0" padding="p-1">
    <ListBoxItem
        bind:group={type}
        name="income"
        value={TransactionType.Income}
        active="bg-income text-light"
        rounded="rounded-l-md scale-101">Income</ListBoxItem
    >
    <ListBoxItem
        bind:group={type}
        name="expense"
        value={TransactionType.Expense}
        active="bg-expense text-light"
        rounded="rounded-r-md scale-101">Expenses</ListBoxItem
    >
</ListBox>
