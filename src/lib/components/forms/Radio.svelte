<script lang="ts">
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

    export let selected: string;
    export let list: string[];
    export let width = '' as string;
</script>

<RadioGroup
    class={width}
    border="border-2 border-primary-900"
    rounded="rounded-xl"
    active="bg-primary-900 text-white"
    hover="hover:variant-soft-primary"
>
    {#each list as value}
        <RadioItem bind:group={selected} name={value} {value}>{value}</RadioItem>
    {/each}
</RadioGroup>
