<script lang="ts">
    import { LightSwitch } from '@skeletonlabs/skeleton';
    import { goto } from '$app/navigation';
    import { signOutUser } from '$lib/firebase/auth';
    import { testFetch } from '$lib/api/test';

    let id = 1;
    function getData(id: number) {
        return testFetch(id);
    }

    export let title: string;

    function logout() {
        signOutUser().then(() => {
            goto('/');
        });
    }
</script>

<div class="flex h-full flex-col items-center justify-center gap-10">
    <div class="text-xl font-bold">{title}</div>
    <div class="text-secondary-800-100-token font-bold uppercase underline">
        {#await getData(id)}
            <p>.......</p>
        {:then data}
            <div>
                {data}
            </div>
        {/await}
    </div>
    <button class="variant-filled btn font-bold" on:click={() => (id += 1)}> Next </button>
    <LightSwitch class={'select-none'} />
    <button class="variant-filled btn" on:click={logout}> Logout </button>
</div>
