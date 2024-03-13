<script lang="ts">
    import { type Transaction, colors } from '$lib/models/types';
    import { AccordionItem } from '@skeletonlabs/skeleton';
    import Entries from './Entries.svelte';
    import Header from './Header.svelte';
    import { currency } from '$lib/funcs/helper';

    export let entries: Transaction[];
    export let id: number;

    const income = currency(entries.reduce((acc, { amount, type }) => (type === 'Income' ? acc + amount : acc), 0));
    const expenses = currency(entries.reduce((acc, { amount, type }) => (type === 'Expense' ? acc + amount : acc), 0));
    const [{ date }] = entries;

    const values = Object.values(colors);
    const bg = values[id % values.length];
</script>

<AccordionItem open regionControl={`${bg} border-default`} regionPanel={'-mx-2'}>
    <svelte:fragment slot="summary">
        <Header {date} {income} {expenses} />
    </svelte:fragment>
    <svelte:fragment slot="content">
        <Entries {entries} />
    </svelte:fragment>
</AccordionItem>
