<script>
    import * as templateStore from '$lib/store/template';
    import * as transactionStore from '$lib/store/transaction';
    import { AppShell } from '@skeletonlabs/skeleton';
    import Header from '$lib/components/Header.svelte';
    import NavBar from '$lib/components/NavBar.svelte';
    import { page } from '$app/stores';

    $: current = $page.url.pathname;
    $: transaction = current === '/user/transactions/create/' || current === '/user/transactions/edit/';
    $: wallet = current.startsWith('/user/users/wallets/');
    $: template = current.startsWith('/user/users/templates/');

    transactionStore.init();
    templateStore.init();
</script>

<AppShell>
    <div slot="header">
        {#if transaction}
            <Header title="Transactions" />
        {:else if wallet}
            <Header title="Wallets" />
        {:else if template}
            <Header title="Templates" />
        {/if}
    </div>
    <slot />
    <div slot="footer">
        {#if !transaction && !wallet}
            <NavBar />
        {/if}
    </div>
</AppShell>
