<script lang="ts">
    import { getCategoryStore, getWalletStore } from '$lib/store/database';
    import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
    import AmountRangeFilter from '$lib/modals/filters/AmountRangeFilter.svelte';
    import CategoryFilter from '$lib/modals/filters/CategoryFilter.svelte';
    import DateRangeFilter from '$lib/modals/filters/DateRangeFilter.svelte';
    import type { SvelteComponent } from 'svelte';
    import TypeFilter from '$lib/modals/filters/TypeFilter.svelte';
    import WalletFilter from '$lib/modals/filters/WalletFilter.svelte';
    import { filterStore } from '$lib/store/filter';
    import { getTransactionStore } from '$lib/store/transaction';
    import { success } from '$lib/funcs/toast';

    export let parent: SvelteComponent;

    const modalStore = getModalStore();
    const toastStore = getToastStore();
    const categoryStore = getCategoryStore();
    const walletStore = getWalletStore();
    const transactionStore = getTransactionStore();

    function submit(): void {
        transactionStore.updateData();
        modalStore.close();
        toastStore.trigger(success('Filter applied'));
    }
</script>

{#if $modalStore[0]}
    <div class="card w-modal m-6 space-y-4 p-4 shadow-xl">
        <header class="text-center text-xl font-bold">{$modalStore[0].title}</header>

        <AmountRangeFilter bind:min={$filterStore.amountMin} bind:max={$filterStore.amountMax} />
        <DateRangeFilter bind:start={$filterStore.dateStart} bind:end={$filterStore.dateEnd} />
        <CategoryFilter bind:selected={$filterStore.categoryIds} categories={$categoryStore} />
        <WalletFilter bind:selected={$filterStore.walletIds} wallets={$walletStore} />
        <TypeFilter bind:selected={$filterStore.types} />

        <footer class="modal-footer {parent.regionFooter}">
            <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
            <button class="btn {parent.buttonPositive}" on:click={submit}>Apply</button>
        </footer>
    </div>
{/if}
