<script lang="ts">
    import { Card } from '$lib/components/modules';
    import { goto } from '$app/navigation';

    export let title: string;
    export let link = false as string | boolean;

    function redir() {
        if (link) goto(`/user/users/${link}`);
    }
</script>

<Card width="max-w-screen-sm" padding="px-6">
    <button class="w-full justify-between text-dark" on:click={redir}>
        <div class="flex flex-col items-start">
            <div class="text-2x1 font-bold">{title}</div>
        </div>
        <div class="my-auto flex flex-col items-end text-sm">
            <slot />
        </div>
    </button>
</Card>
