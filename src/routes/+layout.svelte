<script lang="ts">
    import '../app.postcss';
    import {
        Modal,
        type ModalComponent,
        Toast,
        initializeStores,
        modeCurrent,
        setModeCurrent,
    } from '@skeletonlabs/skeleton';
    import { FilterModal, TemplateModal } from '$lib/modals';
    import { onMount } from 'svelte';
    initializeStores();
    const modalRegistry: Record<string, ModalComponent> = {
        filter: { ref: FilterModal },
        template: { ref: TemplateModal },
    };
    onMount(() => {
        setModeCurrent($modeCurrent);
    });
</script>

<Toast position="t" />
<Modal components={modalRegistry} />
<slot />
