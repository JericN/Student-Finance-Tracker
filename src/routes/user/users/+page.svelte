<script lang="ts">
    import { Button } from '$lib/components';
    import Entry from './Entry.svelte';
    import { LightSwitch } from '@skeletonlabs/skeleton';
    import { currency } from '$lib/funcs/helper';
    import { goto } from '$app/navigation';
    import { session } from '$lib/store/session';
    import { signOutUser } from '$lib/firebase/auth';
</script>

<div class="flex h-full flex-col items-center justify-center gap-2 p-10">
    <div class="space-y-2 text-center font-bold">
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

    <Entry link="templates" title="My Templates">
        <div>Manage templates</div>
    </Entry>

    <Entry link="categories" title="Categories">
        <div>Transaction categories</div>
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
            signOutUser();
            goto('/auth/login');
        }}
    >
        Logout
    </Button>
</div>
