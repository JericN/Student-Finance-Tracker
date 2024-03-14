<script>
    import * as transactionStore from '$lib/store/transaction';
    import { AppShell } from '@skeletonlabs/skeleton';
    import Header from '$lib/components/Header.svelte';
    import NavBar from '$lib/components/NavBar.svelte';
    import { page } from '$app/stores';

    $: current = $page.url.pathname;
    $: transaction = current === '/user/transactions/create/' || current === '/user/transactions/edit/';
    $: wallet = current.startsWith('/user/users/wallets/');

    transactionStore.init();
</script>

<AppShell>
    <div slot="header">
        {#if transaction}
            <Header title="Transactions" />
        {:else if wallet}
            <Header title="Wallets" />
        {/if}
    </div>
    <slot />
    <div slot="footer">
        {#if !transaction && !wallet}
            <NavBar />
        {/if}
    </div>
</AppShell>
