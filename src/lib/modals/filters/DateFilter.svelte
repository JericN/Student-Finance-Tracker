<script lang="ts" context="module">
    function format(date: Date | null) {
        if (date === null) return '';
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function update(value: string) {
        if (value.length === 0) return null;
        return new Date(new Date(value).setHours(0, 0, 0, 0));
    }
</script>

<script lang="ts">
    // TODO: would be nice to find simple library for date
    export let date: Date | null;
    export let min = null as Date | null;
    export let max = null as Date | null;

    $: formattedDate = format(date);
    $: formattedMin = format(min);
    $: formattedMax = format(max);
</script>

<input
    type="date"
    class="input"
    value={formattedDate}
    min={formattedMin}
    max={formattedMax}
    on:change={({ currentTarget: { value } }) => (date = update(value))}
/>
