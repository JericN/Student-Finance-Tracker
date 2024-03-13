<script>
    import '../app.postcss';
    import * as createStore from '$lib/store/creating';
    import * as editStore from '$lib/store/editing';
    import * as walletEditStore from '$lib/store/editingWallet';
    import * as walletCreateStore from '$lib/store/creatingWallet';
    import { Modal, Toast, initializeStores, modeCurrent, setModeCurrent } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';

    initializeStores();
    editStore.init();
    createStore.init();
    walletEditStore.init();
    walletCreateStore.init();

    onMount(() => {
        setModeCurrent($modeCurrent);
    });
</script>

<Toast />
<Modal />
<slot />
