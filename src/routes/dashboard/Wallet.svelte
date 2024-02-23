<script lang="ts">
    import Card from '$lib/components/Card.svelte';
    import { CreditCard } from '@steeze-ui/heroicons';
    import { Icon } from '@steeze-ui/svelte-icon';
    import { currency } from '$lib/funcs/helper';

    export let name: string;
    export let value: number;
    // TODO: custom icons
</script>

<Card width="w-full flex-none">
    <div class="grid grid-cols-[60px_1fr] place-items-center p-4 text-surface-900">
        <Icon src={CreditCard} class="w-8" />
        <div class="row-span-2 w-full text-right text-2xl font-bold">
            {currency(value)}
        </div>
        <div class="text-sm">{name}</div>
    </div>
</Card>
