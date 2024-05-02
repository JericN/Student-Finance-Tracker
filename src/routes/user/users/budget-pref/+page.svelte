<script lang="ts">
    import Budget from './budget.svelte';
    import { Button } from '$lib/components/modules';
    import { getBudgetPrefEditStore } from '$lib/store/forms';
    import { getBudgetPrefStore } from '$lib/store/database';
    import { goto } from '$app/navigation';

    const budgetPrefStore = getBudgetPrefStore();
    const forms = getBudgetPrefEditStore();

    function edit() {
        forms.set(structuredClone($budgetPrefStore[0]));
        goto('/user/users/budget-pref/edit/');
    }
    function add() {
        goto('/user/users/budget-pref/create/');
    }
</script>

<div class="flex h-full flex-col items-center p-10">
    <Budget balance={$budgetPrefStore[0].amount} maxBalance={$budgetPrefStore[0].goal} />
    <Button on:click={edit}>Edit Preference ➕</Button>
    <Button on:click={add}>Add Preference ➕</Button>
</div>
