<script lang="ts">
    import { Cloud } from '@steeze-ui/heroicons';
    import { Icon } from '@steeze-ui/svelte-icon';
    import { type Record } from '$lib/models/types';
    import { currency } from '$lib/funcs/funcs';
    export let entries: Record;
</script>

<div
    class="-my-2 flex flex-col gap-2 rounded-b-xl border-x-2 border-b-2 border-surface-900 bg-surface-50 p-2 text-surface-900"
>
    {#each entries as { type, category, amount, description }}
        <div class="grid grid-cols-tbody items-center">
            <Icon src={Cloud} class="w-3" />
            <div>{category}</div>
            <div class="text-2xs">{description}</div>
            {#if type === 'income'}
                <div>{currency(amount)}</div>
                <div>-</div>
            {:else if type === 'expense'}
                <div>-</div>
                <div>{currency(amount)}</div>
            {/if}
        </div>
    {/each}
</div>
