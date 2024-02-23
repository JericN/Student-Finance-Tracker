<script lang="ts">
    import Budget from './Budget.svelte';
    import Chart from './Chart.svelte';
    import Wallets from './Wallets.svelte';

    const balance = 1200;
    const maxBalance = 2500;
    const wallets = {
        Bank: 24200,
        Cash: 1200,
        GCash: 500,
    };
    const expenses = {
        Mon: 200,
        Tue: 320,
        Wed: 210,
        Thu: 190,
        Fri: 200,
        Sat: 340,
        Sun: 620,
    };
</script>

<div class="flex h-full flex-col items-center justify-between p-10">
    <Budget {balance} {maxBalance} />
    <Chart dataset={expenses} />
    <Wallets {wallets} />
</div>
