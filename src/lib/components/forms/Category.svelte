<script lang="ts">
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import type { Category } from '$lib/models/types';

    export let categories: Category[];
    export let selected: string | undefined;

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

    $: preview = categories.slice(0, update(deviceWidth));
</script>

<div class="input-label">Category</div>
<ListBox
    class="flex items-center justify-self-start"
    active="bg-surface-700"
    spacing="space-y-0"
    regionDefault="text-center"
>
    {#each preview as { id, name, icon }}
        <ListBoxItem bind:group={selected} {name} value={id} rounded="rounded-lg" padding="p-1" class="h-8 w-8"
            >{icon}</ListBoxItem
        >
    {/each}
    <button class="h-8 w-8 rounded-lg border-2 bg-surface-300"> ➕ </button>
</ListBox>
