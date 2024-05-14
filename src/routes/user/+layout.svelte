<script lang="ts">
    import * as DataStore from '$lib/store/database';
    import * as FormStore from '$lib/store/forms';
    import * as TransactionStore from '$lib/store/transaction';
    import { AppShell, type ModalComponent } from '@skeletonlabs/skeleton';

    import Header from '$lib/components/Header.svelte';
    import NavBar from '$lib/components/NavBar.svelte';
    import { page } from '$app/stores';

    // TODO: fix header routing
    $: current = $page.url.pathname;
    $: transaction = current === '/user/transactions/create/' || current === '/user/transactions/edit/';
    $: wallet = current.startsWith('/user/users/wallets/');
    $: template = current.startsWith('/user/users/templates/');
    $: category = current.startsWith('/user/users/categories/');
    $: wishlist = current.startsWith('/user/users/wishlist/');
    $: budget = current.startsWith('/user/users/budget-pref/');
    $: management = current.startsWith('/user/users/management/');
    $: settings = current.startsWith('/user/users/settings/');

    DataStore.init();
    FormStore.init();
    TransactionStore.init();
</script>

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
        {:else if wishlist}
            <Header title="Wishlist" />
        {:else if budget}
            <Header title="Budget" />
        {:else if management}
            <Header title="User Management" />
        {:else if settings}
            <Header title="App Settings" />
        {/if}
    </div>
    <slot />
    <div slot="footer">
        {#if !transaction && !wallet && !template && !category && !wishlist && !budget}
            <NavBar />
        {/if}
    </div>
</AppShell>
