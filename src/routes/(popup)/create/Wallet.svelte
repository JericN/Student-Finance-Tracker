<script lang="ts">
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

    export let accounts: string[];
    export let selected: string;

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

    $: preview = accounts.slice(0, update(deviceWidth));
</script>

<div class="input-label">Wallet</div>
<ListBox
    class="flex items-center gap-1 justify-self-start text-dark"
    active="bg-surface-700 text-light"
    spacing="space-y-0"
    regionDefault="text-xs font-medium"
>
    {#each preview as item}
        <ListBoxItem
            bind:group={selected}
            name={item}
            value={item}
            rounded="rounded-lg"
            padding="p-1 px-2"
            class="border-2 border-dark">{item}</ListBoxItem
        >
    {/each}
    <button class="size-8 rounded-lg border-2 bg-surface-300">➕</button>
</ListBox>
