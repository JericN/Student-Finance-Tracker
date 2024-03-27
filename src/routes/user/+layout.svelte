<script>
    import * as FormStore from '$lib/store/forms';
    import * as dataStore from '$lib/store/database';
    import { AppShell, Modal } from '@skeletonlabs/skeleton';
    import Header from '$lib/components/Header.svelte';
    import NavBar from '$lib/components/NavBar.svelte';
    import { page } from '$app/stores';

    $: current = $page.url.pathname;
    $: transaction = current === '/user/transactions/create/' || current === '/user/transactions/edit/';
    $: wallet = current.startsWith('/user/users/wallets/');
    $: template = current.startsWith('/user/users/templates/');
    $: category = current.startsWith('/user/users/categories/');

    FormStore.init();
    dataStore.init();
</script>

<Modal />
<AppShell>
    <div slot="header">
        {#if transaction}
            <Header title="Transactions" />
        {:else if wallet}
            <Header title="Wallets" />
        {:else if template}
            <Header title="Templates" />
        {:else if category}
            <Header title="Categories" />
        {/if}
    </div>
    <slot />
    <div slot="footer">
        {#if !transaction && !wallet}
            <NavBar />
        {/if}
    </div>
</AppShell>
