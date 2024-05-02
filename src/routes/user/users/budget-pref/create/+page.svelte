<script lang="ts">
    import { Amount, Goal } from '$lib/components/forms';
    import { Button, Card } from '$lib/components/modules';
    import { error, success } from '$lib/functions/toast';
    import { parse, pick, safeParse } from 'valibot';
    import { BudgetPrefForm } from '$lib/models/sft';
    import { addBudgetPref } from '$lib/firebase/database';
    import { getBudgetPrefCreateStore } from '$lib/store/forms';
    import { getToastStore } from '@skeletonlabs/skeleton';

    const toastStore = getToastStore();
    const forms = getBudgetPrefCreateStore();

    async function submit() {
        const properties: (keyof BudgetPrefForm)[] = ['amount', 'goal'];

        for (const property of properties) {
            const result = safeParse(pick(BudgetPrefForm, [property]), { [property]: $forms[property] });
            if (!result.success) {
                toastStore.trigger(error(`Invalid ${property}`));
                return;
            }
        }

        try {
            await addBudgetPref(parse(BudgetPrefForm, $forms));
            // FIXME: Temporary fix until we have a proper way to navigate
            window.history.back();
            forms.reset();
            toastStore.trigger(success('Budget Preference added'));
        } catch (_) {
            toastStore.trigger(error('Failed to add Budget Preference'));
        }
    }
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
    <Card width="w-full max-w-sm min-w-72">
        <div class="grid grid-cols-[auto_1fr] place-items-center gap-2">
            <Amount bind:amount={$forms.amount} />
            <Goal bind:goal={$forms.goal} />
        </div>
    </Card>
    <Button on:click={submit}>SAVE</Button>
</div>
