<script lang="ts">
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

    export let categories: Record<string, string>;
    export let selected: string;

    let deviceWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        deviceWidth = window.innerWidth;
    });

    function update(deviceWidth: number): number {
        switch (true) {
            case deviceWidth > 440:
                return 7;
            case deviceWidth > 410:
                return 6;
            case deviceWidth > 380:
                return 5;
            default:
                return 4;
        }
    }

    $: preview = Object.keys(categories).slice(0, update(deviceWidth));
</script>

<ListBox
    class="flex items-center justify-self-start"
    active="bg-surface-700"
    spacing="space-y-0"
    regionDefault="text-center"
>
    {#each preview as item}
        <ListBoxItem bind:group={selected} name={item} value={item} rounded="rounded-lg" padding="p-1" class="h-8 w-8"
            >{categories[item]}</ListBoxItem
        >
    {/each}
    <button class="h-8 w-8 rounded-lg border-2 bg-surface-300"> ➕ </button>
</ListBox>
