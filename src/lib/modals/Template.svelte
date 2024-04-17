<script lang="ts">
    import { ListBox, ListBoxItem, getModalStore, getToastStore } from '@skeletonlabs/skeleton';
    import { PartialTransactionForm, Template } from '$lib/models/sft';
    import type { SvelteComponent } from 'svelte';
    import { getTemplateStore } from '$lib/store/database';
    import { getTransactionCreateStore } from '$lib/store/forms';
    import { parse } from 'valibot';
    import { success } from '$lib/functions/toast';

    export let parent: SvelteComponent;

    const modalStore = getModalStore();
    const toastStore = getToastStore();
    const templateStore = getTemplateStore();
    const forms = getTransactionCreateStore();

    let selected: Template;

    function submit(): void {
        const date = new Date(new Date().setHours(0, 0, 0, 0));
        const data = parse(PartialTransactionForm, { ...selected, date });
        forms.set(data);
        modalStore.close();
        toastStore.trigger(success(`Template ${selected.name}`));
    }
</script>

<!-- TODO: improve modal UI -->
{#if $modalStore[0]}
    <div class="modal-example-form card w-modal space-y-4 p-4 shadow-xl">
        <header class="text-center text-2xl font-bold">{$modalStore[0].title}</header>
        <ListBox class="border border-surface-500 p-4 rounded-container-token">
            {#each $templateStore as template}
                <ListBoxItem bind:group={selected} name={template.id} value={template}>{template.name}</ListBoxItem>
            {/each}
        </ListBox>
        <footer class="modal-footer {parent.regionFooter}">
            <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
            <button class="btn {parent.buttonPositive}" on:click={submit}>Apply</button>
        </footer>
    </div>
{/if}
