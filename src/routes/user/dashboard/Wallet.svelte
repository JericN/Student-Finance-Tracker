<script lang="ts">
    import { Card } from '$lib/components/modules';
    import { CreditCard } from '@steeze-ui/heroicons';
    import { Icon } from '@steeze-ui/svelte-icon';
    import { currency } from '$lib/functions/helper';

    export let name: string;
    export let value: number;
    // TODO: custom icons
</script>

<Card width="w-full flex-none" padding="px-6">
    <div class="flex justify-between text-dark">
        <div class="flex flex-col items-center">
            <Icon src={CreditCard} class="w-8" />
            <div class="text-xs font-bold">{name}</div>
        </div>
        <div class="my-auto text-2xl font-bold">
            {currency(value)}
        </div>
    </div>
</Card>
