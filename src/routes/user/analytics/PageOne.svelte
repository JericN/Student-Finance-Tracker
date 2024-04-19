<script lang="ts">
    import CategoryList from './CategoryList.svelte';
    import type { NameNumber } from '$lib/models/types';
    import PieChart from '$lib/charts/PieChart.svelte';
    import Summary from './Summary.svelte';

    export let pie: { income: NameNumber; expense: NameNumber };
    export let currentType: string;

    $: totalIncome = Object.values(pie.income).reduce((acc, num) => acc + num, 0);
    $: totalExpense = Object.values(pie.expense).reduce((acc, num) => acc + num, 0);
</script>

<div class="flex flex-col items-center gap-2">
    <Summary income={totalIncome} expenses={totalExpense} balance={totalIncome - totalExpense} />
    <PieChart dataset={currentType === 'Income' ? pie.income : pie.expense} />
    <CategoryList data={pie} {currentType} />
</div>
