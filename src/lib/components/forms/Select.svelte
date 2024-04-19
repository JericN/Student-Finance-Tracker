<script lang="ts">
    export let selected: string;
    export let list: string[];
</script>

<select bind:value={selected} class="select leading-none">
    {#each list as item}
        <option value={item}>{item}</option>
    {/each}
</select>
