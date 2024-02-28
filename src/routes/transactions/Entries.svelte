<script lang="ts">
    import { Cloud } from '@steeze-ui/heroicons';
    import { Icon } from '@steeze-ui/svelte-icon';
    import { type Record } from '$lib/models/types';
    import { currency } from '$lib/funcs/helper';

    export let entries: Record;
</script>

<div class="border-bottom -my-2 flex flex-col gap-2 bg-surface-50 p-2">
    {#each entries as { type, category, amount, description }}
        <div class="grid grid-cols-tbody items-center text-surface-900">
            <Icon src={Cloud} class="w-3" />
            <div>{category}</div>
            <div class="text-2xs">{description}</div>
            <div>{type === 'expense' ? currency(amount) : '-'}</div>
            <div>{type === 'income' ? currency(amount) : '-'}</div>
        </div>
    {/each}
</div>
