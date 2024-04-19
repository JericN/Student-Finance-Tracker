<script lang="ts">
    import type { Category, TransactionType } from '$lib/models/sft';
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

    export let categories: Category[];
    export let type: TransactionType | undefined;
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

    $: preview = categories.filter(category => category.type === type).slice(0, update(deviceWidth));
    // eslint-disable-next-line no-undefined
    $: if (!preview.map(prev => prev.id).includes(selected || '')) selected = undefined;
</script>

<div class="input-label">Category</div>
<ListBox class="flex justify-self-start" active="bg-surface-700" spacing="space-y-0" regionDefault="text-center">
    {#each preview as { id, name, icon }}
        <ListBoxItem bind:group={selected} {name} value={id} rounded="rounded-lg" padding="p-1" class="h-8 w-8"
            >{icon}</ListBoxItem
        >
    {/each}
    <button class="h-8 w-8 rounded-lg border-2 bg-surface-300"> ➕ </button>
</ListBox>
