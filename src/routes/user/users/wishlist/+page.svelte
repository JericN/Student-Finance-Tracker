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
    {#each $wishlistStore as { name, amount, bought, quantity, date}, id}
        <CardButton layout="justify-between" font="font-bold" on:click={() => edit(id)}>
            <div class="grid grid-cols-2">
                <div>
                    <div class="text-lg">{name}</div>
                    <div class="my-auto text-2xl">
                        {currency(amount)}
                    </div>
                </div>
                <div>
                    <div class="text-xl">{date.toDateString().slice(4)}</div>
                    <div class="my-auto text-xl">
                        {`${quantity}x`}
                    </div>
                </div>
            </div>
        </CardButton>
    {/each}
</div>
