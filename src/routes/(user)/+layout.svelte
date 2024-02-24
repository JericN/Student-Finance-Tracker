<script>
    import { AppShell } from '@skeletonlabs/skeleton';
    import NavBar from '$lib/components/NavBar.svelte';
</script>

<AppShell>
    <slot />
    <NavBar slot="footer" />
</AppShell>
