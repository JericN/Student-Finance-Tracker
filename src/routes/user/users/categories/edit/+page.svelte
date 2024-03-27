<script lang="ts">
    import { Button, Card } from '$lib/components/modules';
    import { Category, CategoryForm } from '$lib/models/types';
    import { Description, Icon, Name } from '$lib/components/forms';
    import { error, success } from '$lib/funcs/toast';
    import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
    import { parse, pick, safeParse } from 'valibot';
    import { removeCategory, updateCategory } from '$lib/firebase/database';
    import { getCategoryEditStore } from '$lib/store/forms';

    const modalStore = getModalStore();
    const toastStore = getToastStore();
    const forms = getCategoryEditStore();

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
            window.history.back();
            forms.reset();
            toastStore.trigger(success('Category updated'));
        } catch (_) {
            toastStore.trigger(error('Failed to update Category'));
        }
    }

    async function remove() {
        try {
            const { id } = parse(pick(Category, ['id']), { id: $forms.id });
            await removeCategory(id);
            window.history.back();
            forms.reset();
            toastStore.trigger(success('Category removed'));
        } catch (_) {
            toastStore.trigger(error('Failed to remove Category'));
        }
    }

    function removeHandler() {
        modalStore.trigger({
            type: 'confirm',
            title: 'Please Confirm',
            body: 'Are you sure you wish to remove this category?',
            response: (res: boolean) => {
                if (res) remove();
            },
        });
    }
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
    <Card width="w-full max-w-sm min-w-72">
        <div class="grid grid-cols-[auto_1fr] place-items-center gap-2">
            <Name bind:name={$forms.name} />
            <Icon bind:icon={$forms.icon} />
        </div>
        <Description bind:description={$forms.description} />
    </Card>
    <div class="flex w-full">
        <Button width="w-full" accent="bg-income" on:click={update}>UPDATE</Button>
        <Button width="w-full" accent="bg-expense" on:click={removeHandler}>REMOVE</Button>
    </div>
</div>
