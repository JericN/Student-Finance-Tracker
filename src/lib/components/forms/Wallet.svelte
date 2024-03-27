<script lang="ts">
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import type { Wallet } from '$lib/models/types';

    export let wallets: Wallet[];
    export let selected: string | undefined;

    let deviceWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        deviceWidth = window.innerWidth;
    });

    function update(deviceWidth: number): number {
        switch (true) {
            case deviceWidth > 440:
                return 4;
            case deviceWidth > 380:
                return 3;
            default:
                return 2;
        }
    }

    $: preview = wallets.slice(0, update(deviceWidth));
</script>

<div class="input-label">Wallet</div>
<ListBox
    class="flex items-center gap-1 justify-self-start text-dark"
    active="bg-surface-700 text-light"
    spacing="space-y-0"
    regionDefault="text-xs font-medium"
>
    {#each preview as { id, name }}
        <ListBoxItem
            bind:group={selected}
            {name}
            value={id}
            rounded="rounded-lg"
            padding="p-1 px-2"
            class="border-2 border-dark">{name}</ListBoxItem
        >
    {/each}
    <button class="size-8 rounded-lg border-2 bg-surface-300">➕</button>
</ListBox>
