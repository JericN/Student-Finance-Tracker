<script>
    import '../app.postcss';
    import { modeCurrent, setModeCurrent } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';

    onMount(() => {
        setModeCurrent($modeCurrent);
    });
</script>

<slot />
