<script lang="ts">
    import { Amount, Description, Name, Image } from '$lib/components/forms';
    import { Button, Card } from '$lib/components/modules';
    import { error, success } from '$lib/functions/toast';
    import { parse, pick, safeParse } from 'valibot';
    import { WishlistForm } from '$lib/models/types';
    import { addWishlist } from '$lib/firebase/database';
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { getWishlistCreateStore } from '$lib/store/forms';

    const toastStore = getToastStore();
    const forms = getWishlistCreateStore();

    async function submit() {
        const properties: (keyof WishlistForm)[] = ['name', 'amount', 'description', 'image'];

        for (const property of properties) {
            const result = safeParse(pick(WishlistForm, [property]), { [property]: $forms[property] });
            if (!result.success) {
                toastStore.trigger(error(`Invalid ${property}`));
                return;
            }
        }

        try {
            await addWishlist(parse(WishlistForm, $forms));
            // FIXME: Temporary fix until we have a proper way to navigate
            window.history.back();
            forms.reset();
            toastStore.trigger(success('Item added'));
        } catch (_) {
            toastStore.trigger(error('Failed to add item'));
        }
    }
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
    <Card width="w-full max-w-sm min-w-72">
        <div class="grid grid-cols-[auto_1fr] place-items-center gap-2">
            <Name bind:name={$forms.name} />
            <Amount bind:amount={$forms.amount} />
        </div>
        <Description bind:description={$forms.description} />
        <Image bind:value={$forms.image} />
    </Card>
    <Button on:click={submit}>SAVE</Button>
</div>
