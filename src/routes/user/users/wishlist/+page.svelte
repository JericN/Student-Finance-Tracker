<script lang="ts">
    import { Button, CardButton } from '$lib/components/modules';
    import { currency } from '$lib/functions/helper';
    import { getWishlistEditStore } from '$lib/store/forms';
    import { getWishlistStore } from '$lib/store/database';
    import { goto } from '$app/navigation';

    const wishlistStore = getWishlistStore();
    const forms = getWishlistEditStore();

    function add() {
        goto('/user/users/wishlist/create/');
    }

    function edit(id: number) {
        forms.set(structuredClone($wishlistStore[id]));
        goto('/user/users/wishlist/edit/');
    }
</script>

<div class="flex h-full flex-col items-center gap-2 p-10">
    <Button on:click={add}>Add Item ➕</Button>
    {#each $wishlistStore as { name, amount, quantity, date }, id}
        <CardButton layout="justify-between" font="font-bold" on:click={() => edit(id)}>
            <div class="text-2xl">{name}</div>

            <div class="flex flex-col items-end">
                <div class="flex justify-between gap-2">
                    <div class="my-auto text-2xl">
                        {currency(amount)}
                    </div>
                    <div class="my-auto rounded-lg border-2 bg-dark px-2 py-1 text-sm text-white">
                        {`${quantity}`}
                    </div>
                </div>
                <div class="text-sm text-red-900">{date.toDateString().slice(4)}</div>
            </div>
        </CardButton>
    {/each}
</div>
