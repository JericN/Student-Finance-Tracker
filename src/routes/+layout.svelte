<script>
    import '../app.postcss';
    import { AppShell } from '@skeletonlabs/skeleton';
    import NavBar from '$lib/components/NavBar.svelte';
    import { setModeCurrent, modeCurrent } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';

    onMount(() => {
        setModeCurrent($modeCurrent);
    });
</script>

<AppShell>
    <slot />
    <NavBar slot="footer" />
</AppShell>
