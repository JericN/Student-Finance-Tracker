<script lang="ts">
    import { Amount, Goal } from '$lib/components/forms';
    import { BudgetPref, BudgetPrefForm } from '$lib/models/sft';
    import { Button, Card } from '$lib/components/modules';
    import { error, success } from '$lib/functions/toast';
    import { parse, pick, safeParse } from 'valibot';
    import { getBudgetPrefEditStore } from '$lib/store/forms';
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { updateBudgetPref } from '$lib/firebase/database';

    const toastStore = getToastStore();
    const forms = getBudgetPrefEditStore();

    async function update() {
        const properties: (keyof BudgetPrefForm)[] = ['amount', 'goal'];

        for (const property of properties) {
            const result = safeParse(pick(BudgetPrefForm, [property]), { [property]: $forms[property] });
            if (!result.success) {
                toastStore.trigger(error(`Invalid ${property}`));
                return;
            }
        }

        try {
            await updateBudgetPref(parse(BudgetPref, $forms));
            // FIXME: Temporary fix until we have a proper way to navigate
            window.history.back();
            forms.reset();
            toastStore.trigger(success('Budget preference updated'));
        } catch (_) {
            toastStore.trigger(error('Failed to update budget preference'));
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
    <div class="flex w-full min-w-72 max-w-sm">
        <Button width="w-full" accent="bg-income" on:click={update}>UPDATE</Button>
    </div>
</div>
