<script lang="ts">
    import '../app.postcss';
    import * as FormStore from '$lib/store/forms';
    import { Modal, Toast, initializeStores, modeCurrent, setModeCurrent } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';

    initializeStores();
    FormStore.init();

    onMount(() => {
        setModeCurrent($modeCurrent);
    });
</script>

<Toast position="t" />
<Modal />
<slot />
