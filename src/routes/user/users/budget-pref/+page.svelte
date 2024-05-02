<script lang="ts">
    import Budget from './budget.svelte';
    import { Button } from '$lib/components/modules';
    import { goto } from '$app/navigation';

    let balance = 1200;
    const maxBalance = 2500;

    function edit() {
        goto('/user/users/budget-pref/edit/');
    }


</script>

<div class="flex h-full flex-col items-center p-10">
    <Budget {balance} {maxBalance} />
    <Button on:click={edit}>Edit Preference ➕</Button>
</div>
