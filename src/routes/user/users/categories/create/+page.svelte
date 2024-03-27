<script lang="ts">
    import { Button, Card } from '$lib/components';
    import { Description, Icon, Name, Type } from '$lib/components/forms';
    import { error, success } from '$lib/funcs/toast';
    import { parse, pick, safeParse } from 'valibot';
    import { CategoryForm } from '$lib/models/types';
    import { addCategory } from '$lib/firebase/database';
    import { getCategoryCreateStore } from '$lib/store/forms';
    import { getToastStore } from '@skeletonlabs/skeleton';

    const toastStore = getToastStore();
    const forms = getCategoryCreateStore();

    async function submit() {
        const properties: (keyof CategoryForm)[] = ['name', 'icon', 'description'];

        for (const property of properties) {
            const result = safeParse(pick(CategoryForm, [property]), { [property]: $forms[property] });
            if (!result.success) {
                toastStore.trigger(error(`Invalid ${property}`));
                return;
            }
        }

        try {
            await addCategory(parse(CategoryForm, $forms));
            // FIXME: Temporary fix until we have a proper way to navigate
            window.history.back();
            forms.reset();
            toastStore.trigger(success('Category added'));
        } catch (_) {
            toastStore.trigger(error('Failed to add Category'));
        }
    }
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
    <Card width="w-full max-w-sm min-w-72">
        <div class="grid grid-cols-[auto_1fr] place-items-center gap-2">
            <Type bind:type={$forms.type} />
            <Name bind:name={$forms.name} />
            <Icon bind:icon={$forms.icon} />
        </div>
        <Description bind:description={$forms.description} />
    </Card>
    <Button on:click={submit}>SAVE</Button>
</div>
