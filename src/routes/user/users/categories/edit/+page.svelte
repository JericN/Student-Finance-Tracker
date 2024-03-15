<script lang="ts">
    import * as FormStore from '$lib/store/forms';
    import { Category, CategoryForm } from '$lib/models/types';
    import { Description, Icon, Name } from '$lib/components/forms';
    import { type ModalSettings, getModalStore, getToastStore } from '@skeletonlabs/skeleton';
    import { error, success } from '$lib/funcs/toast';
    import { parse, pick, safeParse } from 'valibot';
    import { removeCategory, updateCategory } from '$lib/firebase/database';
    import Button from '$lib/components/Button.svelte';
    import Card from '$lib/components/Card.svelte';
    import { onDestroy } from 'svelte';

    const toastStore = getToastStore();
    const forms = FormStore.categoryEdit();

    async function update() {
        const properties: (keyof CategoryForm)[] = ['name', 'icon', 'description'];

        for (const property of properties) {
            const result = safeParse(pick(CategoryForm, [property]), { [property]: $forms[property] });
            if (!result.success) {
                toastStore.trigger(error(`Invalid ${property}`));
                return;
            }
        }
        try {
            await updateCategory(parse(Category, $forms));
            // goto('/user/users/templates/');
            // FIXME: This is a temporary fix until we have a proper way to navigate
            window.history.back();
            forms.reset();
            toastStore.trigger(success('Category updated'));
        } catch (_) {
            toastStore.trigger(error('Failed to update Category'));
        }
    }

    async function remove(flag: boolean) {
        if (!flag) return;
        try {
            const { id } = parse(pick(Category, ['id']), { id: $forms.id });
            await removeCategory(id);
            // goto('/user/users/templates/');
            // FIXME: This is a temporary fix until we have a proper way to navigate
            window.history.back();
            forms.reset();
            toastStore.trigger(success('Category removed'));
        } catch (_) {
            toastStore.trigger(error('Failed to remove Category'));
        }
    }

    const modalStore = getModalStore();

    const modal: ModalSettings = {
        type: 'confirm',
        title: 'Please Confirm',
        body: 'Are you sure you wish to remove this category?',
        response: (r: boolean) => remove(r),
    };

    onDestroy(() => {
        forms.reset();
    });
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
    <Card width="w-full max-w-sm min-w-72">
        <div class="grid grid-cols-[auto_1fr] place-items-center gap-2">
            <Name bind:name={$forms.name} />
            <Icon bind:icon={$forms.icon} />
        </div>
        <Description bind:description={$forms.description} />
    </Card>
    <div class="flex gap-4">
        <Button on:click={() => update()}>
            <span class="px-4 font-bold text-dark"> UPDATE </span>
        </Button>
        <Button on:click={() => modalStore.trigger(modal)}>
            <span class="px-4 font-bold text-dark"> REMOVE </span>
        </Button>
    </div>
</div>
