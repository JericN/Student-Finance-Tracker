<script>
    import '../app.postcss';
    import { AppShell } from '@skeletonlabs/skeleton';
    import NavBar from '$lib/components/NavBar.svelte';
</script>

<AppShell>
    <NavBar slot="footer" />
    <slot />
</AppShell>
