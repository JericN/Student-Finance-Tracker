<script lang="ts">
    import { LightSwitch } from '@skeletonlabs/skeleton';
    import Entry from './Entry.svelte';
    import { goto } from '$app/navigation';
    import { session } from '$lib/store/session';
    import { currency } from '$lib/funcs/helper';
    import Button from '$lib/components/Button.svelte';

    // eslint-disable-next-line init-declarations
</script>

<div class="flex h-full flex-col items-center justify-center gap-10 p-10">
    <div class="text-center font-bold">
        <div class="text-3xl">User Page</div>
        <div class="uppercase underline">
            {$session.username}
        </div>
    </div>

    <Entry title="Daily Budget">
        <div>{currency(1000)}</div>
    </Entry>

    <Entry link="wallets" title="Wallets">
        <div>Add/remove Wallet</div>
        <div>Edit Wallet</div>
    </Entry>

    <Entry title="Wishlist">
        <div>Add/remove Wishlist Item</div>
        <div>Edit Wishlist Item</div>
    </Entry>

    <Entry title="User Management">
        <div>Edit Username</div>
        <div>Edit Password</div>
    </Entry>

    <Entry title="Dark Mode">
        <LightSwitch class={'select-none'} />
    </Entry>

    <Button
        on:click={() => {
            // $session.auth = false;
            goto('/auth/login');
        }}
    >
        Logout
    </Button>
</div>
