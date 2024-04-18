<script lang="ts">
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import type { Category } from '$lib/models/sft';

    export let selected: string[] | null;
    export let categories: Category[];
</script>

<div class="font-bold">Category</div>
<ListBox
    class="flex flex-wrap gap-1 justify-self-start"
    active="bg-surface-700"
    spacing="space-y-0"
    regionDefault="text-center"
    multiple
>
    {#each categories as { id, name, icon }}
        <ListBoxItem
            bind:group={selected}
            {name}
            value={id}
            rounded="rounded-lg"
            padding="p-1"
            class="h-8 w-8 bg-surface-300"
            selected
        >
            {icon}
        </ListBoxItem>
    {/each}
</ListBox>
