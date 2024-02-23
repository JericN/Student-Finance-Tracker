<script lang="ts">
    import { ChevronDoubleLeft, ChevronDoubleRight } from '@steeze-ui/heroicons';
    import { Icon } from '@steeze-ui/svelte-icon';
    import Wallet from './Wallet.svelte';

    export let wallets: Record<string, number>;

    // TODO: make the carousel infinite scroll
    let card: HTMLDivElement;

    function carouselLeft(): void {
        const x =
            card.scrollLeft === 0
                ? card.clientWidth * card.childElementCount // loop
                : card.scrollLeft - card.clientWidth; // step left
        card.scroll(x, 0);
    }

    function carouselRight(): void {
        const x =
            card.scrollLeft === card.scrollWidth - card.clientWidth
                ? 0 // loop
                : card.scrollLeft + card.clientWidth; // step right
        card.scroll(x, 0);
    }
</script>

<div class="gap grid w-full max-w-sm grid-cols-[auto_1fr_auto]">
    <button type="button" on:click={carouselLeft}>
        <Icon src={ChevronDoubleLeft} class="w-5 stroke-2" />
    </button>
    <div bind:this={card} class="flex snap-x snap-mandatory overflow-hidden scroll-smooth">
        {#each Object.entries(wallets) as [name, value]}
            <Wallet {name} {value} />
        {/each}
    </div>
    <button type="button" class="text-3xl" on:click={carouselRight}>
        <Icon src={ChevronDoubleRight} class="w-5 stroke-2" />
    </button>
</div>
