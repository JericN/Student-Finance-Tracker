<script lang="ts">
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

    export let select: string;
    export let list: string[];
</script>

<RadioGroup
    border="border-2 border-primary-900"
    rounded="rounded-xl"
    active="bg-primary-900 text-white"
    hover="hover:variant-soft-primary"
>
    {#each list as item}
        <RadioItem bind:group={select} name={item} value={item}>{item}</RadioItem>
    {/each}
</RadioGroup>
