<script lang="ts">
    import CategoryList from './CategoryList.svelte';
    import type { NameNumber } from '$lib/models/types';
    import PieChart from '$lib/charts/PieChart.svelte';

    export let pie: { income: NameNumber; expense: NameNumber };
    export let currentType: string;
</script>

<PieChart dataset={currentType === 'Income' ? pie.income : pie.expense} />
<CategoryList data={pie} {currentType} />
