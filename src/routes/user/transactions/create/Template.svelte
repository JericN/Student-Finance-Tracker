<script lang="ts">
    import * as FormStore from '$lib/store/forms';
    import * as TemplateStore from '$lib/store/template';
    import { ListBox, ListBoxItem, getModalStore, getToastStore } from '@skeletonlabs/skeleton';
    import { PartialRecord, Template } from '$lib/models/types';
    import type { SvelteComponent } from 'svelte';
    import { parse } from 'valibot';
    import { success } from '$lib/funcs/toast';

    export let parent: SvelteComponent;

    const modalStore = getModalStore();
    const toastStore = getToastStore();
    const templates = TemplateStore.get();
    const createStore = FormStore.transactionCreate();

    let selected: Template;

    function onFormSubmit(): void {
        const data = parse(PartialRecord, { ...selected, date: new Date() });
        createStore.set(data);
        modalStore.close();
        toastStore.trigger(success(`Template ${selected.name}`));
    }
</script>

{#if $modalStore[0]}
    <div class="modal-example-form card w-modal space-y-4 p-4 shadow-xl">
        <header class="text-center text-2xl font-bold">{$modalStore[0].title}</header>
        <ListBox class="border border-surface-500 p-4 rounded-container-token">
            {#each $templates as template}
                <ListBoxItem bind:group={selected} name={template.id} value={template}>{template.name}</ListBoxItem>
            {/each}
        </ListBox>
        <!-- prettier-ignore -->
        <footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Apply</button>
    </footer>
    </div>
{/if}
