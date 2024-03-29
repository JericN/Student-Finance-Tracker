<script lang="ts">
    import { filterStore, getDefault } from '$lib/store/filter';
    import { getCategoryStore, getWalletStore } from '$lib/store/database';
    import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
    import AmountRangeFilter from '$lib/modals/filters/AmountRangeFilter.svelte';
    import CategoryFilter from '$lib/modals/filters/CategoryFilter.svelte';
    import DateRangeFilter from '$lib/modals/filters/DateRangeFilter.svelte';
    import type { SvelteComponent } from 'svelte';
    import TypeFilter from '$lib/modals/filters/TypeFilter.svelte';
    import WalletFilter from '$lib/modals/filters/WalletFilter.svelte';
    import { getTransactionStore } from '$lib/store/transaction';
    import { success } from '$lib/functions/toast';

    export let parent: SvelteComponent;

    const modalStore = getModalStore();
    const toastStore = getToastStore();
    const categoryStore = getCategoryStore();
    const walletStore = getWalletStore();
    const transactionStore = getTransactionStore();

    let selected = structuredClone($filterStore);

    function submit(): void {
        filterStore.set(selected);
        transactionStore.updateData();
        modalStore.close();
        toastStore.trigger(success('Filter applied'));
    }

    function reset() {
        selected = getDefault();
    }
</script>

{#if $modalStore[0]}
    <div class="card m-6 w-full max-w-sm space-y-4 p-4 shadow-xl">
        <header class="text-center text-xl font-bold">{$modalStore[0].title}</header>

        <AmountRangeFilter bind:min={selected.amountMin} bind:max={selected.amountMax} />
        <DateRangeFilter bind:start={selected.dateStart} bind:end={selected.dateEnd} />
        <CategoryFilter bind:selected={selected.categoryIds} categories={$categoryStore} />
        <WalletFilter bind:selected={selected.walletIds} wallets={$walletStore} />
        <TypeFilter bind:selected={selected.types} />

        <footer class="modal-footer {parent.regionFooter}">
            <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
            <button class="btn {parent.buttonPositive}" on:click={reset}>Reset</button>
            <button class="btn {parent.buttonPositive}" on:click={submit}>Apply</button>
        </footer>
    </div>
{/if}
