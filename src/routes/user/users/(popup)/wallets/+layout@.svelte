<script>
    import { AppShell } from '@skeletonlabs/skeleton';
    import Header from '$lib/components/Header.svelte';
</script>

<AppShell>
    <Header slot="header" title="New Wallet"/>
    <slot />
</AppShell>
