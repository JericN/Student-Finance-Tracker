<script lang="ts">
    import { CardButton } from '$lib/components/modules';
    import { goto } from '$app/navigation';

    export let title: string;
    export let link = false as string | boolean;

    function redir() {
        if (link) goto(`/user/users/${link}`);
    }
</script>

<CardButton on:click={redir}>
    <div class="w-full text-dark">
        <div class="flex flex-col items-start">
            <div class="text-2x1 font-bold">{title}</div>
        </div>
        <div class="my-auto flex flex-col items-end text-sm">
            <slot />
        </div>
    </div>
</CardButton>
