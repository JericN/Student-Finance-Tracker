<script lang="ts">
    import Card from '$lib/components/Card.svelte';

    export let title: string;
    export let width: string;
</script>

<Card width={`${width} flex-none`} padding="px-6">
    <div class="justify-between text-dark">
        <div class="flex flex-col items-start">
            <div class="text-2x1 font-bold">{title}</div>
        </div>
        <div class="text-l my-auto flex flex-col items-end">
            <slot />
        </div>
    </div>
</Card>
