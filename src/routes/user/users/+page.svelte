<script lang="ts">
    import { LightSwitch, getToastStore } from '@skeletonlabs/skeleton';
    import { Button } from '$lib/components/modules';
    import Entry from './Entry.svelte';
    import { currency } from '$lib/functions/helper';
    import { error } from '$lib/functions/toast';
    import { goto } from '$app/navigation';
    import { session } from '$lib/store/session';
    import { signOutUser } from '$lib/firebase/auth';

    const toast = getToastStore();
    async function logout() {
        try {
            await signOutUser();
            goto('/');
        } catch (e) {
            toast.trigger(error('Logout Failed'));
        }
    }
</script>

<div class="flex h-full flex-col items-center justify-center gap-2 p-10">
    <div class="space-y-2 text-center font-bold">
        <div class="text-3xl">USER PAGE</div>
        <div class="uppercase underline">
            {$session.username}
        </div>
    </div>

    <Entry link="budget-pref" title="Daily Budget">
        <div>Edit Budget Preference</div>
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

    <Entry link="wishlist" title="Wishlist">
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

    <Button on:click={logout}>Logout</Button>
</div>
