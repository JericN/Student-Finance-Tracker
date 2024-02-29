<script lang="ts">
    import { LightSwitch } from '@skeletonlabs/skeleton';
    import { testFetch } from '$lib/api/test';
    import { session } from '$lib/store/user';
    import { goto } from '$app/navigation';

    let id = 1;
    function getData(id: number) {
        return testFetch(id);
    }

    // eslint-disable-next-line init-declarations
    export let title: string;
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
