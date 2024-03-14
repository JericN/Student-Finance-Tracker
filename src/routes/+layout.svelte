<script lang="ts">
    import '../app.postcss';
    import { Toast, initializeStores, modeCurrent, setModeCurrent } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';

    initializeStores();

    onMount(() => {
        setModeCurrent($modeCurrent);
    });
</script>

<Toast position="t" />
<slot />
