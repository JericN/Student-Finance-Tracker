<script lang="ts">
    import Budget from './Budget.svelte';
    import Chart from './Chart.svelte';
    import Wallets from './Wallets.svelte';

    import { getBudgetPrefStore } from '$lib/store/database';

    const budgetPrefStore = getBudgetPrefStore();
</script>

<div class="flex h-full flex-col items-center justify-between p-10">
    <Budget balance={$budgetPrefStore[0].amount} maxBalance={$budgetPrefStore[0].goal} />
    <Chart />
    <Wallets />
</div>
