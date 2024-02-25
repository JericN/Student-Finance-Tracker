<script lang="ts">
    import Amount from './Amount.svelte';
    import Button from '$lib/components/Button.svelte';
    import Card from '$lib/components/Card.svelte';
    import Category from './Category.svelte';
    import Date from './Date.svelte';
    import Note from './Note.svelte';
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

    let amount: number;
    let date: string;
    let category: string;
    let account: string;
    let note: string;
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
    <Card width="w-full max-w-sm min-w-72">
        <div class="grid grid-cols-[auto_1fr] place-items-center gap-2">
            <Amount bind:amount />
            <Date bind:date />
            <Category {categories} bind:selected={category} />
            <Wallet {accounts} bind:selected={account} />
        </div>
        <Note bind:note />
    </Card>
    <Button>
        <span class="px-4 font-bold"> SAVE </span>
    </Button>
</div>
