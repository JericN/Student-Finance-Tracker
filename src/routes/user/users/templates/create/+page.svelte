<script lang="ts">
    import * as FormStore from '$lib/store/forms';
    import { Amount, Category, Description, Type, Wallet } from '$lib/components/forms';
    import { categories, wallets } from '$lib/data/preference';
    import { error, success } from '$lib/funcs/toast';
    import { parse, pick, safeParse } from 'valibot';
    import Button from '$lib/components/Button.svelte';
    import Card from '$lib/components/Card.svelte';
    import Name from '$lib/components/forms/Name.svelte';
    import { TemplateForms } from '$lib/models/types';
    import { addTemplate } from '$lib/firebase/database';
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { goto } from '$app/navigation';

    const toastStore = getToastStore();
    const forms = FormStore.templateCreate();

    async function submit() {
        const properties: (keyof TemplateForms)[] = ['name', 'type', 'amount', 'category', 'wallet', 'description'];

        for (const property of properties) {
            const result = safeParse(pick(TemplateForms, [property]), { [property]: $forms[property] });
            if (!result.success) {
                toastStore.trigger(error(`Invalid ${property}`));
                return;
            }
        }
        try {
            await addTemplate(parse(TemplateForms, $forms));
            goto('/user/users/templates/');
            forms.reset();
            toastStore.trigger(success('Template added'));
        } catch (_) {
            toastStore.trigger(error('Failed to add Template'));
        }
    }
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
    <Card width="w-full max-w-sm min-w-72">
        <div class="grid grid-cols-[auto_1fr] place-items-center gap-2">
            <Type bind:type={$forms.type} />
            <Name bind:name={$forms.name} />
            <Amount bind:amount={$forms.amount} />
            <Category {categories} bind:category={$forms.category} />
            <Wallet {wallets} bind:wallet={$forms.wallet} />
        </div>
        <Description bind:description={$forms.description} />
    </Card>
    <Button on:click={() => submit()}>
        <span class="px-4 font-bold text-dark"> SAVE </span>
    </Button>
</div>
