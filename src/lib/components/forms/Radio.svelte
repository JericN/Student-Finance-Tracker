<script lang="ts">
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

    export let select: string;
    export let list: {
        key: string;
        value: string;
    }[];
</script>

<RadioGroup
    border="border-2 border-primary-900"
    rounded="rounded-xl"
    active="bg-primary-900 text-white"
    hover="hover:variant-soft-primary"
>
    {#each list as { key, value }}
        <RadioItem bind:group={select} name={key} {value}>{key}</RadioItem>
    {/each}
</RadioGroup>
