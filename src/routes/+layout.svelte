<script>
    import '../app.postcss';
    import { AppShell, modeCurrent, setModeCurrent } from '@skeletonlabs/skeleton';
    import NavBar from '$lib/components/NavBar.svelte';
    import { onMount } from 'svelte';

    onMount(() => {
        setModeCurrent($modeCurrent);
    });
</script>

<AppShell>
    <slot />
    <NavBar slot="footer" />
</AppShell>
