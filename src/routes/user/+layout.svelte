<script>
    import { AppShell } from '@skeletonlabs/skeleton';
    import Header from '$lib/components/Header.svelte';
    import NavBar from '$lib/components/NavBar.svelte';
    import { page } from '$app/stores';

    $: current = $page.url.pathname;
    $: showHeader = current === '/user/transactions/create/' || current === '/user/transactions/edit/';
</script>

<AppShell>
    <div slot="header">
        {#if showHeader}
            <Header />
        {/if}
    </div>
    <slot />
    <div slot="footer">
        {#if !showHeader}
            <NavBar />
        {/if}
    </div>
</AppShell>
