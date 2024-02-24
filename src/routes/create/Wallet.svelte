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
            case deviceWidth > 430:
                return 4;
            case deviceWidth > 370:
                return 3;
            default:
                return 2;
        }
    }

    $: preview = accounts.slice(0, update(deviceWidth));
</script>

<ListBox
    class="flex items-center gap-1 justify-self-start text-surface-900"
    active="bg-surface-700 text-surface-100"
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
            class="border-default">{item}</ListBoxItem
        >
    {/each}
    <button class="h-8 w-8 rounded-lg border-2 bg-surface-300 text-sm">➕</button>
</ListBox>
