<script lang="ts">
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import { TransactionType } from '$lib/models/sft';

    export let selected: string[] | null;
</script>

<div class="font-bold">Type</div>
<ListBox
    class="flex gap-1 justify-self-start text-dark"
    active="bg-surface-700 text-light"
    spacing="space-y-0"
    regionDefault="text-xs font-medium"
    multiple
>
    <ListBoxItem
        bind:group={selected}
        name="expense"
        value={TransactionType.Expense}
        rounded="rounded-lg"
        padding="p-1 px-2"
        class="border-2 border-dark">Expense</ListBoxItem
    >
    <ListBoxItem
        bind:group={selected}
        name="income"
        value={TransactionType.Income}
        rounded="rounded-lg"
        padding="p-1 px-2"
        class="border-2 border-dark">Income</ListBoxItem
    >
    <ListBoxItem
        bind:group={selected}
        name="income"
        value={TransactionType.Transfer}
        rounded="rounded-lg"
        padding="p-1 px-2"
        class="border-2 border-dark">Transfer</ListBoxItem
    >
</ListBox>
