<script lang="ts">
    import Card from './Card.svelte';
    export let title: string;

    export let link: string = '';

    let deviceWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        deviceWidth = window.innerWidth;
    });

    function update(deviceWidth: number): string {
        switch (true) {
            case deviceWidth > 440:
                return 'w-2/4';
            default:
                return 'w-3/4';
        }
    }

    $: cardWidth = update(deviceWidth);
</script>

{#if link}
    <a class={cardWidth} href={link}>
        <Card {title} width="w-full">
            <slot />
        </Card>
    </a>
{:else}
    <Card {title} width={cardWidth}>
        <slot />
    </Card>
{/if}
