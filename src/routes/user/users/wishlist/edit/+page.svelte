<script lang="ts">
    import { Amount, Description, Name } from '$lib/components/forms';
    import { Button, Card } from '$lib/components/modules';
    import { Wishlist, WishlistForm } from '$lib/models/types';
    import { error, success } from '$lib/functions/toast';
    import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
    import { parse, pick, safeParse } from 'valibot';
    import { removeWishlist, updateWishlist } from '$lib/firebase/database';
    import { getWishlistEditStore } from '$lib/store/forms';

    const toastStore = getToastStore();
    const modalStore = getModalStore();
    const forms = getWishlistEditStore();

    async function update() {
        const properties: (keyof WishlistForm)[] = ['name', 'amount', 'description'];

        for (const property of properties) {
            const result = safeParse(pick(WishlistForm, [property]), { [property]: $forms[property] });
            if (!result.success) {
                toastStore.trigger(error(`Invalid ${property}`));
                return;
            }
        }

        try {
            await updateWishlist(parse(Wishlist, $forms));
            // FIXME: Temporary fix until we have a proper way to navigate
            window.history.back();
            forms.reset();
            toastStore.trigger(success('Wishlist updated'));
        } catch (_) {
            toastStore.trigger(error('Failed to update wishlist'));
        }
    }

    async function remove() {
        try {
            const { id } = parse(pick(Wishlist, ['id']), { id: $forms.id });
            await removeWishlist(id);
            // FIXME: Temporary fix until we have a proper way to navigate
            window.history.back();
            forms.reset();
            toastStore.trigger(success('Wishlist item removed'));
        } catch (_) {
            toastStore.trigger(error('Failed to remove item from wishlist'));
        }
    }

    // TODO: remove related transactions or archive wallet
    ////TODO: Above comment is relic from copy pasting wallet stuff
    function removeHandler() {
        modalStore.trigger({
            type: 'confirm',
            title: 'Please Confirm',
            body: 'Are you sure you wish to remove this item from your wishlist?',
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
            <Amount bind:amount={$forms.amount} />
        </div>
        <Description bind:description={$forms.description} />
    </Card>
    <div class="flex w-full min-w-72 max-w-sm">
        <Button width="w-full" accent="bg-income" on:click={update}>UPDATE</Button>
        <Button width="w-full" accent="bg-expense" on:click={removeHandler}>REMOVE</Button>
    </div>
</div>
