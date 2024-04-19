<script lang="ts">
    import { ChevronDoubleLeft as Left, ChevronDoubleRight as Right } from '@steeze-ui/heroicons';
    import { Icon } from '@steeze-ui/svelte-icon';
    import Wallet from './Wallet.svelte';
    import { getWalletStore } from '$lib/store/database';

    const walletStore = getWalletStore();

    $: length = $walletStore.length - 1;
    let card: HTMLDivElement;
    let curr: number;

    function update(curr: number): number {
        if (!card || curr < 0) return 0;
        if (curr > length) return length;
        card.scroll(card.clientWidth * curr, 0);
        return curr;
    }
    $: curr = update(curr);
</script>

<div class="grid max-w-sm grid-cols-[auto_1fr_auto]">
    <div class="col-span-3 text-center font-bold">WALLETS</div>
    <button class="w-5" on:click={() => curr--}>
        <Icon src={Left} aria-hidden={curr === 0} class="stroke-2 aria-hidden:hidden" />
    </button>
    <div bind:this={card} class="flex overflow-hidden scroll-smooth">
        {#each $walletStore as { name, amount }}
            <Wallet {name} {amount} />
        {/each}
    </div>
    <button class="w-5" on:click={() => curr++}>
        <Icon src={Right} aria-hidden={curr === length} class="stroke-2 aria-hidden:hidden" />
    </button>
</div>
