<script lang="ts">
    import Budget from './Budget.svelte';
    import Chart from './Chart.svelte';
    import Wallets from './Wallets.svelte';

    import { getBudgetPrefStore } from '$lib/store/database';

    const budgetPrefStore = getBudgetPrefStore();
    $: current = $budgetPrefStore.length !== 0 ? $budgetPrefStore[0] : { amount: 0, goal: 0 };
</script>

<div class="flex h-full flex-col items-center justify-between p-10">
    <Budget balance={current.amount} maxBalance={current.goal} />
    <Chart />
    <Wallets />
</div>
