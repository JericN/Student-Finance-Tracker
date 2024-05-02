<script lang="ts">
    import Budget from './budget.svelte';
    import { CardButton } from '$lib/components/modules';
    import { currency } from '$lib/functions/helper';
    import { getBudgetPrefEditStore } from '$lib/store/forms';
    import { getBudgetPrefStore } from '$lib/store/database';
    import { goto } from '$app/navigation';

    const budgetPrefStore = getBudgetPrefStore();
    const forms = getBudgetPrefEditStore();

    $: current = $budgetPrefStore.length !== 0 ? $budgetPrefStore[0] : { amount: 0, goal: 0 };

    function edit() {
        forms.set(structuredClone(current));
        goto('/user/users/budget-pref/edit/');
    }
</script>

<div class="flex h-full flex-col items-center p-10">
    <Budget balance={current.amount} maxBalance={current.goal} />
    <CardButton on:click={edit} layout="justify-between" width="mt-4">
        <div class="text-sm font-bold text-dark">Current</div>
        <div class="text-xl font-bold text-dark">{currency(current.amount)}</div>
    </CardButton>
    <CardButton on:click={edit} layout="justify-between">
        <div class="text-sm font-bold text-dark">Daily Max</div>
        <div class="text-xl font-bold text-dark">{currency(current.goal)}</div>
    </CardButton>
</div>
