<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { session } from '$lib/store/session';

    function start() {
        if ($session.loggedIn) goto('/user/dashboard');
        else goto('/auth/login');
    }

    onMount(() => {
        window.addEventListener('click', start);
        return () => {
            window.removeEventListener('click', start);
        };
    });
</script>

<div class="pointer-events-none grid h-full place-items-center">
    <h1 class="animate-bounce text-center text-3xl font-bold">Start <br /> Saving</h1>
</div>
