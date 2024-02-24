<script lang="ts">
    import Button from '$lib/components/Button.svelte';
    import Card from '$lib/components/Card.svelte';
    import Category from './Category.svelte';
    import Wallet from './Wallet.svelte';

    // TODO: move categories to a store
    // TODO: use proper icons
    const categories = {
        Transportation: '🚌',
        Entertainment: '🎮',
        Utilities: '💡',
        Food: '🍔',
        Health: '🏥',
        Education: '📚',
        Other: '📦',
    };

    // TODO: move accounts to a store
    const accounts = ['Bank', 'Cash', 'GCash', 'Shared'];

    let category: string;
    let account: string;
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
    <Card width="w-full max-w-sm min-w-72" accent="primary">
        <div class="grid grid-cols-[auto_1fr] place-items-center gap-2 p-6">
            <div class="input-label">Amount</div>
            <input class="input rounded-xl py-1" type="number" />
            <div class="input-label">Date</div>
            <input class="input rounded-xl py-1" type="date" />
            <div class="input-label">Category</div>
            <Category {categories} bind:selected={category} />
            <div class="input-label">Wallet</div>
            <Wallet {accounts} bind:selected={account} />
        </div>
        <div class="px-6 pb-4">
            <textarea class="textarea" rows="2" placeholder="Notes" />
        </div>
    </Card>
    <Button accent="primary">
        <span class="px-4 font-bold"> SAVE </span>
    </Button>
</div>
