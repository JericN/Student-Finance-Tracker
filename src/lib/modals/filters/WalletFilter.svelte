<script lang="ts">
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import type { Wallet } from '$lib/models/sft';

    export let selected: string[] | null;
    export let wallets: Wallet[];
</script>

<div class="font-bold">Wallet</div>
<ListBox
    class="flex gap-1 justify-self-start text-dark"
    active="bg-surface-700 text-light"
    spacing="space-y-0"
    regionDefault="text-xs font-medium"
    multiple
>
    {#each wallets as { id, name }}
        <ListBoxItem
            bind:group={selected}
            {name}
            value={id}
            rounded="rounded-lg"
            padding="p-1 px-2"
            class="border-2 border-dark">{name}</ListBoxItem
        >
    {/each}
</ListBox>
