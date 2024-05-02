<script lang="ts">
    import Budget from './budget.svelte';
    import { Button } from '$lib/components/modules';
    import { goto } from '$app/navigation';
    import { getBudgetPrefEditStore } from '$lib/store/forms';
    import { getBudgetPrefStore } from '$lib/store/database';

    const budgetPrefStore = getBudgetPrefStore();
    const forms = getBudgetPrefEditStore();

    function edit() {
        forms.set(structuredClone($budgetPrefStore[0]));
        goto('/user/users/budget-pref/edit/');
    }


</script>

<div class="flex h-full flex-col items-center p-10">
    <Budget balance={$budgetPrefStore[0].amount} maxBalance={$budgetPrefStore[0].goal} />
    <Button on:click={edit}>Edit Preference ➕</Button>
</div>
