<script lang="ts">
    import Card from '$lib/components/Card.svelte';
    import Category from './Category.svelte';
    import Wallet from './Wallet.svelte';
    import Button from '$lib/components/Button.svelte';

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
    <Card width="w-full max-w-sm min-w-72">
        <div class="grid grid-cols-[60px_1fr] place-items-center gap-y-4 p-4">
            <span class="input-label">Amount</span>
            <input class="input" type="number" placeholder="Input" />
            <span class="input-label">Date</span>
            <input class="input" type="date" placeholder="Input" />
            <span class="input-label">Category</span>
            <Category {categories} bind:selected={category} />
            <span class="input-label">Wallet</span>
            <Wallet {accounts} bind:selected={account} />
        </div>
        <div class="p-4">
            <textarea class="textarea" rows="2" placeholder="Notes" />
        </div>
    </Card>
    <Button text="SAVE" />
</div>
