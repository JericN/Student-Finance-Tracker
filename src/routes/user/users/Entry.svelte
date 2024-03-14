<script lang="ts">
    import { goto } from '$app/navigation';
    import Card from '$lib/components/Card.svelte';

    export let title: string;
    export let link = false as string | boolean;

    function redir() {
        if (link) {
            console.log(link);
            goto(`/user/users/${link}`);
        }
    }
</script>

<Card width="max-w-screen-sm" padding="px-6">
    <button class="w-full justify-between text-dark" on:click={redir}>
        <div class="flex flex-col items-start">
            <div class="text-2x1 font-bold">{title}</div>
        </div>
        <div class="text-l my-auto flex flex-col items-end">
            <slot />
        </div>
    </button>
</Card>
