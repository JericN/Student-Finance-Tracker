<script lang="ts">
    import '../app.postcss';
    import * as createStore from '$lib/store/creating';
    import * as editStore from '$lib/store/editing';
    import { Toast, initializeStores, modeCurrent, setModeCurrent } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';

    initializeStores();
    editStore.init();
    createStore.init();

    onMount(() => {
        setModeCurrent($modeCurrent);
    });
</script>

<Toast position="t" />
<slot />
