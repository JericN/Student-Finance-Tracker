<script lang='ts'>
    
    import SettingsCard from './SettingsCard.svelte'
    import { LightSwitch } from '@skeletonlabs/skeleton';
    import { goto } from '$app/navigation';
    import { session } from '$lib/store/user';


    // eslint-disable-next-line init-declarations

</script>

<div class="flex h-full flex-col items-center justify-center gap-10">
    <div class="text-xl font-bold">User Page</div>
    <div class="text-secondary-800-100-token font-bold uppercase underline">
        <p>Username</p>
    </div>

    <SettingsCard title="User Management">
        <div>Edit Username</div>
        <div>Edit Password</div>
    </SettingsCard>

    <SettingsCard title="Budget">
        <div>Daily Budget:</div>
        <div>{1000}</div>
    </SettingsCard>

    <SettingsCard title="Dark Mode">
        <LightSwitch class={'select-none'} />
    </SettingsCard>

    <SettingsCard link= "wallets" title="Wallets">
        <div>Add/remove Wallet</div>
        <div>Edit Wallet</div>
    </SettingsCard>
   
    <SettingsCard title="Wishlist">
        <div>Add/remove Wishlist Item</div>
        <div>Edit Wishlist Item</div>
    </SettingsCard>
        
    <button
        class="variant-filled btn"
        on:click={() => {
            $session.auth = false;
            goto('/auth/login');
        }}
    >
        Logout
    </button>
</div>

