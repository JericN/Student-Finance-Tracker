<script lang="ts">
    import * as DataStore from '$lib/store/database';
    import * as FormStore from '$lib/store/forms';
    import * as TransactionStore from '$lib/store/transaction';
    import { AppShell, Modal, type ModalComponent } from '@skeletonlabs/skeleton';
    import { FilterModal, TemplateModal } from '$lib/modals';
    import Header from '$lib/components/Header.svelte';
    import NavBar from '$lib/components/NavBar.svelte';
    import { page } from '$app/stores';

    const modalRegistry: Record<string, ModalComponent> = {
        filter: { ref: FilterModal },
        template: { ref: TemplateModal },
    };

    // TODO: fix header routing
    $: current = $page.url.pathname;
    $: transaction = current === '/user/transactions/create/' || current === '/user/transactions/edit/';
    $: wallet = current.startsWith('/user/users/wallets/');
    $: template = current.startsWith('/user/users/templates/');
    $: category = current.startsWith('/user/users/categories/');

    DataStore.init();
    FormStore.init();
    TransactionStore.init();
</script>

<Modal components={modalRegistry} />
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
        {#if !transaction && !wallet && !template && !category}
            <NavBar />
        {/if}
    </div>
</AppShell>
