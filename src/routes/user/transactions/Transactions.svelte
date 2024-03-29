<script lang="ts">
    import { type Transaction, colors } from '$lib/models/types';
    import { getTotalExpenses, getTotalIncome } from '$lib/funcs/helper';
    import { AccordionItem } from '@skeletonlabs/skeleton';
    import Entries from './Entries.svelte';
    import Header from './Header.svelte';

    export let time: string;
    export let entries: Transaction[];
    export let id: number;

    // TODO: simplify
    const values = Object.values(colors);
    $: bg = values[id % values.length];
    $: income = getTotalIncome(entries);
    $: expenses = getTotalExpenses(entries);
</script>

<AccordionItem open regionControl={`${bg} border-default`} regionPanel={'-mx-2'}>
    <svelte:fragment slot="summary">
        <Header {time} {income} {expenses} />
    </svelte:fragment>
    <svelte:fragment slot="content">
        <Entries {entries} />
    </svelte:fragment>
</AccordionItem>
