<script lang="ts">
    import Card from '$lib/components/Card.svelte';
    import { currency } from '$lib/funcs/helper';

    export let income: number;
    export let expenses: number;
    export let balance: number;
</script>

<Card width={'min-w-max'} padding="px-6">
    <div class="text-center text-surface-900">
        <div class="grid grid-cols-3 gap-x-10 font-bold">
            <div class="text-xs">Income</div>
            <div class="text-xs">Expenses</div>
            <div class="text-xs">Balance</div>
            <div class="text-income">{currency(income)}</div>
            <div class="text-expense">{currency(expenses)}</div>
            <div class="text-neutral">{currency(balance)}</div>
        </div>
    </div>
</Card>
